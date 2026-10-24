import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MySQL vs MariaDB: The SQL Fork Fight | DevMetrix',
  description: 'The original vs the community fork. Is MariaDB just a drop-in replacement or something more?',
};

export default function Page() {
  return (
    <DebateComparison
      title="MySQL vs MariaDB"
      description="The original open-source DB vs its community-driven successor."
      intro="When Oracle bought Sun Microsystems (and thus MySQL), the creator of MySQL forked it to create MariaDB to ensure it stayed open source. Years later, are they still practically the same?"
      personaA={{
        name: "MySQL Master",
        role: "The Standard",
        color: "blue"
      }}
      personaB={{
        name: "MariaDB Maven",
        role: "Open Source Hero",
        color: "pink"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Industry Adoption",
          text: "MySQL is the most popular open-source database in the world. It's the 'M' in LEMP/LAMP. AWS Aurora, Google Cloud SQL—they all optimize for MySQL first. It's the safe, enterprise choice."
        },
        {
          speaker: "B",
          topic: "Performance",
          text: "MariaDB is faster. We have better storage engines (Aria, MyRocks) and optimized query optimizers. We often beat MySQL in benchmarks, especially for complex queries."
        },
        {
          speaker: "A",
          text: "We have Oracle's backing. That means dedicated engineering teams and enterprise support. MySQL 8.0 brought huge features like Window Functions and CTEs that modernized the platform."
        },
        {
          speaker: "B",
          topic: "Features",
          text: "We had Window Functions and CTEs before you! MariaDB often implements features faster. Plus, we are truly open source. No 'Enterprise Edition' hiding features behind a paywall like MySQL's thread pool plugin."
        },
        {
          speaker: "A",
          text: "Compatibility is drifting. MariaDB is no longer a strict drop-in replacement for MySQL 8.0. JSON handling differs. If you switch, you might face subtle bugs."
        },
        {
          speaker: "B",
          text: "That's because we are innovating, not just copying. We support more storage engines, allowing for column-store analytics (ColumnStore) right inside the same database."
        }
      ]}
      conclusion="If you need enterprise support and maximum cloud compatibility, stay with MySQL. If you prefer a truly open-source governance model, faster feature iterations, and access to advanced storage engines without licensing fees, MariaDB is the better choice."
      winner="MariaDB for Freedom & Speed"
    />
  );
}
