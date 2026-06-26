'use client'

import { useVisitorStats } from '@/app/hooks/useVisitorStats'
import { Eye, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export const VisitorBadge = () => {
  const { stats, loading } = useVisitorStats()
  const [isExpanded, setIsExpanded] = useState(false)

  if (loading) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        className="glass bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 dark:border-gray-800/40 overflow-hidden"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
        >
          {/* Indikator online berdenyut */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          
          <span className="flex items-center space-x-1 font-semibold">
            <span>{stats.activeUsers}</span>
            <span className="text-[10px] md:text-xs font-normal text-gray-500 dark:text-gray-400">Aktif</span>
          </span>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-700 pl-2 ml-2 overflow-hidden whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300 font-bold">
                  {stats.totalVisits.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">Kunjungan</span>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="text-[10px] text-gray-400 dark:text-gray-500 pl-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            {isExpanded ? '◀' : '▶'}
          </span>
        </button>
      </motion.div>
    </div>
  )
}
