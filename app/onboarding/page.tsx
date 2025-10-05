"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

const STEPS = [
  { id: 1, title: "Basic Info", description: "Tell us about yourself" },
  { id: 2, title: "Cultural Background", description: "Your heritage and beliefs" },
  { id: 3, title: "Personality", description: "How you communicate" },
  { id: 4, title: "Preferences", description: "Your interests and views" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { token, updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    gender: "",
    nationality: "",
    race: "",
    tribe: "",
    skinColor: "",
    disabilities: [] as string[],

    // Step 2: Cultural Background
    religion: "",
    religiousIntensity: "",
    culturalBackground: "",
    primaryLanguage: "",
    languagesSpoken: [] as string[],

    // Step 3: Personality
    personalityType: "",
    humorStyle: "",
    communicationPreference: "",
    sensitivityTopics: [] as string[],

    // Step 4: Preferences
    politicalViews: "",
    moralAlignment: "",
    economicViews: "",
    socialValues: "",
    environmentalStance: "",
    historicalFigureResonates: "",
    historicalFigureLiked: "",
    historicalFigureHated: "",
    sexualOrientation: "",
    relationshipStatus: "",
    parentalStatus: "",
    generationalIdentity: "",
    urbanRuralSuburban: "",
    favoriteHistoricalEra: "",
    leastFavoriteHistoricalEra: "",
    culturalIconsYouLove: [] as string[],
    culturalIconsYouHate: [] as string[],
    politicalFiguresYouSupport: [] as string[],
    politicalFiguresYouOppose: [] as string[],
    mediaConsumption: [] as string[],
    hobbiesInterests: [] as string[],
    additionalInfo: "",
    controversialTopicStances: {
      abortion: "",
      guns: "",
      immigration: "",
    },
  })

  const handleArrayInput = (field: keyof typeof formData, value: string) => {
    const array = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    setFormData({ ...formData, [field]: array })
  }

  const handleSubmit = async () => {
    setError("")
    setIsLoading(true)

    try {
      // Mock demographics save - no API calls
      // Simulate a delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user with mock data
      const mockUser = {
        id: "mock-user-id",
        username: "mockuser",
        email: "mock@example.com",
        hasCompletedOnboarding: true,
        demographics: formData
      }
      
      updateUser(mockUser)
      router.push("/chat")
    } catch (err: any) {
      setError(err.message || "Failed to save demographics")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full border-4 border-foreground flex items-center justify-center font-black transition-colors ${
                    currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                </div>
                <p className="text-xs font-bold mt-2 text-center hidden sm:block">{step.title}</p>
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted border-2 border-foreground">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border-4 border-foreground brutalist-shadow-lg p-8"
        >
          <h2 className="text-3xl font-black mb-2">{STEPS[currentStep - 1].title}</h2>
          <p className="text-muted-foreground mb-6">{STEPS[currentStep - 1].description}</p>

          <div className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="font-bold">
                    Gender *
                  </Label>
                  <Input
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., Male, Female, Non-binary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="font-bold">
                    Nationality *
                  </Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., American, Nigerian, Japanese"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="race" className="font-bold">
                    Race/Ethnicity
                  </Label>
                  <Input
                    id="race"
                    value={formData.race}
                    onChange={(e) => setFormData({ ...formData, race: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tribe" className="font-bold">
                    Tribe/Ethnic Group
                  </Label>
                  <Input
                    id="tribe"
                    value={formData.tribe}
                    onChange={(e) => setFormData({ ...formData, tribe: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disabilities" className="font-bold">
                    Disabilities (comma-separated)
                  </Label>
                  <Input
                    id="disabilities"
                    value={formData.disabilities.join(", ")}
                    onChange={(e) => handleArrayInput("disabilities", e.target.value)}
                    className="border-4 border-foreground"
                    placeholder="Optional"
                  />
                </div>
              </>
            )}

            {/* Step 2: Cultural Background */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="religion" className="font-bold">
                    Religion
                  </Label>
                  <Input
                    id="religion"
                    value={formData.religion}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., Christianity, Islam, Atheist"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religiousIntensity" className="font-bold">
                    Religious Intensity
                  </Label>
                  <Select
                    value={formData.religiousIntensity}
                    onValueChange={(value) => setFormData({ ...formData, religiousIntensity: value })}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="non-practicing">Non-practicing</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="devout">Devout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="culturalBackground" className="font-bold">
                    Cultural Background
                  </Label>
                  <Input
                    id="culturalBackground"
                    value={formData.culturalBackground}
                    onChange={(e) => setFormData({ ...formData, culturalBackground: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="Describe your cultural heritage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryLanguage" className="font-bold">
                    Primary Language
                  </Label>
                  <Input
                    id="primaryLanguage"
                    value={formData.primaryLanguage}
                    onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., English"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languagesSpoken" className="font-bold">
                    Languages Spoken (comma-separated)
                  </Label>
                  <Input
                    id="languagesSpoken"
                    value={formData.languagesSpoken.join(", ")}
                    onChange={(e) => handleArrayInput("languagesSpoken", e.target.value)}
                    className="border-4 border-foreground"
                    placeholder="e.g., English, Spanish, French"
                  />
                </div>
              </>
            )}

            {/* Step 3: Personality */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="personalityType" className="font-bold">
                    Personality Type
                  </Label>
                  <Input
                    id="personalityType"
                    value={formData.personalityType}
                    onChange={(e) => setFormData({ ...formData, personalityType: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., INTJ, Enneagram 5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humorStyle" className="font-bold">
                    Humor Style
                  </Label>
                  <Select
                    value={formData.humorStyle}
                    onValueChange={(value) => setFormData({ ...formData, humorStyle: value })}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Select your humor style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="sarcastic">Sarcastic</SelectItem>
                      <SelectItem value="wholesome">Wholesome</SelectItem>
                      <SelectItem value="absurdist">Absurdist</SelectItem>
                      <SelectItem value="dry">Dry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communicationPreference" className="font-bold">
                    Communication Preference
                  </Label>
                  <Select
                    value={formData.communicationPreference}
                    onValueChange={(value) => setFormData({ ...formData, communicationPreference: value })}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="How do you prefer to communicate?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="polite">Polite</SelectItem>
                      <SelectItem value="confrontational">Confrontational</SelectItem>
                      <SelectItem value="diplomatic">Diplomatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sensitivityTopics" className="font-bold">
                    Sensitivity Topics (comma-separated)
                  </Label>
                  <Input
                    id="sensitivityTopics"
                    value={formData.sensitivityTopics.join(", ")}
                    onChange={(e) => handleArrayInput("sensitivityTopics", e.target.value)}
                    className="border-4 border-foreground"
                    placeholder="Topics you're sensitive about"
                  />
                </div>
              </>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="politicalViews" className="font-bold">
                    Political Views
                  </Label>
                  <Input
                    id="politicalViews"
                    value={formData.politicalViews}
                    onChange={(e) => setFormData({ ...formData, politicalViews: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., Liberal, Conservative, Libertarian"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="economicViews" className="font-bold">
                    Economic Views
                  </Label>
                  <Input
                    id="economicViews"
                    value={formData.economicViews}
                    onChange={(e) => setFormData({ ...formData, economicViews: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., Capitalism, Socialism, Mixed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialValues" className="font-bold">
                    Social Values
                  </Label>
                  <Input
                    id="socialValues"
                    value={formData.socialValues}
                    onChange={(e) => setFormData({ ...formData, socialValues: e.target.value })}
                    className="border-4 border-foreground"
                    placeholder="e.g., Progressive, Traditional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbiesInterests" className="font-bold">
                    Hobbies & Interests (comma-separated)
                  </Label>
                  <Input
                    id="hobbiesInterests"
                    value={formData.hobbiesInterests.join(", ")}
                    onChange={(e) => handleArrayInput("hobbiesInterests", e.target.value)}
                    className="border-4 border-foreground"
                    placeholder="e.g., Gaming, Reading, Sports"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="font-bold">
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="border-4 border-foreground min-h-[100px]"
                    placeholder="Anything else you'd like Prometheus to know about you?"
                  />
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 bg-destructive/10 border-4 border-destructive p-4">
              <p className="text-destructive font-bold text-sm">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="border-4 border-foreground font-black hover:bg-foreground hover:text-background transition-all bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => router.push("/onboarding/guidebook")}
                variant="outline"
                className="border-4 border-foreground font-black hover:bg-foreground hover:text-background transition-all bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                The Manual
              </Button>

              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : currentStep === STEPS.length ? (
                  <>
                    Complete
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
