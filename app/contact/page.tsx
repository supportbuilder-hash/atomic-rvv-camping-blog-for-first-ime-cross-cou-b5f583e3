"use client";

import { useTranslations } from "next-intl";
import { Camera as Instagram, Play as Youtube, Mail, MessageCircle } from 'lucide-react';
import Hero from "@/components/blocks/Hero";
import ContactForm, { type ContactFormData, type ContactDetail } from "@/components/blocks/ContactForm";
import FeatureGrid, { type FeatureItem } from "@/components/blocks/FeatureGrid";

const SOCIAL_ICONS = [Instagram, Youtube, Mail, MessageCircle];

export default function ContactPage() {
  const t = useTranslations();

  const details = (Array.isArray(t.raw("contactPage.form.details")) ? t.raw("contactPage.form.details") : []) as ContactDetail[];
  const socialItemsRaw = t.raw("contactPage.social.items");
  const socialItems = (Array.isArray(socialItemsRaw) ? socialItemsRaw : []) as FeatureItem[];

  const socialFeatureItems: FeatureItem[] = socialItems.map((item, i) => {
    const Icon = SOCIAL_ICONS[i % SOCIAL_ICONS.length];
    return {
      ...item,
      icon: (
        <span className="h-6 w-6">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      ),
    };
  });

  const handleSubmit = async (_data: ContactFormData): Promise<void> => {
    // No backend is wired up yet; simulate a successful submission.
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <main>
      <Hero
        id="hero"
        variant="mesh"
        eyebrow={t("contactPage.hero.eyebrow")}
        title={t("contactPage.hero.title")}
        subtitle={t("contactPage.hero.subtitle")}
      />

      <ContactForm
        id="contact-form"
        variant="split"
        eyebrow={t("contactPage.form.eyebrow")}
        title={t("contactPage.form.title")}
        subtitle={t("contactPage.form.subtitle")}
        nameLabel={t("contactPage.form.nameLabel")}
        emailLabel={t("contactPage.form.emailLabel")}
        messageLabel={t("contactPage.form.messageLabel")}
        submitLabel={t("contactPage.form.submitLabel")}
        successMessage={t("contactPage.form.successMessage")}
        errorMessage={t("contactPage.form.errorMessage")}
        details={details}
        onSubmit={handleSubmit}
      />

      <FeatureGrid
        id="social"
        variant="glass"
        columns={4}
        eyebrow={t("contactPage.social.eyebrow")}
        title={t("contactPage.social.title")}
        subtitle={t("contactPage.social.subtitle")}
        items={socialFeatureItems}
      />
    </main>
  );
}
