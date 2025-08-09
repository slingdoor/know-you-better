import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CounselingDashboard from '@/components/counseling/CounselingDashboard';

export default async function CounselingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/counseling`);
  }

  // Fetch user's appointments
  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: {
      counselor: {
        include: {
          user: {
            select: { name: true, image: true }
          }
        }
      }
    },
    orderBy: { scheduledAt: 'desc' },
    take: 5
  });

  // Fetch available counselors (mock data for now)
  const counselors = await prisma.counselorProfile.findMany({
    where: { isActive: true },
    include: {
      user: {
        select: { name: true, image: true }
      }
    },
    take: 10
  });

  // Mock counselors if database is empty
  const mockCounselors = counselors.length === 0 ? [
    {
      id: '1',
      userId: 'counselor1',
      specializations: ['Anxiety', 'Depression', 'Teen Issues'],
      experience: 8,
      bio: 'Specialized in adolescent psychology with a focus on anxiety and mood disorders. Uses cognitive-behavioral therapy and mindfulness techniques.',
      hourlyRate: 120,
      isActive: true,
      user: {
        name: 'Dr. Sarah Chen',
        image: null
      }
    },
    {
      id: '2', 
      userId: 'counselor2',
      specializations: ['Family Therapy', 'Relationship Issues', 'Communication'],
      experience: 12,
      bio: 'Family therapist with extensive experience in adolescent-parent relationships and communication strategies.',
      hourlyRate: 135,
      isActive: true,
      user: {
        name: 'Dr. Michael Rodriguez',
        image: null
      }
    },
    {
      id: '3',
      userId: 'counselor3', 
      specializations: ['Academic Stress', 'Self-Esteem', 'Goal Setting'],
      experience: 6,
      bio: 'Helps teens navigate academic pressures while building confidence and developing healthy coping strategies.',
      hourlyRate: 110,
      isActive: true,
      user: {
        name: 'Dr. Emily Watson',
        image: null
      }
    },
    {
      id: '4',
      userId: 'counselor4',
      specializations: ['Trauma Recovery', 'PTSD', 'Crisis Intervention'], 
      experience: 15,
      bio: 'Trauma-informed therapy specialist with experience in crisis intervention and EMDR therapy for adolescents.',
      hourlyRate: 150,
      isActive: true,
      user: {
        name: 'Dr. Lisa Park',
        image: null
      }
    }
  ] : counselors;

  return (
    <CounselingDashboard 
      appointments={appointments.map(apt => ({
        ...apt,
        scheduledAt: apt.scheduledAt.toISOString()
      }))}
      counselors={mockCounselors.map(counselor => ({
        ...counselor,
        hourlyRate: counselor.hourlyRate ? Number(counselor.hourlyRate) : null
      }))}
      locale={locale}
      userId={session.user.id}
    />
  );
}