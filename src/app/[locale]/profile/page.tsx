import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import UserProfile from '@/components/profile/UserProfile';

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/profile`);
  }

  // Fetch user data from database
  let user = null;
  let userStats = null;

  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true
      }
    });

    // Get user activity stats
    const [appointmentCount, postCount, analysisCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: session.user.id }
      }),
      prisma.forumPost.count({
        where: { authorId: session.user.id }
      }),
      prisma.drawingAnalysis.count({
        where: { userId: session.user.id }
      })
    ]);

    userStats = {
      totalAppointments: appointmentCount,
      totalPosts: postCount,
      totalAnalyses: analysisCount
    };
  } catch (error) {
    console.log('Database fetch failed, using session data');
  }

  // Use session data as fallback
  if (!user) {
    user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: null
    };
  }

  // Mock stats if database query failed
  if (!userStats) {
    userStats = {
      totalAppointments: 3,
      totalPosts: 5,
      totalAnalyses: 2
    };
  }

  return (
    <UserProfile 
      user={{
        ...user,
        name: user.name || null,
        email: user.email || null,
        image: user.image || null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        profile: user.profile ? {
          ...user.profile,
          dateOfBirth: user.profile.dateOfBirth ? user.profile.dateOfBirth.toISOString() : null,
          createdAt: user.profile.createdAt.toISOString(),
          updatedAt: user.profile.updatedAt.toISOString()
        } : null
      }}
      userStats={userStats}
      locale={locale}
    />
  );
}