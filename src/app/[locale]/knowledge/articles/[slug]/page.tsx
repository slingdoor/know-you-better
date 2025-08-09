import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import ArticleContent from '@/components/knowledge/ArticleContent';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations();

  // Try to fetch article from database
  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true },
  });

  // Mock article data if not found in database
  const mockArticles: Record<string, any> = {
    'understanding-teenage-anxiety': {
      id: '1',
      title: 'Understanding Teenage Anxiety: Signs and Coping Strategies',
      content: `
        <div class="prose max-w-none">
          <p class="lead">Anxiety is one of the most common mental health challenges faced by teenagers today. Understanding the signs and learning effective coping strategies can make a significant difference in managing anxiety and improving overall well-being.</p>
          
          <h2>What is Teenage Anxiety?</h2>
          <p>Teenage anxiety goes beyond normal worries about school, friends, or future plans. It involves persistent, excessive worry that interferes with daily activities, relationships, and overall quality of life.</p>
          
          <h3>Common Signs of Anxiety in Teens</h3>
          <ul>
            <li><strong>Physical symptoms:</strong> Rapid heartbeat, sweating, trembling, stomach aches, headaches</li>
            <li><strong>Emotional symptoms:</strong> Excessive worry, fear, irritability, restlessness</li>
            <li><strong>Behavioral changes:</strong> Avoiding social situations, declining academic performance, sleep disturbances</li>
            <li><strong>Cognitive symptoms:</strong> Difficulty concentrating, racing thoughts, catastrophic thinking</li>
          </ul>
          
          <h2>Effective Coping Strategies</h2>
          
          <h3>1. Deep Breathing Exercises</h3>
          <p>Practice the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. This activates your body's relaxation response.</p>
          
          <h3>2. Mindfulness and Meditation</h3>
          <p>Regular mindfulness practice helps you stay present and reduces anxious thoughts about the future. Start with just 5 minutes a day.</p>
          
          <h3>3. Physical Activity</h3>
          <p>Exercise releases endorphins and helps reduce stress hormones. Find activities you enjoy, whether it's walking, dancing, or playing sports.</p>
          
          <h3>4. Healthy Sleep Habits</h3>
          <p>Aim for 8-9 hours of sleep per night. Create a relaxing bedtime routine and avoid screens before bed.</p>
          
          <h3>5. Talk to Someone</h3>
          <p>Share your feelings with trusted friends, family members, or a counselor. You don't have to face anxiety alone.</p>
          
          <h2>When to Seek Professional Help</h2>
          <p>Consider reaching out to a mental health professional if:</p>
          <ul>
            <li>Anxiety interferes with school, relationships, or daily activities</li>
            <li>You experience panic attacks</li>
            <li>You avoid situations that are important to you</li>
            <li>Physical symptoms persist or worsen</li>
            <li>You have thoughts of self-harm</li>
          </ul>
          
          <div class="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">Remember</h3>
            <p class="text-blue-800">Anxiety is treatable, and you're not alone. With the right support and strategies, you can learn to manage anxiety and live a fulfilling life. If you're in crisis, call 988 for immediate support.</p>
          </div>
        </div>
      `,
      excerpt: 'Learn to recognize anxiety symptoms and discover practical techniques to manage stress in daily life.',
      category: 'ANXIETY',
      publishedAt: new Date('2024-01-15'),
      authorName: 'Dr. Sarah Chen',
      tags: ['anxiety', 'coping', 'stress-management'],
      metaTitle: 'Understanding Teenage Anxiety: Signs and Coping Strategies',
      metaDescription: 'Learn to recognize anxiety symptoms in teenagers and discover practical, evidence-based coping strategies to manage stress and improve mental health.'
    },
    'building-healthy-friendships': {
      id: '2',
      title: 'Building Healthy Friendships in High School',
      content: `
        <div class="prose max-w-none">
          <p class="lead">High school friendships can be complex, but building healthy, supportive relationships is crucial for your emotional well-being and personal growth.</p>
          
          <h2>What Makes a Healthy Friendship?</h2>
          <p>Healthy friendships are built on mutual respect, trust, and genuine care for each other's well-being. They should enhance your life, not drain your energy.</p>
          
          <h3>Key Characteristics of Healthy Friendships</h3>
          <ul>
            <li><strong>Mutual respect:</strong> Both people value each other's opinions, boundaries, and differences</li>
            <li><strong>Trust and honesty:</strong> You can be yourself without fear of judgment</li>
            <li><strong>Support:</strong> Friends encourage each other and offer help during difficult times</li>
            <li><strong>Balance:</strong> Both people contribute to the relationship equally</li>
            <li><strong>Fun and enjoyment:</strong> You genuinely enjoy spending time together</li>
          </ul>
          
          <h2>How to Build Strong Friendships</h2>
          
          <h3>1. Be Genuine and Authentic</h3>
          <p>Don't try to be someone you're not to impress others. Authentic friendships form when people appreciate the real you.</p>
          
          <h3>2. Show Interest in Others</h3>
          <p>Ask questions, listen actively, and remember important details about your friends' lives. Show that you care about their thoughts and feelings.</p>
          
          <h3>3. Be a Good Listener</h3>
          <p>Sometimes friends need someone to listen without judgment. Practice active listening and offer support when needed.</p>
          
          <h3>4. Respect Boundaries</h3>
          <p>Everyone has different comfort levels. Respect your friends' boundaries and communicate your own clearly.</p>
          
          <h3>5. Be Reliable</h3>
          <p>Follow through on your commitments and be there when your friends need you. Reliability builds trust over time.</p>
          
          <h2>Navigating Social Challenges</h2>
          
          <h3>Dealing with Peer Pressure</h3>
          <p>True friends won't pressure you to do things that make you uncomfortable. It's okay to say no and stick to your values.</p>
          
          <h3>Managing Friendship Drama</h3>
          <p>When conflicts arise, address them directly and calmly. Focus on resolving the issue rather than assigning blame.</p>
          
          <h3>Making New Friends</h3>
          <p>Join clubs, sports teams, or volunteer activities that align with your interests. Shared activities provide natural opportunities to connect with like-minded people.</p>
          
          <div class="bg-green-50 p-6 rounded-lg mt-8">
            <h3 class="text-lg font-semibold text-green-900 mb-2">Quality Over Quantity</h3>
            <p class="text-green-800">Remember, it's better to have a few close, supportive friends than many superficial relationships. Focus on nurturing the friendships that bring out the best in you.</p>
          </div>
        </div>
      `,
      excerpt: 'Navigate social relationships with confidence and learn how to build meaningful connections.',
      category: 'RELATIONSHIPS',
      publishedAt: new Date('2024-01-12'),
      authorName: 'Dr. Michael Rodriguez',
      tags: ['friendships', 'social-skills', 'relationships'],
      metaTitle: 'Building Healthy Friendships in High School - Teen Relationship Guide',
      metaDescription: 'Learn how to build meaningful, healthy friendships during high school years with expert tips on communication, trust, and navigating social challenges.'
    },
    'academic-pressure-balance': {
      id: '3',
      title: 'Academic Pressure: Finding Balance and Motivation',
      content: `
        <div class="prose max-w-none">
          <p class="lead">Academic pressure is a reality for many students, but learning to manage it effectively can help you succeed while maintaining your mental health and overall well-being.</p>
          
          <h2>Understanding Academic Pressure</h2>
          <p>Academic pressure comes from various sources: parents, teachers, peers, and often yourself. While some pressure can be motivating, excessive stress can lead to burnout, anxiety, and decreased performance.</p>
          
          <h3>Signs You May Be Experiencing Too Much Academic Pressure</h3>
          <ul>
            <li>Constant worry about grades and performance</li>
            <li>Difficulty sleeping due to school-related stress</li>
            <li>Loss of interest in activities you used to enjoy</li>
            <li>Physical symptoms like headaches or stomach aches</li>
            <li>Procrastination or avoidance of schoolwork</li>
            <li>Perfectionism that prevents you from completing tasks</li>
          </ul>
          
          <h2>Strategies for Managing Academic Stress</h2>
          
          <h3>1. Set Realistic Goals</h3>
          <p>Break large projects into smaller, manageable tasks. Set specific, achievable goals rather than aiming for perfection in everything.</p>
          
          <h3>2. Develop Effective Study Habits</h3>
          <ul>
            <li>Create a consistent study schedule</li>
            <li>Find your optimal learning environment</li>
            <li>Use active learning techniques like summarizing and teaching others</li>
            <li>Take regular breaks using the Pomodoro Technique</li>
          </ul>
          
          <h3>3. Prioritize Self-Care</h3>
          <p>Your physical and mental health should come first. Make time for exercise, proper nutrition, adequate sleep, and activities you enjoy.</p>
          
          <h3>4. Learn to Say No</h3>
          <p>You don't have to participate in every activity or take every advanced class. Choose commitments that align with your goals and interests.</p>
          
          <h3>5. Seek Support</h3>
          <p>Don't hesitate to ask for help from teachers, tutors, counselors, or family members. Academic support services are there for a reason.</p>
          
          <h2>Finding Your Motivation</h2>
          
          <h3>Connect Learning to Your Interests</h3>
          <p>Find ways to relate your studies to your personal interests and future goals. This makes learning more meaningful and engaging.</p>
          
          <h3>Celebrate Small Wins</h3>
          <p>Acknowledge your progress and achievements, no matter how small. This builds confidence and maintains motivation.</p>
          
          <h3>Focus on Growth, Not Just Grades</h3>
          <p>Remember that learning is about developing skills and knowledge, not just earning high marks. Focus on what you're gaining from each experience.</p>
          
          <h2>Time Management Tips</h2>
          <ul>
            <li>Use a planner or digital calendar to track assignments and deadlines</li>
            <li>Prioritize tasks using the Eisenhower Matrix (urgent vs. important)</li>
            <li>Build in buffer time for unexpected challenges</li>
            <li>Avoid multitasking - focus on one task at a time</li>
          </ul>
          
          <div class="bg-yellow-50 p-6 rounded-lg mt-8">
            <h3 class="text-lg font-semibold text-yellow-900 mb-2">Remember Your Worth</h3>
            <p class="text-yellow-800">Your value as a person is not determined by your grades or academic achievements. You are worthy of love and respect regardless of your performance in school. Focus on doing your best while maintaining balance in all areas of your life.</p>
          </div>
        </div>
      `,
      excerpt: 'Strategies to manage school stress while maintaining mental health and personal interests.',
      category: 'SCHOOL',
      publishedAt: new Date('2024-01-10'),
      authorName: 'Dr. Emily Watson',
      tags: ['school', 'stress', 'balance', 'motivation'],
      metaTitle: 'Academic Pressure: Finding Balance and Motivation in School',
      metaDescription: 'Learn effective strategies to manage academic pressure, reduce school stress, and maintain motivation while preserving your mental health and well-being.'
    }
  };

  const finalArticle = article || mockArticles[slug];

  if (!finalArticle) {
    notFound();
  }

  return (
    <ArticleContent article={finalArticle} locale={locale} />
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  // This would typically fetch from database
  const mockMeta: Record<string, any> = {
    'understanding-teenage-anxiety': {
      title: 'Understanding Teenage Anxiety: Signs and Coping Strategies',
      description: 'Learn to recognize anxiety symptoms in teenagers and discover practical, evidence-based coping strategies to manage stress and improve mental health.'
    },
    'building-healthy-friendships': {
      title: 'Building Healthy Friendships in High School - Teen Relationship Guide',
      description: 'Learn how to build meaningful, healthy friendships during high school years with expert tips on communication, trust, and navigating social challenges.'
    },
    'academic-pressure-balance': {
      title: 'Academic Pressure: Finding Balance and Motivation in School',
      description: 'Learn effective strategies to manage academic pressure, reduce school stress, and maintain motivation while preserving your mental health and well-being.'
    }
  };

  const meta = mockMeta[slug] || {
    title: 'Article - Know You Better',
    description: 'Mental health resources and guidance for adolescents.'
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
    },
  };
}