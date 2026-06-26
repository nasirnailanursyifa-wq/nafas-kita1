'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Heart, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'  // ← Tambahkan ini!

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background dengan anak-anak animasi */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
        {/* Gambar anak-anak animasi di background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          {/* Anak 1 - Kiri atas */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[5%] text-6xl md:text-7xl lg:text-8xl"
          >
            <div className="relative">
              <span>🧒</span>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500/70 rounded-full animate-pulse" />
              <div className="absolute top-2 -right-4 w-4 h-4 bg-red-400/60 rounded-full animate-pulse delay-300" />
            </div>
          </motion.div>

          {/* Anak 2 - Kanan atas */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-20 right-[10%] text-5xl md:text-6xl lg:text-7xl"
          >
            <div className="relative">
              <span>👧</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500/70 rounded-full animate-pulse delay-500" />
              <div className="absolute top-3 -right-3 w-3 h-3 bg-red-400/60 rounded-full animate-pulse delay-700" />
            </div>
          </motion.div>

          {/* Anak 3 - Kiri tengah */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-[3%] text-5xl md:text-6xl lg:text-7xl"
          >
            <div className="relative">
              <span>👦</span>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500/70 rounded-full animate-pulse delay-200" />
              <div className="absolute top-1 -right-5 w-3 h-3 bg-red-400/60 rounded-full animate-pulse delay-600" />
              <div className="absolute bottom-1 -left-3 w-4 h-4 bg-red-300/50 rounded-full animate-pulse delay-900" />
            </div>
          </motion.div>

          {/* Anak 4 - Kanan tengah */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-1/3 right-[5%] text-4xl md:text-5xl lg:text-6xl"
          >
            <div className="relative">
              <span>🧑</span>
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-500/70 rounded-full animate-pulse delay-400" />
              <div className="absolute top-2 -right-4 w-3 h-3 bg-red-400/60 rounded-full animate-pulse delay-800" />
            </div>
          </motion.div>

          {/* Anak 5 - Bawah kiri */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-[8%] text-5xl md:text-6xl lg:text-7xl"
          >
            <div className="relative">
              <span>👶</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500/70 rounded-full animate-pulse delay-300" />
              <div className="absolute top-0 -right-4 w-3 h-3 bg-red-400/60 rounded-full animate-pulse delay-700" />
            </div>
          </motion.div>

          {/* Anak 6 - Bawah kanan */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-32 right-[8%] text-4xl md:text-5xl lg:text-6xl"
          >
            <div className="relative">
              <span>🧒</span>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500/70 rounded-full animate-pulse delay-100" />
              <div className="absolute top-1 -right-5 w-3 h-3 bg-red-400/60 rounded-full animate-pulse delay-500" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edukasi Kesehatan Berbasis AI
              </span>
            </div>
          </motion.div>

          {/* Judul Utama di Tengah */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Udara yang Sama
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
          >
            Satu Udara, Satu Kesadaran, Satu Langkah untuk Mencegah Campak
          </motion.p>

          {/* Tombol - SEKARANG TERHUBUNG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            {/* Tombol Pelajari Campak → ke halaman About */}
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-medium"
              >
                Pelajari Campak
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </Link>

            {/* Tombol Tanya AI → ke halaman Chatbot */}
            <Link href="/chatbot">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 font-medium"
              >
                <MessageCircle className="inline mr-2 w-5 h-5" />
                Tanya AI
              </motion.button>
            </Link>
          </motion.div>

          {/* Visualisasi Ibu & Anak di Bawah */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <div className="relative inline-block">
              {/* Background lingkaran */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-blue-200/50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-full blur-2xl scale-150" />
              
              {/* Container ilustrasi */}
              <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl px-8 py-6 border border-white/30 shadow-2xl">
                <div className="flex items-center justify-center space-x-6 md:space-x-10">
                  {/* Ibu */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-4xl md:text-5xl shadow-2xl">
                        👩
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse">
                        ❤️
                      </div>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">Ibu</p>
                  </motion.div>

                  {/* Hati di tengah */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl md:text-5xl text-red-500"
                  >
                    <Heart className="w-6 h-6 md:w-10 md:h-10 fill-red-500 text-red-500" />
                  </motion.div>

                  {/* Anak */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl md:text-5xl shadow-2xl">
                        👦
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse">
                        ⚕️
                      </div>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">Anak</p>
                  </motion.div>
                </div>

                {/* Label di bawah */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 text-center"
                >
                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lindungi Anak & Keluarga dari Campak
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}