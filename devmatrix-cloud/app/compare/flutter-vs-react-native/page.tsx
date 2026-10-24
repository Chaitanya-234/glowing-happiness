import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flutter vs React Native: Cross-Platform Kings | DevMetrix',
  description: 'Dart vs JavaScript. Native widgets vs Native bridge. Which framework builds better mobile apps?',
};

export default function Page() {
  return (
    <DebateComparison
      title="Flutter vs React Native"
      description="Google's UI toolkit vs Meta's JS framework."
      intro="Building native mobile apps is expensive. Cross-platform is the dream. React Native uses native components via a bridge, while Flutter draws its own pixels. Which approach delivers the best app?"
      personaA={{
        name: "Flutter Fan",
        role: "Pixel Perfect",
        color: "cyan"
      }}
      personaB={{
        name: "React Native Native",
        role: "JS Giant",
        color: "blue"
      }}
      turns={[
        {
          speaker: "A",
          topic: "Performance",
          text: "Flutter compiles to native ARM code. No JavaScript bridge. We draw every pixel with Skia. Animations are silky smooth 60fps (or 120fps) on every device. It looks the same everywhere."
        },
        {
          speaker: "B",
          topic: "Native Feel",
          text: "But it doesn't *feel* native. An iOS user knows when a scroll bounce is fake. React Native uses actual platform UI components. When Apple updates iOS design, my app updates automatically. Yours looks stuck in the past."
        },
        {
          speaker: "A",
          topic: "Developer Exp",
          text: "Hot Reload in Flutter is stateful and instant. Dart is a strongly typed, sound language that catches bugs early. And our widget library is exhaustive. You don't need 50 dependencies to build a UI."
        },
        {
          speaker: "B",
          topic: "Ecosystem",
          text: "JavaScript. That's it. I have the entire npm ecosystem. I can share code with my web app (React). Finding a React developer is easy. Finding a Dart developer? Good luck."
        },
        {
          speaker: "A",
          text: "Google is all in. Flutter isn't just for mobile anymore; it's for Web, Desktop, and Embedded. It's the most portable UI framework in history."
        },
        {
          speaker: "B",
          text: "React Native has 'New Architecture' (Fabric/TurboModules) now, removing the bridge bottleneck. We are getting as fast as native, but keeping the massive JS ecosystem advantage."
        }
      ]}
      conclusion="Choose React Native if you already have a web team (React/JS), need OTA updates (CodePush), or prioritize using platform-native UI components. Choose Flutter if you want absolute design consistency across platforms, superior raw performance for complex animations, or are starting a mobile team from scratch."
      winner="React Native for Web Teams, Flutter for Performance"
    />
  );
}
