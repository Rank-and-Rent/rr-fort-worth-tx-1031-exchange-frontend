'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/data/types";

type Props = {
  posts: BlogPost[];
};

export default function BlogIndex({ posts }: Props) {
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setPostsPerPage(media.matches ? 6 : 3);
      setPage(1);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

  const paginated = useMemo(() => {
    const start = (page - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  }, [page, posts, postsPerPage]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {paginated.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-outline/60 bg-panel p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{post.category}</p>
            <h3 className="mt-2 text-2xl font-semibold text-heading">{post.title}</h3>
            <p className="mt-1 text-sm text-ink/80">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US")}</span>
              <span>{post.readingTime} min read</span>
            </div>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
              Read article
            </Link>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-ink/70">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="rounded-full border border-outline px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          type="button"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="rounded-full border border-outline px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

