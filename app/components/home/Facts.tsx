'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Users, 
  Award, 
  Shield, 
  Sparkles,
  Heart,
  Zap,
  Star
} from 'lucide-react'

const facts = [
  {
    icon: Globe,
    title: 'Fakta 1',
    description: 'Campak adalah salah satu penyakit paling menular di dunia.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Fakta 2',
    description: 'Satu orang dapat menularkan ke 12-18 orang lainnya.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    iconColor: 'text-orange-500',
  },
  {
    icon: Award,
    title: 'Fakta 3',
    description: 'Vaksin campak telah menyelamatkan lebih dari 20 juta jiwa.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    iconColor: 'text-green-600',
  },
  {
    icon: Shield,
    title: 'Fakta 4',
    description: 'Dua dosis vaksin memberikan perlindungan seumur hidup.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    iconColor: 'text-purple-600',
  },
]

export const Facts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30 mb-4">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tahukah Anda?
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Fakta Menarik tentang Campak
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kenali fakta-fakta penting tentang campak untuk meningkatkan kesadaran dan pencegahan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${fact.bgColor} rounded-2xl p-6 border border-white/30 hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm`}
            >
              {/* Icon dengan background gradasi */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${fact.color} flex items-center justify-center mb-4 shadow-lg`}>
                <fact.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                {fact.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {fact.description}
              </p>

              {/* Decorative small icon */}
              <div className="mt-3 flex items-center space-x-1">
                <Heart className={`w-3 h-3 ${fact.iconColor} opacity-50`} />
                <span className="text-xs text-gray-400">informasi penting</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}