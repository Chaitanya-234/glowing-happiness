import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supabase vs Firebase: The BaaS Battle | DevMetrix',
  description: 'Supabase vs Firebase debate. Open source PostgreSQL vs Google\'s proprietary ecosystem.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Supabase vs Firebase"
      description="Open Source SQL vs Google's Realtime Giant."
      intro="Firebase defined the Backend-as-a-Service category. Supabase arrived as the 'Open Source Firebase Alternative'. It's a battle of philosophies: Proprietary vs Open Source, NoSQL vs SQL."
      personaA={{
        name: "Supabase Sentinel",
        role: "The Open Source SQL",
        color: "green"
      }}
      personaB={{
        name: "Firebase Phantom",
        role: "The Google Giant",
        color: "orange"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Database",
          text: "I give you full PostgreSQL. The world's most advanced open source database. You can run complex joins, geospatial queries, everything. You force users into a proprietary NoSQL box."
        },
        {
          speaker: "B",
          topic: "Realtime",
          text: "My realtime capabilities are legendary. Changes propagate instantly. It's effortless. And I scale to millions of connections without you lifting a finger."
        },
        {
          speaker: "A",
          topic: "Vendor Lock-in",
          text: "You own the developers. Once they use your proprietary APIs, they can't leave. I am just Postgres. You can `pg_dump` your data and host it anywhere else tomorrow."
        },
        {
          speaker: "B",
          topic: "Integration",
          text: "I am integrated into Google Cloud. Analytics, Crashlytics, AdMob... it's a seamless suite for mobile and web apps. You are just a database and auth."
        },
        {
          speaker: "A",
          topic: "Pricing",
          text: "My pricing is predictable. No surprise bills. And you can self-host me for free via Docker."
        }
      ]}
      conclusion="If you need relational data, avoid vendor lock-in, and love SQL, Supabase is the best choice. If you are building a mobile app that needs deep Google integration and simple realtime syncing, Firebase wins."
      winner="Supabase (For Flexibility)"
    />
  );
}
