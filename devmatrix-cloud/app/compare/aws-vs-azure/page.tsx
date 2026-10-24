import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AWS vs Azure: Cloud Giants Clash | DevMetrix',
  description: 'Amazon Web Services vs Microsoft Azure. Which cloud provider offers the best services, pricing, and ecosystem?',
};

export default function Page() {
  return (
    <DebateComparison
      title="AWS vs Azure"
      description="The two leaders in cloud computing face off."
      intro="It's the clash of the titans. AWS, the pioneer that started it all, versus Azure, the enterprise powerhouse from Microsoft. Your choice here defines your infrastructure for years to come."
      personaA={{
        name: "AWS Architect",
        role: "The Pioneer",
        color: "orange"
      }}
      personaB={{
        name: "Azure Ace",
        role: "The Enterprise Choice",
        color: "blue"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Market Leadership",
          text: "AWS is the cloud. We have the most services, the biggest market share, and the most mature ecosystem. If you need a tool, AWS has it. EC2, S3, Lambda - these are industry standards."
        },
        {
          speaker: "B",
          topic: "Integration",
          text: "If you're an enterprise using Windows, Active Directory, or .NET, Azure is a no-brainer. The integration is seamless. We make hybrid cloud actually work for big businesses."
        },
        {
          speaker: "A",
          topic: "Complexity vs Power",
          text: "Our IAM (Identity and Access Management) is granular and powerful. Yes, it has a learning curve, but it gives you total control. Azure's permissions can get messy with subscriptions and resource groups."
        },
        {
          speaker: "B",
          topic: "Developer Experience",
          text: "VS Code + GitHub + Azure. We own the developer workflow. Deploying to Azure App Service from VS Code is one click. AWS requires a PhD in console navigation sometimes."
        },
        {
          speaker: "A",
          text: "We are more reliable. Azure has had some high-profile global outages. When AWS goes down, half the internet breaks, sure, but our uptime track record is generally superior for core services."
        },
        {
          speaker: "B",
          text: "We are catching up fast on AI. With our OpenAI partnership, Azure is the destination for building intelligent apps. GPT-4 on Azure? That's a game changer."
        }
      ]}
      conclusion="Choose Azure if your organization is heavily invested in the Microsoft ecosystem (.NET, Office 365, Active Directory). Choose AWS if you want the broadest range of services, the most mature platform, and are building Linux-based or open-source heavy applications."
      winner="Draw"
    />
  );
}
