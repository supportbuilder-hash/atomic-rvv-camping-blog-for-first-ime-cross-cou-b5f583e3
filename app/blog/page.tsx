"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Tag, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, Compass } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  published: boolean;
};

type HeroStat = { value: string; label: string };

const POSTS_PER_PAGE = 4;

export default function BlogArchivePage() {
  const t = useTranslations();

  const rawPosts = t.raw("blogArchive.postGrid.posts");
  const POSTS: BlogPost[] = Array.isArray(rawPosts) ? (rawPosts as BlogPost[]) : [];

  const rawStats = t.raw("blogArchive.hero.stats");
  const HERO_STATS: HeroStat[] = Array.isArray(rawStats) ? (rawStats as HeroStat[]) : [];

  const categories = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [search, activeCategory, POSTS]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);
  const gridKey = `${activeCategory}-${search}-${safePage}`;

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Compass className="h-4 w-4" aria-hidden="true" />
                {t("blogArchive.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-4xl font-display font-semibold tracking-tight text-balance md:text-6xl">
                <span className="text-gradient">{t("blogArchive.hero.title")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("blogArchive.hero.subtitle")}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-10">
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="glass rounded-2xl px-5 py-4">
                  <div className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Search + filter */}
      <Reveal>
        <section id="search-filter" className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <label htmlFor="blog-search" className="sr-only">
                  {t("blogArchive.search.inputLabel")}
                </label>
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="blog-search"
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t("blogArchive.search.inputPlaceholder")}
                  className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div
                role="group"
                aria-label={t("blogArchive.search.filterLabel")}
                className="flex flex-wrap items-center gap-2 overflow-x-auto"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    aria-pressed={activeCategory === category}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeCategory === category
                        ? "border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-background text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {category === "All" ? t("blogArchive.search.allLabel") : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Post grid */}
      <Reveal>
        <section id="post-grid" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {t("blogArchive.postGrid.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-display font-semibold tracking-tight text-balance md:text-4xl">
              {t("blogArchive.postGrid.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("blogArchive.postGrid.subtitle")}
            </p>
          </div>

          {paginated.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
              <Tag className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-display font-semibold tracking-tight">
                {t("blogArchive.search.noResultsTitle")}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("blogArchive.search.noResultsBody")}
              </p>
            </div>
          ) : (
            <motion.div
              key={gridKey}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {paginated.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInUp}
                  className="surface-elevated flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {post.category}
                    </span>
                    {!post.published && (
                      <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                        {t("blogArchive.postGrid.comingSoon")}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-display font-semibold tracking-tight text-balance">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="mt-5">
                      {post.published ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-300 hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          {t("blogArchive.postGrid.readMore")}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                          {t("blogArchive.postGrid.comingSoon")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>
      </Reveal>

      {/* Pagination */}
      <Reveal>
        <section id="pagination" className="border-t border-border bg-card/40">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t("blogArchive.pagination.summary", {
                shown: paginated.length,
                total: filtered.length,
              })}
            </p>
            <nav aria-label={t("blogArchive.pagination.navLabel")} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label={t("blogArchive.pagination.prevLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  aria-current={safePage === num ? "page" : undefined}
                  aria-label={t("blogArchive.pagination.pageLabel", { page: num })}
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    safePage === num
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "border border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label={t("blogArchive.pagination.nextLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </section>
      </Reveal>
    </main>
  );
}