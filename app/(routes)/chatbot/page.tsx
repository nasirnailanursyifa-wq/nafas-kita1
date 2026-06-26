'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { ChatInterface } from '@/app/components/chatbot/ChatInterface'
import { QuickQuestions } from '@/app/components/chatbot/QuickQuestions'
import { AlertCircle, Bot, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Halo! Saya AI Sahabat Udara, siap membantu Anda memahami lebih lanjut tentang campak. Ada yang bisa saya bantu?',
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || 'Maaf, saya tidak bisa menjawab pertanyaan itu.',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || 'Maaf, terjadi kesalahan. Silakan coba lagi.',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, saya sedang offline. Tapi saya tetap bisa menjawab pertanyaan tentang campak! Coba tanyakan: vaksin, gejala, atau pencegahan.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsTyping(false)
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30 mb-4">
            <Bot className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Asisten Kesehatan Virtual
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Sahabat Udara
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Asisten kesehatan virtual untuk membantu Anda memahami campak dan pencegahannya.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col overflow-hidden shadow-2xl border-0">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardTitle className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Sahabat Udara — Aktif
                </span>
                <Sparkles className="w-4 h-4 text-purple-500 ml-2" />
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Chat Interface */}
              <div className="flex-1 overflow-y-auto">
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                />
              </div>

              {/* Quick Questions - Tetap di bawah */}
              <div className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
                <QuickQuestions onSelect={handleSendMessage} />
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm rounded-xl border border-yellow-200 dark:border-yellow-800 flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Disclaimer:</span> AI ini hanya untuk edukasi dan 
              tidak menggantikan konsultasi medis profesional. Selalu konsultasikan dengan tenaga 
              medis untuk diagnosis dan perawatan yang tepat.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}