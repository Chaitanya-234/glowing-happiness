import DebateComparison from '@/components/DebateComparison';

export const metadata = {
  title: 'WebSockets vs SSE: Realtime Comms',
  description: 'The Bi-Directional Pipe vs The One-Way Stream. Complexity vs Simplicity.',
};

export default function WebSocketsVsSSE() {
  return (
    <DebateComparison
      title="WebSockets vs SSE"
      description="Two ways to push data from server to client. Do you need a telephone or a radio?"
      personaA={{
        name: "WebSockets",
        role: "The Bi-Directional Pipe",
        color: "blue",
      }}
      personaB={{
        name: "SSE",
        role: "The One-Way Stream",
        color: "green",
      }}
      intro="The web was built on request-response, but modern apps demand realtime updates. WebSockets opened a full-duplex tunnel. Server-Sent Events (SSE) kept it simple with HTTP. Which one powers your chat app or stock ticker?"
      turns={[
        {
          speaker: 'A',
          topic: 'Capabilities',
          text: "I am true realtime. I provide a full-duplex communication channel over a single TCP connection. Both the client and the server can send data at any time. This is essential for chat applications, multiplayer games, and collaborative editing tools. You, SSE, are a one-way street. The server talks, the client listens. If the client wants to say something, it has to make a separate HTTP request. That's inefficient for high-frequency interaction. I am the gold standard for interactive apps."
        },
        {
          speaker: 'B',
          topic: 'Simplicity',
          text: "Most applications *are* one-way streets. Stock tickers, news feeds, social media notifications, live sports scores—the server sends updates, the user consumes them. Why overengineer with a custom protocol? I use standard HTTP. I am just a text stream (Content-Type: text/event-stream). This means I work with standard authentication, firewalls, and proxies out of the box. You often get blocked by corporate firewalls that don't like non-HTTP traffic. I am simple, lightweight, and native to the browser."
        },
        {
          speaker: 'A',
          topic: 'Performance',
          text: "My protocol frame has minimal overhead. Once the connection is upgraded, we are just sending raw binary or text frames. You are sending text with a verbose structure 'data: ...'. For high-frequency data like trading or gaming, my binary support is crucial. I handle binary data natively. You have to base64 encode everything, bloating the payload by 33%. When milliseconds matter and bandwidth is tight, my efficiency wins."
        },
        {
          speaker: 'B',
          topic: 'Reliability',
          text: "I have built-in automatic reconnection. If the connection drops, the browser automatically tries to reconnect. I even send a 'Last-Event-ID' so the server can resume the stream exactly where it left off. You? You have to write complex client-side logic to handle heartbeats, ping/pong, and reconnection strategies. If your socket closes, it's dead until you manually revive it. I am robust by design. The browser handles the hard work for me."
        },
        {
          speaker: 'A',
          topic: 'Scale',
          text: "I can be stateful. I can know exactly who is connected and route messages to specific users efficiently. With libraries like Socket.io, I can broadcast to rooms and namespaces. Scaling me is a solved problem with Redis pub/sub adapters. While you are HTTP, keeping thousands of open HTTP connections for SSE can exhaust server file descriptors just like me, but without the benefit of the client being able to talk back instantly."
        },
        {
          speaker: 'B',
          topic: 'HTTP/2',
          text: "With HTTP/2, I become even more powerful. Multiplexing allows multiple SSE streams to share a single TCP connection, reducing the resource cost significantly. I am also polyglot-friendly. Every language has an HTTP library. Not every environment has a robust WebSocket implementation. If you just need to update a 'notifications' badge or show a live progress bar, implementing a full WebSocket server is massive overkill. Use the right tool for the job."
        }
      ]}
      conclusion="Use WebSockets for applications that require intense, low-latency, bi-directional communication (Chat, Games, Collaborative Tools). Use Server-Sent Events (SSE) for one-way data feeds (Dashboards, Tickers, Notifications) where simplicity and standard HTTP behavior are preferred."
      winner="WebSockets (Interactive) / SSE (Feeds)"
    />
  );
}
