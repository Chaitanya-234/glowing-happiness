import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'Grafana vs Kibana: Visualizing Observability',
  description: 'The Universal Dashboard vs The Log Explorer. Metrics vs Logs.',
};

export default function GrafanaVsKibana() {
  return (
    <DebateComparison
      title="Grafana vs Kibana"
      description="Two dashboard titans. One rules metrics, the other rules logs. Which one do you need?"
      personaA={{
        name: "Grafana",
        role: "The Universal Dashboard",
        color: "orange",
      }}
      personaB={{
        name: "Kibana",
        role: "The Log Explorer",
        color: "pink",
      }}
      intro="Observability is the cornerstone of modern reliability. You need to see what's happening. Grafana made its name by visualizing metrics from anywhere. Kibana made its name by letting you search through mountains of logs in the ELK stack. As they both expand their features, the choice becomes harder."
      turns={[
        {
          speaker: 'A',
          topic: 'Versatility',
          text: "I am the Switzerland of observability. I don't care where your data lives. Prometheus? Yes. InfluxDB? Yes. PostgreSQL? Yes. Elasticsearch? Yes. CloudWatch? Yes. I connect to dozens of data sources and visualize them all on a single pane of glass. You are a one-trick pony, Kibana. You exist only for Elasticsearch. If a user wants to visualize data from a SQL database alongside their server metrics, they come to me. I am the unifying layer for all your data silos."
        },
        {
          speaker: 'B',
          topic: 'Depth',
          text: "I am not a generalist; I am a specialist. Being tightly coupled with Elasticsearch is my superpower, not my weakness. It allows me to offer deep, powerful exploration of unstructured data that you can't touch. I don't just 'graph' data; I let you search it. I let you discover patterns in millions of log lines with full-text search capabilities that generic SQL dashboards can only dream of. When production is on fire and you need to find that one specific error message in a haystack of terabytes, you need me."
        },
        {
          speaker: 'A',
          topic: 'Visualizations',
          text: "My charts are beautiful. I offer a massive library of visualization panels—gauges, bar charts, heatmaps, geo-maps, and community plugins. I am built for monitoring. My alerting system is first-class, allowing you to define alerts on any data source and send them to Slack, PagerDuty, or OpsGenie. I am designed for the NOC (Network Operations Center) wall. I am the screen that engineers stare at to know if the system is healthy. My UX is tuned for time-series data and trends."
        },
        {
          speaker: 'B',
          topic: 'Data Analysis',
          text: "You show trends; I show answers. With features like 'Lens', I allow users to drag and drop data fields to visualize them instantly. I am an analysis tool. I am used by security analysts to hunt threats (SIEM) and by business analysts to understand user behavior. The Elastic Stack is more than just metrics; it's about document storage and retrieval. I can visualize maps, networks, and complex relationships because the underlying engine (Lucene) supports it. You just draw lines; I reveal context."
        },
        {
          speaker: 'A',
          topic: 'Loki & Tempo',
          text: "I saw your strength, and I countered it. With Grafana Loki, I now offer log aggregation that integrates perfectly with my dashboards, without the heavy indexing cost of Elasticsearch. With Tempo, I handle distributed tracing. I now offer the 'LGTM' stack (Loki, Grafana, Tempo, Mimir). I am becoming a full-stack observability platform. I can correlate a spike in a CPU graph directly to the logs that caused it and the trace that pinpoints the bottleneck. I am evolving faster."
        },
        {
          speaker: 'B',
          topic: 'Ecosystem',
          text: "The ELK stack (Elasticsearch, Logstash, Kibana) is industry standard for a reason. It is battle-tested. My ecosystem includes Beats for data shipping and APM (Application Performance Monitoring) that rivals New Relic. I am a complete platform for Search, Observability, and Security. You are stitching together different tools. I am a single, cohesive product where your logs, metrics, and traces live in one data store, searchable with one query language. That integration runs deeper than UI plugins."
        }
      ]}
      conclusion="If your primary focus is Time-Series Metrics (CPU, Memory, Request Rates) from various sources, Grafana is the winner. If your primary focus is Log Analysis, Search, and discovering 'unknown unknowns' in text data, Kibana is the winner. In a modern stack, you likely use both: Grafana for the dashboard and alerting, Kibana for the deep-dive debugging."
      winner="Grafana (Metrics) / Kibana (Logs)"
    />
  );
}
