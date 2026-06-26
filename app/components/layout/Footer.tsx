'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Mail, HeartPulse, Shield, Sparkles, ArrowRight } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-purple-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        
        {/* Call to Action - Ayo Imunisasi! (Responsif) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 pb-6 md:pb-8 border-b border-gray-200/50 dark:border-gray-700/50"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block w-full md:w-auto"
          >
            <div className="inline-flex items-center justify-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30 shadow-lg w-full md:w-auto">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                Ayo Imunisasi!
              </span>
              <HeartPulse className="w-4 h-4 md:w-5 md:h-5 text-red-500 animate-pulse flex-shrink-0" />
            </div>
          </motion.div>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-3 max-w-xs md:max-w-md mx-auto px-2">
            Lindungi diri, keluarga, dan orang-orang tercinta dari campak.
            <span className="block text-[10px] md:text-xs text-gray-400 mt-1">Vaksinasi adalah langkah kecil untuk masa depan yang lebih sehat 💉</span>
          </p>
        </motion.div>

        {/* Main Footer - Grid Responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Kolom 1: Brand - 4 kolom */}
          <div className="sm:col-span-2 lg:col-span-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0"
              >
                <HeartPulse className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Udara yang Sama
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Platform edukasi kesehatan berbasis AI untuk meningkatkan kesadaran tentang penyakit campak.
            </p>
            
            {/* Social Icons - Responsif */}
            <div className="flex justify-center sm:justify-start space-x-2 mt-4">
              {[
                { icon: '🐦', label: 'Twitter', color: 'hover:text-blue-400' },
                { icon: '📘', label: 'Facebook', color: 'hover:text-blue-600' },
                { icon: '📷', label: 'Instagram', color: 'hover:text-pink-500' },
                { icon: '▶️', label: 'YouTube', color: 'hover:text-red-600' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-sm md:text-lg text-gray-500 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat - 4 kolom */}
          <div className="sm:col-span-2 lg:col-span-4 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center justify-center sm:justify-start space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span>Tautan Cepat</span>
            </h4>
            <div className="grid grid-cols-2 gap-1 max-w-xs mx-auto sm:mx-0">
              {[
                { href: '/beranda', label: 'Beranda' },
                { href: '/about', label: 'Tentang Campak' },
                { href: '/gejala', label: 'Gejala Campak' },
                { href: '/pencegahan', label: 'Pencegahan' },
                { href: '/chatbot', label: 'Chatbot AI' },
                { href: '/kuis', label: 'Kuis Edukasi' },
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs md:text-sm py-1 transition-colors flex items-center justify-center sm:justify-start space-x-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-50 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kolom 3: Kontak - 4 kolom */}
          <div className="sm:col-span-2 lg:col-span-4 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center justify-center sm:justify-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Kontak</span>
            </h4>
            <div className="space-y-3 max-w-xs mx-auto sm:mx-0">
              <motion.a
                href="mailto:udarayangsamaa@gmail.com"
                whileHover={{ x: 5 }}
                className="flex items-center justify-center sm:justify-start space-x-3 text-gray-500 dark:text-gray-400 group cursor-pointer"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:shadow-md transition-all flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs md:text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                  udarayangsamaa@gmail.com
                </span>
              </motion.a>
              
              {/* Pesan singkat - Responsif */}
              <div className="mt-4 p-3 md:p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-100/30 dark:border-blue-800/30">
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  💙 "Kesehatan adalah investasi terbaik." 
                  <span className="block text-[8px] md:text-[10px] text-gray-400 mt-1">— Udara yang Sama</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Responsif */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 md:mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs text-gray-400 dark:text-gray-500 gap-2">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Udara yang Sama. All rights reserved.
          </p>
          <p className="flex items-center space-x-1 text-center sm:text-right">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 inline-block animate-pulse" />
            <span>for better health</span>
            <span className="mx-1">·</span>
            <span className="text-[8px] md:text-[10px]">v2.0</span>
          </p>
        </div>
      </div>
    </footer>
  )
}