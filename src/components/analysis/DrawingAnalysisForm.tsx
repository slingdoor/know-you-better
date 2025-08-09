'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';

interface DrawingAnalysisFormProps {
  locale: string;
}

export default function DrawingAnalysisForm({ locale }: DrawingAnalysisFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations();

  const handleFileSelect = useCallback((selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !session) return;
    
    setIsUploading(true);
    setError('');

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('drawing', file);
      formData.append('userId', session.user.id);

      const response = await fetch('/api/analysis/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to analysis results page
        router.push(`/${locale}/analysis/${result.analysisId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          file 
            ? 'border-primary-300 bg-primary-50' 
            : 'border-calm-300 hover:border-primary-400 hover:bg-primary-50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Drawing preview"
                className="max-w-full max-h-64 rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-calm-900">{file?.name}</p>
              <p className="text-xs text-calm-500">
                {file ? (file.size / 1024 / 1024).toFixed(2) : '0'} MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
              <ImageIcon className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-calm-900 mb-2">
                {t('analysis.dragDrop')}
              </p>
              <p className="text-sm text-calm-500 mb-4">
                Supports: JPEG, PNG, GIF, WebP (max 10MB)
              </p>
              <label className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors cursor-pointer">
                <Upload size={16} className="mr-2" />
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-calm-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any additional context about your drawing or current mood..."
          />
        </div>

        <div className="flex items-start space-x-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-calm-300 rounded"
          />
          <label htmlFor="consent" className="text-sm text-calm-700">
            I understand that this analysis is for educational purposes only and does not replace 
            professional psychological evaluation. I consent to having my drawing analyzed by AI.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!file || isUploading}
        className="w-full flex items-center justify-center py-3 px-6 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t('analysis.analyzing')}
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Start Analysis
          </>
        )}
      </button>

      {/* Estimated Time */}
      <div className="text-center">
        <p className="text-sm text-calm-500">
          ⏱️ Estimated analysis time: 2-3 minutes
        </p>
      </div>
    </form>
  );
}