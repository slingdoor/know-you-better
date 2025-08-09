'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Filter,
  Heart,
  MessageSquare,
  Pin,
  Lock,
  User,
  Eye,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  isAnonymous: boolean;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
  category: {
    id: string;
    name: string;
    color: string;
  };
  _count: {
    replies: number;
    likes: number;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  _count: {
    posts: number;
  };
}

interface CommunityForumProps {
  posts: Post[];
  categories: Category[];
  locale: string;
  userId: string;
}

export default function CommunityForum({ posts, categories, locale, userId }: CommunityForumProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b._count.likes + b._count.replies) - (a._count.likes + a._count.replies);
      case 'replies':
        return b._count.replies - a._count.replies;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-calm-900 mb-4">
            Community Forum
          </h1>
          <p className="text-xl text-calm-600">
            Connect with peers, share experiences, and support each other
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* New Post Button */}
            <button
              onClick={() => setShowNewPostModal(true)}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mb-6"
            >
              <Plus size={20} />
              New Post
            </button>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="font-semibold text-lg text-calm-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === 'all' 
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'hover:bg-calm-50 text-calm-700'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-sm text-calm-500">
                    {posts.length}
                  </span>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'hover:bg-calm-50 text-calm-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-calm-500 mt-1">
                          {category.description}
                        </div>
                      </div>
                      <span className="text-sm text-calm-500">
                        {category._count.posts}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-semibold text-lg text-calm-900 mb-4">Community Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="text-primary-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-calm-900">1,247</div>
                    <div className="text-sm text-calm-500">Active Members</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="text-secondary-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-calm-900">3,891</div>
                    <div className="text-sm text-calm-500">Total Posts</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart className="text-warm-600 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-calm-900">12,458</div>
                    <div className="text-sm text-calm-500">Helpful Reactions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-calm-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="replies">Most Replies</option>
                </select>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/community/post/${post.id}`}
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {post.isPinned && (
                        <Pin className="text-warm-600 flex-shrink-0" size={16} />
                      )}
                      {post.isLocked && (
                        <Lock className="text-calm-500 flex-shrink-0" size={16} />
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.category.color}`}>
                        {post.category.name}
                      </span>
                    </div>
                    <span className="text-sm text-calm-500 flex-shrink-0">
                      {getTimeAgo(post.createdAt)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-calm-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-calm-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-calm-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {post.author.image ? (
                          <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        ) : (
                          <User className="w-6 h-6 text-calm-400 mr-2" />
                        )}
                        <span>{post.isAnonymous ? 'Anonymous' : post.author.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" />
                        <span>{post._count.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />
                        <span>{post._count.replies}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <MessageCircle className="w-16 h-16 text-calm-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-calm-700 mb-2">No posts found</h3>
                  <p className="text-calm-500 mb-4">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Be the first to start a conversation!'
                    }
                  </p>
                  <button
                    onClick={() => setShowNewPostModal(true)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Create New Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Post Modal - Placeholder */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display font-bold text-xl text-calm-900">Create New Post</h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-calm-500 hover:text-calm-700"
                >
                  ×
                </button>
              </div>
              
              <p className="text-calm-600 mb-4">
                This feature will be available soon! You'll be able to create new posts, 
                choose categories, and decide whether to post anonymously.
              </p>
              
              <button
                onClick={() => setShowNewPostModal(false)}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}