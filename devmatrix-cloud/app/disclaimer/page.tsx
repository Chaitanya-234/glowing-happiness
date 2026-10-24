// app/disclaimer/page.tsx
export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="max-w-4xl mx-auto prose prose-invert">
        <h1>Disclaimer</h1>
        <p>Last updated: October 29, 2025</p>

        <h2>Professional Disclaimer</h2>
        <p>The information provided by DevMetrix ("we," "us," or "our") on
        devmetrix.cloud is for general informational purposes only...</p>

        <h2>Accuracy of Information</h2>
        <p>While we strive to keep information accurate and up-to-date,
        we make no representations or warranties...</p>

        <h2>External Links Disclaimer</h2>
        <p>Our website may contain links to external sites not operated by us...</p>
      </div>
    </div>
  );
}
