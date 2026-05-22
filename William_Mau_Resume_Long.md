---
title: "Will Mau, Operations & Technology Executive"
description: "Fifteen-plus years leading revenue and technology transformations at growth-stage companies. The long version, with the project stories that don't fit on a one-page resume."
---

# Will Mau

**Operations & Technology Executive · AI & Automation · Revenue Systems**

Schenectady, NY · [William.Mau@gmail.com](mailto:William.Mau@gmail.com) · 518-930-8185 · [linkedin.com/in/will-mau](https://www.linkedin.com/in/will-mau/) · [willmau.com](https://willmau.com)

---

## The short version

I'm an operations executive who builds the systems most VPs only buy. Fifteen-plus years across operations, revenue, and business technology. Currently Vice President of Operations at TalentSmartEQ and one of four members of the company's Executive Leadership Team, where I partner directly with the CEO on company strategy and lead the operations and technology functions for a remote-first emotional-intelligence training company.

I direct cross-functional work across Sales, Marketing, Client Success, Finance, and Product, and architect the platforms underneath. Technical fluency is the differentiator. I can read the Apex, write the Python, and ship the AI agent when that's the right call. But the job is leadership.

I started as a high-school social studies teacher. The through-line has always been the same: figure out the actual problem, then build something durable that solves it.

This is the long version. If you want the one-pager, [it's here as a PDF](./William_Mau_Resume_2026.pdf).

---

## How I lead

**Diagnostic first, never solution first.** Most operations problems aren't tool problems; they're definition problems. Before I greenlight a build or a buy, I spend a few hours with the actual data: the tickets, the lost-deal notes, the funnel report. The right system falls out of the diagnosis. Skip that step and you spend $50K on a tool that solves the wrong thing.

**Build what should be built. Buy what shouldn't.** If a vendor solves it cleanly, I buy. If the vendor would charge $30K a year for something a 200-line Python script does better, I direct an internal build. The AI lead-triage system I oversee at TalentSmart costs about $20 a month in API calls. The closest enterprise equivalent quoted $90K a year.

**Document everything, write tests, make it boring to operate.** I'd rather ship slower with a 95%-covered Apex batch and a runbook than fast with a fragile flow no one but me can debug. Every system I own at TalentSmart has a deployment guide, a backfill guide, and a "what to do when it breaks" guide. The job isn't to be the only one who knows how it works.

**Security-minded.** I lead the privacy and cybersecurity work. Everything we build talks to Salesforce and Microsoft Graph through proper service principals with rotated secrets, not via a saved password on someone's laptop.

**Opinionated about people work.** I came up through teaching, sales floors, and then operations leadership. I know what it feels like when ops shows up to "help" and just adds reporting overhead. Anything I build has to leave the team faster than it found them.

---

## Selected initiatives at TalentSmartEQ

These are the projects I'd want to talk about in an interview, the ones that don't fit on a one-page resume.

### AI case-handling system: 68% of support tickets, automated

TalentSmartEQ's training platform produces a steady stream of support cases: passcode resets, registration tweaks, content questions. Most are simple, but volume eats Client Success capacity.

I led design and deployment of an Azure OpenAI agent that reads incoming cases, classifies the request type, executes the action when it's high-confidence routine (passcode resets, registration changes, license lookups), and writes a structured handoff for cases that need a human. The system auto-handles about 68% of incoming cases at roughly $4/month in API costs.

The most visible business outcome: the customer-support team scaled from 6 people to 3, with response time improving rather than degrading. Client Success keeps owning the relationship; the agent just stops them from spending their day on passcode resets.

The architectural pattern (read inputs, classify, decide, write a structured output back) became the template for the next AI initiative.

### AI lead-triage system: 10-second first touch, live in production

Every inbound lead at TalentSmart was being manually triaged: is this real, what's their title, are they buying for themselves or an org, what product, what to do next. The work didn't scale, and a broken Salesforce assignment rule was quietly misrouting leads into a catch-all queue on top of it.

Before approving anything, I directed a study of 1,064 converted leads from the last 24 months: what they actually wrote on the forms and how the VPs responded. Patterns fell out quickly. Specific use case and scope. Named role and authority. Existing-relationship signal. Specific product mentioned. Timing or budget signal. Clear next-step ask. The leads that *didn't* convert wrote things like "just exploring" or "want to learn more about EQ." The signal was always there. Nobody had ever written it down.

Launched 2026-05-05. Here is verified production data from the first 17 days:

- **365 inbound leads auto-classified** (~600 per month run rate)
- **~10 seconds from lead-create to personalized first-touch email** (verified on traced leads: a lead landed at 00:13:00 and the outbound went at 00:13:10)
- **~11% of leads auto-suppressed as junk or bots** before any VP saw them
- **~63 leads fully handled with zero VP touch** (junk-suppressed plus auto-triaged)
- **88 automated first-touch outbound emails sent**
- **30 inbound replies auto-processed** with sentiment classification
- **5 regional VPs and 1 account manager served**, with territory routing including military and international rules

Directionally, this is 50 to 100 hours of manual triage and first-email drafting reclaimed each month, with capacity that scales unbounded against a former human bottleneck. The system runs multi-step outreach sequences (self-buyer, hot-account, cold-probe, webinar follow-up, certification follow-up), captures webinar registrants that were previously falling through the cracks (about 45 per week), and sends a daily performance digest to the team.

### Executive forecasting platform: first reliable view of YoY pipeline

TalentSmart wanted year-over-year trending, performance-vs-quota visibility, and pipeline-history analysis. Salesforce stores opportunities as single mutable rows. History evaporates the moment a stage flips. So we built a snapshot system underneath.

I directed the design of a custom Opportunity_Snapshot object with 34 fields, an Apex batch class that runs every Monday at 5 AM and snapshots every open opportunity plus two years of closed deals, a schedulable wrapper, a comprehensive Apex test suite at 95% coverage, and a Python backfill script that loads historical exports from Excel.

On top of that, a Lightning Web Component executive dashboard with an Apex controller surfacing quota performance (YTD and MTD actual vs. quota by rep), full-year forecast, sales by region, sales by owner, top 10 clients, top 10 new clients, top 10 declining clients, pipeline trend over time, and an interactive date-range selector. Chart.js for the visuals. Responsive across devices.

Deployment guide, backfill guide, dashboard deployment guide, field definitions: all committed. Running weekly since early 2026 with no manual intervention.

### Clickwrap legal-agreement re-architecture: hundreds of hours saved per year

The legal team was running a clickwrap agreement process that took multiple rounds of editing, internal approvals, and signature collection for every new customer. The cycle slowed deals and burned hours across legal, sales, and operations.

I re-architected the process. The multi-round editing-approval-signature cycle became a single-click workflow. The legal team still owns the underlying contract template, but each new agreement now flows through automation rather than email chains.

The visible business outcome: hundreds of hours of cross-team time reclaimed annually, plus a faster path from "interested customer" to "signed agreement."

### Customer-health system: daily call list for sales

TalentSmart sells assessment credits in bulk. Customers burn them over time. We needed to know which customers were running low (reorder opportunity), which had stagnant inventory (success risk), and the velocity each customer was using credits at. The data lived in TruScore (the assessment platform), but the customer relationship lived in Salesforce, and nobody was joining them.

Two phases. Phase 1 was a pipeline that reads the TruScore credit report, extracts emails, batches them through SOQL lookups, and outputs an enriched workbook with Contact Name, Account Name, and Account Owner per row. Phase 2 pulls Closed Won Participant License opportunities from Salesforce going back three years, builds a monthly credits-added time series per Account per Product, joins it with the current credit balance, and produces purchase-velocity analysis plus stagnant-inventory flags.

On top of that, a "Who to Call" HTML report. Every day, the system computes which customers have fewer than 9 credits remaining or credits expiring in 30 days, sorts by velocity, and emits a one-page report with mailto buttons for one-click Outlook emails. The **sales team** opens it like a daily dashboard. The system drives reorder cadence and surfaces churn risk before it materializes.

### Accounts Receivable automation: Equip to Salesforce to SharePoint

AR was a manual workbook that someone updated by hand from Equip purchase exports. I directed the automation. A Collections Tracker reconciles paid invoices against the live AR spreadsheet. A daily job pulls every account's payment terms from Salesforce via REST, authenticates to Microsoft Graph using a service principal, and uploads a clean CSV to SharePoint at `Operations/Collections/sf-account-payment-terms.csv`. The team opens that CSV every morning. No human is the integration anymore.

The accompanying AR runbook documents the full collections workflow: refresh the report, highlight by aging bucket, cross-check Salesforce financial tab, search QuickBooks for payment status, send the templated outreach. The point of the documentation is that anyone on the team can do collections, not just one person.

### Salesforce Account Banner LWC and AI account dossiers

Two smaller initiatives that drive daily-use impact.

A Lightning Web Component on every Account record page surfaces context that used to be buried under five tabs of fields: logo, coverage tier with color coding, open pipeline revenue, account owner and account manager, territory and industry chips.

An AI-driven research output aggregates public evidence per strategic account across four signals: L&D investment, leadership change, M&A activity, and executive people-and-leadership perspective. The output is a structured dossier (company overview, business model, workforce context, size band, social-proof matches against existing customers, "why EQ might be relevant"). VPs use it as pre-call prep.

---

## Outside work: Mau Consulting

I run a small Salesforce, AI, and automation consultancy on the side at [mauops.com](https://mauops.com). Solo practice, direct-to-client, no agency. The same approach that works inside a company works for small businesses. Most are paying for software they barely use and doing by hand the things that should be automated.

Productized offerings: a Salesforce/RevOps Health Check (1 to 2 weeks), a Funnel Bottleneck Sprint (2 weeks), and an Executive Dashboard Pack (1 week). All fixed-scope.

A few recent engagements: a website rebuild and lead-capture flow for Shoreline Senior Care; a Wix site and contact-flow setup for Rockford Milling; an Excel project-management template rebuild for a consultancy via Upwork.

---

## Experience

### Vice President of Operations, TalentSmartEQ
**May 2021 to Present · Remote / San Diego, CA**

*Promoted from Director of Sales Operations to Sr. Director of Operations to Vice President of Operations.*

One of four members of the TalentSmartEQ Executive Leadership Team. Partner directly with the CEO on company strategy, operating cadence, and cross-functional alignment across Sales, Marketing, Client Success, Finance, and Product.

Lead a global team: a U.S. customer-support team, a third-party development team in India, and third-party support desks in Mexico and Guatemala. Scope spans operations, customer service, IT, project management, and legal contracts.

Own revenue operations, technology infrastructure, data privacy, cybersecurity, vendor management, and contract management. The headline initiatives are above. Day to day, I'm directing the Salesforce environment, the AI systems, the dashboards, and the integrations, and quietly replacing manual spreadsheet work with code wherever it stops being defensible.

### Senior Sales Manager, Cengage Learning
**March 2018 to May 2021 · Boston, MA**

*Promoted from Sales Manager.*

Led sales operations strategy and channel realignment across a B2B segment of one of the largest education publishers in North America. Drove an enterprise-wide Salesforce implementation delivering a 10x productivity gain in six months by automating workflows, standardizing reporting, and replacing a thicket of regional spreadsheets. Built the KPI framework, the compensation model, and the onboarding program. The last of those compressed new-hire ramp from eight months to four weeks. Partnered with marketing and product to fold campaign and pipeline insights into territory planning.

### Inbound Sales Manager, Charter Communications
**January 2014 to March 2018 · Albany, NY**

*Promoted from Supervisor to Sales Effectiveness Manager to Inbound Sales Manager.*

Frontline sales leadership at a regional telco. Led a 72-person sales organization (6 supervisors of 12 agents each). Drove a 9% lift in overall sales metrics through process optimization and a peer-mentorship program that became a model for the region. Transformed leadership onboarding, reducing manager ramp-up and strengthening the management pipeline.

### Earlier roles

- **Operations Manager, TJX Corporation**, Albany, NY (2013 to 2014)
- **Executive Team Leader, Target Corporation**, Albany, NY (2013 to 2014)
- **Social Studies Teacher, Schenectady Central School District**, Schenectady, NY (2010 to 2013). Taught U.S. History, world cultures, and economics. Three years that shaped how I think about explaining complex systems to people who haven't seen them before. A skill that turns out to matter a lot when you're the executive sitting between an engineering team and a CEO.

---

## Technology Leadership

**Platforms led.** Salesforce (Administrator certified, including Apex, Lightning Web Components, SOQL, Flow, Pardot, Data Loader, Salesforce CLI). Microsoft 365 administration. SharePoint intranet architecture. Azure (server transition from Codero, service principals, MSAL auth). Microsoft Graph (SharePoint, OneDrive, Mail, Calendar).

**Hands-on capability.** I write the code when that's the right call. Python (pandas, openpyxl, simple-salesforce, requests, Azure OpenAI SDK, MSAL). Apex (batch, schedulable, triggers, controllers, comprehensive test classes at 95%+ coverage). LWC with Apex controllers, wire adapters, imperative calls, Chart.js. Astro, TypeScript, and Tailwind for web. Git and GitHub Actions for CI/CD and source-driven Salesforce deployments. Reasonable SQL. This isn't a developer's resume; it's an executive who has enough technical fluency to architect solutions, evaluate vendors honestly, and direct technical work without translation overhead.

**AI and LLM.** Azure OpenAI for production work (compliance reasons). Prompt engineering for structured-output classification. RAG patterns for case-handling. Shadow-mode deployments and human-in-the-loop audit before anything autonomous turns on.

---

## Certifications and education

- **Salesforce Administrator**, certified.
- **Mastering Emotional Intelligence Level 1 and Level 2**, certified through TalentSmart.
- **New York State Teachers Certification**, Social Studies 7-12.
- **M.A. History**, University at Albany. 4.0 GPA.
- **B.A. History Teacher Education**, The College of Saint Rose. 3.6 GPA.

---

## Civic and community leadership

### Elected Board of Education Member, Schalmont Central School District (2024 to Present)

I'm an elected member of the Schalmont CSD Board of Education. The story of how that happened is short. My daughter's kindergarten class was too big. I started showing up at board meetings to ask why. The answer led to more questions. Eventually I ran.

Two years on the board, the things we've gotten done include pre-K expansion, the Woestina school reopening, a Residential Trade Technology program, AP course expansion, the capital reserve fund, and a 1.95% tax levy that came in well under the state's 4.2% cap. I was reelected in May 2026.

I write up board work in something close to real time at [willmau.com/board](https://willmau.com/board) (in progress). Most board members don't, and it feels like the kind of public-record work civic life actually depends on.

### Troop Committee Chair, Scouting America BSA, Troop 3054 (2024 to Present)

I chair the troop committee for our local Scouting America troop. Strategic planning, adult-leader development, community engagement. I also built the troop's website because the old one wasn't working and nobody else wanted to.

---

## Contact

Best way to reach me is [William.Mau@gmail.com](mailto:William.Mau@gmail.com) or [LinkedIn](https://www.linkedin.com/in/will-mau/). Phone is 518-930-8185. I'm based in Rotterdam, NY and work primarily remote.
