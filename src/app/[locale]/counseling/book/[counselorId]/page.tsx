import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import BookingForm from '@/components/counseling/BookingForm';

interface BookingPageProps {
  params: Promise<{ locale: string; counselorId: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { locale, counselorId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/counseling/book/${counselorId}`);
  }

  // Try to fetch counselor from database
  let counselor = await prisma.counselorProfile.findUnique({
    where: { id: counselorId },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });

  // Mock counselor data if not found in database
  const mockCounselors: Record<string, any> = {
    '1': {
      id: '1',
      specializations: ['Anxiety', 'Depression', 'Teen Issues'],
      experience: 8,
      bio: 'Specialized in adolescent psychology with a focus on anxiety and mood disorders. Uses cognitive-behavioral therapy and mindfulness techniques.',
      hourlyRate: 120,
      user: {
        name: 'Dr. Sarah Chen',
        image: null
      }
    },
    '2': {
      id: '2',
      specializations: ['Family Therapy', 'Relationship Issues', 'Communication'],
      experience: 12,
      bio: 'Family therapist with extensive experience in adolescent-parent relationships and communication strategies.',
      hourlyRate: 135,
      user: {
        name: 'Dr. Michael Rodriguez',
        image: null
      }
    },
    '3': {
      id: '3',
      specializations: ['Academic Stress', 'Self-Esteem', 'Goal Setting'],
      experience: 6,
      bio: 'Helps teens navigate academic pressures while building confidence and developing healthy coping strategies.',
      hourlyRate: 110,
      user: {
        name: 'Dr. Emily Watson',
        image: null
      }
    },
    '4': {
      id: '4',
      specializations: ['Trauma Recovery', 'PTSD', 'Crisis Intervention'],
      experience: 15,
      bio: 'Trauma-informed therapy specialist with experience in crisis intervention and EMDR therapy for adolescents.',
      hourlyRate: 150,
      user: {
        name: 'Dr. Lisa Park',
        image: null
      }
    }
  };

  if (!counselor) {
    counselor = mockCounselors[counselorId];
  }

  if (!counselor) {
    notFound();
  }

  return (
    <BookingForm 
      counselor={{
        ...counselor,
        hourlyRate: counselor.hourlyRate ? Number(counselor.hourlyRate) : null
      }}
      locale={locale}
      userId={session.user.id}
    />
  );
}