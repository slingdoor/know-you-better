import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ForumPost from '@/components/community/ForumPost';

interface PostPageProps {
  params: Promise<{ locale: string; postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, postId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/community/post/${postId}`);
  }

  // Try to fetch post from database
  let post = null;
  let replies = [];

  try {
    post = await prisma.forumPost.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { name: true, image: true }
        },
        category: true,
        _count: {
          select: { replies: true, likes: true }
        }
      }
    });

    if (post) {
      replies = await prisma.forumReply.findMany({
        where: { postId: postId },
        include: {
          author: {
            select: { name: true, image: true }
          },
          _count: {
            select: { likes: true }
          }
        },
        orderBy: { createdAt: 'asc' }
      });
    }
  } catch (error) {
    console.log('Database fetch failed, using mock data');
  }

  // Mock post data if not found in database
  const mockPosts: Record<string, any> = {
    '1': {
      id: '1',
      title: 'How do you deal with overwhelming anxiety before exams?',
      content: `I have my final exams coming up and I'm feeling so overwhelmed. My heart races just thinking about them. Does anyone have strategies that have worked for them?

I've tried some breathing exercises but they don't seem to help much. I also tried studying more, but that just makes me more anxious because I realize how much I don't know.

I really don't want to fail these exams, but I feel like my anxiety is getting in the way of my preparation. Any advice would be really appreciated.`,
      categoryId: '2',
      isAnonymous: true,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
    '2': {
      id: '2',
      title: 'Daily meditation changed my life - sharing my experience',
      content: `I started doing 10 minutes of meditation every morning about 6 months ago, and it has made such a difference in my anxiety levels. I wanted to share some beginner-friendly apps and techniques that worked for me.

**What I tried:**
- Headspace (great for beginners)
- Insight Timer (free with lots of options)
- Simple breathing exercises
- Body scan meditations

**What I noticed:**
- Less racing thoughts in the morning
- Better sleep quality
- More patience with stressful situations
- Improved focus during the day

I know meditation isn't for everyone, but if you're curious, I'd recommend starting with just 5 minutes. The key is consistency rather than duration.

Happy to answer any questions about getting started!`,
      categoryId: '5',
      isAnonymous: false,
      isPinned: true,
      isLocked: false,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
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
    }
  };

  const mockReplies: Record<string, any[]> = {
    '1': [
      {
        id: '1-1',
        content: 'I totally understand this feeling! What helped me was breaking my study sessions into smaller chunks (25 minutes with 5-minute breaks). The Pomodoro technique really reduced my overwhelm.',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        author: { name: 'Study Buddy', image: null },
        _count: { likes: 5 }
      },
      {
        id: '1-2',
        content: 'Have you tried the 4-7-8 breathing technique? Breathe in for 4, hold for 7, out for 8. It activates your parasympathetic nervous system and actually helps calm anxiety. I use it before every exam.',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        author: { name: 'Mindful Mike', image: null },
        _count: { likes: 8 }
      },
      {
        id: '1-3',
        content: 'Progressive muscle relaxation helped me a lot with exam anxiety. There are free guided sessions on YouTube. Also, remember that your worth isn\'t determined by exam grades! 💪',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
        author: { name: 'Wellness Warrior', image: null },
        _count: { likes: 6 }
      }
    ],
    '2': [
      {
        id: '2-1',
        content: 'Thank you for sharing this! I\'ve been wanting to start meditating but didn\'t know where to begin. Downloaded Headspace based on your recommendation.',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        author: { name: 'Newbie Meditator', image: null },
        _count: { likes: 3 }
      },
      {
        id: '2-2',
        content: 'Insight Timer is amazing! I love the timer feature and all the free content. Been using it for a year now and my anxiety has definitely improved.',
        isAnonymous: false,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        author: { name: 'Zen Seeker', image: null },
        _count: { likes: 7 }
      }
    ]
  };

  if (!post) {
    post = mockPosts[postId];
  }

  if (replies.length === 0) {
    replies = mockReplies[postId] || [];
  }

  if (!post) {
    notFound();
  }

  return (
    <ForumPost
      post={{
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }}
      replies={replies.map(reply => ({
        ...reply,
        createdAt: reply.createdAt.toISOString()
      }))}
      locale={locale}
      userId={session.user.id}
    />
  );
}