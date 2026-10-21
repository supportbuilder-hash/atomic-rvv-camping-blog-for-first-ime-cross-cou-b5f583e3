"use client";

import { useTranslations } from "next-intl";
import FAQ, { type FAQItem } from "@/components/blocks/FAQ";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import { BlockImg, Section, SectionHeader } from "@/components/blocks/shared";

export default function GearRigPage() {
  const t = useTranslations();

  const specItems = (
    Array.isArray(t.raw("gearRigPage.specs.items")) ? t.raw("gearRigPage.specs.items") : []
  ) as FeatureItem[];
  const gearItems = (
    Array.isArray(t.raw("gearRigPage.gearList.items")) ? t.raw("gearRigPage.gearList.items") : []
  ) as FeatureItem[];
  const faqItems = (
    Array.isArray(t.raw("gearRigPage.faq.items")) ? t.raw("gearRigPage.faq.items") : []
  ) as FAQItem[];

  return (
    <main>
      <Hero
        id="hero"
        variant="mesh"
        eyebrow={t("gearRigPage.hero.eyebrow")}
        title={t("gearRigPage.hero.title")}
        subtitle={t("gearRigPage.hero.subtitle")}
        image={{
          src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/960b11853f0a4762b13168a89783de97.jpg",
          alt: "Ford F350 towing the MGC 16 XTC off-grid camper",
        }}
      />

      <Section id="rig-overview">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <BlockImg
            image={{
              src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/df52e0420d9840a1a036683e16f1d1da.jpg",
              alt: "MGC 16 XTC off-grid camper at a desert campsite",
            }}
            className="rounded-2xl object-cover w-full h-full"
          />
          <div>
            <SectionHeader
              align="left"
              eyebrow={t("gearRigPage.rigOverview.eyebrow")}
              title={t("gearRigPage.rigOverview.title")}
              className="mb-0"
            />
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("gearRigPage.rigOverview.paragraph1")}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("gearRigPage.rigOverview.paragraph2")}
            </p>
          </div>
        </div>
      </Section>

      <FeatureGrid
        id="specs"
        variant="glass"
        columns={3}
        eyebrow={t("gearRigPage.specs.eyebrow")}
        title={t("gearRigPage.specs.title")}
        subtitle={t("gearRigPage.specs.subtitle")}
        items={specItems}
      />

      <FeatureGrid
        id="gear-list"
        variant="cards"
        columns={3}
        eyebrow={t("gearRigPage.gearList.eyebrow")}
        title={t("gearRigPage.gearList.title")}
        subtitle={t("gearRigPage.gearList.subtitle")}
        items={gearItems}
      />

      <FAQ
        id="faq"
        variant="simple"
        eyebrow={t("gearRigPage.faq.eyebrow")}
        title={t("gearRigPage.faq.title")}
        subtitle={t("gearRigPage.faq.subtitle")}
        items={faqItems}
      />
    </main>
  );
}
