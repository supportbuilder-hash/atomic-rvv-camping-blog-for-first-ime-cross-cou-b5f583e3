"use client";

import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import Hero from "@/components/blocks/Hero";
import { Section, SectionHeader } from "@/components/blocks/shared";
import StatsBand, { type StatItem } from "@/components/blocks/StatsBand";

type Photo = { src: string; alt: string; caption: string; location: string };

export default function GalleryPage() {
  const t = useTranslations();

  const stats = (Array.isArray(t.raw("galleryPage.stats")) ? t.raw("galleryPage.stats") : []) as StatItem[];
  const photos = (Array.isArray(t.raw("galleryPage.photos")) ? t.raw("galleryPage.photos") : []) as Photo[];

  return (
    <main>
      <Hero
        id="hero"
        variant="mesh"
        eyebrow={t("galleryPage.hero.eyebrow")}
        title={t("galleryPage.hero.title")}
        subtitle={t("galleryPage.hero.subtitle")}
      />

      <StatsBand id="stats" variant="glass" items={stats} />

      <Section id="photo-grid">
        <SectionHeader
          eyebrow={t("galleryPage.hero.eyebrow")}
          title={t("galleryPage.photoGridTitle")}
          subtitle={t("galleryPage.photoGridSubtitle")}
        />
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, i) => (
            <div
              key={photo.src + i}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full object-cover" />
              <div className="bg-foreground/60 p-3 text-xs text-background">
                <p className="font-semibold">{photo.location}</p>
                <p className="mt-0.5 text-background/80">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTA
        id="cta"
        variant="gradient"
        title={t("galleryPage.ctaTitle")}
        subtitle={t("galleryPage.ctaSubtitle")}
        primaryCta={{ label: t("galleryPage.ctaPrimary"), href: "/blog" }}
        secondaryCta={{ label: t("galleryPage.ctaSecondary"), href: "/route" }}
      />
    </main>
  );
}
