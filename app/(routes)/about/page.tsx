'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { AlertTriangle, Wind, Shield, Heart, Activity } from 'lucide-react'

export default function AboutPage() {
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
            Tentang Campak
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pahami lebih dalam tentang penyakit campak untuk melindungi diri dan orang-orang tercinta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Apa Itu Campak?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Campak adalah infeksi virus yang sangat menular yang menyerang sistem pernapasan dan dapat menyebabkan komplikasi serius, terutama pada anak-anak.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Penyebab Campak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Disebabkan oleh virus paramyxovirus yang menyebar melalui droplet udara saat orang yang terinfeksi batuk, bersin, atau berbicara.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Wind className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Cara Penularan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Virus dapat bertahan di udara dan permukaan hingga 2 jam. Penularan terjadi melalui kontak langsung dengan droplet atau udara yang terkontaminasi.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Dampak Campak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Komplikasi serius termasuk pneumonia, ensefalitis, dan kematian. Namun, 95% kasus dapat dicegah dengan vaksinasi.
              </p>
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-0">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mengapa Ini Penting?</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Memahami campak adalah langkah pertama dalam pencegahan. Dengan pengetahuan yang tepat, 
                    kita dapat melindungi diri sendiri, keluarga, dan komunitas dari penyakit yang dapat 
                    dicegah ini. Vaksinasi adalah kunci untuk mengakhiri siklus penularan campak.
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