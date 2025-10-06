"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, Globe, Heart, Brain, Sparkles, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/lib/auth-context"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user } = useAuthContext()

  // Mock demographic data - in production, this would come from the user profile
  const demographics = {
    basic: {
      username: user?.username || "N/A",
      email: user?.email || "N/A",
      gender: "Non-binary",
      nationality: "American",
    },
    identity: {
      race: "Mixed",
      tribe: "N/A",
      skinColor: "Brown",
      disabilities: ["None"],
      sexualOrientation: "Pansexual",
      relationshipStatus: "Single",
      parentalStatus: "No children",
      generationalIdentity: "Gen-Z",
      urbanRuralSuburban: "Urban",
    },
    ideology: {
      politicalViews: "Progressive",
      economicViews: "Mixed economy",
      socialValues: "Progressive",
      environmentalStance: "Climate activist",
      moralAlignment: "Chaotic Good",
    },
    cultural: {
      religion: "Agnostic",
      religiousIntensity: "Non-practicing",
      culturalBackground: "Multicultural",
      primaryLanguage: "English",
      languagesSpoken: ["English", "Spanish", "French"],
    },
    personality: {
      personalityType: "ENFP",
      humorStyle: "Sarcastic & Absurdist",
      communicationPreference: "Direct but friendly",
      sensitivityTopics: ["Animal cruelty", "Child abuse"],
    },
    preferences: {
      historicalFigureResonates: "Ada Lovelace",
      historicalFigureLiked: "Alan Turing",
      historicalFigureHated: "N/A",
      favoriteHistoricalEra: "Renaissance",
      leastFavoriteHistoricalEra: "Dark Ages",
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-background border-8 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b-8 border-foreground flex items-center justify-between bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8" />
                <div>
                  <h2 className="text-3xl font-black">Your Profile</h2>
                  <p className="text-sm opacity-90">How Prometheus knows you</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="border-4 border-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Info */}
              <ProfileSection
                icon={<User className="h-6 w-6" />}
                title="Basic Information"
                color="bg-blue-500"
                data={demographics.basic}
              />

              {/* Identity */}
              <ProfileSection
                icon={<Heart className="h-6 w-6" />}
                title="Personal Identity"
                color="bg-pink-500"
                data={demographics.identity}
              />

              {/* Ideology */}
              <ProfileSection
                icon={<Shield className="h-6 w-6" />}
                title="Beliefs & Values"
                color="bg-purple-500"
                data={demographics.ideology}
              />

              {/* Cultural */}
              <ProfileSection
                icon={<Globe className="h-6 w-6" />}
                title="Cultural Background"
                color="bg-green-500"
                data={demographics.cultural}
              />

              {/* Personality */}
              <ProfileSection
                icon={<Brain className="h-6 w-6" />}
                title="Personality & Style"
                color="bg-orange-500"
                data={demographics.personality}
              />

              {/* Preferences */}
              <ProfileSection
                icon={<Sparkles className="h-6 w-6" />}
                title="Preferences & Resonance"
                color="bg-yellow-500"
                data={demographics.preferences}
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t-8 border-foreground bg-card">
              <p className="text-sm text-center opacity-70">
                This data helps Prometheus personalize responses to match your unique perspective and communication
                style.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface ProfileSectionProps {
  icon: React.ReactNode
  title: string
  color: string
  data: Record<string, any>
}

function ProfileSection({ icon, title, color, data }: ProfileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-4 border-foreground bg-card overflow-hidden"
    >
      <div className={`${color} text-white p-4 border-b-4 border-foreground flex items-center gap-3`}>
        {icon}
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <dt className="text-sm font-bold opacity-70 uppercase tracking-wide">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </dt>
            <dd className="text-base font-medium">
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">
                  {value.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary text-primary-foreground border-2 border-foreground text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground inline-block">
                  {value || "Not specified"}
                </span>
              )}
            </dd>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
