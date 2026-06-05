'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building, Eye, MessageSquare, FileText, Users, TrendingUp } from 'lucide-react';
import { getAdminDashboard } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface DashboardData {
  stats: {
    totalApartments: number;
    activeApartments: number;
    soldApartments: number;
    totalInquiries: number;
    totalVisits: number;
    totalValuations: number;
    newValuations: number;
  };
  mostViewed: Array<{ id: string; title: string; slug: string; viewCount: number; price: number }>;
  recentInquiries: Array<{ id: string; name: string; phone: string; type: string; createdAt: string; apartment?: { title: string } }>;
}

const mockDashboard: DashboardData = {
  stats: {
    totalApartments: 6,
    activeApartments: 6,
    soldApartments: 0,
    totalInquiries: 24,
    totalVisits: 18,
    totalValuations: 12,
    newValuations: 3,
  },
  mostViewed: [
    { id: '2', title: 'Banani Skyline Penthouse', slug: 'banani-skyline-penthouse-4bed', viewCount: 518, price: 52000000 },
    { id: '1', title: 'Gulshan Lakeview Residence', slug: 'gulshan-lakeview-residence-3bed', viewCount: 342, price: 28500000 },
    { id: '6', title: 'Gulshan Corner Suite', slug: 'gulshan-corner-suite-2bed', viewCount: 298, price: 22000000 },
  ],
  recentInquiries: [
    { id: '1', name: 'Ahmed Khan', phone: '+8801712345678', type: 'VISIT', createdAt: new Date().toISOString(), apartment: { title: 'Gulshan Lakeview Residence' } },
    { id: '2', name: 'Sara Islam', phone: '+8801812345678', type: 'CONTACT', createdAt: new Date().toISOString() },
  ],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(user);
    if (parsed.role !== 'ADMIN') {
      router.push('/account');
      return;
    }

    async function load() {
      const result = await getAdminDashboard(token!);
      setData(result || mockDashboard);
    }
    load();
  }, [router]);

  if (!data) {
    return <div className="pt-24 flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-neutral-400">Loading dashboard...</div></div>;
  }

  const statCards = [
    { label: 'Active Apartments', value: data.stats.activeApartments, icon: Building, color: 'text-blue-600 bg-blue-50' },
    { label: 'Visit Requests', value: data.stats.totalVisits, icon: Eye, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Inquiries', value: data.stats.totalInquiries, icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
    { label: 'New Valuations', value: data.stats.newValuations, icon: FileText, color: 'text-amber-600 bg-amber-50' },
    { label: 'Sold', value: data.stats.soldApartments, icon: TrendingUp, color: 'text-rose-600 bg-rose-50' },
    { label: 'Total Users', value: 2, icon: Users, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Admin Dashboard</h1>
            <p className="text-sm text-neutral-500">Manage your curated apartment collection</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/apartments" className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800">
              Manage Apartments
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-500">{stat.label}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-semibold text-neutral-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Most Viewed */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-neutral-900 mb-4">Most Viewed Apartments</h2>
            <div className="space-y-3">
              {data.mostViewed.map((apt, i) => (
                <div key={apt.id} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-400 w-6">{i + 1}</span>
                    <div>
                      <Link href={`/apartments/${apt.slug}`} className="text-sm font-medium text-neutral-900 hover:underline">
                        {apt.title}
                      </Link>
                      <p className="text-xs text-neutral-500">{formatPrice(apt.price)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-600">{apt.viewCount} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-neutral-900 mb-4">Recent Inquiries</h2>
            <div className="space-y-3">
              {data.recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{inq.name}</p>
                    <p className="text-xs text-neutral-500">{inq.phone}</p>
                    {inq.apartment && <p className="text-xs text-neutral-400">{inq.apartment.title}</p>}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">{inq.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
