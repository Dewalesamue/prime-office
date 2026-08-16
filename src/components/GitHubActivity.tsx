import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────
interface GitHubStats {
  totalCommits: number
  totalPRs: number
  totalStars: number
  totalRepos: number
  followers: number
  currentStreak: number
  longestStreak: number
  topLanguages: { name: string; percent: number; color: string }[]
}

// ── Language colours (common ones) ───────────────────────────────────────
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
  Other: '#D7E2EA',
}

// ── Animated counter ──────────────────────────────────────────────────────
const CountUp: React.FC<{ target: number; duration?: number; suffix?: string }> = ({
  target,
  duration = 1.8,
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, { duration, ease: 'easeOut' })
    return controls.stop
  }, [isInView, target, duration, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

// ── Main component ────────────────────────────────────────────────────────
const GitHubActivity: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user profile + repos in parallel
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/Dewalesamue'),
          fetch('https://api.github.com/users/Dewalesamue/repos?per_page=100'),
          fetch('https://api.github.com/users/Dewalesamue/events?per_page=100'),
        ])

        const user = await userRes.json()
        const repos: any[] = await reposRes.json()
        const events: any[] = await eventsRes.json()

        // Total stars across all repos
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)

        // Top languages by repo count
        const langCount: Record<string, number> = {}
        repos.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
        })
        const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0)
        const topLanguages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / totalLangRepos) * 100),
            color: LANG_COLORS[name] || LANG_COLORS.Other,
          }))

        // Streak calculation from push events
        const pushDates = events
          .filter((e) => e.type === 'PushEvent')
          .map((e) => new Date(e.created_at).toDateString())
        const uniqueDates = [...new Set(pushDates)].map((d) => new Date(d))
        uniqueDates.sort((a, b) => b.getTime() - a.getTime())

        let currentStreak = 0
        let longestStreak = 0
        let streak = 0
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        for (let i = 0; i < uniqueDates.length; i++) {
          const d = new Date(uniqueDates[i])
          d.setHours(0, 0, 0, 0)
          const diffDays = Math.round((today.getTime() - d.getTime()) / 86400000)
          if (i === 0) {
            if (diffDays <= 1) {
              streak = 1
              currentStreak = 1
            } else break
          } else {
            const prev = new Date(uniqueDates[i - 1])
            prev.setHours(0, 0, 0, 0)
            const gap = Math.round((prev.getTime() - d.getTime()) / 86400000)
            if (gap === 1) {
              streak++
              if (i < 30) currentStreak = streak
            } else {
              longestStreak = Math.max(longestStreak, streak)
              streak = 1
            }
          }
        }
        longestStreak = Math.max(longestStreak, streak)

        // Total commits from push events (rough count from last 100 events)
        const totalCommitsFromEvents = events
          .filter((e) => e.type === 'PushEvent')
          .reduce((acc, e) => acc + (e.payload?.commits?.length || 0), 0)

        // PRs from events
        const totalPRs = events.filter((e) => e.type === 'PullRequestEvent').length

        setStats({
          totalCommits: totalCommitsFromEvents,
          totalPRs,
          totalStars,
          totalRepos: user.public_repos || repos.length,
          followers: user.followers || 0,
          currentStreak,
          longestStreak,
          topLanguages,
        })
      } catch (err) {
        console.error('GitHub fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#D7E2EA]/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full flex flex-col gap-4"
    >
      {/* ── Row 1: Streak hero + longest streak ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Current streak — big hero card */}
        <div className="col-span-2 sm:col-span-1 relative overflow-hidden rounded-2xl sm:rounded-3xl
                        border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] p-6 sm:p-8
                        flex flex-col justify-between min-h-[160px]">
          {/* Background number */}
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 font-black leading-none
                       text-[#D7E2EA]/5 select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          >
            🔥
          </span>
          <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50 text-xs">
            Current Streak
          </span>
          <div className="flex items-end gap-2 mt-auto">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
            >
              <CountUp target={stats.currentStreak} />
            </span>
            <span className="text-[#D7E2EA] font-light opacity-50 mb-1 text-sm sm:text-base">
              days
            </span>
          </div>
          <span className="text-[#D7E2EA] font-light opacity-40 text-xs mt-1">
            Keep pushing every day
          </span>
        </div>

        {/* Longest streak */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl sm:rounded-3xl
                        border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] p-6 sm:p-8
                        flex flex-col justify-between min-h-[160px]">
          <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50 text-xs">
            Longest Streak
          </span>
          <div className="flex items-end gap-2 mt-auto">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
            >
              <CountUp target={stats.longestStreak} />
            </span>
            <span className="text-[#D7E2EA] font-light opacity-50 mb-1 text-sm sm:text-base">
              days
            </span>
          </div>
          <span className="text-[#D7E2EA] font-light opacity-40 text-xs mt-1">
            Personal best
          </span>
        </div>
      </motion.div>

      {/* ── Row 2: Metric tiles ── */}
      <motion.div variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Commits', value: stats.totalCommits, suffix: '+' },
          { label: 'Repositories', value: stats.totalRepos, suffix: '' },
          { label: 'Stars Earned', value: stats.totalStars, suffix: '' },
          { label: 'Followers', value: stats.followers, suffix: '' },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03]
                       p-4 sm:p-5 flex flex-col gap-2"
          >
            <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40 text-[10px] sm:text-xs">
              {metric.label}
            </span>
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
            >
              <CountUp target={metric.value} suffix={metric.suffix} duration={1.5} />
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Row 3: Top languages bar ── */}
      {stats.topLanguages.length > 0 && (
        <motion.div variants={itemVariants}
          className="rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/15
                     bg-[#D7E2EA]/[0.03] p-5 sm:p-7 flex flex-col gap-4">
          <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50 text-xs">
            Top Languages
          </span>

          {/* Segmented bar */}
          <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
            {stats.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                className="h-full rounded-full"
                style={{ backgroundColor: lang.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${lang.percent}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 sm:gap-5">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-[#D7E2EA] font-light opacity-60 text-xs sm:text-sm">
                  {lang.name}
                </span>
                <span className="text-[#D7E2EA] font-medium opacity-40 text-xs">
                  {lang.percent}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── GitHub link ── */}
      <motion.div variants={itemVariants}>
        <a
          href="https://github.com/Dewalesamue"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[#D7E2EA] font-light opacity-40
                     hover:opacity-80 transition-opacity duration-200 text-xs sm:text-sm uppercase tracking-widest"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View full profile on GitHub →
        </a>
      </motion.div>
    </motion.div>
  )
}

export default GitHubActivity
