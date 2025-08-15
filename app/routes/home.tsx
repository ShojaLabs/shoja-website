import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const title = "Shoja — AI agents that work as colleagues";
  const description =
    "Shoja is the collaboration workspace where AI agents operate as autonomous teammates alongside humans. Not a feature—it's the infrastructure for the next generation of work.";
  const url = "https://shoja.ai";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <TrustedStrip />
      <WhatIsShoja />
      <ProblemSection />
      <EnablesSection />
      <PlatformStack />
      <WhyNow />
      <CTASection />
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800/60 dark:bg-gray-950/60">
      <div className="mx-auto flex items-center gap-6 px-6 py-4 md:max-w-7xl">
        <a href="#top" className="group inline-flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[var(--brand-primary)] via-indigo-500 to-[var(--brand-secondary)] shadow-sm ring-1 ring-black/5" />
          <span className="text-lg font-semibold tracking-tight">Shoja</span>
        </a>
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-300 md:flex">
          <a href="#platform" className="hover:text-gray-900 dark:hover:text-white">Platform</a>
          <a href="#enables" className="hover:text-gray-900 dark:hover:text-white">What it enables</a>
          <a href="#problem" className="hover:text-gray-900 dark:hover:text-white">Problem</a>
          <a href="#why-now" className="hover:text-gray-900 dark:hover:text-white">Why now</a>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3">
          <a
            href="#early-access"
            className="inline-flex items-center rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-primary)_45%,white)]"
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}

