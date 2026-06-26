'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const questions = [
  { label: 'Apa itu campak?', icon: '🦠' },
  { label: 'Bagaimana cara mencegah campak?', icon: '💉' },
  { label: 'Mengapa vaksin penting?', icon: '🛡️' },
  { label: 'Apa gejala campak?', icon: '🌡️' },
  { label: 'Bagaimana campak menular?', icon: '💨' },
  { label: 'Apa komplikasi campak?', icon: '⚠️' },
]

interface QuickQuestionsProps {
  onSelect: (question: string) => void
}

export const QuickQuestions = ({ onSelect }: QuickQuestionsProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Pertanyaan Cepat:
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(question.label)}
            className="inline-flex items-center space-x-1 px-3 py-2 text-xs font-medium rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <span>{question.icon}</span>
            <span>{question.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}