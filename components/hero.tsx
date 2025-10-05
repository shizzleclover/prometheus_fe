"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Brain, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-warning text-warning-foreground px-6 py-2 border-4 border-foreground brutalist-shadow-sm font-black text-sm">
                ⚡ NO FILTERS. NO LIMITS. NO BS.
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 text-balance"
            >
              AI That{" "}
              <span className="bg-primary text-primary-foreground px-4 inline-block border-4 border-foreground rotate-[-2deg]">
                Gets
              </span>{" "}
              You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-bold mb-8 text-muted-foreground leading-relaxed"
            >
              Prometheus learns your personality, beliefs, and style. Experience conversations that feel genuinely
              human—unfiltered, personalized, and brutally honest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground border-4 border-foreground brutalist-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all font-black text-lg px-8 py-6 w-full sm:w-auto"
                >
                  Start Chatting <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-4 border-foreground font-black text-lg px-8 py-6 hover:bg-foreground hover:text-background transition-all w-full sm:w-auto bg-transparent"
              >
                See How It Works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary border-2 border-foreground rounded-full animate-pulse" />
                <span className="font-bold text-sm">18+ Only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary border-2 border-foreground rounded-full animate-pulse" />
                <span className="font-bold text-sm">Fully Private</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="bg-card border-4 border-foreground brutalist-shadow-lg p-8 relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary border-4 border-foreground flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-black text-lg">Prometheus AI</div>
                    <div className="text-sm font-bold text-muted-foreground">Adapting to you...</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-muted border-4 border-foreground p-4"
                  >
                    <p className="font-bold text-sm">"What's your take on controversial topic X?"</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-accent border-4 border-foreground p-4 ml-8"
                  >
                    <p className="font-bold text-sm text-accent-foreground">
                      "Based on your profile, here's my unfiltered perspective..."
                    </p>
                  </motion.div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-8 h-8 bg-secondary border-4 border-foreground flex items-center justify-center"
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                      className="w-8 h-8 bg-warning border-4 border-foreground flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <div className="font-black text-xs">PERSONALIZED</div>
                </div>
              </motion.div>

              {/* Background Decorative Elements */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-secondary border-4 border-foreground -z-10"
              />
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-warning border-4 border-foreground -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
