"use client"

import { motion } from "framer-motion"
import { Brain, Shield, Zap, Users, Target, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Deep Personalization",
    description: "Prometheus learns from 50+ demographic and personality data points to understand who you really are.",
    color: "bg-primary",
  },
  {
    icon: Zap,
    title: "No Filter Mode",
    description: "Unfiltered, honest responses. No corporate sanitization. Just real conversations.",
    color: "bg-accent",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your data stays yours. End-to-end encryption and complete privacy guaranteed.",
    color: "bg-secondary",
  },
  {
    icon: Target,
    title: "Context Aware",
    description: "Remembers your entire conversation history and adapts responses based on context.",
    color: "bg-warning",
  },
  {
    icon: Users,
    title: "Cultural Intelligence",
    description: "Understands your cultural background, beliefs, and values for truly relevant responses.",
    color: "bg-primary",
  },
  {
    icon: Sparkles,
    title: "Adaptive Personality",
    description: "Matches your communication style—whether you prefer direct, sarcastic, or philosophical.",
    color: "bg-accent",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Why Prometheus Is{" "}
            <span className="bg-accent text-accent-foreground px-4 inline-block border-4 border-foreground rotate-[2deg]">
              Different
            </span>
          </h2>
          <p className="text-xl font-bold text-muted-foreground max-w-2xl mx-auto">
            Not another generic chatbot. Prometheus actually understands you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                rotate: index % 2 === 0 ? 2 : -2,
              }}
              className="bg-card border-4 border-foreground brutalist-shadow p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div
                className={`w-16 h-16 ${feature.color} border-4 border-foreground flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
              <p className="font-bold text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
