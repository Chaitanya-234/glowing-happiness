import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminDashboardPage() {
  if (!await isAdminAuthenticated()) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
