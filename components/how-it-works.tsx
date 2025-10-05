"use client"

import { motion } from "framer-motion"
import { UserPlus, MessageSquare, Brain, Sparkles } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Profile",
    description:
      "Share your demographics, beliefs, personality traits, and preferences. The more you share, the better Prometheus understands you.",
    color: "bg-primary",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Learns You",
    description:
      "Our advanced model analyzes your profile to understand your worldview, communication style, and unique perspective.",
    color: "bg-accent",
  },
  {
    icon: MessageSquare,
    number: "03",
    title: "Start Conversing",
    description:
      "Chat naturally. Prometheus remembers context, adapts to your style, and provides genuinely personalized responses.",
    color: "bg-secondary",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Continuous Evolution",
    description:
      "The more you chat, the better it gets. Prometheus evolves with every conversation to serve you better.",
    color: "bg-warning",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            How It{" "}
            <span className="bg-secondary text-secondary-foreground px-4 inline-block border-4 border-foreground rotate-[-2deg]">
              Works
            </span>
          </h2>
          <p className="text-xl font-bold text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to unlock truly personalized AI conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card border-4 border-foreground brutalist-shadow p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 ${step.color} border-4 border-foreground flex items-center justify-center`}
                  >
                    <step.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="text-6xl font-black text-muted opacity-20">{step.number}</div>
                </div>
                <h3 className="text-xl font-black mb-3">{step.title}</h3>
                <p className="font-bold text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-1 bg-foreground z-10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
