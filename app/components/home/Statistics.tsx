'use client'

import { motion } from 'framer-motion'
import { useVisitorStats } from '@/app/hooks/useVisitorStats'

export const Statistics = () => {
  const { stats: visitorStats, loading } = useVisitorStats()

  const staticStats = [
    { value: '2.5M+', label: 'Kesadaran Terbangun', color: 'from-blue-500 to-cyan-500', isLive: false },
    { value: '95%', label: 'Efektivitas Vaksin', color: 'from-green-500 to-emerald-500', isLive: false },
    { value: '140K+', label: 'Kasus Dicegah', color: 'from-purple-500 to-pink-500', isLive: false },
    { value: '100%', label: 'Komitmen Kesehatan', color: 'from-red-500 to-orange-500', isLive: false },
  ]

  const dynamicStats = [
    ...staticStats,
    {
      value: loading ? '...' : visitorStats.totalVisits.toLocaleString('id-ID'),
      label: 'Total Kunjungan',
      color: 'from-amber-500 to-yellow-500',
      isLive: false
    },
    {
      value: loading ? '...' : `${visitorStats.activeUsers}`,
      label: 'Pengguna Aktif',
      color: 'from-emerald-500 to-teal-500',
      isLive: true
    }
  ]

  return (
    <section className="py-16 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {dynamicStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              {stat.isLive && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}