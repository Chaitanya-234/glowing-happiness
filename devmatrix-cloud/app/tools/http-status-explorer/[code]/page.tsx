import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { httpStatusData, HttpStatusInfo } from '@/lib/http-status-data';
import HttpStatusDetailClient from './HttpStatusDetailClient';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  return httpStatusData.map((status) => ({
    code: status.code.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const code = parseInt(resolvedParams.code);
  const status = httpStatusData.find((s) => s.code === code);

  if (!status) {
    return {
      title: 'Status Code Not Found',
    };
  }

  return {
    title: `${status.code} ${status.title} - HTTP Status Code Guide | DevMetrix`,
    description: status.concise,
    keywords: [`http ${status.code}`, `http ${status.title}`, 'status code meaning', 'how to fix http error'],
  };
}

export default async function HttpStatusDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const code = parseInt(resolvedParams.code);
  const status = httpStatusData.find((s) => s.code === code);

  if (!status) {
    notFound();
  }

  return <HttpStatusDetailClient data={status} />;
}
