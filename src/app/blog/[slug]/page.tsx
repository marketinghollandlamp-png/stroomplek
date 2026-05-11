import Link from "next/link"
import { notFound } from "next/navigation"
import { POSTS, getPost, type BlogBlock } from "@/lib/blog"
import { Arrow } from "@/components/ui/Arrow"
import CTABanner from "@/components/shared/CTABanner"

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Stroomplek`, description: post.excerpt }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric", month: "long", year: "numeric",
  })
}

function Block({ b }: { b: BlogBlock }) {
  switch (b.type) {
    case "h2":
      return <h2 className="post-h2">{b.text}</h2>
    case "h3":
      return <h3 className="post-h3">{b.text}</h3>
    case "p":
      return <p className="post-p">{b.text}</p>
    case "quote":
      return (
        <blockquote className="post-quote">
          <p>{b.text}</p>
          {b.cite && <cite>{b.cite}</cite>}
        </blockquote>
      )
    case "list":
      return (
        <ul className="post-list">
          {b.items?.map((item, i) => (
            <li key={i}><span className="dot" />{item}</li>
          ))}
        </ul>
      )
    case "divider":
      return <div className="post-divider" />
    default:
      return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <>
      <section className="post-hero">
        <div className="post-hero-bg">
          <div className="phb-glow" />
          <div className="phb-grid" />
        </div>
        <div className="container post-hero-inner">
          <Link href="/blog" className="post-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Alle posts
          </Link>
          <div className="post-meta">
            <span className="post-cat">{post.category}</span>
            <span className="post-sep">·</span>
            <span>{formatDate(post.date)}</span>
            <span className="post-sep">·</span>
            <span>{post.readTime} leestijd</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-author">
            <div className="pa-avatar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="var(--copper)" strokeWidth="1.2"/>
                <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="var(--copper)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="pa-name">{post.author}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container post-body">
          <article className="post-content">
            {post.blocks.map((b, i) => <Block key={i} b={b} />)}
          </article>
          <div className="post-footer">
            <div className="pf-line" />
            <div className="pf-row">
              <Link href="/blog" className="btn btn-outline-dark">← Terug naar blog</Link>
              <Link href="/contact" className="btn btn-dark btn-arrow">
                Offerte aanvragen <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
