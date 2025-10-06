"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/lib/auth-context"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { UserService } from "@/lib/api/services/user.service"
import { handleApiError } from "@/lib/utils/errorHandler"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, token, updateUser } = useAuthContext()
  const router = useRouter()

  const empty = useMemo(() => ({
    gender: "",
    nationality: "",
    race: "",
    tribe: "",
    skinColor: "",
    disabilities: [] as string[],
    politicalViews: "",
    moralAlignment: "",
    historicalFigureResonates: "",
    historicalFigureLiked: "",
    historicalFigureHated: "",
    additionalInfo: "",
    religion: "",
    religiousIntensity: "",
    culturalBackground: "",
    primaryLanguage: "",
    languagesSpoken: [] as string[],
    economicViews: "",
    socialValues: "",
    religiousPhilosophy: "",
    environmentalStance: "",
    controversialTopicStances: {
      abortion: "",
      guns: "",
      immigration: "",
    },
    sexualOrientation: "",
    relationshipStatus: "",
    parentalStatus: "",
    generationalIdentity: "",
    urbanRuralSuburban: "",
    personalityType: "",
    humorStyle: "",
    communicationPreference: "",
    sensitivityTopics: [] as string[],
    favoriteHistoricalEra: "",
    leastFavoriteHistoricalEra: "",
    culturalIconsYouLove: [] as string[],
    culturalIconsYouHate: [] as string[],
    politicalFiguresYouSupport: [] as string[],
    politicalFiguresYouOppose: [] as string[],
    mediaConsumption: [] as string[],
    hobbiesInterests: [] as string[],
  }), [])

  const [form, setForm] = useState(empty)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [riOther, setRiOther] = useState(false)
  const [humorOther, setHumorOther] = useState(false)
  const [commOther, setCommOther] = useState(false)
  const [ursOther, setUrsOther] = useState(false)

  const religiousIntensityOptions = ["non-practicing", "moderate", "devout"]
  const humorStyleOptions = ["dark", "sarcastic", "wholesome", "absurdist", "dry"]
  const communicationPreferenceOptions = ["direct", "polite", "confrontational", "diplomatic"]
  const urbanRuralSuburbanOptions = ["urban", "rural", "suburban"]

  useEffect(() => {
    if (isOpen) {
      setError("")
      setSuccess("")
      setIsEditing(false)
      ;(async () => {
        try {
          setIsLoading(true)
          if (!token) throw new Error("Not authenticated")
          const { demographics } = await UserService.getDemographics(token)
          const d = (demographics || {}) as any
          setForm({
            ...empty,
            ...d,
            disabilities: Array.isArray(d?.disabilities) ? d.disabilities : empty.disabilities,
            languagesSpoken: Array.isArray(d?.languagesSpoken) ? d.languagesSpoken : empty.languagesSpoken,
            sensitivityTopics: Array.isArray(d?.sensitivityTopics) ? d.sensitivityTopics : empty.sensitivityTopics,
            culturalIconsYouLove: Array.isArray(d?.culturalIconsYouLove) ? d.culturalIconsYouLove : empty.culturalIconsYouLove,
            culturalIconsYouHate: Array.isArray(d?.culturalIconsYouHate) ? d.culturalIconsYouHate : empty.culturalIconsYouHate,
            politicalFiguresYouSupport: Array.isArray(d?.politicalFiguresYouSupport) ? d.politicalFiguresYouSupport : empty.politicalFiguresYouSupport,
            politicalFiguresYouOppose: Array.isArray(d?.politicalFiguresYouOppose) ? d.politicalFiguresYouOppose : empty.politicalFiguresYouOppose,
            mediaConsumption: Array.isArray(d?.mediaConsumption) ? d.mediaConsumption : empty.mediaConsumption,
            hobbiesInterests: Array.isArray(d?.hobbiesInterests) ? d.hobbiesInterests : empty.hobbiesInterests,
            controversialTopicStances: {
              ...empty.controversialTopicStances,
              ...(d?.controversialTopicStances || {}),
            },
          })
        } catch (e: any) {
          setError(handleApiError(e))
        } finally {
          setIsLoading(false)
        }
      })()
    }
  }, [isOpen, user, empty])

  const handleArrayChange = (key: keyof typeof form, value: string) => {
    const arr = value.split(",").map((s) => s.trim()).filter(Boolean)
    setForm((prev) => ({ ...prev, [key]: arr as any }))
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")
    setIsSaving(true)
    try {
      if (!token) throw new Error("Not authenticated")
      const { demographics } = await UserService.putDemographics(form, token)
      updateUser({ ...(user as any), demographics })
      setSuccess("Saved!")
      onClose()
    } catch (e: any) {
      setError(handleApiError(e))
    } finally {
      setIsSaving(false)
    }
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
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-4 border-foreground font-black bg-primary-foreground text-primary"
                    disabled={isLoading}
                  >
                    Edit
                  </Button>
                )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="border-4 border-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!isEditing ? (
                <div className="space-y-6">
                  {isLoading ? (
                    <div className="text-sm font-bold">Loading...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(
                        [
                          ["gender", form.gender],
                          ["nationality", form.nationality],
                          ["race", form.race],
                          ["tribe", form.tribe],
                          ["skinColor", form.skinColor],
                          ["religion", form.religion],
                          ["religiousIntensity", form.religiousIntensity],
                          ["religiousPhilosophy", form.religiousPhilosophy],
                          ["culturalBackground", form.culturalBackground],
                          ["primaryLanguage", form.primaryLanguage],
                          ["personalityType", form.personalityType],
                          ["humorStyle", form.humorStyle],
                          ["communicationPreference", form.communicationPreference],
                          ["politicalViews", form.politicalViews],
                          ["moralAlignment", form.moralAlignment],
                          ["economicViews", form.economicViews],
                          ["socialValues", form.socialValues],
                          ["environmentalStance", form.environmentalStance],
                          ["sexualOrientation", form.sexualOrientation],
                          ["relationshipStatus", form.relationshipStatus],
                          ["parentalStatus", form.parentalStatus],
                          ["generationalIdentity", form.generationalIdentity],
                          ["urbanRuralSuburban", form.urbanRuralSuburban],
                          ["favoriteHistoricalEra", form.favoriteHistoricalEra],
                          ["leastFavoriteHistoricalEra", form.leastFavoriteHistoricalEra],
                          ["historicalFigureResonates", form.historicalFigureResonates],
                          ["historicalFigureLiked", form.historicalFigureLiked],
                          ["historicalFigureHated", form.historicalFigureHated],
                        ] as [string, any][]
                      ).map(([label, value]) => (
                        <div key={label} className="space-y-1">
                          <div className="text-sm font-bold opacity-70 uppercase tracking-wide">{label}</div>
                          <div className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground inline-block">
                            {value || "Not specified"}
                          </div>
                        </div>
                      ))}

                      {(
                        [
                          ["disabilities", form.disabilities],
                          ["languagesSpoken", form.languagesSpoken],
                          ["sensitivityTopics", form.sensitivityTopics],
                          ["culturalIconsYouLove", form.culturalIconsYouLove],
                          ["culturalIconsYouHate", form.culturalIconsYouHate],
                          ["politicalFiguresYouSupport", form.politicalFiguresYouSupport],
                          ["politicalFiguresYouOppose", form.politicalFiguresYouOppose],
                          ["mediaConsumption", form.mediaConsumption],
                          ["hobbiesInterests", form.hobbiesInterests],
                        ] as [string, string[]][]
                      ).map(([label, arr]) => (
                        <div key={label} className="space-y-1 md:col-span-2">
                          <div className="text-sm font-bold opacity-70 uppercase tracking-wide">{label}</div>
                          <div className="flex flex-wrap gap-2">
                            {arr?.length ? (
                              arr.map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-primary text-primary-foreground border-2 border-foreground text-sm">
                                  {item}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground inline-block">None</span>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="space-y-1 md:col-span-2">
                        <div className="text-sm font-bold opacity-70 uppercase tracking-wide">controversialTopicStances</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground">Abortion: {form.controversialTopicStances.abortion || "Not specified"}</div>
                          <div className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground">Guns: {form.controversialTopicStances.guns || "Not specified"}</div>
                          <div className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground">Immigration: {form.controversialTopicStances.immigration || "Not specified"}</div>
                        </div>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <div className="text-sm font-bold opacity-70 uppercase tracking-wide">additionalInfo</div>
                        <div className="px-3 py-2 bg-secondary text-secondary-foreground border-2 border-foreground">
                          {form.additionalInfo || "Not specified"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* existing editable form retained below */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} placeholder="Gender" className="border-4 border-foreground" />
                <Input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} placeholder="Nationality" className="border-4 border-foreground" />
                <Input value={form.race} onChange={(e) => setForm({ ...form, race: e.target.value })} placeholder="Race" className="border-4 border-foreground" />
                <Input value={form.tribe} onChange={(e) => setForm({ ...form, tribe: e.target.value })} placeholder="Tribe" className="border-4 border-foreground" />
                <Input value={form.skinColor} onChange={(e) => setForm({ ...form, skinColor: e.target.value })} placeholder="Skin Color" className="border-4 border-foreground" />
                <Input value={form.religion} onChange={(e) => setForm({ ...form, religion: e.target.value })} placeholder="Religion" className="border-4 border-foreground" />
                <div className="space-y-2">
                  <Select
                    value={riOther || !religiousIntensityOptions.includes(form.religiousIntensity) ? "__other__" : form.religiousIntensity}
                    onValueChange={(value) => {
                      if (value === "__other__") {
                        setRiOther(true)
                      } else {
                        setRiOther(false)
                        setForm({ ...form, religiousIntensity: value })
                      }
                    }}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Religious Intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {religiousIntensityOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {riOther && (
                    <Input value={form.religiousIntensity} onChange={(e) => setForm({ ...form, religiousIntensity: e.target.value })} placeholder="Specify religious intensity" className="border-4 border-foreground" />
                  )}
                </div>
                <Input value={form.religiousPhilosophy} onChange={(e) => setForm({ ...form, religiousPhilosophy: e.target.value })} placeholder="Religious Philosophy" className="border-4 border-foreground" />
                <Input value={form.culturalBackground} onChange={(e) => setForm({ ...form, culturalBackground: e.target.value })} placeholder="Cultural Background" className="border-4 border-foreground" />
                <Input value={form.primaryLanguage} onChange={(e) => setForm({ ...form, primaryLanguage: e.target.value })} placeholder="Primary Language" className="border-4 border-foreground" />
                <Input value={form.personalityType} onChange={(e) => setForm({ ...form, personalityType: e.target.value })} placeholder="Personality Type" className="border-4 border-foreground" />
                <div className="space-y-2">
                  <Select
                    value={humorOther || !humorStyleOptions.includes(form.humorStyle) ? "__other__" : form.humorStyle}
                    onValueChange={(value) => {
                      if (value === "__other__") {
                        setHumorOther(true)
                      } else {
                        setHumorOther(false)
                        setForm({ ...form, humorStyle: value })
                      }
                    }}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Humor Style" />
                    </SelectTrigger>
                    <SelectContent>
                      {humorStyleOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {humorOther && (
                    <Input value={form.humorStyle} onChange={(e) => setForm({ ...form, humorStyle: e.target.value })} placeholder="Specify humor style" className="border-4 border-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Select
                    value={commOther || !communicationPreferenceOptions.includes(form.communicationPreference) ? "__other__" : form.communicationPreference}
                    onValueChange={(value) => {
                      if (value === "__other__") {
                        setCommOther(true)
                      } else {
                        setCommOther(false)
                        setForm({ ...form, communicationPreference: value })
                      }
                    }}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Communication Preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {communicationPreferenceOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {commOther && (
                    <Input value={form.communicationPreference} onChange={(e) => setForm({ ...form, communicationPreference: e.target.value })} placeholder="Specify communication preference" className="border-4 border-foreground" />
                  )}
                </div>
                <Input value={form.politicalViews} onChange={(e) => setForm({ ...form, politicalViews: e.target.value })} placeholder="Political Views" className="border-4 border-foreground" />
                <Input value={form.moralAlignment} onChange={(e) => setForm({ ...form, moralAlignment: e.target.value })} placeholder="Moral Alignment" className="border-4 border-foreground" />
                <Input value={form.economicViews} onChange={(e) => setForm({ ...form, economicViews: e.target.value })} placeholder="Economic Views" className="border-4 border-foreground" />
                <Input value={form.socialValues} onChange={(e) => setForm({ ...form, socialValues: e.target.value })} placeholder="Social Values" className="border-4 border-foreground" />
                <Input value={form.environmentalStance} onChange={(e) => setForm({ ...form, environmentalStance: e.target.value })} placeholder="Environmental Stance" className="border-4 border-foreground" />
                <Input value={form.sexualOrientation} onChange={(e) => setForm({ ...form, sexualOrientation: e.target.value })} placeholder="Sexual Orientation" className="border-4 border-foreground" />
                <Input value={form.relationshipStatus} onChange={(e) => setForm({ ...form, relationshipStatus: e.target.value })} placeholder="Relationship Status" className="border-4 border-foreground" />
                <Input value={form.parentalStatus} onChange={(e) => setForm({ ...form, parentalStatus: e.target.value })} placeholder="Parental Status" className="border-4 border-foreground" />
                <Input value={form.generationalIdentity} onChange={(e) => setForm({ ...form, generationalIdentity: e.target.value })} placeholder="Generational Identity" className="border-4 border-foreground" />
                <div className="space-y-2">
                  <Select
                    value={ursOther || !urbanRuralSuburbanOptions.includes(form.urbanRuralSuburban) ? "__other__" : form.urbanRuralSuburban}
                    onValueChange={(value) => {
                      if (value === "__other__") {
                        setUrsOther(true)
                      } else {
                        setUrsOther(false)
                        setForm({ ...form, urbanRuralSuburban: value })
                      }
                    }}
                  >
                    <SelectTrigger className="border-4 border-foreground">
                      <SelectValue placeholder="Urban/Rural/Suburban" />
                    </SelectTrigger>
                    <SelectContent>
                      {urbanRuralSuburbanOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {ursOther && (
                    <Input value={form.urbanRuralSuburban} onChange={(e) => setForm({ ...form, urbanRuralSuburban: e.target.value })} placeholder="Specify location context" className="border-4 border-foreground" />
                  )}
                </div>
                <Input value={form.favoriteHistoricalEra} onChange={(e) => setForm({ ...form, favoriteHistoricalEra: e.target.value })} placeholder="Favorite Historical Era" className="border-4 border-foreground" />
                <Input value={form.leastFavoriteHistoricalEra} onChange={(e) => setForm({ ...form, leastFavoriteHistoricalEra: e.target.value })} placeholder="Least Favorite Historical Era" className="border-4 border-foreground" />
                <Input value={form.historicalFigureResonates} onChange={(e) => setForm({ ...form, historicalFigureResonates: e.target.value })} placeholder="Historical Figure You Resonate With" className="border-4 border-foreground" />
                <Input value={form.historicalFigureLiked} onChange={(e) => setForm({ ...form, historicalFigureLiked: e.target.value })} placeholder="Historical Figure You Like" className="border-4 border-foreground" />
                <Input value={form.historicalFigureHated} onChange={(e) => setForm({ ...form, historicalFigureHated: e.target.value })} placeholder="Historical Figure You Dislike" className="border-4 border-foreground" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={form.disabilities.join(", ")}
                  onChange={(e) => handleArrayChange("disabilities", e.target.value)}
                  placeholder="Disabilities (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.languagesSpoken.join(", ")}
                  onChange={(e) => handleArrayChange("languagesSpoken", e.target.value)}
                  placeholder="Languages Spoken (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.sensitivityTopics.join(", ")}
                  onChange={(e) => handleArrayChange("sensitivityTopics", e.target.value)}
                  placeholder="Sensitivity Topics (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.culturalIconsYouLove.join(", ")}
                  onChange={(e) => handleArrayChange("culturalIconsYouLove", e.target.value)}
                  placeholder="Cultural Icons You Love (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.culturalIconsYouHate.join(", ")}
                  onChange={(e) => handleArrayChange("culturalIconsYouHate", e.target.value)}
                  placeholder="Cultural Icons You Dislike (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.politicalFiguresYouSupport.join(", ")}
                  onChange={(e) => handleArrayChange("politicalFiguresYouSupport", e.target.value)}
                  placeholder="Political Figures You Support (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.politicalFiguresYouOppose.join(", ")}
                  onChange={(e) => handleArrayChange("politicalFiguresYouOppose", e.target.value)}
                  placeholder="Political Figures You Oppose (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.mediaConsumption.join(", ")}
                  onChange={(e) => handleArrayChange("mediaConsumption", e.target.value)}
                  placeholder="Media Consumption (comma-separated)"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.hobbiesInterests.join(", ")}
                  onChange={(e) => handleArrayChange("hobbiesInterests", e.target.value)}
                  placeholder="Hobbies & Interests (comma-separated)"
                  className="border-4 border-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  value={form.controversialTopicStances.abortion}
                  onChange={(e) => setForm({ ...form, controversialTopicStances: { ...form.controversialTopicStances, abortion: e.target.value } })}
                  placeholder="Abortion stance"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.controversialTopicStances.guns}
                  onChange={(e) => setForm({ ...form, controversialTopicStances: { ...form.controversialTopicStances, guns: e.target.value } })}
                  placeholder="Guns stance"
                  className="border-4 border-foreground"
                />
                <Input
                  value={form.controversialTopicStances.immigration}
                  onChange={(e) => setForm({ ...form, controversialTopicStances: { ...form.controversialTopicStances, immigration: e.target.value } })}
                  placeholder="Immigration stance"
                  className="border-4 border-foreground"
                />
              </div>

              <Textarea
                value={form.additionalInfo}
                onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                placeholder="Additional information"
                className="border-4 border-foreground min-h-[100px]"
              />

              {error && (
                <div className="bg-destructive/10 border-4 border-destructive p-3 text-sm font-bold">{error}</div>
              )}
              {success && (
                <div className="bg-emerald-100 border-4 border-foreground p-3 text-sm font-bold">{success}</div>
              )}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => router.push("/onboarding/guidebook")}
                  className="border-4 border-foreground font-black"
                >
                  Open Manual
                </Button>
              </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t-8 border-foreground bg-card flex items-center justify-end gap-3">
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-4 border-foreground font-black"
                >
                  Close
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-4 border-foreground font-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
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
