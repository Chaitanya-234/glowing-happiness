"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from 'framer-motion';

const sections = [
  {
    category: "Basic Queries",
    items: [
      { command: "SELECT * FROM table_name;", description: "Select all columns from a table" },
      { command: "SELECT col1, col2 FROM table_name;", description: "Select specific columns" },
      { command: "SELECT DISTINCT column FROM table;", description: "Select distinct values" },
      { command: "SELECT * FROM table WHERE condition;", description: "Filter results" }
    ]
  },
  {
    category: "Data Manipulation",
    items: [
      { command: "INSERT INTO table (col1, col2) VALUES (val1, val2);", description: "Insert new row" },
      { command: "UPDATE table SET col1 = val1 WHERE condition;", description: "Update existing rows" },
      { command: "DELETE FROM table WHERE condition;", description: "Delete rows" },
      { command: "TRUNCATE TABLE table_name;", description: "Empty a table" }
    ]
  },
  {
    category: "Joins",
    items: [
      { command: "SELECT * FROM t1 INNER JOIN t2 ON t1.id = t2.id;", description: "Inner Join (matches only)" },
      { command: "SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id;", description: "Left Join (all from left)" },
      { command: "SELECT * FROM t1 RIGHT JOIN t2 ON t1.id = t2.id;", description: "Right Join (all from right)" },
      { command: "SELECT * FROM t1 FULL OUTER JOIN t2 ON t1.id = t2.id;", description: "Full Join (all from both)" }
    ]
  },
  {
    category: "Aggregation & Grouping",
    items: [
      { command: "SELECT COUNT(*) FROM table;", description: "Count rows" },
      { command: "SELECT SUM(col) FROM table;", description: "Sum values" },
      { command: "SELECT AVG(col) FROM table;", description: "Average value" },
      { command: "SELECT col, COUNT(*) FROM table GROUP BY col;", description: "Group rows" },
      { command: "SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 5;", description: "Filter groups" }
    ]
  },
  {
    category: "Table Management",
    items: [
      { command: "CREATE TABLE table (id INT, name VARCHAR(50));", description: "Create table" },
      { command: "ALTER TABLE table ADD column_name datatype;", description: "Add column" },
      { command: "DROP TABLE table_name;", description: "Delete table" },
      { command: "CREATE INDEX idx_name ON table (column);", description: "Create index" }
    ]
  }
];

export default function SQLCheatSheet() {
  const [copied, setCopied] = useState("");
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cheat-sheets" className="text-blue-400 hover:text-blue-300 transition-colors">&larr; All Cheat Sheets</Link>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent mb-2">SQL Queries Cheat Sheet</h1>
        <p className="mb-10 text-gray-400">Standard SQL commands for database management and querying</p>

        <div className="space-y-8 mb-16">
          {sections.map(s => (
            <div key={s.category}>
              <h2 className="text-2xl font-bold mb-3 text-purple-200">{s.category}</h2>
              <div className="space-y-2">
                {s.items.map(item => (
                  <div key={item.command} className="bg-gray-900 border border-gray-700 rounded-md flex items-center justify-between px-4 py-3">
                    <span className="flex-1 overflow-x-auto">
                      <code className="font-mono text-blue-300 bg-black/30 px-2 py-1 rounded">{item.command}</code>
                      <span className="ml-3 text-gray-300 text-sm block md:inline mt-1 md:mt-0">{item.description}</span>
                    </span>
                    <button
                      className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white ml-3 transition-colors shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText(item.command);
                        setCopied(item.command);
                        setTimeout(() => setCopied(""), 1000);
                      }}>
                      {copied === item.command ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Content Section */}
        <div className="border-t border-purple-500/20 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Related Tool */}
            <Link href="/tools/sql-formatter" className="group">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-900/20 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🗄️</div>
                  <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white">SQL Formatter</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Beautify and format your SQL queries instantly. Supports multiple SQL dialects.
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">Try Tool &rarr;</span>
              </motion.div>
            </Link>

            {/* Related Blog */}
            <Link href="/blog/database-optimization-guide" className="group">
               <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-900/20 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">⚡</div>
                  <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white">DB Optimization</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Learn best practices for optimizing database performance, indexing, and query tuning.
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">Read Article &rarr;</span>
              </motion.div>
            </Link>

             {/* Related Comparison */}
             <Link href="/compare/mongodb-vs-postgresql" className="group">
               <motion.div
                whileHover={{ y: -5 }}
                className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-xl hover:bg-purple-900/20 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🆚</div>
                  <h3 className="text-lg font-semibold text-purple-100 group-hover:text-white">Mongo vs Postgres</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Detailed comparison between NoSQL and SQL databases. When to use which?
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">Compare &rarr;</span>
              </motion.div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
