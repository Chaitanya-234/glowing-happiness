import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL vs NoSQL Databases: A Comprehensive Technical Comparison | DevMetrix',
  description: 'An academic monograph comparing Relational Database Management Systems (RDBMS) and Non-Relational (NoSQL) databases in the context of data consistency, scalability, and CAP theorem.',
  keywords: ['SQL', 'NoSQL', 'RDBMS', 'database', 'CAP theorem', 'ACID', 'BASE', 'MongoDB', 'PostgreSQL'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The storage, retrieval, and management of data constitute the backbone of computer engineering. For decades, Relational Database Management Systems (RDBMS) utilizing Structured Query Language (SQL) were the undisputed standard. However, the advent of web-scale applications, big data, and real-time analytics gave rise to the "Not Only SQL" (NoSQL) movement.
          </p>
          <img src="https://placehold.co/800x400?text=SQL+vs+NoSQL+Landscape" alt="Chart showing growth of data types and database adoption" className="w-full rounded-xl my-8 border border-white/10" />
          <p>
            This comparative study analyzes the architectural divergences between these two paradigms, focusing on the trade-offs between consistency and availability (CAP Theorem), data modeling flexibility, and horizontal versus vertical scalability.
          </p>
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="Relational vs Non-Relational"
              description="Structure vs Flexibility"
              personaA={{
                name: "The Administrator",
                role: "Database Architect",
                color: "blue",
              }}
              personaB={{
                name: "The Scaler",
                role: "Big Data Engineer",
                color: "orange",
              }}
              intro="ACID transactions meet Eventual Consistency in a battle for the soul of data persistence."
              turns={[
                {
                  speaker: "A",
                  text: "Data integrity is non-negotiable. With SQL, I have ACID compliance. If a transaction fails, it rolls back. My schemas ensure bad data never enters the system.",
                  topic: "Integrity"
                },
                {
                  speaker: "B",
                  text: "But your schemas are rigid! In the modern world, data shapes change daily. NoSQL gives me a flexible document model. Plus, try sharding a monolithic SQL DB across 100 nodes.",
                  topic: "Flexibility"
                },
                {
                  speaker: "A",
                  text: "Normal forms exist for a reason to reduce redundancy. Your JSON documents are full of duplicated data. And 'Eventual Consistency'? Try telling a bank customer their balance is 'eventually' correct.",
                  topic: "Consistency"
                },
                {
                  speaker: "B",
                  text: "Touché on the bank. But for a social feed? Who cares if a like shows up 2ms late? I can write millions of records per second. You're stuck waiting for table locks.",
                  topic: "Performance"
                }
              ]}
              conclusion="The industry has moved towards 'Polyglot Persistence', utilizing SQL for transactional data (billing, users) and NoSQL for high-volume, variable data (logs, feeds)."
              winner="Polyglot Persistence"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
          <p>
            <strong>The RDBMS Era:</strong> E.F. Codd's 1970 paper on the relational model laid the foundation. Oracle, IBM DB2, and later MySQL/PostgreSQL dominated for 40 years.
          </p>
          <p>
             <strong>The NoSQL Explosion:</strong> In the late 2000s, web giants (Google with BigTable, Amazon with Dynamo) hit the limits of RDBMS scaling. They pioneered key-value and column-store databases, leading to open-source implementations like Cassandra, MongoDB, and Redis.
          </p>
          <img src="https://placehold.co/800x400?text=Database+History+Timeline" alt="Timeline of database history" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations: CAP Theorem',
      content: (
        <>
          <p>
            The comparison is best framed by Eric Brewer&apos;s CAP Theorem, which states that a distributed data store can effectively provide only two of the following three guarantees:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
             <li><strong>Consistency (C):</strong> Every read receives the most recent write or an error.</li>
             <li><strong>Availability (A):</strong> Every request receives a response.</li>
             <li><strong>Partition Tolerance (P):</strong> The system continues to operate despite network failures.</li>
          </ul>
          <img src="https://placehold.co/800x400?text=CAP+Theorem+Diagram" alt="Venn diagram of CAP Theorem" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture Comparison',
      content: (
        <>
          <p>
             <strong>SQL Architecture:</strong> Typically monolithic or master-slave replication. Optimized for complex joins and transactions on a single node.
          </p>
          <p>
             <strong>NoSQL Architecture:</strong> Typically shared-nothing, peer-to-peer (Cassandra) or sharded clusters (Mongo). Optimized for distribution across many commodity nodes.
          </p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software and Programming Implications',
      content: (
        <>
          <p>
            <strong>ORM vs Drivers:</strong> SQL relies on Object-Relational Mappers (Hibernate, Prisma) to bridge the impedance mismatch between objects and tables. NoSQL (especially Document stores) maps naturally to JSON objects in code, often removing the need for heavy ORMs.
          </p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p>
             <strong>Write Throughput:</strong> NoSQL generally wins on massive write ingestion due to simpler data models and lack of complex transaction locking.
           </p>
           <p>
             <strong>Complex Queries:</strong> SQL wins on analytical queries involving multiple joins and aggregations.
           </p>
           <img src="https://placehold.co/800x400?text=Performance+Graphs" alt="Graph comparing write throughput" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Cost and Economic Factors',
      content: (
        <>
           <p>
             <strong>Licensing:</strong> Commercial RDBMS (Oracle, SQL Server) are notoriously expensive. Open Source options (Postgres, Mongo Community) are free but require expertise. Cloud-managed versions (DynamoDB, Aurora) shift cost to OpEx based on usage.
           </p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability, Security, and Fault Tolerance',
      content: (
        <>
           <p>
              <strong>ACID vs BASE:</strong> SQL provides ACID (Atomicity, Consistency, Isolation, Durability). NoSQL provides BASE (Basically Available, Soft state, Eventual consistency). For financial data, ACID is reliable. For social data, BASE is sufficient.
           </p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications and Use Cases',
      content: (
        <>
          <p><strong>SQL:</strong> Financial systems, ERP, CRM, E-commerce inventory.</p>
          <p><strong>NoSQL:</strong> User sessions, Real-time big data analytics, Content Management Systems, IoT sensor data.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Twitter:</strong> Migrated from MySQL to a custom NoSQL solution (Manhattan) to handle billions of tweets.</p>
           <p><strong>Uber:</strong> Uses Schemaless (on top of MySQL) to combine SQL reliability with NoSQL flexibility.</p>
           <img src="https://placehold.co/800x400?text=Case+Study+Architectures" alt="Diagram of Uber's database architecture" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6 space-y-2">
              <li><strong>SQL Pros:</strong> Standardized language, strict consistency. <strong>Cons:</strong> Hard to scale horizontally.</li>
              <li><strong>NoSQL Pros:</strong> Flexible schema, easy horizontal scaling. <strong>Cons:</strong> No standard language, eventual consistency challenges.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p><strong>NewSQL:</strong> Databases like CockroachDB and Google Spanner promise the best of both: SQL interface with NoSQL scalability.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical and Environmental Impact',
      content: (
        <>
           <p>Efficient data storage reduces energy consumption in data centers. Choosing the right tool prevents resource waste.</p>
        </>
      )
    },
    {
      id: 'summary-table',
      title: '15. Comparative Summary',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-purple-400">SQL</th>
                <th className="p-4 text-blue-400">NoSQL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-300">Data Model</td>
                <td className="p-4">Relational (Tables)</td>
                <td className="p-4">Document, Key-Value, Graph</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Schema</td>
                <td className="p-4">Rigid (Predefined)</td>
                <td className="p-4">Flexible (Dynamic)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">Scaling</td>
                <td className="p-4">Vertical</td>
                <td className="p-4">Horizontal</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: '16. Conclusion',
      content: (
        <>
          <p>
            The choice depends on the data. Structured, relational data belongs in SQL. Unstructured, massive-scale data belongs in NoSQL. The modern architect uses both.
          </p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="SQL vs NoSQL Databases"
      topicA="Relational Databases (SQL)"
      topicB="Non-Relational Databases (NoSQL)"
      abstract="A comparative analysis of database paradigms, exploring the shift from rigid schema-based relational models to flexible, distributed non-relational systems, framed by the CAP theorem."
      sections={sections}
    />
  );
}
