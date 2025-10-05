import type React from "react"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-provider"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { AppInitializer } from "@/components/app-initializer"

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Prometheus - Unfiltered AI Chat",
  description: "Experience AI conversations without boundaries. Prometheus adapts to you.",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prometheus",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Prometheus" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Prometheus" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/icon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icon.svg" color="#000000" />
        <link rel="shortcut icon" href="/icon.svg" />
      </head>
      <body className={`${urbanist.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <AppInitializer>
              <Suspense fallback={<div>Loading...</div>}>
                {children}
                <Analytics />
                <PWAInstallPrompt />
              </Suspense>
            </AppInitializer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
