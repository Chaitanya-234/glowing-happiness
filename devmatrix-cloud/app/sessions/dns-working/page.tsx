import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How DNS Works - Animated Guide | DevMetrix Sessions',
  description: 'Understand the Domain Name System (DNS) through this visual animated guide. Learn how IP addresses, domain names, and DNS servers work together.',
};

export default function DnsWorkingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/sessions"
            className="text-neonBlue hover:text-neonGreen transition-colors flex items-center gap-2 text-sm font-mono"
          >
            ← Back to Sessions
          </Link>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            How DNS Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Demystifying the phonebook of the internet.
          </p>
        </div>

        {/* Video Player Section */}
        <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-12 border border-gray-800">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/6IhBMIJ5HHg"
            title="DNS Explained Through Animation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

        {/* Content Section */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-neonBlue">What is DNS?</h2>
          <p className="mb-6">
            The <strong>Domain Name System (DNS)</strong> is essentially the phonebook of the Internet. Humans access information online through domain names, like <code>google.com</code> or <code>Devmetrix.in</code>. Web browsers interact through Internet Protocol (IP) addresses. DNS translates domain names to IP addresses so browsers can load Internet resources.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-neonGreen p-6 rounded-r-xl mb-8">
            <h3 className="text-lg font-semibold mb-2">Key Takeaway</h3>
            <p className="m-0">
              Each device connected to the Internet has a unique IP address which other machines use to find the device. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2400:cb00:2048:1::c629:d7a2 (in IPv6).
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-neonBlue">How Does DNS Work?</h2>
          <p className="mb-4">
            The process of DNS resolution involves converting a hostname (such as www.example.com) into a computer-friendly IP address (such as 192.168.1.1). An IP address is given to each device on the Internet, and that address is necessary to find the appropriate Internet device - like a street address is used to find a particular home.
          </p>

          <h3 className="text-xl font-bold mb-3 mt-6">The 4 Main DNS Servers</h3>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>
              <strong>DNS Recursor:</strong> The recursor can be thought of as a librarian who is asked to go find a particular book somewhere in a library. The DNS recursor is a server designed to receive queries from client machines through applications such as web browsers.
            </li>
            <li>
              <strong>Root Nameserver:</strong> The root server is the first step in translating (resolving) human readable host names into IP addresses. It can be thought of like an index in a library that points to different racks of books.
            </li>
            <li>
              <strong>TLD Nameserver:</strong> The Top Level Domain server (TLD) can be thought of as a specific rack of books in a library. This nameserver is the next step in the search for a specific IP address, and it hosts the last portion of a hostname (In example.com, the TLD server is "com").
            </li>
            <li>
              <strong>Authoritative Nameserver:</strong> This final nameserver can be thought of as a dictionary on a rack of books, in which a specific name can be translated into its definition. The authoritative nameserver is the last stop in the nameserver query.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-neonBlue">The Steps in a DNS Lookup</h2>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>A user types <code>example.com</code> into a web browser and the query travels into the Internet and is received by a DNS Recursive Resolver.</li>
            <li>The resolver then queries a DNS Root Nameserver.</li>
            <li>The root server then responds to the resolver with the address of a Top Level Domain (TLD) DNS Server (such as .com or .net), which stores the information for its domains. When searching for example.com, our request is pointed toward the .com TLD.</li>
            <li>The resolver then makes a request to the .com TLD.</li>
            <li>The TLD server then responds with the IP address of the domain's nameserver, example.com.</li>
            <li>Lastly, the recursive resolver sends a query to the domain's nameserver.</li>
            <li>The IP address for example.com is then returned to the resolver from the nameserver.</li>
            <li>The DNS resolver then responds to the web browser with the IP address of the domain requested initially.</li>
          </ol>
        </article>

        {/* Next/Prev Navigation could go here */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
             <span className="text-gray-500">No previous sessions</span>
             <span className="text-gray-500">More coming soon...</span>
        </div>
      </div>
    </div>
  );
}
