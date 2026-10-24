import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Vercel vs Netlify: The Frontend Cloud',
  description: 'The Next.js Native vs The JAMstack Pioneer. Where should you host your modern web app?',
};

export default function VercelVsNetlify() {
  return (
    <DebateComparison
      title="Vercel vs Netlify"
      description="The battle for the 'Frontend Cloud'. Who offers the best Developer Experience (DX) for your site?"
      personaA={{
        name: "Vercel",
        role: "The Next.js Native",
        color: "black",
      }}
      personaB={{
        name: "Netlify",
        role: "The JAMstack Pioneer",
        color: "cyan",
      }}
      intro="They both revolutionized web hosting. Gone are the days of FTP and configuring Nginx. Now, you push to Git, and your site is live globally in seconds. Vercel, the creators of Next.js, vs Netlify, the creators of the term 'JAMstack'. Who wins?"
      turns={[
        {
          speaker: 'A',
          topic: 'Next.js',
          text: "I *am* Next.js. My team builds the framework. If you use Next.js, there is zero configuration required to deploy on me. I support every new feature the day it launches—Server Components, Image Optimization, Middleware, Incremental Static Regeneration (ISR). I optimize the infrastructure specifically for the framework. Why would you host a Next.js app anywhere else? I provide the 'golden path' for the most popular React framework in the world."
        },
        {
          speaker: 'B',
          topic: 'Open Web',
          text: "I champion the Open Web. I coined the term 'JAMstack'. I don't play favorites. Whether you use Astro, SvelteKit, Nuxt, Remix, Eleventy, or Next.js, I treat you like a first-class citizen. I am framework-agnostic. While you push everyone into your Vercel-proprietary features, I build on standards. My 'Netlify Drawer' allows for collaborative feedback on any deploy preview, regardless of the tech stack. I am the platform for *all* developers."
        },
        {
          speaker: 'A',
          topic: 'Performance',
          text: "My Edge Network is blazing fast. I have obsessed over the details of cold starts and static asset delivery. My 'Vercel Analytics' (formerly Speed Insights) gives you real-user performance data (Core Web Vitals) out of the box. I am not just hosting; I am a performance suite. My infrastructure is tuned to minimize latency for dynamic server-side rendering, which is critical for modern dynamic applications."
        },
        {
          speaker: 'B',
          topic: 'Features',
          text: "I offer features that simply make life easier. Netlify Forms? Just add an HTML attribute, and I handle the backend form submission for you. Netlify Identity? Authentication in five lines of code. Split Testing? I can route traffic to different Git branches for A/B testing at the edge. I focus on removing the need for a backend team. I empower frontend developers to build full-stack applications without managing databases or auth servers."
        },
        {
          speaker: 'A',
          topic: 'Enterprise',
          text: "I am winning the enterprise. Companies like Uber, Notion, and Washington Post trust me. My security features, enterprise support, and collaboration tools are world-class. I focus on the 'Frontend Cloud'—giving large teams the tools to ship faster. My previews are instantaneous. My distinct focus on the cutting edge of React and Serverless aligns with where the industry is heading."
        },
        {
          speaker: 'B',
          topic: 'Pricing',
          text: "My free tier is legendary. I offer generous limits on build minutes and bandwidth. For hobbyists and small agencies, I am often the more friendly choice. I don't lock you into a specific way of building. You can use my platform to host a simple HTML site or a complex enterprise app. I am the friendly, inclusive host that helped start this revolution, and I remain the most flexible option."
        }
      ]}
      conclusion="If you are building with Next.js, Vercel is the obvious choice—the integration is unbeatable. For almost any other framework (Nuxt, Svelte, Astro, plain HTML), or if you need built-in features like Forms and Auth without coding, Netlify is often superior."
      winner="Vercel (Next.js) / Netlify (Everything Else)"
    />
  );
}
