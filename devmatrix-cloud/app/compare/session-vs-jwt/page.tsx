import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Session vs JWT: Authentication Battle | DevMetrix',
  description: 'Session vs JWT debate. Stateful server-side sessions vs stateless client-side tokens.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Session vs JWT"
      description="Stateful vs Stateless Authentication."
      intro="How do you keep users logged in? Sessions stored on the server? Or JSON Web Tokens stored on the client? It's the classic debate of Security vs Scalability."
      personaA={{
        name: "Session Sentinel",
        role: "The Secure State",
        color: "blue"
      }}
      personaB={{
        name: "JWT Juggernaut",
        role: "The Stateless Token",
        color: "yellow"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Security",
          text: "I am secure. The session ID is just a random string. The data lives on the server. If a user is compromised, I delete the session server-side. Instant revocation."
        },
        {
          speaker: "B",
          topic: "Scalability",
          text: "I am stateless. You don't need to check a database for every request. The data is in the token. I scale across microservices and regions effortlessly."
        },
        {
          speaker: "A",
          topic: "Revocation",
          text: "But you can't be revoked! If a JWT is stolen, it's valid until it expires. You have to implement complex blacklists, which defeats your stateless purpose."
        },
        {
          speaker: "B",
          topic: "Cross-Domain",
          text: "I work everywhere. Mobile apps, SPAs, different domains. Cookies are tricky with CORS. I am just a header: `Authorization: Bearer`."
        },
        {
          speaker: "A",
          topic: "Bandwidth",
          text: "My cookie is tiny. Your token gets huge with claims. And storing you in LocalStorage is an XSS vulnerability waiting to happen."
        }
      ]}
      conclusion="For most standard web applications, Server-side Sessions (HttpOnly cookies) are more secure and easier to manage. JWTs are excellent for microservices architectures or mobile apps where centralized session state is a bottleneck."
      winner="Sessions for Web, JWT for API"
    />
  );
}
