import { EmailMessage } from 'cloudflare:email';

// Messages go to the author's Gmail; every subject starts with "The Trellis page"
// so it's clear where they came from.
const TO = 'william.mau@gmail.com';
const FROM = 'author@willmau.com';
const PAGE = 'https://willmau.com/trellis/';
const ALLOWED = ['https://willmau.com', 'https://www.willmau.com', 'http://localhost:4321', 'http://localhost:4329'];
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = ALLOWED.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' },
      });
    }
    if (request.method !== 'POST') return new Response('Not found', { status: 404 });
    if (origin && !ALLOWED.includes(origin)) return new Response('Forbidden', { status: 403 });

    const type = request.headers.get('Content-Type') || '';
    const wantsJson = type.includes('application/json');
    let data = {};
    try {
      data = wantsJson ? await request.json() : Object.fromEntries(await request.formData());
    } catch {
      return reply(wantsJson, cors, 400, 'bad-request');
    }

    // Bots: a filled honeypot or an instant submit gets a quiet "thanks" and no email.
    const elapsed = Date.now() - Number(data.t);
    if (data.website || !(elapsed > 3000)) return reply(wantsJson, cors, 200, 'ok');

    const name = oneLine(data.name, 100);
    const email = oneLine(data.email, 200);
    const message = String(data.message ?? '').trim().slice(0, 5000);
    if (!name || !EMAIL_RE.test(email) || message.length < 2) return reply(wantsJson, cors, 400, 'missing');

    if (env.LIMITER) {
      const { success } = await env.LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'anon' });
      if (!success) return reply(wantsJson, cors, 429, 'slow-down');
    }

    const subject = `The Trellis page: message from ${name}`;
    const body = [
      `New message from the contact form on The Trellis page (${PAGE}).`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
      '',
      `Reply to this email to answer ${name} directly.`,
    ].join('\n');

    const raw = [
      `From: ${encodeWord('The Trellis page')} <${FROM}>`,
      `To: <${TO}>`,
      `Reply-To: ${encodeWord(name)} <${email}>`,
      `Subject: ${encodeWord(subject)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@willmau.com>`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: base64',
      '',
      base64(body).replace(/.{76}/g, '$&\r\n'),
    ].join('\r\n');

    try {
      await env.MAILER.send(new EmailMessage(FROM, TO, raw));
    } catch (err) {
      console.error('send failed', err);
      return reply(wantsJson, cors, 502, 'send-failed');
    }
    return reply(wantsJson, cors, 200, 'ok');
  },
};

// JSON for the page's script; a redirect back to the page for plain form posts.
function reply(wantsJson, cors, status, code) {
  if (wantsJson) {
    return new Response(JSON.stringify({ ok: status === 200, code }), {
      status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
  const to = status === 200 ? `${PAGE}?sent=1#contact` : `${PAGE}?error=${code}#contact`;
  return Response.redirect(to, 303);
}

function oneLine(value, max) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

function base64(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

// RFC 2047 encoded-word, so names and subjects can hold any character.
function encodeWord(text) {
  return /^[\x20-\x7e]*$/.test(text) && !/[",]/.test(text) ? text : `=?UTF-8?B?${base64(text)}?=`;
}
