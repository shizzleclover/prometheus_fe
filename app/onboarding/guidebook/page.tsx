"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Users, Globe, Brain, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

const DEMOGRAPHIC_SECTIONS = [
  {
    id: "basic-info",
    title: "Basic Info",
    icon: Users,
    description: "The fundamental aspects of your identity",
    fields: [
      {
        name: "Gender",
        explanation: "Your gender identity - how you see yourself and want to be seen. This helps Prometheus understand your perspective and experiences. Examples: Male, Female, Non-binary, Genderfluid, Agender, etc. Choose what feels most authentic to you.",
        examples: ["Male", "Female", "Non-binary", "Genderfluid", "Agender", "Demiboy", "Demigirl"]
      },
      {
        name: "Nationality",
        explanation: "The country you identify with or hold citizenship in. This shapes your cultural background, values, and worldview. It's about where you feel you belong, not just where you were born.",
        examples: ["American", "Nigerian", "Japanese", "Brazilian", "German", "Indian", "Canadian"]
      },
      {
        name: "Race/Ethnicity",
        explanation: "Your racial or ethnic background - the cultural groups you identify with. This helps Prometheus understand your heritage and the unique perspectives that come with it.",
        examples: ["Black/African American", "White", "Asian", "Hispanic/Latino", "Native American", "Mixed Race", "Middle Eastern"]
      },
      {
        name: "Tribe/Ethnic Group",
        explanation: "Your specific ethnic group or tribe within your race. This gives Prometheus deeper insight into your cultural traditions and values.",
        examples: ["Yoruba", "Igbo", "Hausa", "Cherokee", "Navajo", "Han Chinese", "Ashkenazi Jewish"]
      },
      {
        name: "Skin Color",
        explanation: "Your skin tone - this affects how you experience the world and how others perceive you. It's part of your identity and lived experience.",
        examples: ["Very Light", "Light", "Medium", "Olive", "Tan", "Dark", "Very Dark"]
      },
      {
        name: "Disabilities",
        explanation: "Any physical, mental, or learning differences that affect how you experience the world. This helps Prometheus understand your unique perspective and needs.",
        examples: ["ADHD", "Autism", "Dyslexia", "Mobility Impairment", "Visual Impairment", "Hearing Impairment", "Mental Health Conditions"]
      }
    ]
  },
  {
    id: "cultural-background",
    title: "Cultural Background",
    icon: Globe,
    description: "Your heritage, beliefs, and cultural identity",
    fields: [
      {
        name: "Religion",
        explanation: "Your religious or spiritual beliefs - or lack thereof. This shapes your values, worldview, and how you approach life's big questions.",
        examples: ["Christianity", "Islam", "Judaism", "Hinduism", "Buddhism", "Atheist", "Agnostic", "Spiritual but not religious"]
      },
      {
        name: "Religious Intensity",
        explanation: "How important religion is in your daily life and decision-making. This helps Prometheus understand how your beliefs influence your thoughts and actions.",
        examples: ["Non-practicing", "Moderate", "Devout"]
      },
      {
        name: "Cultural Background",
        explanation: "The cultural traditions, values, and practices you grew up with or identify with. This includes family traditions, cultural celebrations, and shared values.",
        examples: ["Western", "Eastern", "African", "Latin American", "Middle Eastern", "Indigenous", "Mixed Cultural Heritage"]
      },
      {
        name: "Primary Language",
        explanation: "The language you think and dream in - your native or most comfortable language. This affects how you express yourself and understand the world.",
        examples: ["English", "Spanish", "French", "Mandarin", "Arabic", "Hindi", "Portuguese", "German"]
      },
      {
        name: "Languages Spoken",
        explanation: "All the languages you can communicate in. This shows your multicultural perspective and ability to connect with different communities.",
        examples: ["English, Spanish", "English, French, Arabic", "Mandarin, English", "English, Hindi, Tamil"]
      }
    ]
  },
  {
    id: "personality",
    title: "Personality",
    icon: Brain,
    description: "How you think, communicate, and interact with the world",
    fields: [
      {
        name: "Personality Type",
        explanation: "Your psychological type based on frameworks like Myers-Briggs or Enneagram. This helps Prometheus understand your natural tendencies and preferences.",
        examples: ["INTJ", "ENFP", "ISTP", "Enneagram 5", "Enneagram 8", "Big Five: High Openness", "Big Five: High Conscientiousness"]
      },
      {
        name: "Humor Style",
        explanation: "The type of humor you enjoy and use. This affects how Prometheus communicates with you and what kind of jokes or references you'll appreciate.",
        examples: ["Dark", "Sarcastic", "Wholesome", "Absurdist", "Dry", "Self-deprecating", "Observational"]
      },
      {
        name: "Communication Preference",
        explanation: "How you prefer to communicate and be communicated with. This helps Prometheus match your communication style.",
        examples: ["Direct", "Polite", "Confrontational", "Diplomatic", "Analytical", "Emotional", "Logical"]
      },
      {
        name: "Sensitivity Topics",
        explanation: "Topics that are particularly sensitive or important to you. This helps Prometheus avoid triggering topics and understand your boundaries.",
        examples: ["Mental Health", "Family Issues", "Trauma", "Political Topics", "Religious Beliefs", "Body Image", "Relationships"]
      }
    ]
  },
  {
    id: "preferences",
    title: "Preferences",
    icon: Heart,
    description: "Your views, interests, and what matters to you",
    fields: [
      {
        name: "Political Views",
        explanation: "Your political ideology and stance on key issues. This helps Prometheus understand your values and how you view society and governance.",
        examples: ["Liberal", "Conservative", "Libertarian", "Progressive", "Moderate", "Socialist", "Independent"]
      },
      {
        name: "Economic Views",
        explanation: "Your views on economic systems and policies. This shapes how you think about wealth, work, and social issues.",
        examples: ["Capitalism", "Socialism", "Mixed Economy", "Free Market", "Regulated Market", "Cooperative Economy"]
      },
      {
        name: "Social Values",
        explanation: "Your core social values and what you believe is important for society. This affects your views on relationships, community, and social issues.",
        examples: ["Progressive", "Traditional", "Individualist", "Collectivist", "Egalitarian", "Meritocratic"]
      },
      {
        name: "Environmental Stance",
        explanation: "Your views on environmental issues and sustainability. This shows what you value about the planet and future generations.",
        examples: ["Environmentalist", "Climate Conscious", "Sustainable Living", "Green Technology", "Conservation", "Climate Skeptic"]
      },
      {
        name: "Hobbies & Interests",
        explanation: "What you enjoy doing in your free time. This helps Prometheus understand your personality and what topics you might find interesting.",
        examples: ["Gaming", "Reading", "Sports", "Art", "Music", "Cooking", "Travel", "Photography", "Gardening"]
      },
      {
        name: "Additional Information",
        explanation: "Anything else you want Prometheus to know about you. This is your chance to share unique aspects of your identity, experiences, or perspectives.",
        examples: ["I'm a night owl", "I love learning languages", "I'm passionate about social justice", "I'm a parent", "I'm an entrepreneur"]
      }
    ]
  }
]

