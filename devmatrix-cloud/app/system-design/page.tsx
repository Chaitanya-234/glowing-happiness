'use client';

import dynamic from "next/dynamic";

const ModularDrawIOSystem = dynamic(
  () => import('@/components/ModularDrawIOSystem'),
  { ssr: false }
);

export default function SystemDesignPage() {
  return (
    <div className="h-screen pt-14">
      <ModularDrawIOSystem />
    </div>
  );
}
