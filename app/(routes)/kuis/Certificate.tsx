'use client'

import { useRef } from 'react'
import { Award, Calendar, User } from 'lucide-react'

interface CertificateProps {
  name: string
  score: number
  totalQuestions: number
  date: string
}

export const Certificate = ({ name, score, totalQuestions, date }: CertificateProps) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  
  return (
    <div className="text-center border-4 border-double border-blue-500 rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 max-w-2xl mx-auto">
      <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        SERTIFIKAT KELULUSAN
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Diberikan kepada:</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white my-4">{name}</p>
      <p className="text-gray-600 dark:text-gray-300">
        Telah menyelesaikan Kuis Edukasi Campak dengan nilai {percentage}%
      </p>
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <span>📅 {date}</span>
        <span>⭐ Nilai: {score}/{totalQuestions}</span>
      </div>
      
      {/* Badge motivasi */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <p className="text-sm font-medium">
          {percentage >= 80 
            ? '🌟 Luar biasa! Anda ahli tentang campak!' 
            : percentage >= 60 
            ? '💪 Bagus! Terus tingkatkan pengetahuan Anda!'
            : '📚 Terus belajar! Campak adalah topik penting!'}
        </p>
      </div>
    </div>
  )
}