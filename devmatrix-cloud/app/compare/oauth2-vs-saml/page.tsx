import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'OAuth 2.0 vs SAML: Identity Showdown',
  description: 'The Modern Standard vs The Enterprise XML. JSON vs XML. Mobile vs Corporate.',
};

export default function OAuthVsSAML() {
  return (
    <DebateComparison
      title="OAuth 2.0 vs SAML"
      description="How do you log in? The battle between the lightweight JSON protocol and the heavyweight XML standard."
      personaA={{
        name: "OAuth 2.0",
        role: "The Modern Standard",
        color: "blue",
      }}
      personaB={{
        name: "SAML",
        role: "The Enterprise XML",
        color: "red",
      }}
      intro="Identity is the perimeter. SAML (Security Assertion Markup Language) has guarded the enterprise gates for decades. OAuth 2.0 (and OIDC) rose with the mobile and API web. Is XML dead, or does it still hold the keys to the bank?"
      turns={[
        {
          speaker: 'A',
          topic: 'Modernity',
          text: "I am the language of the modern web. I use JSON (JavaScript Object Notation). I am lightweight, readable, and easy to parse in any language, especially JavaScript. I was built for the API economy. When you 'Log in with Google' or 'Log in with Facebook', that's me (via OpenID Connect). I support mobile apps, single-page apps (SPAs), and server-side apps equally well. You, SAML, are a relic of the SOAP era. XML is verbose, painful to parse, and hated by modern developers."
        },
        {
          speaker: 'B',
          topic: 'Enterprise',
          text: "I am the backbone of corporate security. I don't care about your 'developer experience'; I care about trust. SAML assertions are signed, encrypted, and robust. I allow disparate organizations to trust each other (Federation) without sharing user databases. When an employee leaves a company, I ensure their access to Salesforce, Slack, and Zoom is cut off instantly via the Identity Provider. I am the standard for SSO (Single Sign-On) in the Fortune 500."
        },
        {
          speaker: 'A',
          topic: 'Authorization',
          text: "You confuse Authentication with Authorization. I am an Authorization framework. I allow a user to grant a third-party app access to *specific* data (Scopes) without sharing their password. 'Can this app read my calendar but not my email?' I handle that elegantly with Access Tokens. You are an all-or-nothing Authentication protocol. Once you let them in, you are done. I continue to govern access to APIs long after the login is complete."
        },
        {
          speaker: 'B',
          topic: 'Security',
          text: "Your 'simplicity' leads to insecurity. How many times have we seen OAuth implementations hacked because of open redirect vulnerabilities or leaked tokens? Bearer tokens are like cash; if you steal one, you own the account. My XML signatures cover the entire message, preventing tampering. I have built-in mechanisms for audience restriction and validity periods that are rigorous. I was designed by security committees, not web developers."
        },
        {
          speaker: 'A',
          topic: 'Mobile',
          text: "Try implementing SAML on a mobile phone. Parsing XML on iOS or Android is a nightmare. I was designed for devices. My flows (Authorization Code with PKCE) are specifically secure for public clients like mobile apps. I work perfectly with native biometrics and modern authentication flows. You require a browser redirect dance that feels clunky and old-fashioned on a smartphone. The world has moved to mobile, and you were left on the desktop."
        },
        {
          speaker: 'B',
          topic: 'Legacy',
          text: "The world runs on legacy. Banks, governments, healthcare systems—they all speak SAML. If you want to sell software to the Enterprise, you must support me. You can wrap me in OIDC gateways, but deep down, the trust anchor is often SAML. I am stable. I don't have a new RFC every six months changing the best practices. I am the boring, reliable choice for serious business."
        }
      ]}
      conclusion="For consumer apps, mobile apps, and modern APIs, OAuth 2.0 (with OIDC) is the only choice. It's the standard. For internal enterprise applications, government systems, and legacy B2B integrations, SAML 2.0 is still the dominant requirement. Most modern Identity Providers (Auth0, Okta) support both."
      winner="OAuth 2.0 (Modern) / SAML (Enterprise)"
    />
  );
}
