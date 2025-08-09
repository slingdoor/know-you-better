import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CommunityForum from '@/components/community/CommunityForum';

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/community`);
  }

  // Fetch forum posts from database
  let posts: any[] = [];
  let categories: any[] = [];
  
  try {
    posts = await prisma.forumPost.findMany({
      include: {
        author: {
          select: { name: true, image: true }
        },
        category: true,
        _count: {
          select: { replies: true, likes: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    categories = await prisma.forumCategory.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.log('Database fetch failed, using mock data');
  }

  // Mock forum data if database is empty
  const mockCategories = categories.length === 0 ? [
    {
      id: '1',
      name: 'General Support',
      description: 'General mental health discussions and peer support',
      color: 'bg-primary-100 text-primary-700',
      _count: { posts: 24 }
    },
    {
      id: '2', 
      name: 'Anxiety & Depression',
      description: 'Discussions about anxiety, depression, and mood disorders',
      color: 'bg-secondary-100 text-secondary-700',
      _count: { posts: 18 }
    },
    {
      id: '3',
      name: 'Academic Stress',
      description: 'School-related stress, exams, and academic pressure',
      color: 'bg-warm-100 text-warm-700',
      _count: { posts: 15 }
    },
    {
      id: '4',
      name: 'Relationships',
      description: 'Family, friends, and relationship support',
      color: 'bg-calm-100 text-calm-700',
      _count: { posts: 12 }
    },
    {
      id: '5',
      name: 'Self-Care Tips',
      description: 'Share and discover self-care strategies',
      color: 'bg-green-100 text-green-700',
      _count: { posts: 21 }
    }
  ] : categories;

  const mockPosts = posts.length === 0 ? [
    {
      id: '1',
      title: 'How do you deal with overwhelming anxiety before exams?',
      content: 'I have my final exams coming up and I\'m feeling so overwhelmed. My heart races just thinking about them. Does anyone have strategies that have worked for them?',
      categoryId: '2',
      isAnonymous: true,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: {
        name: 'Anonymous',
        image: null
      },
      category: {
        id: '2',
        name: 'Anxiety & Depression',
        color: 'bg-secondary-100 text-secondary-700'
      },
      _count: {
        replies: 7,
        likes: 12
      }
    },
    {
      id: '2',
      title: 'Daily meditation changed my life - sharing my experience',
      content: 'I started doing 10 minutes of meditation every morning and it has made such a difference in my anxiety levels. I wanted to share some beginner-friendly apps and techniques that worked for me.',
      categoryId: '5',
      isAnonymous: false,
      isPinned: true,
      isLocked: false,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      author: {
        name: 'Alex M.',
        image: null
      },
      category: {
        id: '5',
        name: 'Self-Care Tips',
        color: 'bg-green-100 text-green-700'
      },
      _count: {
        replies: 15,
        likes: 28
      }
    },
    {
      id: '3',
      title: 'Feeling isolated - anyone else struggling to make friends?',
      content: 'I moved to a new school this year and I\'m having a hard time connecting with people. I feel like everyone already has their friend groups. Any advice on putting yourself out there?',
      categoryId: '4',
      isAnonymous: true,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      author: {
        name: 'Anonymous',
        image: null
      },
      category: {
        id: '4',
        name: 'Relationships',
        color: 'bg-calm-100 text-calm-700'
      },
      _count: {
        replies: 9,
        likes: 6
      }
    },
    {
      id: '4',
      title: 'Study techniques that actually work for ADHD brains',
      content: 'As someone with ADHD, traditional study methods never worked for me. Here are some techniques I\'ve discovered that have really helped improve my focus and retention.',
      categoryId: '3',
      isAnonymous: false,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: {
        name: 'Jordan K.',
        image: null
      },
      category: {
        id: '3',
        name: 'Academic Stress',
        color: 'bg-warm-100 text-warm-700'
      },
      _count: {
        replies: 11,
        likes: 22
      }
    },
    {
      id: '5',
      title: 'Weekly Check-in: How is everyone doing?',
      content: 'Let\'s use this space to check in with each other. Share how your week went, any victories (big or small), or if you need some support. Remember, we\'re all here for each other!',
      categoryId: '1',
      isAnonymous: false,
      isPinned: true,
      isLocked: false,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      author: {
        name: 'Community Moderator',
        image: null
      },
      category: {
        id: '1',
        name: 'General Support',
        color: 'bg-primary-100 text-primary-700'
      },
      _count: {
        replies: 34,
        likes: 45
      }
    }
  ] : posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString()
  }));

  return (
    <CommunityForum 
      posts={mockPosts}
      categories={mockCategories}
      locale={locale}
      userId={session.user.id}
    />
  );
}