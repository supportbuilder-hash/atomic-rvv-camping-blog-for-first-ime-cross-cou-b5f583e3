"use client";

import { useTranslations } from "next-intl";
import FAQ, { type FAQItem } from "@/components/blocks/FAQ";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import Pricing, { type PricingPlan } from "@/components/blocks/Pricing";

type RawPlan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
};

export default function SupportPage() {
  const t = useTranslations();

  const rawPlans = Array.isArray(t.raw("supportPage.plans.plans"))
    ? (t.raw("supportPage.plans.plans") as RawPlan[])
    : [];

  const plans: PricingPlan[] = rawPlans.map((plan) => ({
    name: plan.name,
    price: plan.price,
    period: plan.period,
    description: plan.description,
    features: Array.isArray(plan.features) ? plan.features : [],
    highlighted: plan.highlighted,
    badge: plan.badge,
    cta: { label: plan.ctaLabel ?? "Support", href: "/contact" },
  }));

  const whyItems = (Array.isArray(t.raw("supportPage.why.items")) ? t.raw("supportPage.why.items") : []) as FeatureItem[];
  const faqItems = (Array.isArray(t.raw("supportPage.faq.items")) ? t.raw("supportPage.faq.items") : []) as FAQItem[];

  return (
    <main>
      <Hero
        id="hero"
        variant="mesh"
        eyebrow={t("supportPage.hero.eyebrow")}
        title={t("supportPage.hero.title")}
        subtitle={t("supportPage.hero.subtitle")}
      />

      <Pricing
        id="plans"
        variant="glass"
        eyebrow={t("supportPage.plans.eyebrow")}
        title={t("supportPage.plans.title")}
        subtitle={t("supportPage.plans.subtitle")}
        plans={plans}
      />

      <FeatureGrid
        id="why"
        variant="cards"
        columns={2}
        eyebrow={t("supportPage.why.eyebrow")}
        title={t("supportPage.why.title")}
        subtitle={t("supportPage.why.subtitle")}
        items={whyItems}
      />

      <FAQ
        id="faq"
        variant="card"
        eyebrow={t("supportPage.faq.eyebrow")}
        title={t("supportPage.faq.title")}
        subtitle={t("supportPage.faq.subtitle")}
        items={faqItems}
      />
    </main>
  );
}
