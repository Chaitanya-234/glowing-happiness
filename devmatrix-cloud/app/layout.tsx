// app/layout.tsx
import ChatbotWidget from '@/components/Chatbot/Chatbot';
import Navbar from '@/components/Navbar';
import { DEFAULT_THEME, noFlashScript } from '@/styles/theme/theme';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import GlassBackground from '../components/GlassBackground';
import { ThemeProvider } from '../styles/theme/ThemeProvider';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['400', '500', '600', '700', '800'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://devmetrix.in'),
  title: {
    default: 'Devmetrix.in - Free Developer Tools & Utilities',
    template: '%s | Devmetrix.in',
  },
  description:
    'Free online developer tools including JSON formatter, API tester, JWT decoder, regex playground, and more. No signup required. Privacy-focused tools for developers.',
  keywords: [
    'developer tools', 'json formatter', 'api tester', 'jwt decoder', 'regex tester', 'base64 encoder',
    'markdown converter', 'cron generator', 'free online tools', 'web development tools', 'programming utilities',
    'code tools', 'code examples', 'cheat sheets', 'programming tutorials', 'developer guides',
    'open source projects', 'technology comparisons', 'json formatter online', 'json validator',
    'api testing tool', 'api tester online', 'regex tester online', 'jwt decoder online',
    'base64 encoder decoder', 'markdown to html converter', 'html minifier', 'css minifier',
    'javascript beautifier', 'uuid generator online', 'cron expression generator',
    'best free developer tools online', 'tools for software developers', 'online tools for programmers',
    'web based coding utilities', 'developer productivity tools', 'free tools for web developers',
    'online code formatting tools', 'best coding tools for beginners', 'free tools for backend developers',
    'programming tutorials', 'code examples', 'developer cheat sheets', 'web development tutorials',
    'frontend development tools', 'backend development utilities', 'code debugging tools',
    'parse and format json', 'test rest api online', 'decode jwt token easily', 'generate secure tokens',
    'developer toolkit', 'software engineering resources', 'web tools for coding', 'online code helpers',
    'uml diagram creator', 'free uml diagram', 'free class diagram creator', 'toon-data-format',
  ],
  authors: [{ name: 'DevMetrix Team' }],
  creator: 'Devmetrix.in',
  publisher: 'Devmetrix.in',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmetrix.in',
    siteName: 'Devmetrix.in',
    title: 'Devmetrix.in - Free Developer Tools & Learning Resources',
    description: 'Free developer tools, code examples, cheat sheets, and tutorials. Everything developers need in one place.',
    images: [{ url: '/apple-touch-icon.png', width: 1200, height: 630, alt: 'Devmetrix.in - Developer Tools & Resources' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devmetrix.in - Free Developer Tools',
    description: 'Free online developer tools. No signup required.',
    images: ['/twitter-image.png'],
    creator: '@DevMetrix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: { google: 'G-F3YEGZM50M', yandex: '3dc4af1783d8e286' },
  alternates: { canonical: 'https://devmetrix.in' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const yandexVerify = typeof metadata.verification?.yandex === 'string' ? metadata.verification.yandex : '';

  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols (icons used by the glass theme) */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devmetrix.in' }],
            }),
          }}
        />

        <meta name="yandex-verification" content={yandexVerify} />

        {/* Google AdSense - MANUAL ADS ONLY (Auto ads are turned OFF) */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3483228469012203" crossOrigin="anonymous" strategy="afterInteractive" />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F3YEGZM50M" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3YEGZM50M');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Devmetrix.in',
              url: 'https://devmetrix.in',
              logo: 'https://devmetrix.in/icon.png',
              sameAs: ['https://twitter.com/DevMetrix', 'https://github.com/DevMetrix'],
              contactPoint: { '@type': 'ContactPoint', telephone: '+1-555-555-5555', contactType: 'Customer Service' },
            }),
          }}
        />
      </head>
      {/* Removed bg-white/dark:bg-black and text-gray-900: they would override the glass gradient and darken text */}
      <body className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
  <ThemeProvider>
    <GlassBackground />
    <Navbar />

    {children}

    <ChatbotWidget />
    <SpeedInsights />
  </ThemeProvider>

  {/* Yandex RTB Fullscreen Ad */}
  <Script id="yandex-rtb" strategy="afterInteractive">
    {`
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          "blockId": "R-A-17748158-1",
          "type": "fullscreen",
          "platform": "desktop"
        });
      });
    `}
  </Script>
</body>
    </html>
  );
}