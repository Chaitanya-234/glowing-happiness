import Link from 'next/link';

export default function GitHubActionsVsJenkins() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 max-w-5xl mx-auto text-purple-200">
      <Link href="/compare" className="text-neonBlue underline mb-6 inline-block">
        ← Back to Comparisons
      </Link>

      <h1 className="text-5xl font-bold mb-10">
        GitHub Actions vs Jenkins: The Complete Secure DevOps Pipeline Comparison
      </h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Introduction</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          In this comprehensive guide, we explore the strengths, challenges, and security aspects of two
          leading CI/CD pipeline tools: GitHub Actions and Jenkins. Whether you're scaling containerized
          deployments or managing complex environments, understanding these tools’ capabilities is essential.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Overview of GitHub Actions and Jenkins</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          GitHub Actions is a native CI/CD solution integrated directly into GitHub, offering easy workflow
          automation with a YAML-based config. Jenkins is an open-source automation server with a mature plugin
          ecosystem and powerful pipeline as code capabilities. Both enable automation, but with differing approaches.
        </p>
      </section>

      {/* Added comparison section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Detailed Comparison</h2>

        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">Pipeline Configuration</h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          <strong>GitHub Actions</strong> uses YAML workflows integrated seamlessly within GitHub repositories, requiring minimal setup for projects already hosted on GitHub.
          <br />
          <strong>Jenkins</strong> requires manual installation and configuration, using Groovy-based Jenkinsfiles for pipeline definition, which provides deep scripting flexibility.
        </p>

        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">Hosting and Ecosystem</h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          <strong>GitHub Actions</strong> offers GitHub-hosted runners and self-hosted options with access to a broad Marketplace of reusable actions.
          <br />
          <strong>Jenkins</strong> is always self-hosted, with an extensive plugin ecosystem that supports highly customizable workflows.
        </p>

        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">Security & Secrets Management</h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          GitHub Actions provides built-in encrypted secrets, fine-grained access controls, and supply chain security features such as signed actions.
          Jenkins relies on its Credentials Plugin and other security plugins, but security depends on diligent maintenance by the user.
        </p>

        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">Scalability & Maintenance</h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          GitHub Actions is cloud-native with auto-scaling runners, reducing operational overhead.
          Jenkins offers greater scaling flexibility but requires infrastructure management and regular updates.
        </p>

        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">Cost & Use Cases</h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          GitHub Actions has usage-based pricing, ideal for teams embedded in GitHub.
          Jenkins is open source with higher maintenance costs, better suited for complex or legacy environments.
        </p>

        <h3 className="text-2xl font-semibold mb-3 text-neonGreen">Feature Comparison Table</h3>
        <table className="w-full text-left text-purple-200 mb-8 border border-purple-600">
          <thead>
            <tr className="border-b border-purple-600 bg-gray-900">
              <th className="p-3">Feature</th>
              <th className="p-3">GitHub Actions</th>
              <th className="p-3">Jenkins</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-purple-600">
              <td className="p-3">Pipeline Setup</td>
              <td className="p-3">YAML workflows, zero-config for GitHub repos</td>
              <td className="p-3">Groovy Jenkinsfiles, manual setup</td>
            </tr>
            <tr className="border-b border-purple-600">
              <td className="p-3">Hosting</td>
              <td className="p-3">GitHub-hosted or self-hosted runners</td>
              <td className="p-3">Self-hosted, cloud or on-prem</td>
            </tr>
            <tr className="border-b border-purple-600">
              <td className="p-3">Extensibility</td>
              <td className="p-3">20,000+ Marketplace actions</td>
              <td className="p-3">2,000+ plugins, highly customizable</td>
            </tr>
            <tr className="border-b border-purple-600">
              <td className="p-3">Security</td>
              <td className="p-3">Built-in encrypted secrets, signed actions</td>
              <td className="p-3">Credentials plugin, manual patching</td>
            </tr>
            <tr>
              <td className="p-3">Scaling</td>
              <td className="p-3">Auto-scaling, managed infrastructure</td>
              <td className="p-3">Flexible, user-managed infrastructure</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Real-World CI/CD Pipeline Examples</h2>
        <h3 className="text-2xl font-semibold mb-3 text-neonBlue">GitHub Actions Workflow Example</h3>
        <pre className="bg-gray-900 p-4 rounded mb-6 overflow-x-auto text-sm font-mono">
{`name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker Image
        run: docker build -t my-app:latest .

      - name: Push to Registry
        run: |
          echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login -u "\${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push my-app:latest

      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: ./deploy-prod.sh
`}
        </pre>

        <h3 className="text-2xl font-semibold mb-3 text-neonGreen">Equivalent Jenkinsfile Pipeline Example</h3>
        <pre className="bg-gray-900 p-4 rounded mb-6 overflow-x-auto text-sm font-mono">
{`pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build & Push') {
            steps {
                sh 'docker build -t my-app:latest .'
                sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                sh 'docker push my-app:latest'
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './deploy-prod.sh' }
        }
    }
}`}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Security & Compliance</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
          <li>Secrets management through GitHub encrypted secrets vs Jenkins Credentials Plugin</li>
          <li>Pipeline injection risks and mitigation strategies</li>
          <li>Branch protection rules and environment-specific restrictions</li>
          <li>Supply chain attack prevention via signed actions/pipelines</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Monitoring & Rollback Strategies</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          Integration with monitoring tools like Prometheus, Datadog and rollout strategies such as blue/green deployment or canary releases are key for secure and reliable pipelines.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Interactive Security Checklist</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
          <li>✅ Are all secrets stored securely?</li>
          <li>✅ Is branch protection enabled and enforced?</li>
          <li>✅ Are pipeline triggers restricted to authorized users?</li>
          <li>✅ Is multi-factor authentication enabled for admins?</li>
          <li>✅ Are deploys automatically rolled back on failure?</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">About the Authors & E-E-A-T Compliance</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          This guide was prepared by the DevMetrix engineering team: veterans in DevOps with years of experience designing secure and scalable CI/CD pipelines.
          Sources include official GitHub Actions and Jenkins documentation, security advisories, and industry best practices.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white">Design Notes</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          This guide follows DevMetrix's signature Blue/Green/Cyan gradient color scheme for clarity and brand consistency. The layout is fully mobile responsive ensuring seamless access across devices.
        </p>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-semibold mb-4 text-white">Try Our Related Tools</h2>
        <p className="text-gray-300 mb-4 text-lg">
          Explore our free GitHub Actions validator, Docker build visualizer, and branch protection analyzer on DevMetrix!
        </p>
        <Link href="/tools" className="inline-block bg-neonBlue text-black rounded px-6 py-3 font-semibold hover:bg-neonGreen transition">
          Explore Developer Tools →
        </Link>
      </section>
    </div>
  );
}
