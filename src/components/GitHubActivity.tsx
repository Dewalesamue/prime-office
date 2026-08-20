import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────
interface GitHubStats {
  totalStars: number
  totalRepos: number
  followers: number
  topLanguages: { name: string; percent: number; color: string }[]
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  totalContributions: number
}

// ── Language colours ──────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89E051',
  Vue: '#41B883',
  SCSS: '#C6538C',
  MDX: '#FCB32C',
  Other: '#888',
}

// ── Animated counter ──────────────────────────────────────────────────────
const CountUp: React.FC<{
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}> = ({ target, duration = 1.6, suffix = '', prefix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(
    count,
    (v) => prefix + Math.round(v).toLocaleString() + suffix
  )

  useEffect(() => {
    if (!isInView || target === 0) return
    const controls = animate(count, target, { duration, ease: 'easeOut' })
    return controls.stop
  }, [isInView, target, duration, count, prefix])

  return <motion.span ref={ref}>{target === 0 ? prefix + '0' + suffix : rounded}</motion.span>
}

// ── Skeleton loader ───────────────────────────────────────────────────────
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    className={`bg-[#D7E2EA]/10 rounded-xl ${className}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  />
)

// ── Main component ────────────────────────────────────────────────────────
const GitHubActivity: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [streak, setStreak] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // ── 1. GitHub REST API — user + repos ──
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Dewalesamue', {
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch('https://api.github.com/users/Dewalesamue/repos?per_page=100&type=owner', {
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user = await userRes.json()
        const repos: any[] = await reposRes.json()

        // Stars
        const totalStars = repos.reduce(
          (acc, r) => acc + (r.stargazers_count || 0),
          0
        )

        // Top languages by repo count
        const langMap: Record<string, number> = {}
        repos.forEach((r) => {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1
        })
        const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / total) * 100),
            color: LANG_COLORS[name] || LANG_COLORS.Other,
          }))

        setStats({
          totalStars,
          totalRepos: user.public_repos ?? repos.length,
          followers: user.followers ?? 0,
          topLanguages,
        })

        // ── 2. Streak via streak-stats.demolab.com JSON endpoint ──
        // This service computes the real streak from the contribution graph
        const streakRes = await fetch(
          'https://streak-stats.demolab.com/?user=Dewalesamue&type=json'
        )

        if (streakRes.ok) {
          const raw = await streakRes.json()
          setStreak({
            currentStreak: raw?.currentStreak?.length ?? 0,
            longestStreak: raw?.longestStreak?.length ?? 0,
            totalContributions: raw?.totalContributions ?? 0,
          })
        } else {
          // Fallback — compute from events API
          const eventsRes = await fetch(
            'https://api.github.com/users/Dewalesamue/events?per_page=100',
            { headers: { Accept: 'application/vnd.github+json' } }
          )
          const events: any[] = eventsRes.ok ? await eventsRes.json() : []

          const pushDates = [
            ...new Set(
              events
                .filter((e) => e.type === 'PushEvent')
                .map((e) => new Date(e.created_at).toDateString())
            ),
          ]
            .map((d) => new Date(d))
            .sort((a, b) => b.getTime() - a.getTime())

          let curr = 0
          let best = 0
          let run = 0
          const now = new Date()
          now.setHours(0, 0, 0, 0)

          for (let i = 0; i < pushDates.length; i++) {
            const d = new Date(pushDates[i])
            d.setHours(0, 0, 0, 0)
            if (i === 0) {
              const diff = Math.round((now.getTime() - d.getTime()) / 86400000)
              if (diff <= 1) { run = 1; curr = 1 } else break
            } else {
              const prev = new Date(pushDates[i - 1])
              prev.setHours(0, 0, 0, 0)
              const gap = Math.round((prev.getTime() - d.getTime()) / 86400000)
              if (gap === 1) { run++; if (i < 60) curr = run }
              else { best = Math.max(best, run); run = 1 }
            }
          }
          best = Math.max(best, run)

          setStreak({
            currentStreak: curr,
            longestStreak: best,
            totalContributions: events.filter((e) => e.type === 'PushEvent').length * 3,
          })
        }
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  // ── Stagger animation ──
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  // ── Loading skeletons ──
  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-36 sm:h-44" />
          <Skeleton className="h-36 sm:h-44" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-24" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full rounded-2xl border border-[#D7E2EA]/10 p-6 text-center">
        <p className="text-[#D7E2EA] opacity-40 text-sm">
          Unable to load GitHub data. Check your connection.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full flex flex-col gap-3 sm:gap-4"
    >
      {/* ── Row 1: Streak cards ── */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Current streak */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl
                        border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03]
                        p-5 sm:p-7 flex flex-col justify-between min-h-[140px] sm:min-h-[168px]">
          {/* Ghost emoji bg */}
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[7rem] sm:text-[9rem]
                           opacity-[0.06] select-none pointer-events-none leading-none">
            🔥
          </span>
          <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40
                           text-[10px] sm:text-xs">
            Current Streak
          </span>
          <div>
            <div className="flex items-end gap-1.5">
              <span
                className="hero-heading font-black leading-none"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}
              >
                <CountUp target={streak?.currentStreak ?? 0} />
              </span>
              <span className="text-[#D7E2EA] opacity-40 font-light text-sm mb-1">days</span>
            </div>
            <p className="text-[#D7E2EA] opacity-30 font-light text-[11px] mt-1">
              Keep pushing daily
            </p>
          </div>
        </div>

        {/* Longest streak */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl
                        border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03]
                        p-5 sm:p-7 flex flex-col justify-between min-h-[140px] sm:min-h-[168px]">
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[7rem] sm:text-[9rem]
                           opacity-[0.06] select-none pointer-events-none leading-none">
            🏆
          </span>
          <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40
                           text-[10px] sm:text-xs">
            Longest Streak
          </span>
          <div>
            <div className="flex items-end gap-1.5">
              <span
                className="hero-heading font-black leading-none"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}
              >
                <CountUp target={streak?.longestStreak ?? 0} />
              </span>
              <span className="text-[#D7E2EA] opacity-40 font-light text-sm mb-1">days</span>
            </div>
            <p className="text-[#D7E2EA] opacity-30 font-light text-[11px] mt-1">
              Personal best
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Row 2: Metric tiles ── */}
      <motion.div variants={item}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Contributions',
            value: streak?.totalContributions ?? 0,
            icon: '⚡',
          },
          {
            label: 'Repositories',
            value: stats?.totalRepos ?? 0,
            icon: '📁',
          },
          {
            label: 'Stars Earned',
            value: stats?.totalStars ?? 0,
            icon: '⭐',
          },
          {
            label: 'Followers',
            value: stats?.followers ?? 0,
            icon: '👥',
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03]
                       p-4 sm:p-5 flex flex-col gap-2 sm:gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest
                               opacity-40 text-[10px] sm:text-xs leading-tight">
                {metric.label}
              </span>
              <span className="text-base opacity-60">{metric.icon}</span>
            </div>
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)' }}
            >
              <CountUp target={metric.value} duration={1.4} />
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Row 3: Top languages bar ── */}
      {stats && stats.topLanguages.length > 0 && (
        <motion.div
          variants={item}
          className="rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/15
                     bg-[#D7E2EA]/[0.03] p-5 sm:p-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[#D7E2EA] font-light uppercase tracking-widest
                             opacity-40 text-[10px] sm:text-xs">
              Top Languages
            </span>
            <span className="text-base opacity-60">💻</span>
          </div>

          {/* Segmented bar */}
          <div className="flex h-2 rounded-full overflow-hidden gap-px bg-[#D7E2EA]/5">
            {stats.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{ backgroundColor: lang.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${lang.percent}%` } : {}}
                transition={{
                  duration: 1.1,
                  delay: 0.4 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-[#D7E2EA] font-light opacity-60 text-xs">
                  {lang.name}
                </span>
                <span className="text-[#D7E2EA] font-medium opacity-30 text-xs">
                  {lang.percent}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── GitHub link ── */}
      <motion.div variants={item}>
        <a
          href="https://github.com/Dewalesamue"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[#D7E2EA] font-light
                     opacity-30 hover:opacity-70 transition-opacity duration-200
                     text-xs uppercase tracking-widest"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View full profile on GitHub →
        </a>
      </motion.div>
    </motion.div>
  )
}

export default GitHubActivity
