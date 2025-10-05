"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4 bg-foreground text-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-warning text-warning-foreground px-6 py-3 border-4 border-background mb-8 font-black"
          >
            <AlertTriangle className="w-5 h-5" />
            18+ ONLY - UNFILTERED CONTENT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            Ready for AI Without{" "}
            <span className="bg-accent text-accent-foreground px-4 inline-block border-4 border-background rotate-[2deg]">
              Boundaries?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-bold mb-10 text-background/80 leading-relaxed"
          >
            Join thousands experiencing truly personalized AI conversations. No corporate filters. No generic responses.
            Just real talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground border-4 border-background brutalist-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all font-black text-lg px-10 py-7 w-full sm:w-auto"
              >
                Start Your First Chat <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground border-4 border-background font-black text-lg px-10 py-7 hover:bg-background/90 transition-all w-full sm:w-auto"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm font-bold text-background/60"
          >
            Free to start • No credit card required • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
