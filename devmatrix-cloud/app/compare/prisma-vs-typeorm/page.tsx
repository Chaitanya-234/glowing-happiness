import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prisma vs TypeORM: The ORM Odyssey | DevMetrix',
  description: 'Prisma vs TypeORM debate. The modern schema-first ORM vs the traditional class-based ORM.',
};

export default function Page() {
  return (
    <DebateComparison
      title="Prisma vs TypeORM"
      description="Modern Type-Safe ORM vs Traditional Decorators."
      intro="Interacting with databases in TypeScript used to be hard. TypeORM brought the Hibernate/Entity framework style. Prisma reinvented the wheel with a custom schema and generated client. Who accesses data better?"
      personaA={{
        name: "Prisma Paladin",
        role: "The Schema Master",
        color: "cyan"
      }}
      personaB={{
        name: "TypeORM Titan",
        role: "The Decorator",
        color: "red"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Type Safety",
          text: "My generated client is a masterpiece. I know your database schema better than you do. I auto-complete relations, partial selects, everything. It's impossible to write an invalid query."
        },
        {
          speaker: "B",
          topic: "Flexibility",
          text: "I am a traditional ORM. I use classes and decorators. I support the Active Record pattern. I let you write raw SQL easily when you need to."
        },
        {
          speaker: "A",
          topic: "Migrations",
          text: "My migration flow is declarative. You edit `schema.prisma`, I handle the SQL. It's readable by humans. No more sync issues."
        },
        {
          speaker: "B",
          topic: "Runtime",
          text: "You carry a heavy binary (Rust engine) with you. I am just JavaScript. I start faster in serverless environments (cold starts)."
        },
        {
          speaker: "A",
          topic: "DX",
          text: "Everyone loves me. My documentation is gold. My error messages actually tell you what went wrong. I am the modern standard."
        }
      ]}
      conclusion="Prisma provides an unparalleled developer experience and type safety, making it the default choice for modern TypeScript projects. TypeORM is still valuable if you prefer the Active Record pattern or need to support legacy class-based architectures."
      winner="Prisma (The Modern Choice)"
    />
  );
}
