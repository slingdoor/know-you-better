'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageCircle,
  MapPin,
  User,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Counselor {
  id: string;
  specializations: string[];
  experience: number;
  bio: string | null;
  hourlyRate: number | null;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface BookingFormProps {
  counselor: Counselor;
  locale: string;
  userId: string;
}

export default function BookingForm({ counselor, locale, userId }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('VIDEO');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // Generate available dates (next 14 days, excluding weekends)
  const availableDates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
      availableDates.push(date);
    }
  }

  // Generate available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const sessionTypes = [
    { id: 'VIDEO', name: 'Video Call', icon: Video, description: 'Face-to-face video session' },
    { id: 'PHONE', name: 'Phone Call', icon: Phone, description: 'Voice-only session' },
    { id: 'CHAT', name: 'Text Chat', icon: MessageCircle, description: 'Text-based session' },
    { id: 'IN_PERSON', name: 'In Person', icon: MapPin, description: 'Office visit' }
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    setIsBooking(true);
    setError('');

    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`);
      
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          counselorId: counselor.id,
          scheduledAt: scheduledAt.toISOString(),
          duration,
          type: sessionType,
          notes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/${locale}/counseling/confirmation/${result.appointmentId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const totalCost = ((counselor.hourlyRate || 0) * duration) / 60;

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/counseling`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Counseling
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Counselor Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              {counselor.user.image ? (
                <img
                  src={counselor.user.image}
                  alt={counselor.user.name || 'Counselor'}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-primary-600" size={32} />
                </div>
              )}
              
              <h2 className="font-display font-bold text-xl text-calm-900 mb-2">
                {counselor.user.name || 'Counselor'}
              </h2>
              
              <div className="flex items-center justify-center text-warm-600 mb-2">
                <Star size={16} className="fill-current mr-1" />
                <span className="text-sm">4.9 (127 reviews)</span>
              </div>
              
              <p className="text-calm-600">{counselor.experience} years experience</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-calm-900 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {counselor.specializations.map((spec) => (
                    <span key={spec} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-calm-900 mb-2">About</h3>
                <p className="text-calm-600 text-sm">{counselor.bio || 'No bio available'}</p>
              </div>

              <div className="pt-4 border-t border-calm-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-calm-900">Session Rate</span>
                  <span className="text-2xl font-bold text-primary-600">${counselor.hourlyRate || 0}</span>
                </div>
                <p className="text-sm text-calm-500">per hour</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-display font-bold text-2xl text-calm-900 mb-8">
              Book Your Session
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-8">
              {/* Session Type */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Session Type</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSessionType(type.id)}
                        className={`p-4 border-2 rounded-xl text-center transition-all ${
                          sessionType === type.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-calm-200 hover:border-calm-300'
                        }`}
                      >
                        <Icon size={24} className="mx-auto mb-2" />
                        <div className="font-medium text-sm">{type.name}</div>
                        <div className="text-xs text-calm-500 mt-1">{type.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Session Duration</h3>
                <div className="flex gap-3">
                  {[45, 60, 90].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => setDuration(minutes)}
                      className={`px-6 py-3 border-2 rounded-xl font-medium transition-all ${
                        duration === minutes
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-calm-200 hover:border-calm-300'
                      }`}
                    >
                      {minutes} minutes
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Select Date</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {availableDates.map((date) => {
                    const dateString = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateString;
                    
                    return (
                      <button
                        key={dateString}
                        onClick={() => setSelectedDate(dateString)}
                        className={`p-3 border-2 rounded-xl text-center transition-all ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-calm-200 hover:border-calm-300'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {date.toLocaleDateString('en', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {date.getDate()}
                        </div>
                        <div className="text-xs text-calm-500">
                          {date.toLocaleDateString('en', { month: 'short' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Select Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border-2 rounded-xl text-center font-medium transition-all ${
                        selectedTime === time
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-calm-200 hover:border-calm-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Additional Notes (Optional)</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share anything you'd like your counselor to know before the session..."
                  className="w-full p-4 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows={4}
                />
              </div>

              {/* Summary */}
              <div className="bg-calm-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg text-calm-900 mb-4">Session Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Counselor:</span>
                    <span className="font-medium">{counselor.user.name || 'Counselor'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">
                      {sessionTypes.find(t => t.id === sessionType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{duration} minutes</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-calm-200">
                    <span className="font-semibold">Total Cost:</span>
                    <span className="font-bold text-lg text-primary-600">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isBooking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} className="mr-2" />
                    Book Session - ${totalCost.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}