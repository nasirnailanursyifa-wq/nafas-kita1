'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isTyping: boolean
}

export const ChatInterface = ({ messages, onSendMessage, isTyping }: ChatInterfaceProps) => {
  const [input, setInput] = useState('')
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [isTypingEffect, setIsTypingEffect] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Efek mengetik per kata
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage) return

    // Cek apakah ini pesan baru dari AI
    const existingIndex = displayedMessages.findIndex(m => m.id === lastMessage.id)
    
    if (existingIndex === -1 && lastMessage.role === 'assistant' && !isTyping) {
      // Pesan AI baru - mulai efek mengetik
      setIsTypingEffect(true)
      
      const fullText = lastMessage.content
      const words = fullText.split(' ')
      let currentText = ''
      let wordIndex = 0

      // Tambahkan pesan kosong dulu
      const newMessage = { ...lastMessage, content: '' }
      setDisplayedMessages(prev => [...prev, newMessage])

      const typeNextWord = () => {
        if (wordIndex < words.length) {
          currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex]
          wordIndex++
          
          setDisplayedMessages(prev => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last && last.id === lastMessage.id) {
              last.content = currentText
            }
            return updated
          })
          
          scrollToBottom()
          
          const delay = 20 + Math.random() * 40
          typingTimeoutRef.current = setTimeout(typeNextWord, delay)
        } else {
          setIsTypingEffect(false)
          setDisplayedMessages(prev => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last && last.id === lastMessage.id) {
              last.content = fullText
            }
            return updated
          })
        }
      }

      typingTimeoutRef.current = setTimeout(typeNextWord, 300)
      
    } else if (existingIndex === -1 && lastMessage.role === 'user') {
      setDisplayedMessages(prev => [...prev, lastMessage])
    }
  }, [messages, isTyping])

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)
  }

  useEffect(() => {
    if (!isTypingEffect) {
      scrollToBottom()
    }
  }, [displayedMessages, isTypingEffect])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayedMessages.map((message, index) => (
          <motion.div
            key={`${message.id}-${index}`}  // ← UNIK!
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] flex ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start space-x-3`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                  {isTypingEffect && message === displayedMessages[displayedMessages.length - 1] && message.role === 'assistant' && (
                    <span className="inline-block w-0.5 h-4 bg-blue-500 dark:bg-blue-400 animate-pulse ml-0.5 align-middle" />
                  )}
                </p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && !isTypingEffect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan tentang campak..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}