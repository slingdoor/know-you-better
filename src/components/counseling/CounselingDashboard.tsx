'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  MessageCircle, 
  Video, 
  Calendar, 
  Clock, 
  User,
  Star,
  Phone,
  Plus,
  CheckCircle,
  AlertCircle,
  MapPin
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

interface Appointment {
  id: string;
  scheduledAt: string;
  duration: number;
  status: string;
  type: string;
  counselor: {
    user: {
      name: string | null;
    };
  };
}

interface CounselingDashboardProps {
  appointments: Appointment[];
  counselors: Counselor[];
  locale: string;
  userId: string;
}

export default function CounselingDashboard({ appointments, counselors, locale, userId }: CounselingDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const t = useTranslations();

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.scheduledAt) > new Date() && apt.status === 'SCHEDULED'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'text-secondary-600 bg-secondary-50 border-secondary-200';
      case 'CONFIRMED': return 'text-primary-600 bg-primary-50 border-primary-200';
      case 'IN_PROGRESS': return 'text-warm-600 bg-warm-50 border-warm-200';
      case 'COMPLETED': return 'text-calm-600 bg-calm-50 border-calm-200';
      case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-calm-600 bg-calm-50 border-calm-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <Video size={16} />;
      case 'PHONE': return <Phone size={16} />;
      case 'CHAT': return <MessageCircle size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-calm-900 mb-4">
            {t('counseling.title')}
          </h1>
          <p className="text-xl text-calm-600">
            Connect with professional counselors and manage your mental health journey
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-calm-200">
            <nav className="flex">
              {[
                { id: 'overview', name: 'Overview', icon: Calendar },
                { id: 'counselors', name: 'Find Counselors', icon: User },
                { id: 'appointments', name: 'My Sessions', icon: Clock },
                { id: 'instant', name: 'Instant Chat', icon: MessageCircle }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 bg-primary-50'
                        : 'border-transparent text-calm-500 hover:text-calm-700 hover:bg-calm-50'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div>
                  <h2 className="font-semibold text-xl text-calm-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <button 
                      onClick={() => setActiveTab('counselors')}
                      className="p-6 border-2 border-dashed border-primary-300 rounded-2xl text-center hover:border-primary-500 hover:bg-primary-50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                        <Plus className="text-primary-600" size={24} />
                      </div>
                      <h3 className="font-semibold text-primary-600 mb-2">Book New Session</h3>
                      <p className="text-sm text-calm-600">Schedule an appointment with a counselor</p>
                    </button>

                    <div className="p-6 bg-secondary-50 rounded-2xl text-center">
                      <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="text-secondary-600" size={24} />
                      </div>
                      <h3 className="font-semibold text-secondary-600 mb-2">Instant Support</h3>
                      <p className="text-sm text-calm-600">Chat with available counselors now</p>
                    </div>

                    <div className="p-6 bg-warm-50 rounded-2xl text-center">
                      <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Phone className="text-warm-600" size={24} />
                      </div>
                      <h3 className="font-semibold text-warm-600 mb-2">Crisis Support</h3>
                      <p className="text-sm text-calm-600">24/7 emergency mental health support</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div>
                  <h2 className="font-semibold text-xl text-calm-900 mb-6">Upcoming Sessions</h2>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-calm-50 rounded-xl">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                              {getTypeIcon(appointment.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-calm-900">{appointment.counselor.user.name || 'Counselor'}</h3>
                              <p className="text-sm text-calm-600">
                                {new Date(appointment.scheduledAt).toLocaleDateString()} at{' '}
                                {new Date(appointment.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <button className="text-primary-600 hover:text-primary-700 font-medium">
                              Join
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-calm-50 rounded-2xl">
                      <Calendar className="w-16 h-16 text-calm-300 mx-auto mb-4" />
                      <h3 className="font-semibold text-calm-700 mb-2">No upcoming sessions</h3>
                      <p className="text-calm-500 mb-4">Schedule your first counseling session to get started</p>
                      <button 
                        onClick={() => setActiveTab('counselors')}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Find a Counselor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Counselors Tab */}
            {activeTab === 'counselors' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-xl text-calm-900">Available Counselors</h2>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>All Specializations</option>
                      <option>Anxiety & Depression</option>
                      <option>Family Therapy</option>
                      <option>Academic Stress</option>
                      <option>Trauma Recovery</option>
                    </select>
                    <select className="px-4 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Any Experience</option>
                      <option>5+ years</option>
                      <option>10+ years</option>
                      <option>15+ years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="bg-white border border-calm-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {counselor.user.image ? (
                            <img
                              src={counselor.user.image}
                              alt={counselor.user.name || 'Counselor'}
                              className="w-16 h-16 rounded-full mr-4"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                              <User className="text-primary-600" size={24} />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-lg text-calm-900">{counselor.user.name || 'Counselor'}</h3>
                            <div className="flex items-center text-warm-600 mb-2">
                              <Star size={14} className="fill-current mr-1" />
                              <span className="text-sm">4.9 (127 reviews)</span>
                            </div>
                            <p className="text-sm text-calm-600">{counselor.experience} years experience</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-calm-900">${counselor.hourlyRate || 0}</p>
                          <p className="text-sm text-calm-500">per session</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-calm-900 mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {counselor.specializations.map((spec) => (
                            <span key={spec} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-calm-600 text-sm mb-6 line-clamp-3">
                        {counselor.bio || 'No bio available'}
                      </p>

                      <div className="flex gap-3">
                        <Link
                          href={`/${locale}/counseling/book/${counselor.id}`}
                          className="flex-1 bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                          Book Session
                        </Link>
                        <Link
                          href={`/${locale}/counseling/counselor/${counselor.id}`}
                          className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div>
                <h2 className="font-semibold text-xl text-calm-900 mb-6">My Sessions</h2>
                
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="bg-white border border-calm-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                              {getTypeIcon(appointment.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-calm-900">{appointment.counselor.user.name || 'Counselor'}</h3>
                              <div className="flex items-center text-sm text-calm-600 mt-1">
                                <Calendar size={14} className="mr-1" />
                                {new Date(appointment.scheduledAt).toLocaleDateString()}
                                <Clock size={14} className="ml-3 mr-1" />
                                {new Date(appointment.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                <span className="ml-3">({appointment.duration} minutes)</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            {appointment.status === 'SCHEDULED' && new Date(appointment.scheduledAt) > new Date() && (
                              <div className="flex gap-2">
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                                  Join Session
                                </button>
                                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-calm-50 rounded-2xl">
                    <Calendar className="w-16 h-16 text-calm-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-calm-700 mb-2">No sessions yet</h3>
                    <p className="text-calm-500 mb-4">Book your first counseling session to start your journey</p>
                    <button 
                      onClick={() => setActiveTab('counselors')}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Find a Counselor
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Instant Chat Tab */}
            {activeTab === 'instant' && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-calm-700 mb-4">Instant Chat Support</h3>
                <p className="text-calm-500 mb-6 max-w-2xl mx-auto">
                  Connect with available counselors for immediate support. This feature provides 
                  real-time text-based counseling for urgent situations.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-3 bg-secondary-600 text-white rounded-xl font-semibold hover:bg-secondary-700 transition-colors">
                    Start Chat Now
                  </button>
                  <button className="px-6 py-3 border border-calm-300 text-calm-700 rounded-xl font-semibold hover:bg-calm-50 transition-colors">
                    View Availability
                  </button>
                </div>
                
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
                  <div className="flex items-center text-red-700 mb-2">
                    <AlertCircle size={16} className="mr-2" />
                    <span className="font-semibold">Crisis Support</span>
                  </div>
                  <p className="text-sm text-red-600">
                    If you're in immediate danger, call 988 (Suicide & Crisis Lifeline) or your local emergency services.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}