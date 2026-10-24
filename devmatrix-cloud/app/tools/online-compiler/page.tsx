import CompilerClient from './components/CompilerClient';
import { Metadata } from 'next';

export default function OnlineCompilerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "DevMetrix Online Compiler",
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "IDE",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free online compiler and code executor supporting 60+ programming languages",
        "featureList": [
          "Support for 60+ programming languages",
          "Real-time code compilation and execution",
          "Monaco editor integration",
          "Code sharing capabilities",
          "Standard input support"
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Online Code Compiler",
        "url": "https://devmetrix.com/tools/online-compiler",
        "browserRequirements": "Requires JavaScript"
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Online Compiler",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Programming Language",
            "text": "Choose from 60+ supported languages using the dropdown menu."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Write Code",
            "text": "Write or paste your code into the editor."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Run Code",
            "text": "Click the Run button to execute your code and view the output."
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple mb-4">
            Online Code Compiler
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Write, compile, and execute code in 60+ programming languages instantly.
            A powerful online IDE with real-time output, sharing capabilities, and no setup required.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <CompilerClient />
        </div>

        {/* SEO Content Section */}
        <div className="prose dark:prose-invert max-w-none">

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What is an Online Compiler?</h2>
            <p>
              An online compiler (or online IDE) is a web-based tool that allows you to write, compile, and execute code directly in your web browser.
              Unlike traditional Integrated Development Environments (IDEs) that require heavy software installation and configuration on your local machine,
              our online compiler runs entirely in the cloud. This means you can start coding immediately from any device—whether it's a powerful desktop,
              a laptop, a Chromebook, or even a tablet.
            </p>
            <p>
              Online compilers have evolved from simple code runners to sophisticated environments that support syntax highlighting, error detection,
              standard input (stdin), and multiple programming languages. They are essential tools for learning programming, testing algorithms,
              sharing code snippets, and preparing for technical interviews.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Use an Online Compiler?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">No Installation Required</h3>
                <p>
                  Forget about setting up environments, installing compilers (like GCC, JDK, Python), or managing path variables.
                  Access a full coding environment instantly. This is particularly useful for students or developers using public computers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Perfect for Learning</h3>
                <p>
                  If you're new to coding, the barrier to entry should be low. Start experimenting with Python, C++, or Java immediately.
                  Quickly test concepts from tutorials without the friction of setup.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Cross-Platform Compatibility</h3>
                <p>
                  Your code runs the same way regardless of your operating system. Whether you are on Windows, macOS, or Linux,
                  the execution environment is consistent, eliminating "it works on my machine" issues.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Quick Testing & Prototyping</h3>
                <p>
                  Need to check if a specific syntax works? Want to test a small algorithm? Spin up the compiler, run your snippet,
                  and get the answer in seconds without creating a new project in your local IDE.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How Our Online Compiler Works</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Choose Your Language:</strong> Select from over 60 supported programming languages including Python, Java, C++, JavaScript, Go, Rust, and more.
              </li>
              <li>
                <strong>Write Code:</strong> Use our advanced Monaco editor (the same engine powering VS Code) with syntax highlighting, auto-indentation, and themes.
              </li>
              <li>
                <strong>Configure Input:</strong> If your program requires user input, expand the "Standard Input" panel and provide the data.
              </li>
              <li>
                <strong>Run & View Output:</strong> Click "Run". Your code is sent to our secure cloud servers (powered by Judge0), compiled, and executed. The output, errors, and execution stats (time/memory) are displayed instantly.
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Supported Programming Languages</h2>
            <p className="mb-4">We support a vast array of languages for every use case:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-neonBlue">Web Development</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>JavaScript (Node.js)</li>
                  <li>TypeScript</li>
                  <li>PHP</li>
                  <li>Ruby</li>
                  <li>HTML/CSS (via integration)</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-neonGreen">System & High Performance</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>C (GCC)</li>
                  <li>C++ (GCC)</li>
                  <li>Rust</li>
                  <li>Go (Golang)</li>
                  <li>Assembly (NASM)</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-hotPink">Data Science & General</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Python 3</li>
                  <li>R Language</li>
                  <li>Java (OpenJDK)</li>
                  <li>C# (Mono)</li>
                  <li>Kotlin</li>
                  <li>Swift</li>
                  <li>Scala</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Common Use Cases</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Technical Interview Preparation</h3>
                <p>
                  Practice solving algorithmic problems for coding interviews. Implement data structures like Linked Lists, Trees, and Graphs.
                  Test your logic against different inputs using the Standard Input panel. Great for practicing for companies like Google, Amazon, and Meta.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Teaching & Education</h3>
                <p>
                  Teachers can share code examples with students via unique URLs. Students can fork the code, make changes, and run it instantly.
                  It's an excellent tool for computer science labs and coding bootcamps where installing software on every machine is difficult.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Debugging & Sharing</h3>
                <p>
                  Encountered a weird bug? Isolate the code snippet and share it with a colleague or on Stack Overflow.
                  The shareable link ensures they see exactly what you see and can run it to reproduce the issue.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
             <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
             <div className="space-y-6">
                <div>
                   <h3 className="text-xl font-bold">Is this compiler free?</h3>
                   <p>Yes, our online compiler is completely free to use. There are no hidden charges or premium subscriptions required for standard usage.</p>
                </div>
                <div>
                   <h3 className="text-xl font-bold">Is my code saved?</h3>
                   <p>Your code is not permanently stored on our servers unless you explicitly save it as a snippet (which is stored in your browser's local storage) or generate a share link. We prioritize your privacy.</p>
                </div>
                <div>
                   <h3 className="text-xl font-bold">Can I use external libraries?</h3>
                   <p>Currently, the compiler supports standard libraries for each language. External packages (like pip or npm packages) are not supported in the standard mode to ensure security and speed.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold">What happens if my code loops infinitely?</h3>
                    <p>The system has a built-in time limit for execution. If your code exceeds this limit (usually a few seconds), the process will be terminated, and you will see a "Time Limit Exceeded" error.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
