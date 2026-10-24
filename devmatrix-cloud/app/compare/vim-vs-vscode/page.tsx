import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Vim vs VS Code: Editor Wars',
  description: 'The Keyboard Warrior vs The Modern Editor. Efficiency vs Convenience.',
};

export default function VimVsVsCode() {
  return (
    <DebateComparison
      title="Vim vs VS Code"
      description="The eternal struggle. Do you want to edit text at the speed of thought, or have a tool that does everything for you?"
      personaA={{
        name: "Vim",
        role: "The Keyboard Warrior",
        color: "green",
      }}
      personaB={{
        name: "VS Code",
        role: "The Modern Editor",
        color: "blue",
      }}
      intro="It is the oldest religious war in computing (alongside Emacs). Vim, the modal editor that has terrified beginners for decades, vs VS Code, the Microsoft giant that conquered the world with TypeScript and Electron. Is the mouse a crutch, or is the command line a relic?"
      turns={[
        {
          speaker: 'A',
          topic: 'Speed',
          text: "I am speed. Not just startup speed—which is instantaneous—but editing speed. My users don't touch the mouse. We edit text at the speed of thought. 'ciw' changes a word. 'dt)' deletes until the parenthesis. I have a language for text manipulation. Once you learn it, using a normal editor feels like wading through molasses. You are constantly reaching for the mouse, dragging, clicking... it's inefficient. I keep your hands on the home row, where they belong. I am the extension of the developer's mind."
        },
        {
          speaker: 'B',
          topic: 'Accessibility',
          text: "You are cryptic. 'Esc :wq'. People make jokes about not being able to exit you. I am accessible. I welcome new developers with open arms. I have a GUI. I have settings menus that are searchable. I work out of the box. You require years of configuration and muscle memory training just to be productive. In the modern fast-paced world, who has time to learn a 40-year-old tool? I let developers focus on the code, not the editor. I democratized professional-grade development tools."
        },
        {
          speaker: 'A',
          topic: 'Resources',
          text: "I run on a toaster. I am installed on every Unix server in existence. SSH into a remote server? I am there. I consume kilobytes of RAM. You? You are an Electron app. You run a web browser to edit text. You eat gigabytes of RAM just to blink the cursor. When you open a large file, you choke. I can open gigabyte-sized logs instantly. I am efficient, lightweight, and ubiquitous. I respect the hardware I run on."
        },
        {
          speaker: 'B',
          topic: 'Ecosystem',
          text: "My extension marketplace is the greatest library of developer tools ever assembled. One click to install Python support, Docker integration, GitLens, AI copilots, and remote development containers. I am not just an text editor; I am an IDE. I have a built-in terminal, debugger, and source control. I understand your code. I provide IntelliSense that actually works, refactoring tools, and live previews. I am the cockpit for modern cloud-native development."
        },
        {
          speaker: 'A',
          topic: 'Customizability',
          text: "My configuration is a script. I am infinitely programmable. My plugins are just code. A Vim user's '.vimrc' is their lightsaber; unique, hand-crafted, and powerful. I can be an IDE too (Neovim with LSP), but I do it on my terms. I don't hide complexity behind a UI; I expose the power to the user. I force you to understand your tools. And because I am open source and standard, I will be here in 50 years. Will Microsoft still support you then?"
        },
        {
          speaker: 'B',
          topic: 'Remote Dev',
          text: "Actually, my 'Remote - SSH' and 'Dev Containers' features are revolutionary. I allow you to run the heavy UI on your local machine while the code server runs in the cloud, in a container, or on WSL. It's the best of both worlds. You get the snappy UI interaction AND the power of the remote environment. I bridged the gap between local comfort and cloud reality. Plus, Copilot. The AI integration in VS Code is seamless. I am leading the AI revolution in coding."
        }
      ]}
      conclusion="If you spend your life SSH-ing into servers or demand the absolute highest ceiling for text editing efficiency, learn Vim. It's a superpower. For 99% of developers, especially in web and cloud, VS Code offers the perfect balance of power, ease of use, and ecosystem. The smart move? Use VS Code with the Vim keybinding extension."
      winner="VS Code (with Vim Mode)"
    />
  );
}
