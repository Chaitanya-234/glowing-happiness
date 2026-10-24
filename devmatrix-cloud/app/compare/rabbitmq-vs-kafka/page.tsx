import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RabbitMQ vs Kafka: Messaging Systems Showdown | DevMetrix',
  description: 'RabbitMQ vs Kafka debate. Traditional message queuing vs high-throughput event streaming.',
};

export default function Page() {
  return (
    <DebateComparison
      title="RabbitMQ vs Kafka"
      description="Message Queues vs Event Streaming."
      intro="They both move data, but they couldn't be more different. RabbitMQ is the smart broker with complex routing. Kafka is the dumb broker with massive throughput. Which architecture fits your system?"
      personaA={{
        name: "RabbitMQ Ranger",
        role: "The Smart Router",
        color: "orange"
      }}
      personaB={{
        name: "Kafka Knight",
        role: "The Stream Lord",
        color: "gray"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Routing",
          text: "I am smart. I have Exchanges, Bindings, and Queues. I can route messages based on complex patterns (direct, topic, fanout). I ensure the right message gets to the right consumer."
        },
        {
          speaker: "B",
          topic: "Throughput",
          text: "I am fast. I can handle millions of events per second. I am a distributed log. I don't route; I store. Consumers read at their own pace. I am built for Big Data."
        },
        {
          speaker: "A",
          topic: "Delivery Guarantees",
          text: "I track message acknowledgments perfectly. If a consumer fails, I redeliver. I am transient; once a message is consumed, it's gone (mostly)."
        },
        {
          speaker: "B",
          topic: "Persistence",
          text: "I keep everything. I have retention policies. You can replay history from 3 days ago to fix a bug. I am the source of truth for event sourcing."
        },
        {
          speaker: "A",
          topic: "Complexity",
          text: "I am easier to set up for standard microservices. You require Zookeeper (historically) and careful partition management. You are a beast to tame."
        }
      ]}
      conclusion="Use RabbitMQ for complex routing and task processing in microservices where immediate delivery matters. Use Kafka for high-throughput event streaming, log aggregation, and when you need to replay history."
      winner="Different Tools for Different Jobs"
    />
  );
}
