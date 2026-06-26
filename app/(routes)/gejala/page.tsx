'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Thermometer, Wind, Droplets, Eye, Circle, AlertCircle, Frown } from 'lucide-react'

const symptoms = [
  {
    icon: Thermometer,
    name: 'Demam Tinggi',
    description: 'Suhu tubuh mencapai 39-40°C yang berlangsung selama 4-7 hari.',
    severity: 'Berat',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Wind,
    name: 'Batuk',
    description: 'Batuk kering yang persisten dan dapat berlangsung hingga 2 minggu.',
    severity: 'Sedang',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Droplets,
    name: 'Pilek',
    description: 'Hidung berair dan bersin-bersin yang merupakan gejala awal.',
    severity: 'Ringan',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Eye,
    name: 'Mata Merah',
    description: 'Konjungtivitis atau mata merah dan sensitif terhadap cahaya.',
    severity: 'Sedang',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Circle,
    name: 'Ruam Merah',
    description: 'Ruam kemerahan yang muncul 3-5 hari setelah gejala awal, mulai dari wajah.',
    severity: 'Berat',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Frown,
    name: 'Kehilangan Nafsu Makan',
    description: 'Penderita campak sering kehilangan nafsu makan, yang dapat menyebabkan penurunan berat badan dan dehidrasi.',
    severity: 'Sedang',
    color: 'from-yellow-500 to-amber-600',
  },
]

const severityColors = {
  Ringan: 'text-green-500',
  Sedang: 'text-yellow-500',
  Berat: 'text-red-500',
}

export default function GejalaPage() {
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
            Gejala Campak
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kenali gejala-gejala campak sejak dini untuk penanganan yang lebih cepat dan tepat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${symptom.color} flex items-center justify-center mb-4`}>
                    <symptom.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>{symptom.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {symptom.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className={`w-4 h-4 ${severityColors[symptom.severity as keyof typeof severityColors]}`} />
                    <span className={`text-sm font-medium ${severityColors[symptom.severity as keyof typeof severityColors]}`}>
                      Tingkat {symptom.severity}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div className="flex items-start space-x-4 flex-grow">
                  <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">
                      Penting untuk Diketahui
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                      Jika Anda atau keluarga mengalami gejala-gejala di atas, segera konsultasikan 
                      dengan tenaga medis profesional. Penanganan dini sangat penting untuk mencegah 
                      komplikasi serius.
                    </p>
                  </div>
                </div>
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-md border border-white/30 dark:border-gray-800/30">
                  <img 
                    src="/images/doctor.jpg" 
                    alt="Konsultasi Dokter" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}