'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronRight, 
  BookOpen,
  Play,
  FileText,
  HelpCircle
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  count: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  slug: string;
  publishedAt: Date | null;
  authorName: string;
  tags: string[];
}

interface KnowledgeBaseProps {
  categories: Category[];
  articles: Article[];
  locale: string;
}

export default function KnowledgeBase({ categories, articles, locale }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contentType, setContentType] = useState<string>('all');
  
  const t = useTranslations();

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const contentTypes = [
    { id: 'all', name: 'All Content', icon: BookOpen },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'videos', name: 'Videos', icon: Play },
    { id: 'faq', name: 'FAQ', icon: HelpCircle }
  ];

  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="bg-white border-b border-calm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl text-calm-900 mb-4">
              {t('knowledge.title')}
            </h1>
            <p className="text-xl text-calm-600 max-w-3xl mx-auto mb-8">
              Explore comprehensive resources, expert articles, and practical guides 
              to support your mental health journey and personal growth.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-calm-400" size={20} />
                <input
                  type="text"
                  placeholder={t('knowledge.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Content Type Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Content Type</h3>
                <div className="space-y-2">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setContentType(type.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                          contentType === type.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-calm-700 hover:bg-calm-100'
                        }`}
                      >
                        <Icon size={18} className="mr-3" />
                        {type.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">
                  {t('knowledge.categories')}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-calm-700 hover:bg-calm-100'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs bg-calm-200 text-calm-600 px-2 py-1 rounded-full">
                      {articles.length}
                    </span>
                  </button>
                  
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-calm-700 hover:bg-calm-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center mr-3`}>
                            <Icon size={16} />
                          </div>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs bg-calm-200 text-calm-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Articles */}
            {searchQuery === '' && selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                      <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary-600" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg text-calm-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-calm-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt || 'No excerpt available'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-calm-500">
                          <span>{article.authorName}</span>
                          <span>{article.publishedAt ? article.publishedAt.toLocaleDateString() : 'No date'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-calm-900">
                  {searchQuery ? `Search Results` : 'Latest Articles'}
                </h2>
                <p className="text-calm-600 mt-1">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <button className="flex items-center px-4 py-2 bg-white border border-calm-300 rounded-lg hover:bg-calm-50 transition-colors">
                <Filter size={16} className="mr-2" />
                Sort by
              </button>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/${locale}/knowledge/articles/${article.slug}`}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-3">
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-lg text-calm-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <ChevronRight size={20} className="text-calm-400 group-hover:text-primary-600 transition-colors flex-shrink-0 ml-4" />
                  </div>
                  
                  <p className="text-calm-600 mb-4 line-clamp-2">
                    {article.excerpt || 'No excerpt available'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-calm-500">
                    <div className="flex items-center">
                      <User size={14} className="mr-2" />
                      {article.authorName}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      {article.publishedAt ? article.publishedAt.toLocaleDateString() : 'No date'}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-calm-100 text-calm-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {filteredArticles.length >= 10 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                  Load More Articles
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-calm-300 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-calm-700 mb-2">
                  No articles found
                </h3>
                <p className="text-calm-500 mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
              {t('knowledge.faq')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How do I know if I need professional help?",
                  answer: "If you're experiencing persistent sadness, anxiety, or other symptoms that interfere with daily life for more than two weeks, it may be time to seek professional support."
                },
                {
                  question: "Is my information kept confidential?",
                  answer: "Yes, all information shared on our platform is kept strictly confidential and follows HIPAA guidelines to protect your privacy."
                },
                {
                  question: "Can my parents see my activity on the platform?",
                  answer: "For users under 18, we may share certain information with parents/guardians when required for safety, but we always respect your privacy as much as possible."
                },
                {
                  question: "What should I do in a crisis situation?",
                  answer: "In any mental health emergency, call 988 (Suicide & Crisis Lifeline) or contact your local emergency services immediately."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-calm-200 rounded-lg p-4">
                  <h3 className="font-semibold text-calm-900 mb-2">{faq.question}</h3>
                  <p className="text-calm-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}