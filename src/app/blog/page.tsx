import Link from "next/link"
import { POSTS } from "@/lib/blog"
import { Arrow } from "@/components/ui/Arrow"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric", month: "long", year: "numeric",
  })
}

export const metadata = {
  title: "Blog — Stroomplek",
  description: "Verhalen, inzichten en updates van het Stroomplek-team.",
}

export default function BlogIndex() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div className="eyebrow dark">
                <span style={{ color: "var(--copper)" }}>↳</span>Blog
              </div>
              <h1 style={{ marginTop: 20 }}>Verhalen &amp; updates.</h1>
            </div>
            <p className="lede" style={{ color: "rgba(245,245,245,.7)" }}>
              Hoe Stroomplek is ontstaan, wat we bouwen en waarom detail ertoe doet.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          {POSTS.length === 0 ? (
            <p style={{ color: "var(--ink-mute)" }}>Nog geen posts gepubliceerd.</p>
          ) : (
            <div className="blog-list">
              {POSTS.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="bc-meta">
                    <span className="bc-cat">{post.category}</span>
                    <span className="bc-dot" />
                    <span className="bc-date">{formatDate(post.date)}</span>
                    <span className="bc-dot" />
                    <span className="bc-read">{post.readTime}</span>
                  </div>
                  <h2 className="bc-title">{post.title}</h2>
                  <p className="bc-excerpt">{post.excerpt}</p>
                  <span className="bc-cta">
                    Lees verder <Arrow size={13} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
