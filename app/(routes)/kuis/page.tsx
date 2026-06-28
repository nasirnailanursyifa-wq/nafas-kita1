'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { CheckCircle, XCircle, Award, RefreshCw, Star, Trophy, Printer, Heart, Shield, Activity, Sparkles, Wind } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Data soal kuis
const quizData = [
  {
    id: 1,
    question: 'Apa penyebab utama penyakit campak?',
    options: ['Bakteri', 'Virus', 'Jamur', 'Parasit'],
    correctAnswer: 1,
    explanation: 'Campak disebabkan oleh virus paramyxovirus yang sangat menular.'
  },
  {
    id: 2,
    question: 'Bagaimana cara penularan campak yang paling umum?',
    options: ['Melalui makanan', 'Melalui udara', 'Melalui sentuhan', 'Melalui air'],
    correctAnswer: 1,
    explanation: 'Campak menular melalui droplet udara saat orang yang terinfeksi batuk atau bersin.'
  },
  {
    id: 3,
    question: 'Berapa efektivitas vaksin campak dalam mencegah penyakit?',
    options: ['50%', '75%', '95%', '100%'],
    correctAnswer: 2,
    explanation: 'Dua dosis vaksin campak memberikan perlindungan hingga 95%.'
  },
  {
    id: 4,
    question: 'Apa gejala awal campak yang paling umum?',
    options: ['Sakit kepala', 'Demam tinggi', 'Nyeri otot', 'Sakit perut'],
    correctAnswer: 1,
    explanation: 'Demam tinggi hingga 39-40°C adalah salah satu gejala awal campak.'
  },
  {
    id: 5,
    question: 'Kapan vaksin campak pertama diberikan?',
    options: ['Saat lahir', 'Usia 9 bulan', 'Usia 1 tahun', 'Usia 5 tahun'],
    correctAnswer: 1,
    explanation: 'Dosis pertama vaksin campak diberikan pada usia 9 bulan.'
  },
  {
    id: 6,
    question: 'Berapa lama virus campak dapat bertahan di udara?',
    options: ['30 menit', '1 jam', '2 jam', '4 jam'],
    correctAnswer: 2,
    explanation: 'Virus campak dapat bertahan di udara dan permukaan hingga 2 jam.'
  },
  {
    id: 7,
    question: 'Komplikasi serius apa yang dapat terjadi akibat campak?',
    options: ['Pneumonia', 'Diabetes', 'Hipertensi', 'Asma'],
    correctAnswer: 0,
    explanation: 'Pneumonia adalah komplikasi serius yang dapat terjadi akibat campak.'
  },
  {
    id: 8,
    question: 'Berapa jumlah rata-rata orang yang tertular dari satu kasus campak tanpa vaksinasi?',
    options: ['3-5 orang', '8-10 orang', '12-18 orang', '20-25 orang'],
    correctAnswer: 2,
    explanation: 'Tanpa kekebalan, satu orang dengan campak dapat menularkan ke 12-18 orang lainnya.'
  },
  {
    id: 9,
    question: 'Kapan ruam merah muncul pada penderita campak?',
    options: ['1-2 hari', '3-5 hari', '7-10 hari', '2 minggu'],
    correctAnswer: 1,
    explanation: 'Ruam merah muncul 3-5 hari setelah gejala awal, biasanya mulai dari wajah.'
  },
  {
    id: 10,
    question: 'Apa cara terbaik untuk mencegah campak?',
    options: ['Minum obat', 'Vaksinasi', 'Istirahat', 'Makan sehat'],
    correctAnswer: 1,
    explanation: 'Vaksinasi adalah cara paling efektif untuk mencegah campak.'
  }
]

