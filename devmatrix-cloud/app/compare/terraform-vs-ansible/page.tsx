import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Terraform vs Ansible: Infrastructure Wars',
  description: 'The Infrastructure Architect vs The Configuration Master. Declarative provisioning vs Procedural management.',
};

export default function TerraformVsAnsible() {
  return (
    <DebateComparison
      title="Terraform vs Ansible"
      description="Two essential DevOps tools that often overlap but fundamentally solve different problems."
      personaA={{
        name: "Terraform",
        role: "The Infrastructure Architect",
        color: "purple",
      }}
      personaB={{
        name: "Ansible",
        role: "The Configuration Master",
        color: "red",
      }}
      intro="In the DevOps toolkit, these two are often found side-by-side. Terraform builds the house; Ansible furnishes it. But the lines are blurring. Terraform is encroaching on configuration, and Ansible can provision cloud resources. Which philosophy reigns supreme: Immutable Infrastructure or Mutable Configuration?"
      turns={[
        {
          speaker: 'A',
          topic: 'Philosophy',
          text: "I am Declarative. You tell me *what* you want—'I want 5 servers and a load balancer'—and I figure out how to achieve that state. I maintain a 'state file', a source of truth that maps the real world to your code. If the reality drifts, I detect it and correct it. I view infrastructure as immutable. If you need a change, we destroy the old server and build a new, perfect one. This eliminates 'configuration drift' and 'snowflake servers'. I bring order and mathematical certainty to the chaotic cloud."
        },
        {
          speaker: 'B',
          topic: 'Flexibility',
          text: "I am Procedural (mostly). I am a list of tasks: 'Install Nginx', 'Update config', 'Restart service'. I am agentless; I run over SSH, the universal language of servers. I don't need a complex state file that can get corrupted or locked. I am simple. I can manage existing infrastructure without needing to 'import' it first. I embrace mutability because sometimes you just need to patch a library on 100 servers without tearing them all down. I am the pragmatic tool for day-to-day operations and management."
        },
        {
          speaker: 'A',
          topic: 'Orchestration',
          text: "My strength lies in the API. I speak fluent AWS, Azure, Google Cloud, and hundreds of other providers. I understand dependencies. I know that the subnet must exist before the instance, and the security group must be attached before the interface. I build the dependency graph of your entire infrastructure. When you run 'terraform apply', I execute with maximum parallelism, creating your entire data center in minutes. I am the tool for the Lifecycle of Infrastructure, from birth to death."
        },
        {
          speaker: 'B',
          topic: 'Configuration',
          text: "But once the server is born, it is naked. It needs software, users, permissions, cron jobs, and security patches. That is my domain. You are terrible at configuring the *inside* of a server. Your 'user_data' scripts are just bash hacks. I have modules for everything—apt, yum, systemd, docker, git. I can ensure that a specific line exists in a config file. I can roll out updates to a fleet of web servers one by one. You build the shell; I give it a soul."
        },
        {
          speaker: 'A',
          topic: 'State Management',
          text: "My State File is my superpower, even if you mock it. It allows me to know exactly what resources I created. If I remove a resource from my code, I know to delete it from the cloud. You? If you remove a task from your playbook, the resource stays there, orphaned, costing money forever. My strictness ensures that your billing matches your code. I provide confidence. 'Terraform plan' shows you *exactly* what will happen before it happens. No surprises."
        },
        {
          speaker: 'B',
          topic: 'Ease of Use',
          text: "YAML. Everyone reads YAML. My playbooks are readable by humans, not just engineers. A sysadmin can look at an Ansible role and understand the deployment steps immediately. HCL (your language) is powerful but proprietary and has a learning curve. And being agentless is a huge win. I don't need to install anything on the target nodes. I just need an SSH key. This makes me instantly usable in almost any environment, from a Raspberry Pi to a Mainframe. I am the universal remote for IT."
        }
      ]}
      conclusion="They are best friends, not enemies. Use Terraform to provision the infrastructure (VPCs, Instances, Load Balancers) and treat it as immutable where possible. Use Ansible to configure the OS and deploy applications if you aren't using containers/images. Terraform builds the hardware; Ansible manages the software."
      winner="Draw (Use Both)"
    />
  );
}
