"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Settings,
  Menu,
  X,
  Copy,
  Check,
  Download,
  Search,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  ArrowDown,
  Plus,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SettingsModal } from "@/components/settings-modal"
import { useAuthContext } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ChatService } from "@/lib/api/services/chat.service"
import { useTheme } from "@/lib/theme-provider"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
  copied?: boolean
}

interface ConversationItem {
  id: string
  title: string
  preview: string
  timestamp: Date
}

export function ChatInterface() {
  const { logout, token } = useAuthContext()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content:
        "Hey! I'm Prometheus. I adapt to YOUR personality, beliefs, and style. The more we chat, the better I understand you. What's on your mind?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [textSize, setTextSize] = useState(1)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [conversations, setConversations] = useState<ConversationItem[]>([])
  const [activeConversation, setActiveConversation] = useState<string>("")
  const [rateLimitUntil, setRateLimitUntil] = useState<number>(0)

  const sanitizeModelText = (text: string): string => {
    if (!text) return ""
    let cleaned = text
      // Remove common special tokens/tags at boundaries
      .replace(/^(?:\s*(?:<\/?s>|<\/?assistant>|<\/?user>|<\|[^>]*\|>))+/, "")
      .replace(/(?:<\/?s>|<\/?assistant>|<\/?user>|<\|[^>]*\|>)+\s*$/ , "")
      // Remove any remaining HTML-like tags
      .replace(/<[^>]+>/g, "")
    return cleaned.trim()
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    if (input.length > 2000) return
    if (!token) {
      router.push("/login")
      return
    }
    if (Date.now() < rateLimitUntil) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    if (soundEnabled) {
      playSound("send")
    }

    try {
      const res = await ChatService.sendMessage(activeConversation, userMessage.content, token)
      const botMessage: Message = {
        id: `${Date.now()}_bot`,
        role: "bot",
        content: sanitizeModelText(res.reply),
        timestamp: new Date(res.timestamp),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
      if (soundEnabled) playSound("receive")
    } catch (err: any) {
      const msg = (err?.message || "") as string
      if (msg.toLowerCase().includes("401") || msg.toLowerCase().includes("unauthorized")) {
        router.push("/login")
        return
      }
      if (msg.includes("429") || msg.toLowerCase().includes("rate")) {
        setRateLimitUntil(Date.now() + 30_000)
      }
      // keep user's message; allow retry by not clearing input (we already cleared), so show small error as bot reply
      setMessages((prev) => [...prev, { id: `${Date.now()}_err`, role: "bot", content: "Error sending. Please try again.", timestamp: new Date() }])
      setIsTyping(false)
    }
  }

  const playSound = (type: "send" | "receive") => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = type === "send" ? 800 : 600
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const copyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, copied: true } : msg)))
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, copied: false } : msg)))
    }, 2000)
  }

  const exportConversation = () => {
    const text = messages
      .map((msg) => {
        const time = msg.timestamp.toLocaleTimeString()
        const role = msg.role === "user" ? "You" : "Prometheus"
        return `[${time}] ${role}: ${msg.content}`
      })
      .join("\n\n")

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prometheus-chat-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredMessages = searchQuery
    ? messages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startNewChat = async () => {
    if (!token) return router.push("/login")
    try {
      const { conversationId, createdAt } = await ChatService.createConversation(token)
      const newConversation: ConversationItem = {
        id: conversationId,
        title: "New Chat",
        preview: "Start a new conversation...",
        timestamp: new Date(createdAt)
      }
      setConversations(prev => [newConversation, ...prev])
      setActiveConversation(conversationId)
      setMessages([])
      setInput("")
    } catch (e) {
      // optionally show toast
    }
  }

  const switchConversation = async (conversationId: string) => {
    setActiveConversation(conversationId)
    if (!token) {
      router.push("/login")
      return
    }
    try {
      const conv = await ChatService.getConversation(conversationId, token)
      const mapped: Message[] = conv.messages
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((m, idx) => ({ id: `${idx}_${new Date(m.timestamp).getTime()}`, role: m.role, content: sanitizeModelText(m.content), timestamp: new Date(m.timestamp) }))
      setMessages(mapped)
    } catch (e) {
      // fallback: keep current messages
    }
  }

  useEffect(() => {
    const loadConversations = async () => {
      if (!token) return
      try {
        const { conversations: list } = await ChatService.listConversations(token)
        const items: ConversationItem[] = list
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((c) => ({
            id: c.conversationId,
            title: c.lastMessage?.content?.slice(0, 30) || 'New Chat',
            preview: c.lastMessage?.content || '',
            timestamp: new Date(c.updatedAt),
          }))
        setConversations(items)
        if (!activeConversation && items.length) {
          setActiveConversation(items[0].id)
          // Optionally load the latest thread
          switchConversation(items[0].id)
        }
      } catch (e) {
        // If empty/no conversations, prompt user in UI via empty state below
      }
    }
    loadConversations()
  }, [token])

  return (
    <div className="flex h-screen bg-background">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden lg:flex w-80 border-r-8 border-foreground bg-card flex-col"
      >
        <div className="p-6 border-b-8 border-foreground">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black">Chat History</h2>
            <Button
              onClick={startNewChat}
              className="bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!conversations.length && (
            <div className="p-4 border-4 border-foreground bg-background text-sm font-bold">
              No conversations yet. Create a new chat to get started.
            </div>
          )}
          {conversations.map((conversation) => (
            <motion.button
              key={conversation.id}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => switchConversation(conversation.id)}
              className={`w-full text-left p-4 border-4 border-foreground transition-colors ${
                activeConversation === conversation.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4" />
                <div className="font-bold truncate">{conversation.title}</div>
              </div>
              <div className="text-sm opacity-70 truncate">{conversation.preview}</div>
              <div className="text-xs opacity-50 mt-1">
                {conversation.timestamp.toLocaleDateString()}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r-8 border-foreground z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b-8 border-foreground">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-black">Chat History</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-4 border-foreground"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    startNewChat()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversations.map((conversation) => (
                  <motion.button
                    key={conversation.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      switchConversation(conversation.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left p-4 border-4 border-foreground transition-colors ${
                      activeConversation === conversation.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <div className="font-bold truncate">{conversation.title}</div>
                    </div>
                    <div className="text-sm opacity-70 truncate">{conversation.preview}</div>
                    <div className="text-xs opacity-50 mt-1">
                      {conversation.timestamp.toLocaleDateString()}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b-8 border-foreground bg-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden border-4 border-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-black">Prometheus</h1>
              <p className="text-sm opacity-70">Your unfiltered AI companion</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                logout()
                router.push("/login")
              }}
              className="border-4 border-foreground font-black hidden sm:flex"
              title="Log out"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout()
                router.push("/login")
              }}
              className="border-4 border-foreground sm:hidden"
              title="Log out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="border-4 border-foreground"
              title="Search messages"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="border-4 border-foreground"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="border-4 border-foreground"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTextSize(Math.max(0.8, textSize - 0.1))}
              className="border-4 border-foreground hidden sm:flex"
              title="Decrease text size"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTextSize(Math.min(1.4, textSize + 0.1))}
              className="border-4 border-foreground hidden sm:flex"
              title="Increase text size"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={exportConversation}
              className="border-4 border-foreground hidden sm:flex"
              title="Export conversation"
            >
              <Download className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="border-4 border-foreground"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b-4 border-foreground bg-card overflow-hidden"
            >
              <div className="p-4">
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-4 border-foreground"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
          style={{ fontSize: `${textSize}rem` }}
        >
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group relative max-w-[85%] md:max-w-[70%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6"
                      : "bg-secondary text-secondary-foreground border-4 border-foreground shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 transform -rotate-1"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="font-black text-sm">{message.role === "user" ? "You" : "Prometheus"}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyMessage(message.id, message.content)}
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity border-2 border-foreground"
                        title="Copy message"
                      >
                        {message.copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-secondary text-secondary-foreground border-4 border-foreground shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                      className="w-3 h-3 bg-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                      className="w-3 h-3 bg-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                      className="w-3 h-3 bg-foreground rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-24 right-8 z-10"
            >
              <Button
                onClick={scrollToBottom}
                size="icon"
                className="h-12 w-12 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="border-t-8 border-foreground bg-card p-4 md:p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Type your message... (Enter to send)"
                className="border-4 border-foreground text-base md:text-lg p-4 md:p-6 min-h-[60px]"
              />
              <div className="flex items-center justify-between mt-2 px-2">
                <span className="text-xs opacity-70">{input.length} / 2000 characters</span>
                <span className="text-xs opacity-70">Press Enter to send, Shift+Enter for new line</span>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              className="h-[60px] w-[60px] border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
