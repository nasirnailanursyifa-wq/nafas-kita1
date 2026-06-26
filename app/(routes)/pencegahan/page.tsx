'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Syringe, Hand, Heart, Home, Shield } from 'lucide-react'

const preventions = [
  {
    icon: Syringe,
    title: 'Imunisasi',
    description: 'Vaksinasi campak adalah cara paling efektif untuk mencegah penyakit ini.',
    steps: ['Dosis pertama pada usia 9 bulan', 'Dosis kedua pada usia 18 bulan', 'Perlindungan 95% efektif'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Hand,
    title: 'Menjaga Kebersihan',
    description: 'Praktik kebersihan yang baik membantu mencegah penyebaran virus campak.',
    steps: ['Cuci tangan dengan sabun', 'Gunakan masker saat sakit', 'Tutup mulut saat batuk/bersin'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Pola Hidup Sehat',
    description: 'Sistem kekebalan tubuh yang kuat membantu melawan infeksi.',
    steps: ['Konsumsi makanan bergizi', 'Istirahat cukup', 'Olahraga teratur'],
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Home,
    title: 'Isolasi saat Sakit',
    description: 'Jika terinfeksi, isolasi diri untuk mencegah penularan ke orang lain.',
    steps: ['Tinggal di rumah', 'Hindari kontak dengan orang lain', 'Konsultasikan dengan dokter'],
    color: 'from-purple-500 to-pink-500',
  },
]

export default function PencegahanPage() {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Pencegahan Campak
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Langkah-langkah sederhana yang dapat dilakukan untuk mencegah penularan campak.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {preventions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center space-x-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-0">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ingat!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Vaksinasi adalah perlindungan terbaik. Jangan tunda vaksinasi untuk diri sendiri dan keluarga.
                    Konsultasikan dengan tenaga medis untuk jadwal vaksinasi yang tepat.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}