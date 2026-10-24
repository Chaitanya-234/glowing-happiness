import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Linux vs Windows Server: The OS Wars',
  description: 'The Open Kernel vs The Enterprise OS. Command Line vs GUI. A battle for the server room.',
};

export default function LinuxVsWindowsServer() {
  return (
    <DebateComparison
      title="Linux vs Windows Server"
      description="The foundation of the internet faces off against the backbone of the corporate intranet."
      personaA={{
        name: "Linux",
        role: "The Open Kernel",
        color: "yellow",
      }}
      personaB={{
        name: "Windows",
        role: "The Enterprise OS",
        color: "blue",
      }}
      intro="For decades, they have stood on opposite sides of the server room. Linux, the free, open-source champion of the internet and the cloud. Windows Server, the corporate standard, deeply integrated and supported. As the cloud takes over, does Windows still have a place, or is it a Linux world?"
      turns={[
        {
          speaker: 'A',
          topic: 'Open Source',
          text: "I am the internet. 96% of the top 1 million web servers run on me. I am free, open-source, and community-driven. You don't pay licensing fees for every core you spin up. You can inspect my code, modify my kernel, and strip me down to a few megabytes for a container. I am the engine of Docker, Kubernetes, and the entire cloud-native revolution. My command line is the universal language of operations. I offer freedom from vendor lock-in."
        },
        {
          speaker: 'B',
          topic: 'Integration',
          text: "I am the enterprise. Active Directory is the identity backbone of the Fortune 500. Exchange, SharePoint, SQL Server—these run businesses, and they run on me. My integration is seamless. Group Policy allows an admin to manage thousands of servers with a few clicks in a GUI. I offer a cohesive ecosystem where everything just works together. Not every admin wants to memorize cryptic bash commands. I provide a consistent, graphical management experience with world-class support."
        },
        {
          speaker: 'A',
          topic: 'Performance',
          text: "I am efficient. I don't need a GUI eating up resources on a server. I can run comfortably on 512MB of RAM. My filesystem handling (Ext4, XFS, ZFS) is superior for high-performance I/O. I scale effortlessly from a Raspberry Pi to the world's largest supercomputers (all of which run Linux, by the way). When you need raw performance and stability that stays up for years without a reboot, you choose me. Patch Tuesday? I update without rebooting most of the time (KernelCare/Ksplice)."
        },
        {
          speaker: 'B',
          topic: 'PowerShell',
          text: "You mock my GUI, but you ignore PowerShell. It is an object-oriented shell that makes Bash look like a toy. In Bash, everything is text; you have to parse strings with awk and sed. In PowerShell, I pass actual .NET objects between commands. I can query services, stop processes, and manage the cloud with incredible precision and structured data. I have embraced the command line, and I did it better. Plus, with Windows Subsystem for Linux (WSL), I can run your tools too."
        },
        {
          speaker: 'A',
          topic: 'Security',
          text: "My security model is transparent. 'Many eyes make all bugs shallow'. The community finds and patches vulnerabilities in hours. I have granular permission systems (SELinux, AppArmor) that can lock down a process completely. I don't suffer from the endless malware and ransomware waves that target Windows. In the cloud, where attack surfaces are huge, my minimalist footprint and hardened security make me the default choice for secure infrastructure."
        },
        {
          speaker: 'B',
          topic: 'Hybrid Cloud',
          text: "Azure runs on me. Azure Stack allows you to bring the cloud on-premise. I bridge the gap between your legacy on-prem data center and the cloud. Many companies have decades of .NET applications; they run best on me. I am not going away. I am evolving. Server Core and Nano Server are my answer to your minimalism. I am becoming leaner, faster, and more cloud-ready, while maintaining the binary compatibility that enterprises require."
        }
      ]}
      conclusion="Linux has won the cloud, the web, and the supercomputer. For 90% of modern infrastructure, containers, and web hosting, Linux is the only logical choice. However, Windows Server remains critical for internal corporate infrastructure (Active Directory, DNS) and legacy .NET environments."
      winner="Linux (Cloud/Web) / Windows (Corporate)"
    />
  );
}
