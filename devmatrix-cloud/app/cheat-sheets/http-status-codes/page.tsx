"use client";
import Link from "next/link";

const statuses = [
  [200, "OK", "Request has succeeded"],
  [201, "Created", "Resource created"],
  [204, "No Content", "Success, no content returned"],
  [301, "Moved Permanently", "Permanent redirect"],
  [302, "Found", "Temporary redirect"],
  [304, "Not Modified", "Use browser cache"],
  [400, "Bad Request", "Invalid request"],
  [401, "Unauthorized", "No/invalid auth"],
  [403, "Forbidden", "Insufficient permissions"],
  [404, "Not Found", "Resource missing"],
  [409, "Conflict", "Edit conflict"],
  [415, "Unsupported Media", "Wrong type"],
  [429, "Too Many Requests", "Rate limited"],
  [500, "Internal Error", "Server crashed"],
  [502, "Bad Gateway", "Invalid upstream"],
  [503, "Unavailable", "Service overloaded"],
  [504, "Gateway Timeout", "Upstream timeout"]
];

export default function HttpStatusCheatSheet() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/cheat-sheets" className="text-green-400">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-green-300 mb-2">HTTP Status Codes</h1>
        <p className="mb-10 text-gray-400">Common HTTP response codes</p>
        <table className="w-full border-collapse bg-gray-900 rounded-xl">
          <thead>
            <tr className="text-left text-green-300 bg-gray-800">
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(([code, name, desc]) => (
              <tr key={code} className="border-b border-gray-800 odd:bg-gray-800">
                <td className="px-4 py-2 font-bold">{code}</td>
                <td className="px-4 py-2">{name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
