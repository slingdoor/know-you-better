'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Share2, 
  Flag,
  Pin,
  Lock,
  User,
  Clock,
  Send,
  ThumbsUp
} from 'lucide-react';

interface Reply {
  id: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
  _count: {
    likes: number;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
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

interface ForumPostProps {
  post: Post;
  replies: Reply[];
  locale: string;
  userId: string;
}

export default function ForumPost({ post, replies, locale, userId }: ForumPostProps) {
  const [newReply, setNewReply] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return;
    
    setIsSubmitting(true);
    
    // TODO: Implement actual reply submission
    setTimeout(() => {
      setNewReply('');
      setIsSubmitting(false);
      alert('Reply posted successfully! (Mock implementation)');
    }, 1000);
  };

  const togglePostLike = () => {
    setLikedPost(!likedPost);
    // TODO: Implement actual like toggle
  };

  const toggleReplyLike = (replyId: string) => {
    const newLikedReplies = new Set(likedReplies);
    if (likedReplies.has(replyId)) {
      newLikedReplies.delete(replyId);
    } else {
      newLikedReplies.add(replyId);
    }
    setLikedReplies(newLikedReplies);
    // TODO: Implement actual like toggle
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/community`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Community
        </Link>

        {/* Main Post */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {post.isPinned && (
                <Pin className="text-warm-600" size={20} />
              )}
              {post.isLocked && (
                <Lock className="text-calm-500" size={20} />
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.category.color}`}>
                {post.category.name}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-calm-500 hover:text-calm-700 hover:bg-calm-100 rounded-lg transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 text-calm-500 hover:text-calm-700 hover:bg-calm-100 rounded-lg transition-colors">
                <Flag size={18} />
              </button>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-calm-900 mb-6">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-calm-200">
            <div className="flex items-center">
              {post.author.image ? (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              ) : (
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <User className="text-primary-600" size={20} />
                </div>
              )}
              <div>
                <div className="font-semibold text-calm-900">
                  {post.isAnonymous ? 'Anonymous' : post.author.name}
                </div>
                <div className="text-sm text-calm-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {getTimeAgo(post.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={togglePostLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  likedPost
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-calm-50 text-calm-600 hover:bg-calm-100'
                }`}
              >
                <Heart size={16} className={likedPost ? 'fill-current' : ''} />
                {post._count.likes + (likedPost ? 1 : 0)}
              </button>
              
              <div className="flex items-center gap-2 text-calm-600">
                <MessageSquare size={16} />
                <span>{post._count.replies}</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose max-w-none">
            <div className="text-calm-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {!post.isLocked && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="font-semibold text-lg text-calm-900 mb-4">Share your thoughts</h2>
            
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-4 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              rows={4}
              disabled={isSubmitting}
            />
            
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mr-2 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-calm-600">Post anonymously</span>
              </label>
              
              <button
                onClick={handleSubmitReply}
                disabled={!newReply.trim() || isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Post Reply
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl text-calm-900 mb-4">
            Replies ({replies.length})
          </h2>
          
          {replies.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <MessageSquare className="w-16 h-16 text-calm-300 mx-auto mb-4" />
              <h3 className="font-semibold text-calm-700 mb-2">No replies yet</h3>
              <p className="text-calm-500">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {reply.author.image ? (
                        <img
                          src={reply.author.image}
                          alt={reply.author.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                          <User className="text-secondary-600" size={16} />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-calm-900">
                          {reply.isAnonymous ? 'Anonymous' : reply.author.name}
                        </div>
                        <div className="text-sm text-calm-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {getTimeAgo(reply.createdAt)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleReplyLike(reply.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                        likedReplies.has(reply.id)
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-calm-50 text-calm-600 hover:bg-calm-100'
                      }`}
                    >
                      <ThumbsUp size={12} className={likedReplies.has(reply.id) ? 'fill-current' : ''} />
                      {reply._count.likes + (likedReplies.has(reply.id) ? 1 : 0)}
                    </button>
                  </div>

                  <div className="text-calm-700 leading-relaxed whitespace-pre-wrap">
                    {reply.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}