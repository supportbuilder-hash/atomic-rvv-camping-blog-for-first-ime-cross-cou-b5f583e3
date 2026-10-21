"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Tag, X, ChevronLeft, ChevronRight, MessageCircle, Send } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ContentSection = { heading: string; body: string; image?: string; imageAlt?: string };
type GalleryItem = { src: string; alt: string; caption: string };
type RelatedPost = { title: string; excerpt: string; image: string; category: string; href: string };
type Comment = { id: string; name: string; date: string; text: string };

export default function FirstStopBadlandsPage() {
  const t = useTranslations();

  const sections = (
    Array.isArray(t.raw("blogPostBadlands.content.sections")) ? t.raw("blogPostBadlands.content.sections") : []
  ) as ContentSection[];

  const galleryItems = (
    Array.isArray(t.raw("blogPostBadlands.gallery.items")) ? t.raw("blogPostBadlands.gallery.items") : []
  ) as GalleryItem[];

  const relatedPosts = (
    Array.isArray(t.raw("blogPostBadlands.related.items")) ? t.raw("blogPostBadlands.related.items") : []
  ) as RelatedPost[];

  const initialComments = (
    Array.isArray(t.raw("blogPostBadlands.comments.items")) ? t.raw("blogPostBadlands.comments.items") : []
  ) as Comment[];

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryItems.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, galleryItems.length]);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyName.trim() || !replyMessage.trim()) return;
    const newComment: Comment = {
      id: `local-${comments.length + 1}`,
      name: replyName.trim(),
      date: t("blogPostBadlands.comments.justNow"),
      text: replyMessage.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setReplyName("");
    setReplyMessage("");
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <Reveal id="hero">
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground">
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                {t("blogPostBadlands.hero.category")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {t("blogPostBadlands.hero.date")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {t("blogPostBadlands.hero.readTime")}
              </span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              <span className="text-gradient">{t("blogPostBadlands.hero.title")}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80">
              {t("blogPostBadlands.hero.subtitle")}
            </p>
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {t("blogPostBadlands.hero.author")}
            </p>
          </div>
          <div className="mx-auto max-w-5xl px-6 pb-16">
            <div className="overflow-hidden rounded-2xl ring-1 ring-border shadow-glow">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/82716ca4a0e44141bc8516a9aa2c23e2.jpg"
                alt={t("blogPostBadlands.hero.imageAlt")}
                className="h-[320px] w-full object-cover md:h-[460px]"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* POST CONTENT */}
      <Reveal id="post-content">
        <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <p className="text-pretty text-lg leading-relaxed text-foreground/90">
            {t("blogPostBadlands.content.intro")}
          </p>
          <div className="mt-10 space-y-12">
            {sections.map((block, i) => (
              <article key={i}>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{block.heading}</h2>
                <p className="mt-4 text-pretty leading-relaxed text-foreground/80">{block.body}</p>
                {block.image ? (
                  <figure className="mt-6">
                    <div className="overflow-hidden rounded-2xl ring-1 ring-border surface-elevated">
                      <img
                        src={block.image}
                        alt={block.imageAlt ?? block.heading}
                        className="h-[260px] w-full object-cover md:h-[380px]"
                      />
                    </div>
                  </figure>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* PHOTO GALLERY */}
      <Reveal id="photo-gallery">
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("blogPostBadlands.gallery.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {t("blogPostBadlands.gallery.title")}
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              {galleryItems.map((item, i) => (
                <motion.button
                  key={item.src + i}
                  type="button"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative overflow-hidden rounded-xl ring-1 ring-border transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={item.caption}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-40 w-full object-cover transition duration-300 group-hover:scale-105 md:h-48"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-background/80 px-3 py-2 text-left text-xs font-medium text-foreground backdrop-blur-sm">
                    {item.caption}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryItems[lightboxIndex] ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={galleryItems[lightboxIndex].caption}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                className="max-h-[75vh] w-full rounded-2xl object-cover ring-1 ring-border"
              />
              <p className="mt-3 text-center text-sm font-medium text-foreground/80">
                {galleryItems[lightboxIndex].caption}
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-4 -right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                aria-label={t("blogPostBadlands.gallery.close")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length))
                }
                className="absolute top-1/2 left-2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-border transition hover:bg-background"
                aria-label={t("blogPostBadlands.gallery.previous")}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryItems.length))}
                className="absolute top-1/2 right-2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-border transition hover:bg-background"
                aria-label={t("blogPostBadlands.gallery.next")}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* RELATED POSTS */}
      <Reveal id="related-posts">
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("blogPostBadlands.related.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {t("blogPostBadlands.related.title")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5"
            >
              {t("blogPostBadlands.related.viewAll")}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post, i) => (
              <Reveal key={post.title + i} delay={i * 0.08}>
                <Link
                  href={post.href}
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold tracking-tight text-card-foreground">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* COMMENTS */}
      <Reveal id="comment-section">
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t("blogPostBadlands.comments.title", { count: comments.length })}
              </h2>
            </div>

            <ul className="mt-8 space-y-6">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                    aria-hidden="true"
                  >
                    {initials(comment.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="font-semibold text-card-foreground">{comment.name}</p>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="mt-1.5 text-pretty leading-relaxed text-muted-foreground">{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <form
              onSubmit={handleReplySubmit}
              className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
            >
              <h3 className="text-lg font-bold tracking-tight text-card-foreground">
                {t("blogPostBadlands.comments.replyTitle")}
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="reply-name" className="block text-sm font-medium text-card-foreground">
                    {t("blogPostBadlands.comments.nameLabel")}
                  </label>
                  <input
                    id="reply-name"
                    type="text"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    required
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={t("blogPostBadlands.comments.namePlaceholder")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="reply-message" className="block text-sm font-medium text-card-foreground">
                    {t("blogPostBadlands.comments.messageLabel")}
                  </label>
                  <textarea
                    id="reply-message"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    required
                    rows={4}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={t("blogPostBadlands.comments.messagePlaceholder")}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {t("blogPostBadlands.comments.submitLabel")}
                </button>
                {submitted ? (
                  <span className="text-sm font-medium text-primary">
                    {t("blogPostBadlands.comments.successMessage")}
                  </span>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </Reveal>
    </main>
  );
}