// Komponen Virus Campak Berputar
const SpinningVirus = ({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: string; color: string }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 0.9, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="relative w-full h-full">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} opacity-20 blur-xl`} />
        <div className="absolute inset-[10%] rounded-full bg-white/20 blur-sm" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[30%] h-[6%] bg-white/30 rounded-full"
            style={{
              top: '47%',
              left: '35%',
              transform: `rotate(${i * 45}deg) translateX(80%)`,
              transformOrigin: 'center',
            }}
          />
        ))}
        <div className="absolute inset-[25%] rounded-full bg-white/10" />
      </div>
    </motion.div>
  )
}

// Komponen Ruam Campak
const SpreadingRash = ({ delay, x, y }: { delay: number; x: string; y: string }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        scale: [1, 1.5, 1.8, 1.2, 1],
        opacity: [0.3, 0.6, 0.8, 0.5, 0.3],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        <div className="w-4 h-4 rounded-full bg-red-500/60 shadow-lg shadow-red-500/30" />
        <motion.div
          className="absolute inset-0 w-4 h-4 rounded-full bg-red-400/30"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            delay: delay + 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 w-4 h-4 rounded-full bg-red-300/20"
          animate={{
            scale: [1, 5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4,
            delay: delay + 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  )
}

// Komponen Partikel Udara
const AirParticle = ({ delay, x, y, direction }: { delay: number; x: string; y: string; direction: 'left' | 'right' }) => {
  const xOffset = direction === 'left' ? [-100, 100] : [100, -100]
  
  return (
    <motion.div
      className="absolute text-blue-400/40"
      style={{ left: x, top: y, fontSize: '20px' }}
      animate={{
        x: xOffset,
        y: [0, -50, 0, 50, 0],
        opacity: [0, 0.6, 0.8, 0.4, 0],
        scale: [0.5, 1, 1.2, 0.8, 0.5],
      }}
      transition={{
        duration: 8 + Math.random() * 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      💨
    </motion.div>
  )
}

// Efek Semburan
const BurstEffect = ({ isCorrect, show }: { isCorrect: boolean | null; show: boolean }) => {
  if (!show) return null
  
  const emojis = isCorrect ? ['🎉', '⭐', '🌟', '✨', '🎊'] : ['💨', '😅', '🤔', '📚', '💪']
  const colors = isCorrect ? ['text-green-500', 'text-yellow-500', 'text-blue-500'] : ['text-red-400', 'text-orange-400', 'text-gray-400']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute text-2xl ${colors[i % colors.length]}`}
          initial={{
            x: '50%',
            y: '50%',
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 80}%`,
            y: `${50 + (Math.random() - 0.5) * 80}%`,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 2, 0.5],
            rotate: [0, Math.random() * 720],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: "easeOut",
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  )
}

export default function KuisPage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [answered, setAnswered] = useState(false)
  const [userName, setUserName] = useState('')
  const [showCertificate, setShowCertificate] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  
  const certificateRef = useRef<HTMLDivElement>(null)

  const totalQuestions = quizData.length
  const question = quizData[currentQuestion]

  useEffect(() => {
    if (answered) {
      setShowBurst(true)
      const timer = setTimeout(() => setShowBurst(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [answered])

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return
    setSelectedAnswer(selectedIndex)
    setAnswered(true)

    const correct = selectedIndex === question.correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 2000)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setAnswered(false)
    setUserName('')
    setShowCertificate(false)
    setQuizStarted(false)
  }

  const getMessage = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage === 100) return 'Sempurna! Anda benar-benar ahli tentang campak! 🎉'
    if (percentage >= 80) return 'Luar biasa! Pengetahuan Anda tentang campak sangat baik! 🌟'
    if (percentage >= 60) return 'Bagus! Terus tingkatkan pengetahuan Anda tentang campak! 💪'
    if (percentage >= 40) return 'Cukup baik! Pelajari lebih lanjut tentang campak! 📚'
    return 'Terus belajar! Campak adalah topik penting untuk dipahami! 📖'
  }

  const percentage = Math.round((score / totalQuestions) * 100)

  const downloadPDF = async () => {
    if (!certificateRef.current) return
    
    setIsDownloading(true)
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 800,
        height: 600,
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Sertifikat_Campak_${userName}.pdf`)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Background dengan Animasi Campak */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        
        <SpinningVirus delay={0} x="3%" y="5%" size="80px" color="from-red-500 to-red-600" />
        <SpinningVirus delay={2} x="85%" y="10%" size="60px" color="from-purple-500 to-purple-600" />
        <SpinningVirus delay={4} x="10%" y="75%" size="70px" color="from-blue-500 to-blue-600" />
        <SpinningVirus delay={1} x="80%" y="80%" size="55px" color="from-green-500 to-green-600" />
        <SpinningVirus delay={3} x="45%" y="2%" size="50px" color="from-yellow-500 to-yellow-600" />
        <SpinningVirus delay={5} x="42%" y="90%" size="65px" color="from-pink-500 to-pink-600" />

        <SpreadingRash delay={0} x="8%" y="30%" />
        <SpreadingRash delay={1.5} x="85%" y="35%" />
        <SpreadingRash delay={3} x="15%" y="85%" />
        <SpreadingRash delay={2} x="72%" y="70%" />
        <SpreadingRash delay={4} x="50%" y="20%" />
        <SpreadingRash delay={0.5} x="90%" y="55%" />
        <SpreadingRash delay={2.5} x="5%" y="60%" />
        <SpreadingRash delay={3.5} x="65%" y="88%" />
        <SpreadingRash delay={1} x="30%" y="12%" />
        <SpreadingRash delay={4.5} x="55%" y="65%" />

        <AirParticle delay={0} x="10%" y="20%" direction="right" />
        <AirParticle delay={3} x="30%" y="40%" direction="left" />
        <AirParticle delay={5} x="60%" y="25%" direction="right" />
        <AirParticle delay={2} x="80%" y="50%" direction="left" />
        <AirParticle delay={4} x="20%" y="70%" direction="right" />
        <AirParticle delay={6} x="70%" y="80%" direction="left" />

        <motion.div
          className="absolute text-2xl md:text-3xl"
          style={{ left: '2%', top: '15%' }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute text-2xl md:text-3xl"
          style={{ left: '90%', top: '25%' }}
          animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute text-2xl md:text-3xl"
          style={{ left: '5%', top: '65%' }}
          animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
            <Activity className="w-6 h-6 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute text-2xl md:text-3xl"
          style={{ left: '88%', top: '70%' }}
          animate={{ y: [0, -18, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 5.5, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute text-2xl md:text-3xl"
          style={{ left: '50%', top: '88%' }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10">
            <Wind className="w-6 h-6 text-cyan-500" />
          </div>
        </motion.div>
      </div>

      <BurstEffect isCorrect={isCorrect} show={showBurst} />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🧠 Kuis Edukasi Campak
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Uji pengetahuan Anda tentang campak dan dapatkan sertifikat!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    {/* Sisi Kiri: Deskripsi & Registrasi Nama (7 kolom) */}
                    <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 mb-4">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-[10px] md:text-xs font-bold text-purple-700 dark:text-purple-300">Kuis Edukasi Interaktif</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Uji Pengetahuan Campak Anda
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                          Uji seberapa dalam pemahaman Anda tentang penyakit campak, cara penularan, dan pencegahannya. Raih skor minimal <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">80%</span> untuk mendapatkan sertifikat digital kelulusan resmi!
                        </p>

                        {/* List Info Kuis */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="p-3 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl border border-blue-500/10 flex items-center space-x-2.5">
                            <span className="text-lg">📋</span>
                            <div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">Total Soal</p>
                              <p className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200">10 Pilihan Ganda</p>
                            </div>
                          </div>
                          <div className="p-3 bg-purple-500/5 dark:bg-purple-500/10 rounded-xl border border-purple-500/10 flex items-center space-x-2.5">
                            <span className="text-lg">🏆</span>
                            <div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">Syarat Kelulusan</p>
                              <p className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200">Skor Min 80%</p>
                            </div>
                          </div>
                        </div>

                        {/* Input Nama */}
                        <div className="mb-6">
                          <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">
                            Nama Lengkap (untuk sertifikat):
                          </label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Masukkan nama Anda"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => setQuizStarted(true)}
                        disabled={!userName.trim()}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                      >
                        Mulai Kuis 🚀
                      </Button>
                    </div>

                    {/* Sisi Kanan: Cover Gambar Kartun (5 kolom) */}
                    <div className="md:col-span-5 relative min-h-[220px] md:min-h-full">
                      <img
                        src="/images/quiz.jpg"
                        alt="Kuis Cover"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : !showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Soal {currentQuestion + 1} dari {totalQuestions}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-lg">{score}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${((currentQuestion) / totalQuestions) * 100}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={answered}
                        whileHover={!answered ? { scale: 1.02 } : {}}
                        whileTap={!answered ? { scale: 0.98 } : {}}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          answered
                            ? index === question.correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : selectedAnswer === index
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700 opacity-50'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {answered && index === question.correctAnswer && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </motion.div>
                          )}
                          {answered && selectedAnswer === index && index !== question.correctAnswer && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <XCircle className="w-5 h-5 text-red-500" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-xl ${
                        isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-500'
                          : 'bg-red-50 dark:bg-red-900/20 border border-red-500'
                      }`}
                    >
                      <p className="text-sm">
                        {isCorrect ? '✅ Benar!' : '❌ Salah!'} {question.explanation}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardHeader className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                  </motion.div>
                  <CardTitle className="text-2xl">Hasil Kuis!</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center space-x-8 mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <p className="text-3xl font-bold text-green-500">{score}</p>
                      <p className="text-sm text-gray-500">Benar</p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <p className="text-3xl font-bold text-red-500">{totalQuestions - score}</p>
                      <p className="text-sm text-gray-500">Salah</p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      <p className="text-3xl font-bold text-blue-500">{percentage}%</p>
                      <p className="text-sm text-gray-500">Nilai</p>
                    </motion.div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl mb-6">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-lg font-semibold"
                    >
                      {getMessage()}
                    </motion.p>
                  </div>

                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-bold mb-4">🎓 Sertifikat Kelulusan</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Nama Lengkap:
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Masukkan nama Anda"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {userName && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCertificate(true)}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          Lihat Sertifikat
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <Button onClick={handleReset} variant="gradient" size="lg" className="w-full mt-4">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Ulangi Kuis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Sertifikat */}
      {showCertificate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowCertificate(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            
            <div ref={certificateRef} className="bg-white rounded-xl p-4 w-full" style={{ minWidth: '700px', minHeight: '500px' }}>
              <div className="relative border-4 border-double border-blue-500 rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl overflow-hidden">
                
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
                
                <div className="absolute top-3 left-3 w-10 h-10 border-t-4 border-l-4 border-blue-400/60 rounded-tl-xl" />
                <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-blue-400/60 rounded-tr-xl" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-blue-400/60 rounded-bl-xl" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-b-4 border-r-4 border-blue-400/60 rounded-br-xl" />

                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-xl mb-3">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wider">
                    SERTIFIKAT KELULUSAN
                  </h2>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-2 rounded-full" />
                  
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Diberikan kepada</p>
                  
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 my-2 border-b-2 border-dotted border-gray-300 pb-1 inline-block px-6">
                    {userName}
                  </p>
                  
                  <p className="text-gray-600 text-sm md:text-base mt-3">
                    Telah menyelesaikan <span className="font-semibold text-blue-600">Kuis Edukasi Campak</span> dengan nilai
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 my-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-blue-600">{percentage}%</span>
                      <span className="text-gray-400 text-xs">(Benar {score}/{totalQuestions})</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.ceil(percentage / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>

                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                    percentage >= 80 
                      ? 'bg-green-100 text-green-700' 
                      : percentage >= 60 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {percentage >= 80 
                      ? '🌟 Luar biasa! Anda ahli tentang campak!' 
                      : percentage >= 60 
                      ? '💪 Bagus! Terus tingkatkan pengetahuan Anda!'
                      : '📚 Terus belajar! Campak adalah topik penting!'}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-xs text-gray-400">
                    <div className="text-left">
                      <p className="font-semibold text-gray-500 text-[10px]">Diterbitkan oleh</p>
                      <p className="text-blue-600 font-medium text-sm">Udara yang Sama</p>
                      <p className="text-gray-400 text-[8px]">Edukasi Kesehatan Berbasis AI</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-500 text-[10px]">Tanggal</p>
                      <p className="text-gray-600 text-sm">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-dashed border-gray-300">
                    <div className="flex justify-center gap-8 text-[10px] text-gray-400">
                      <div>
                        <div className="w-24 h-[2px] bg-gray-300 mx-auto mb-1" />
                        <p>Verified by</p>
                        <p className="font-semibold text-gray-500 text-xs">Udara yang Sama</p>
                      </div>
                      <div>
                        <div className="w-24 h-[2px] bg-gray-300 mx-auto mb-1" />
                        <p>Certificate ID</p>
                        <p className="font-mono text-gray-500 text-[10px]">
                          UYS-{String(score).padStart(2, '0')}-{new Date().getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500/5 dark:text-blue-400/5 select-none pointer-events-none">
                    {percentage >= 80 ? (
                      <Trophy className="w-48 h-48 stroke-[0.5]" />
                    ) : (
                      <Award className="w-48 h-48 stroke-[0.5]" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isDownloading ? (
                  '⏳ Memproses...'
                ) : (
                  <>
                    <Printer className="inline w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}