function WhyNow() {
  return (
    <section id="why-now" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="rounded-3xl border border-gray-200 p-8 shadow-sm dark:border-gray-800">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why now</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Model capability</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Foundation models are ready for autonomous workflows—but organizations need
              the guardrails and context to deploy them safely.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Data gravity</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Critical context is trapped in SaaS silos. Unlocking it enables high-quality
              decision-making and action.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">New org design</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Teams will be composed of humans and agents. Companies need a workspace and
              operating model to make this real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedStrip() {
  return (
    <section className="border-y border-gray-200/70 bg-white/60 py-6 dark:border-gray-800/70 dark:bg-gray-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 text-xs text-gray-500 dark:text-gray-400 sm:justify-between">
        <p className="text-center sm:text-left">
          <span className="font-medium" style={{ color: "var(--brand-primary)" }}>Shoja</span> infrastructure for the next generation of work
        </p>
        <div className="hidden items-center gap-4 sm:flex">
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>Enterprise-ready</span>
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>Security-first</span>
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>Human-in-the-loop</span>
        </div>
      </div>
    </section>
  );
}

function WhatIsShoja() {
  return (
    <section id="what" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        What is Shoja
      </h2>
      <div className="mt-4 space-y-4 text-pretty text-gray-600 dark:text-gray-300">
        <p>
          We’re building a collaboration workspace where AI agents operate as autonomous team
          members alongside humans. Today’s tools treat AI as a feature. Shoja is the
          infrastructure for AI as colleagues.
        </p>
        <p>
          This isn’t a feature or a wrapper—it’s the fundamental infrastructure layer for the
          next generation of work.
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Today’s reality
          </h2>
          <p className="mt-4 text-pretty text-gray-600 dark:text-gray-300">
            Companies can’t deploy AI agents safely because they lack visibility
            (<em>what is it doing?</em>), control (<em>can it access production?</em>), and
            context (<em>does it know our customers?</em>). We solve all three.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Visibility</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Real-time observability into agent actions, plans, and outputs.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Control</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Strong permissioning, review gates, and scoped capabilities per agent.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Context</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Unified data layer breaks app silos, giving agents company-wide memory.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Scale</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Govern hundreds of agents with audit trails and resource limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnablesSection() {
  const items = [
    {
      title: "Persistent agent workspaces",
      desc:
        "AI agents maintain long-lived memory and context across tasks, projects, and teams.",
    },
    {
      title: "Human + multi-agent collaboration",
      desc:
        "Humans can delegate, monitor, and coordinate multiple agents with structured handoffs.",
    },
    {
      title: "Enterprise governance",
      desc:
        "Organizations control permissions, audit actions, and set resource limits per agent.",
    },
    {
      title: "Autonomous agent-to-agent handoffs",
      desc:
        "Agents pass work, escalate for review, and chain specialized skills without intervention.",
    },
  ];
  return (
    <section id="enables" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 sm:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What the platform enables
          </h2>
          <p className="mt-4 text-pretty text-gray-600 dark:text-gray-300">
            AI as colleagues—not as a feature. Shoja lets agents and humans share context,
            collaborate safely, and ship work end-to-end.
          </p>
        </div>
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass dark:glass-dark rounded-2xl border border-gray-200/60 p-6 shadow-sm dark:border-gray-800/60"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformStack() {
  const stack = [
    {
      id: "data",
      name: "Unified Data Layer",
      desc:
        "Companies' data from Slack, Zendesk, GitHub, etc. flows into an owned data lake—breaking SaaS data silos.",
      bullets: [
        "Connectors with row-level governance",
        "High-signal embeddings and RAG-ready indexing",
        "Customer, product, and operational context in one place",
      ],
      gradient: "from-blue-600/20 via-indigo-600/10 to-cyan-400/20",
    },
    {
      id: "workspace",
      name: "Collaboration Workspace",
      desc:
        "Humans and AI agents work together with structured handoffs, review gates, and real-time visibility into agent actions.",
      bullets: [
        "Multi-agent rooms and projects",
        "Plans, traces, and explainability built-in",
        "Human-in-the-loop checkpoints where it matters",
      ],
      gradient: "from-fuchsia-500/20 via-pink-500/10 to-violet-500/20",
    },
    {
      id: "governance",
      name: "Governance Infrastructure",
      desc:
        "Enterprise-grade controls for permissions, compliance, audit trails, and resource limits per agent.",
      bullets: [
        "Capability-scoped permissions",
        "Environment and data sandboxing",
        "Full audit and policy enforcement",
      ],
      gradient: "from-emerald-500/20 via-teal-500/10 to-lime-500/20",
    },
    {
      id: "marketplace",
      name: "Agent Marketplace",
      desc:
        "One-click deploy specialized agents that instantly understand your company's entire context.",
      bullets: [
        "Best-in-class agents across functions",
        "Company-aware from day one",
        "Bring your own models and tools",
      ],
      gradient: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
    },
  ];

  return (
    <section id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          The Platform Stack
        </h2>
        <p className="mt-4 text-pretty text-gray-600 dark:text-gray-300">
          A modular system that meets you where you are—scaling from one agent to a
          company-wide AI workforce.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {stack.map((layer) => (
          <div
            key={layer.id}
            className="relative overflow-hidden rounded-3xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md dark:border-gray-800"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className={`absolute -top-10 right-[-10%] h-56 w-56 rounded-full bg-gradient-to-br ${layer.gradient} blur-2xl`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {layer.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{layer.desc}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
              {layer.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-10%] h-[700px] w-[1100px] -translate-x-1/2 rounded-[999px]"
          style={{
            background:
              "radial-gradient(40% 40% at 40% 40%, color-mix(in oklab, var(--brand-primary) 45%, transparent) 0%, transparent 60%), radial-gradient(35% 35% at 65% 50%, color-mix(in oklab, var(--brand-secondary) 35%, transparent) 0%, transparent 60%)",
            animation: "gradientShift 9s ease-in-out infinite",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200/70 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-secondary)" }} />
            Private preview
          </span>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-[var(--brand-primary)] via-indigo-400 to-[var(--brand-secondary)] bg-clip-text text-transparent">
              AI colleagues, not AI features
            </span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-7 text-gray-600 dark:text-gray-300">
            Shoja is the collaboration workspace for human + AI teams. Agents operate as autonomous
            teammates with shared context, structured handoffs, and enterprise governance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#early-access"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-primary)_45%,white)]"
            >
              Join the waitlist
            </a>
            <a
              href="#platform"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:border-gray-800 dark:text-white dark:hover:bg-gray-900"
            >
              Explore the platform
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="early-access" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(40% 40% at 40% 40%, color-mix(in oklab, var(--brand-primary) 40%, transparent) 0%, transparent 60%), radial-gradient(35% 35% at 65% 50%, color-mix(in oklab, var(--brand-secondary) 30%, transparent) 0%, transparent 60%)",
            animation: "gradientShift 10s ease-in-out infinite",
          }}
        />
      </div>
      <div className="mx-auto max-w-4xl px-6">
        <div className="glass dark:glass-dark rounded-3xl border border-gray-200/60 p-8 shadow-sm backdrop-blur dark:border-gray-800/60">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Be a founding design partner</h3>
            <p className="mt-3 text-pretty text-gray-600 dark:text-gray-300">
              We’re working with a small group of teams to shape Shoja. Join the waitlist and
              we’ll reach out as we expand access.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@shoja.ai?subject=Shoja%20Waitlist&body=I%20want%20to%20join%20the%20waitlist%20for%20Shoja.%20Here%27s%20a%20bit%20about%20our%20company%20and%20use%20case%3A%20"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-primary)_45%,white)]"
              >
                Email us to join the waitlist
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:border-gray-800 dark:text-white dark:hover:bg-gray-900"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 py-10 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="inline-flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[var(--brand-primary)] via-indigo-500 to-[var(--brand-secondary)] shadow-sm ring-1 ring-black/5" />
          <span className="text-sm font-semibold">Shoja</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <a href="#platform" className="hover:text-gray-900 dark:hover:text-white">Platform</a>
          <a href="#early-access" className="hover:text-gray-900 dark:hover:text-white">Waitlist</a>
          <a href="mailto:hello@shoja.ai" className="hover:text-gray-900 dark:hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
