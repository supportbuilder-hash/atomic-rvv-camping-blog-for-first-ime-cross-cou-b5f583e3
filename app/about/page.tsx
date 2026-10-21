"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Sparkles, Activity, Star, ArrowRight, Mail, MapPin as PinIcon, Quote } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

type MissionValue = {
  title: string;
  description: string;
};

const TEAM_IMAGES: string[] = [
  "/images/woman-smiling-portrait-outdoors-sunset.jpg",
  "/images/man-smiling-portrait-camper-van-door.jpg",
  "/images/australian-shepherd-dog-camping-chair.jpg",
];

const MISSION_ICONS = [Heart, Sparkles, Activity, Star];

export default function AboutPage() {
  const t = useTranslations();

  const teamRaw = t.raw("about.team.members");
  const team: TeamMember[] = (Array.isArray(teamRaw) ? teamRaw : []).map((m: Omit<TeamMember, "image">, i: number) => ({
    ...m,
    image: TEAM_IMAGES[i] ?? TEAM_IMAGES[0],
  }));

  const valuesRaw = t.raw("about.mission.values");
  const values: MissionValue[] = Array.isArray(valuesRaw) ? valuesRaw : [];

  return (
    <main>
      {/* HERO */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              <PinIcon className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("about.hero.eyebrow")}
            </motion.span>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight md:text-6xl">
              <span className="text-gradient">{t("about.hero.titleAccent")}</span> {t("about.hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("about.hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
              >
                {t("about.hero.primaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/route"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
              >
                {t("about.hero.secondaryCta")}
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-5xl px-6">
            <div className="glass-strong overflow-hidden rounded-2xl border border-border shadow-glow">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/513f9d5db6504a379a2211f0e548c3d0.jpg"
                alt="A Ford F350 towing an MGC 16 XTC off-grid camper on a highway at sunset"
                className="h-72 w-full object-cover md:h-[26rem]"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* STORY */}
      <Reveal>
        <section id="story" className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.story.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("about.story.title")}
              </h2>
              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
                <p>{t("about.story.paragraph1")}</p>
                <p>{t("about.story.paragraph2")}</p>
                <p>{t("about.story.paragraph3")}</p>
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-card p-4 surface-elevated">
                <Quote className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm italic-none font-medium leading-relaxed text-foreground">
                  {t("about.story.pullQuote")}
                </p>
              </div>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl border border-border shadow-glow md:order-2">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/9b939d35b9ef48a38c88b5ab21e48374.jpg"
                alt="A couple cooking dinner inside their MGC 16 XTC off-grid camper"
                className="h-80 w-full object-cover md:h-[30rem]"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* TEAM */}
      <Reveal>
        <section id="team" className="bg-secondary/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.team.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("about.team.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{t("about.team.subtitle")}</p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 grid gap-8 md:grid-cols-3"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="surface-elevated overflow-hidden rounded-2xl border border-border bg-card shadow-glow"
                >
                  <img src={member.image} alt={member.name} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* MISSION */}
      <Reveal>
        <section id="mission" className="relative overflow-hidden bg-mesh py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("about.mission.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("about.mission.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{t("about.mission.subtitle")}</p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 grid gap-6 sm:grid-cols-2"
            >
              {values.map((value, i) => {
                const Icon = MISSION_ICONS[i % MISSION_ICONS.length] ?? Heart;
                return (
                  <motion.div
                    key={value.title}
                    variants={fadeInUp}
                    className="glass flex gap-4 rounded-2xl border border-border p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section id="cta" className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="bg-gradient-brand relative overflow-hidden rounded-2xl px-8 py-14 text-center shadow-glow md:px-16 md:py-20">
              <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
                {t("about.cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
                {t("about.cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                >
                  {t("about.cta.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#contact"
                  className="glass inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {t("about.cta.secondaryCta")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}