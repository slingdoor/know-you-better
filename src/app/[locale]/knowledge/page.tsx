import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import KnowledgeBase from '@/components/knowledge/KnowledgeBase';
import { 
  BookOpen, 
  Heart, 
  Brain, 
  Users, 
  Home,
  GraduationCap,
  MessageCircle
} from 'lucide-react';

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch articles from database
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  });

  // Mock data for categories and popular articles
  const categories = [
    {
      id: 'general',
      name: t('knowledge.categories'),
      icon: BookOpen,
      color: 'bg-primary-100 text-primary-600',
      count: 12
    },
    {
      id: 'anxiety',
      name: 'Anxiety & Stress',
      icon: Brain,
      color: 'bg-warm-100 text-warm-600',
      count: 18
    },
    {
      id: 'depression',
      name: 'Depression & Mood',
      icon: Heart,
      color: 'bg-secondary-100 text-secondary-600',
      count: 15
    },
    {
      id: 'relationships',
      name: t('knowledge.relationships'),
      icon: Users,
      color: 'bg-sage-100 text-sage-600',
      count: 22
    },
    {
      id: 'family',
      name: 'Family & Home',
      icon: Home,
      color: 'bg-purple-100 text-purple-600',
      count: 14
    },
    {
      id: 'school',
      name: 'School & Academic',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-600',
      count: 19
    },
    {
      id: 'self-esteem',
      name: 'Self-Esteem & Identity',
      icon: MessageCircle,
      color: 'bg-pink-100 text-pink-600',
      count: 16
    }
  ];

  // Mock popular articles if database is empty
  const mockArticles = articles.length === 0 ? [
    {
      id: '1',
      title: 'Understanding Teenage Anxiety: Signs and Coping Strategies',
      excerpt: 'Learn to recognize anxiety symptoms and discover practical techniques to manage stress in daily life.',
      category: 'ANXIETY',
      slug: 'understanding-teenage-anxiety',
      publishedAt: new Date('2024-01-15'),
      authorName: 'Dr. Sarah Chen',
      tags: ['anxiety', 'coping', 'stress-management']
    },
    {
      id: '2',
      title: 'Building Healthy Friendships in High School',
      excerpt: 'Navigate social relationships with confidence and learn how to build meaningful connections.',
      category: 'RELATIONSHIPS',
      slug: 'building-healthy-friendships',
      publishedAt: new Date('2024-01-12'),
      authorName: 'Dr. Michael Rodriguez',
      tags: ['friendships', 'social-skills', 'relationships']
    },
    {
      id: '3',
      title: 'Academic Pressure: Finding Balance and Motivation',
      excerpt: 'Strategies to manage school stress while maintaining mental health and personal interests.',
      category: 'SCHOOL',
      slug: 'academic-pressure-balance',
      publishedAt: new Date('2024-01-10'),
      authorName: 'Dr. Emily Watson',
      tags: ['school', 'stress', 'balance', 'motivation']
    },
    {
      id: '4',
      title: 'Communicating with Parents: Tips for Better Understanding',
      excerpt: 'Improve family relationships through effective communication and mutual respect.',
      category: 'FAMILY',
      slug: 'communicating-with-parents',
      publishedAt: new Date('2024-01-08'),
      authorName: 'Dr. Lisa Park',
      tags: ['family', 'communication', 'parents']
    },
    {
      id: '5',
      title: 'Developing Self-Confidence During Adolescence',
      excerpt: 'Build a positive self-image and develop inner strength during the teenage years.',
      category: 'SELF_ESTEEM',
      slug: 'developing-self-confidence',
      publishedAt: new Date('2024-01-05'),
      authorName: 'Dr. James Thompson',
      tags: ['self-esteem', 'confidence', 'identity']
    },
    {
      id: '6',
      title: 'When to Seek Professional Help for Mental Health',
      excerpt: 'Understanding when it\'s time to reach out for professional support and how to take that step.',
      category: 'GENERAL',
      slug: 'when-to-seek-help',
      publishedAt: new Date('2024-01-03'),
      authorName: 'Dr. Rachel Kim',
      tags: ['mental-health', 'professional-help', 'support']
    }
  ] : articles;

  return (
    <KnowledgeBase 
      categories={categories}
      articles={mockArticles}
      locale={locale}
    />
  );
}