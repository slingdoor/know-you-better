'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Bookmark, ThumbsUp, Calendar } from 'lucide-react';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    content: string;
    authorName: string;
    publishedAt: Date;
    tags: string[];
    category: string;
  };
  locale: string;
}

export default function ArticleContent({ article, locale }: ArticleProps) {
  const estimatedReadTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/knowledge`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Knowledge Base
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-calm-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-calm-600 mb-8 pb-8 border-b border-calm-200">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span className="font-medium">{article.authorName}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{article.publishedAt.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{estimatedReadTime} min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                <Share2 size={16} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-warm-50 text-warm-600 rounded-lg hover:bg-warm-100 transition-colors">
                <Bookmark size={16} />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary-50 text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors">
                <ThumbsUp size={16} />
                Helpful
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-calm-900 prose-p:text-calm-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-calm-800 prose-ul:text-calm-700 prose-ol:text-calm-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-calm-200">
              <h3 className="font-semibold text-calm-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-2 bg-calm-100 text-calm-700 rounded-lg text-sm font-medium hover:bg-calm-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Dealing with Social Anxiety in School",
                excerpt: "Practical strategies for managing social anxiety in academic settings.",
                category: "ANXIETY",
                readTime: "5 min read"
              },
              {
                title: "Building Self-Confidence as a Teenager", 
                excerpt: "Develop a strong sense of self-worth during your formative years.",
                category: "SELF_ESTEEM",
                readTime: "7 min read"
              }
            ].map((relatedArticle, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium mb-3">
                  {relatedArticle.category}
                </span>
                <h3 className="font-semibold text-lg text-calm-900 mb-2">
                  {relatedArticle.title}
                </h3>
                <p className="text-calm-600 text-sm mb-4">
                  {relatedArticle.excerpt}
                </p>
                <div className="flex items-center text-xs text-calm-500">
                  <Clock size={12} className="mr-1" />
                  {relatedArticle.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-primary-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-display font-bold text-2xl mb-4">
            Need More Support?
          </h2>
          <p className="text-primary-100 mb-6">
            If you're struggling with any of the topics discussed in this article, 
            consider speaking with one of our professional counselors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/counseling`}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
            >
              Book a Session
            </Link>
            <Link
              href={`/${locale}/analysis`}
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Try Drawing Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}