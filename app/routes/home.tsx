import type { Route } from "./+types/home";
import {
  IconShieldLock,
  IconEye,
  IconFolders,
  IconUsersGroup,
  IconDatabase,
  IconLayoutGrid,
  IconShieldCheck,
  IconShoppingCart,
  IconArrowsRightLeft,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useEffect, useState, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router";

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

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent !== "join_waitlist") {
    return Response.json(
      { ok: false, error: "Invalid intent" },
      { status: 400 }
    );
  }

  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table =
    process.env.AIRTABLE_TABLE || process.env.AIRTABLE_TABLE_ID || "Waitlist";

  if (!apiKey || !baseId || !table) {
    return Response.json(
      {
        ok: false,
        error: "Server not configured. Missing Airtable credentials.",
      },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      table
    )}`;
    const emailField = process.env.AIRTABLE_EMAIL_FIELD || "Email";
    const fields: Record<string, string> = { [emailField]: email };
    if (process.env.AIRTABLE_SOURCE_FIELD) {
      fields[process.env.AIRTABLE_SOURCE_FIELD] =
        process.env.AIRTABLE_SOURCE_VALUE || "Website";
    }
    if (process.env.AIRTABLE_SUBMITTED_AT_FIELD) {
      fields[process.env.AIRTABLE_SUBMITTED_AT_FIELD] =
        new Date().toISOString();
    }
    const body = {
      records: [
        {
          fields,
        },
      ],
      typecast: true,
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      let message = "Failed to join the waitlist. Please try again.";
      try {
        const data = await resp.json();
        if (data?.error?.message) message = data.error.message;
      } catch {}
      return Response.json({ ok: false, error: message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { ok: false, error: "Unexpected error. Please try again later." },
      { status: 500 }
    );
  }
}

export default function Home() {
  return (
    <main id="main" className="side-lines">
      <SiteHeader />
      <HeroSection />
      {/* <WhatIsShoja /> */}
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
    <header className="sticky top-4 z-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
          <div className="relative flex items-center gap-6 px-4 py-3">
            <a href="#top" className="group inline-flex items-center gap-2">
              <img
                src="https://shoja.blr1.cdn.digitaloceanspaces.com/public/shoja.svg"
                alt="Shoja"
                className="h-10 w-auto rounded"
              />
              Shoja
            </a>
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <a
                href="#problem"
                className="hover:text-gray-900 dark:hover:text-slate-100"
              >
                Problem
              </a>
              <a
                href="#enables"
                className="hover:text-gray-900 dark:hover:text-slate-100"
              >
                What it enables?
              </a>
              <a
                href="#platform"
                className="hover:text-gray-900 dark:hover:text-slate-100"
              >
                Platform
              </a>
              <a
                href="#why-now"
                className="hover:text-gray-900 dark:hover:text-slate-100"
              >
                Why now
              </a>
            </nav>
            <div className="flex flex-1 items-center justify-end gap-3">
              <a href="#early-access" className="btn-primary">
                Join the waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WhyNow() {
  const reasons = [
    {
      title: "Model capability",
      desc: "Foundation models are ready for autonomous workflows—but organizations need the guardrails and context to deploy them safely.",
    },
    {
      title: "Data gravity",
      desc: "Critical context is trapped in SaaS silos. Unlocking it enables high-quality decision-making and action.",
    },
    {
      title: "New org design",
      desc: "Teams will be composed of humans and agents. Companies need a workspace and operating model to make this real.",
    },
  ];

  return (
    <section
      id="why-now"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 section-divider"
    >
      <div className="rounded-3xl border border-black/10 dark:border-white/10 p-8 shadow-sm dark:bg-[#242229]/50">
        <h2 className="inline-flex items-center justify-center gap-3 text-center text-4xl font-semibold tracking-tight sm:text-5xl dark:text-gray-100">
          Why Now?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-black/10 dark:sm:divide-white/10">
          {reasons.map((r) => (
            <div key={r.title} className="px-0 sm:px-6">
              <p className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-200">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-secondary)] animate-pulse"></span>
                {r.title}
              </p>
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsShoja() {
  return (
    <section id="what" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
      <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl dark:text-gray-100">
        What is Shoja
      </h2>
      <div className="mt-4 mx-auto max-w-3xl space-y-4 text-pretty text-center text-lg leading-7 text-gray-600 dark:text-gray-300">
        <p>
          We’re building a collaboration workspace where AI agents operate as
          autonomous team members alongside humans. Today’s tools treat AI as a
          feature. Shoja is the infrastructure for AI as colleagues.
        </p>
        <p>
          This isn’t a feature or a wrapper—it’s the fundamental infrastructure
          layer for the next generation of work.
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section
      id="problem"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-24 section-divider"
    >
      <div className="flex flex-col items-center gap-10 sm:gap-12">
        <h2 className="mx-auto max-w-3xl text-center text-balance text-4xl font-semibold tracking-tight sm:text-5xl dark:text-gray-100">
          <span className="inline-flex items-center justify-center gap-3">
            Today’s AI Reality / Problems
          </span>
        </h2>
        <div className="w-full">
          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="glass group rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-sm transition-colors hover:shadow-md dark:bg-[#242229]/50">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <IconEye
                    size={24}
                    stroke={2}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </span>
                <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Visibility
                </h5>
              </div>
              <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
                Real-time observability into agent actions, plans, and outputs.
              </p>
            </div>

            <div className="glass group rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-sm transition-colors hover:shadow-md dark:bg-[#242229]/50">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <IconShieldLock
                    size={24}
                    stroke={2}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </span>
                <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Control
                </h5>
              </div>
              <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
                Strong permissioning, review gates, and scoped capabilities per
                agent.
              </p>
            </div>

            <div className="glass group rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-sm transition-colors hover:shadow-md dark:bg-[#242229]/50">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <IconFolders
                    size={24}
                    stroke={2}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </span>
                <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Context
                </h5>
              </div>
              <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
                Unified data layer breaks app silos, giving agents company-wide
                memory.
              </p>
            </div>

            <div className="glass group rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-sm transition-colors hover:shadow-md dark:bg-[#242229]/50">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <IconUsersGroup
                    size={24}
                    stroke={2}
                    className="text-gray-900 dark:text-gray-100"
                  />
                </span>
                <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Scale
                </h5>
              </div>
              <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
                Govern hundreds of agents with audit trails and resource limits.
              </p>
            </div>
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
      desc: "AI agents maintain long-lived memory and context across tasks, projects, and teams.",
      icon: (
        <IconLayoutGrid
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      title: "Human + AI collaboration",
      desc: "Humans can delegate, monitor, and coordinate multiple agents with structured handoffs.",
      icon: (
        <IconUsersGroup
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      title: "Enterprise governance",
      desc: "Organizations control permissions, audit actions, and set resource limits per agent.",
      icon: (
        <IconShieldCheck
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      title: "Autonomous agent-to-agent handoffs",
      desc: "Agents pass work, escalate for review, and chain specialized skills without intervention.",
      icon: (
        <IconArrowsRightLeft
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
  ];
  return (
    <section
      id="enables"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 sm:py-16 section-divider"
    >
      <div className="flex flex-col items-center gap-8 sm:gap-10">
        <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          What the platform enables
        </h2>
        <p className="mx-auto max-w-3xl text-center text-pretty text-lg leading-7 text-gray-600 dark:text-gray-300">
          AI as colleagues—not as a feature. Shoja lets agents and humans share
          context, collaborate safely, and ship work end-to-end.
        </p>
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm transition dark:bg-[#242229]/60"
            >
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center justify-center">
                  {item.icon}
                </span>
                <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h5>
              </div>
              <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
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
      desc: "Companies' data from Slack, Zendesk, GitHub, etc. flows into an owned data lake—breaking SaaS data silos.",
      bullets: [
        "Connectors with row-level governance",
        "High-signal embeddings and RAG-ready indexing",
        "Customer, product, and operational context in one place",
      ],
      gradient: "from-blue-600/20 via-indigo-600/10 to-cyan-400/20",
      icon: (
        <IconDatabase
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      id: "workspace",
      name: "Collaboration Workspace",
      desc: "Humans and AI agents work together with structured handoffs, review gates, and real-time visibility into agent actions.",
      bullets: [
        "Multi-agent rooms and projects",
        "Plans, traces, and explainability built-in",
        "Human-in-the-loop checkpoints where it matters",
      ],
      gradient: "from-fuchsia-500/20 via-pink-500/10 to-violet-500/20",
      icon: (
        <IconLayoutGrid
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      id: "governance",
      name: "Governance Infrastructure",
      desc: "Enterprise-grade controls for permissions, compliance, audit trails, and resource limits per agent.",
      bullets: [
        "Capability-scoped permissions",
        "Environment and data sandboxing",
        "Full audit and policy enforcement",
      ],
      gradient: "from-emerald-500/20 via-teal-500/10 to-lime-500/20",
      icon: (
        <IconShieldCheck
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
    {
      id: "marketplace",
      name: "Agent Marketplace",
      desc: "One-click deploy specialized agents that instantly understand your company's entire context.",
      bullets: [
        "Best-in-class agents across functions",
        "Company-aware from day one",
        "Bring your own models and tools",
      ],
      gradient: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
      icon: (
        <IconShoppingCart
          size={24}
          stroke={2}
          className="text-gray-900 dark:text-gray-100"
        />
      ),
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const activeLayer = stack[activeIndex];

  // Auto-advance through sections
  useEffect(() => {
    if (isPaused) return;
    const ROTATION_MS = 4500;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % stack.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [isPaused, stack.length]);

  return (
    <section
      id="platform"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 section-divider"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl dark:text-gray-100">
          The Platform Stack
        </h2>
        <p className="mt-4 mx-16 px-6 text-pretty text-lg leading-7 text-gray-600 dark:text-gray-300">
          A modular system that meets you where you are—scaling from one agent
          to a company-wide AI workforce.
        </p>
      </div>

      <div
        className="mt-10 grid gap-6 md:grid-cols-5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="md:col-span-2">
          <div className="space-y-3">
            {stack.map((layer, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-selected={isActive}
                  className={
                    "group w-full rounded-2xl border border-black/10 dark:border-white/10 px-4 py-4 text-left transition-colors " +
                    (isActive
                      ? "bg-white/70 dark:bg-[#242229]/60 ring-1 ring-black/5 dark:ring-white/10"
                      : "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]")
                  }
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-semibold " +
                        (isActive
                          ? "bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary)]"
                          : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300")
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        "flex-1 text-base font-semibold " +
                        (isActive
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-gray-700 dark:text-gray-200")
                      }
                    >
                      {layer.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-3">
          <div
            key={activeLayer.id}
            className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 p-8 shadow-sm dark:bg-[#242229]/50 animate-fade-in-up"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div
                className={`absolute -top-10 right-[-10%] h-56 w-56 rounded-full bg-gradient-to-br ${activeLayer.gradient} blur-2xl dark:hidden`}
              />
              <div className="absolute -top-10 right-[-10%] h-56 w-56 rounded-full hidden dark:block bg-white/10 blur-2xl" />
            </div>
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center">
                {activeLayer.icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {activeLayer.name}
                </h3>
                <p className="mt-2 text-lg leading-7 text-gray-600 dark:text-gray-300">
                  {activeLayer.desc}
                </p>
              </div>
            </div>
            <ul className="stagger-children mt-5 list-disc space-y-2 pl-6 text-lg leading-7 text-gray-700 dark:text-gray-300">
              {activeLayer.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden h-dvh">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl dark:text-gray-100">
            <span className="gradient-text">
              Collaboration workspace for AI & Humans
            </span>
          </h1>
          <p className="mt-6 text-pretty text-2xl leading-10 text-gray-600 dark:text-gray-300">
            Shoja is the collaboration workspace for AI agents and humans.
            Agents operate as autonomous teammates (within predefined
            parameters) with shared context, structured handoffs, and enterprise
            governance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      id="early-access"
      className="relative overflow-hidden py-20 section-divider"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background: "var(--brand-secondary)",
            animation: "gradientShift 10s ease-in-out infinite",
          }}
        />
      </div>
      <div className="mx-auto max-w-4xl px-6">
        <div className="glass rounded-3xl border border-black/10 dark:border-white/10 p-8 shadow-sm backdrop-blur">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight dark:text-gray-100">
              Be a founding design partner
            </h3>
            <p className="mt-3 text-pretty text-gray-600 dark:text-gray-300 px-12">
              We’re working with a small group of teams to shape Shoja. Join the
              waitlist and we’ll reach out as we expand access.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-black/10 dark:border-white/10 py-10 section-divider">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="inline-flex items-center gap-2">
          <img
            src="https://shoja.blr1.cdn.digitaloceanspaces.com/public/shoja.svg"
            alt="Shoja"
            className="h-10 w-auto rounded"
          />
          <span className="text-sm font-semibold dark:text-gray-100">
            Shoja
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <a
            href="#platform"
            className="hover:text-gray-900 dark:hover:text-gray-100"
          >
            Platform
          </a>
          <a
            href="mailto:pranav@shoja.ai"
            className="hover:text-gray-900 dark:hover:text-gray-100"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

function WaitlistForm() {
  const actionData = useActionData<{ ok: boolean; error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.ok && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData]);

  return (
    <Form method="post" replace className="mt-6" ref={formRef}>
      <input type="hidden" name="intent" value="join_waitlist" />
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full sm:w-96 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#242229]/60 px-4 py-3 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/60"
        />
        <button
          type="submit"
          className="btn-primary min-w-36"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining..." : "Join the waitlist"}
        </button>
      </div>
      {actionData?.ok && (
        <p className="mt-3 text-green-700 dark:text-green-400 text-sm">
          You're on the list! We'll be in touch soon.
        </p>
      )}
      {actionData && !actionData.ok && actionData.error && (
        <p className="mt-3 text-red-700 dark:text-red-400 text-sm">
          {actionData.error}
        </p>
      )}
    </Form>
  );
}