export default function GuidebookPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b-4 border-foreground bg-card p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-4 border-foreground font-black hover:bg-foreground hover:text-background transition-all bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center brutalist-shadow-sm">
                <BookOpen className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-black">The Manual to Your Demographics</h1>
                <p className="text-muted-foreground">Understanding each field to help you make the best choices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-4 border-foreground brutalist-shadow-lg p-8"
        >
          <h2 className="text-2xl font-black mb-4">Why These Questions Matter</h2>
          <p className="text-lg leading-relaxed mb-4">
            Prometheus learns from your responses to understand your unique perspective. Each demographic field helps create a more personalized and relevant experience. Think of it as giving Prometheus a roadmap to your mind.
          </p>
          <p className="text-lg leading-relaxed">
            <strong>Remember:</strong> There are no right or wrong answers. Be honest about who you are - this helps Prometheus serve you better. You can always update your information later.
          </p>
        </motion.div>

        {DEMOGRAPHIC_SECTIONS.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-card border-4 border-foreground brutalist-shadow-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground border-4 border-foreground flex items-center justify-center brutalist-shadow-sm">
                <section.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black">{section.title}</h2>
                <p className="text-muted-foreground text-lg">{section.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {section.fields.map((field, fieldIndex) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (fieldIndex * 0.05) }}
                  className="border-4 border-foreground bg-background p-6"
                >
                  <h3 className="text-xl font-black mb-3">{field.name}</h3>
                  <p className="text-base leading-relaxed mb-4">{field.explanation}</p>
                  <div>
                    <h4 className="font-bold mb-2">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {field.examples.map((example, exampleIndex) => (
                        <span
                          key={exampleIndex}
                          className="bg-primary/10 text-primary border-2 border-primary px-3 py-1 text-sm font-bold"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border-4 border-foreground brutalist-shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-black mb-4">Ready to Continue?</h2>
          <p className="text-lg mb-6">
            Now that you understand what each field means, you can make informed choices that truly represent who you are.
          </p>
          <Button
            onClick={() => router.back()}
            className="bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black text-lg px-8 py-4"
          >
            Continue to Onboarding
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
