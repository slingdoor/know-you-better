import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ConfirmationPage from '@/components/counseling/ConfirmationPage';

interface ConfirmationPageProps {
  params: Promise<{ locale: string; appointmentId: string }>;
}

export default async function AppointmentConfirmation({ params }: ConfirmationPageProps) {
  const { locale, appointmentId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/counseling/confirmation/${appointmentId}`);
  }

  // Try to fetch appointment from database
  let appointment = null;
  
  try {
    appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        counselor: {
          include: {
            user: {
              select: { name: true, image: true }
            }
          }
        }
      }
    });
  } catch (error) {
    console.log('Database fetch failed, using mock data');
  }

  // Mock appointment data if not found in database
  if (!appointment) {
    // Mock counselor data for confirmation
    const mockCounselors: Record<string, any> = {
      '1': {
        id: '1',
        specializations: ['Anxiety', 'Depression', 'Teen Issues'],
        experience: 8,
        bio: 'Specialized in adolescent psychology with a focus on anxiety and mood disorders.',
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
        bio: 'Family therapist with extensive experience in adolescent-parent relationships.',
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
        bio: 'Helps teens navigate academic pressures while building confidence.',
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
        bio: 'Trauma-informed therapy specialist with experience in crisis intervention.',
        hourlyRate: 150,
        user: {
          name: 'Dr. Lisa Park',
          image: null
        }
      }
    };

    // Mock appointment based on appointmentId pattern
    if (appointmentId.startsWith('mock-')) {
      appointment = {
        id: appointmentId,
        userId: session.user.id,
        counselorId: '1', // Default to first counselor
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        status: 'SCHEDULED',
        type: 'VIDEO',
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        counselor: mockCounselors['1']
      };
    }
  }

  if (!appointment) {
    notFound();
  }

  return (
    <ConfirmationPage 
      appointment={{
        ...appointment,
        scheduledAt: appointment.scheduledAt.toISOString(),
        counselor: {
          ...appointment.counselor,
          hourlyRate: appointment.counselor.hourlyRate ? Number(appointment.counselor.hourlyRate) : null
        }
      }}
      locale={locale}
    />
  );
}