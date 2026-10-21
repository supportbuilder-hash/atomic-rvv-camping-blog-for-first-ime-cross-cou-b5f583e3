"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, Clock, Activity, Circle, ChevronDown, Star, Layout, Sparkles } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Stop = {
  id: string;
  name: string;
  state: string;
  dateLabel: string;
  nights: string;
  miles: string;
  description: string;
  highlights: string[];
};

type HeroStat = { label: string; value: string };

// Layout-only coordinates for the illustrated route map (not translatable copy).
const STOP_POSITIONS: { x: number; y: number }[] = [
  { x: 12, y: 18 },
  { x: 27, y: 14 },
  { x: 41, y: 28 },
  { x: 53, y: 42 },
  { x: 69, y: 58 },
  { x: 86, y: 80 },
];

export default function RoutePage() {
  const t = useTranslations();

  const stops = (Array.isArray(t.raw("routeMap.stops")) ? t.raw("routeMap.stops") : []) as Stop[];
  const heroStats = (Array.isArray(t.raw("routeMap.hero.stats")) ? t.raw("routeMap.hero.stats") : []) as HeroStat[];

  const firstId = stops[0]?.id ?? "";
  const [activeId, setActiveId] = useState<string>(firstId);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    firstId ? { [firstId]: true } : {}
  );

  const selectStop = (id: string) => {
    setActiveId(id);
    setExpanded((prev) => ({ ...prev, [id]: true }));
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveId(id);
  };

  const stopsWithPos = stops.map((s, i) => ({
    ...s,
    pos: STOP_POSITIONS[i] ?? { x: 50, y: 50 },
  }));

  const pathPoints = stopsWithPos.map((s) => `${s.pos.x},${s.pos.y}`).join(" ");

  return (
    <main className="bg-background text-foreground">
      {/* Hero / trip overview banner */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>{t("routeMap.hero.eyebrow")}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold tracking-tight md:text-6xl">
              {t("routeMap.hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("routeMap.hero.subtitle")}
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="glass rounded-xl border border-border p-5"
                >
                  <div className="flex items-center gap-2 text-primary">
                    {i === 0 && <Layout className="h-4 w-4" aria-hidden="true" />}
                    {i === 1 && <Clock className="h-4 w-4" aria-hidden="true" />}
                    {i === 2 && <Activity className="h-4 w-4" aria-hidden="true" />}
                    {i === 3 && <Calendar className="h-4 w-4" aria-hidden="true" />}
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Interactive illustrated route map */}
      <Reveal>
        <section id="interactive-map" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("routeMap.map.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("routeMap.map.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("routeMap.map.subtitle")}
              </p>
            </div>

            <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-mesh shadow-glow sm:aspect-[16/9]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-primary/50"
                aria-hidden="true"
              >
                <polyline
                  points={pathPoints}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {stopsWithPos.map((stop, i) => (
                <motion.button
                  key={stop.id}
                  type="button"
                  onClick={() => selectStop(stop.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                  style={{ left: `${stop.pos.x}%`, top: `${stop.pos.y}%` }}
                  aria-label={`${stop.name}, ${stop.state}`}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-glow transition-colors duration-300",
                      activeId === stop.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground group-hover:bg-accent"
                    )}
                  >
                    <Circle className="h-3 w-3 fill-current" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[9rem] -translate-x-1/2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-card-foreground shadow-glow transition-opacity duration-300",
                      activeId === stop.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    {i + 1}. {stop.name}
                  </span>
                </motion.button>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {t("routeMap.map.hint")}
            </p>
          </div>
        </section>
      </Reveal>

      {/* Itinerary timeline */}
      <Reveal>
        <section id="itinerary-timeline" className="bg-secondary/40 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("routeMap.timeline.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("routeMap.timeline.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("routeMap.timeline.subtitle")}
              </p>
            </div>

            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative mt-12 space-y-8 border-l border-border pl-8"
            >
              {stops.map((stop, i) => (
                <motion.li key={stop.id} variants={fadeInUp} className="relative">
                  <button
                    type="button"
                    onClick={() => selectStop(stop.id)}
                    className={cn(
                      "absolute -left-[2.35rem] flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-xs font-semibold transition-colors duration-300 focus-visible:outline-none",
                      activeId === stop.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-accent"
                    )}
                    aria-label={stop.name}
                  >
                    {i + 1}
                  </button>
                  <div
                    className={cn(
                      "rounded-xl border border-border p-5 transition-colors duration-300",
                      activeId === stop.id ? "bg-card shadow-glow" : "bg-card/60"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {stop.dateLabel}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {stop.nights}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{stop.miles}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                      {stop.name}, {stop.state}
                    </h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                      {stop.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>
      </Reveal>

      {/* Expandable stop-detail cards */}
      <Reveal>
        <section id="stop-details" className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("routeMap.stopDetails.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("routeMap.stopDetails.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("routeMap.stopDetails.subtitle")}
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {stops.map((stop) => {
                const isOpen = !!expanded[stop.id];
                return (
                  <div
                    key={stop.id}
                    className={cn(
                      "overflow-hidden rounded-xl border border-border transition-colors duration-300",
                      activeId === stop.id ? "bg-card shadow-glow" : "bg-card/60"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpanded(stop.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none"
                    >
                      <span>
                        <span className="font-display text-lg font-semibold tracking-tight">
                          {stop.name}, {stop.state}
                        </span>
                        <span className="ml-3 text-sm text-muted-foreground">{stop.dateLabel}</span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border px-5 pb-5 pt-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {t("routeMap.stopDetails.highlightsLabel")}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {stop.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                              <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}