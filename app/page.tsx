"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Activity, AlertTriangle, Heart, Star, Mail, Check } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type Stat = { value: string; label: string };
type Post = { title: string; excerpt: string; tag: string; href: string; image: string; alt: string };
type ValueItem = { icon: string; title: string; description: string };
type Note = { quote: string; name: string; role: string };

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  alert: AlertTriangle,
  heart: Heart,
  star: Star,
};

export default function HomePage() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  const stats = (Array.isArray(t.raw("home.stats.items")) ? t.raw("home.stats.items") : []) as Stat[];
  const posts = (Array.isArray(t.raw("home.featured.posts")) ? t.raw("home.featured.posts") : []) as Post[];
  const values = (Array.isArray(t.raw("home.values.items")) ? t.raw("home.values.items") : []) as ValueItem[];
  const notes = (Array.isArray(t.raw("home.notes.items")) ? t.raw("home.notes.items") : []) as Note[];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.email.includes("@")) {
      setError(t("home.cta.errorMessage"));
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <main>
      {/* HERO */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-display font-semibold tracking-tight text-foreground md:text-6xl">
                {t("home.hero.titlePrefix")}{" "}
                <span className="text-gradient">{t("home.hero.titleAccent")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/route"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-strong rounded-2xl p-3 shadow-glow"
            >
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b3092727fedd4c0fa06b38d985a7fd47.jpg"
                alt={t("home.hero.imageAlt")}
                className="h-full w-full rounded-xl object-cover"
                style={{ aspectRatio: "4 / 3" }}
              />
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* TRIP SNAPSHOT / STATS */}
      <Reveal>
        <section id="trip" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("home.stats.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("home.stats.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="surface-elevated rounded-xl border border-border bg-card px-4 py-6 text-center transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
                >
                  <div className="text-2xl font-display font-semibold text-gradient md:text-3xl">{s.value}</div>
                  <div className="mt-2 text-xs leading-snug text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* FEATURED POSTS */}
      <Reveal>
        <section id="latest" className="bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <span className="text-sm font-medium uppercase tracking-wide text-primary">
                  {t("home.featured.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                  {t("home.featured.title")}
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {t("home.featured.subtitle")}
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
              >
                {t("home.featured.title") && t("home.hero.primaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {posts.map((post, i) => (
                <motion.div key={post.href + i} variants={fadeInUp}>
                  <Link
                    href={post.href}
                    className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.alt}
                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {post.tag}
                      </span>
                      <h3 className="mt-4 text-lg font-display font-semibold leading-snug text-card-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* LESSONS / VALUES - bento grid */}
      <Reveal>
        <section id="learned" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-wide text-primary">
                {t("home.values.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("home.values.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("home.values.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
            >
              {values.map((item, i) => {
                const Icon = ICONS[item.icon] ?? Star;
                const spanClass = i === 0 || i === 3 ? "sm:col-span-2" : "sm:col-span-1";
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className={`glass rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none ${spanClass}`}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-display font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* TRAIL NOTES / QUOTES */}
      <Reveal>
        <section id="notes" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-wide text-primary">
                {t("home.notes.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("home.notes.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("home.notes.subtitle")}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {notes.map((note, i) => (
                <Reveal key={note.name + i} delay={i * 0.08}>
                  <figure
                    className={`h-full rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] ${
                      i === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <blockquote className="text-sm leading-relaxed text-card-foreground">
                      &ldquo;{note.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-foreground">
                      {note.name}
                      <span className="block text-xs font-normal text-muted-foreground">{note.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA / CONTACT-SUBSCRIBE */}
      <Reveal>
        <section id="contact" className="relative overflow-hidden bg-gradient-brand">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("home.cta.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance text-3xl font-display font-semibold tracking-tight text-primary-foreground md:text-4xl">
                {t("home.cta.title")}
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
                {t("home.cta.subtitle")}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-start gap-3 py-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {t("home.cta.successTitle")}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("home.cta.successMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="rvv-name" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("home.cta.nameLabel")}
                    </label>
                    <input
                      id="rvv-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={t("home.cta.namePlaceholder")}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="rvv-email" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("home.cta.emailLabel")}
                    </label>
                    <input
                      id="rvv-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder={t("home.cta.emailPlaceholder")}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="rvv-message" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("home.cta.messageLabel")}
                    </label>
                    <textarea
                      id="rvv-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder={t("home.cta.messagePlaceholder")}
                      className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                  </div>
                  {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {t("home.cta.submitLabel")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="text-center text-xs text-muted-foreground">{t("home.cta.privacyNote")}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}