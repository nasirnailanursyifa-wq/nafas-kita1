'use client'

import { motion } from 'framer-motion'

export const Statistics = () => {
  const stats = [
    {
      value: '95%',
      label: 'Efektivitas Vaksin',
      description: 'Dua dosis vaksin campak memberikan perlindungan optimal yang sangat tinggi untuk mencegah infeksi dan penularan.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      value: '63.769',
      label: 'Kasus Suspek 2025',
      description: 'Berdasarkan Data Nasional sepanjang Tahun 2025 tercatat 63.769 kasus suspek campak dan 11.094 yang terkonfirmasi campak.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      value: '8.224',
      label: 'Kasus Suspek 2026',
      description: 'Berdasarkan Data Nasional Tahun 2026 hingga bulan Februari tercatat 8.224 kasus suspek dan 572 terkonfirmasi.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      value: '21 & 13 KLB',
      label: 'Kejadian Luar Biasa (KLB)',
      description: '21 KLB suspek campak dan 13 KLB terkonfirmasi laboratorium dilaporkan tersebar di 17 kabupaten/kota pada 11 provinsi.',
      color: 'from-red-500 to-orange-500'
    },
  ]

  return (
    <section className="py-16 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Header Seksi Statistik */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Situasi & Statistik Campak Nasional
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Data terkini seputar kasus campak di Indonesia serta pentingnya efektivitas imunisasi untuk perlindungan bersama.
          </p>
        </motion.div>

        {/* Grid Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 mt-3 font-semibold text-sm md:text-base">
                  {stat.label}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs md:text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}