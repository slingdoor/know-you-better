'use client';

import Link from 'next/link';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageCircle, 
  MapPin, 
  User,
  Download,
  Share2,
  ArrowRight
} from 'lucide-react';

interface Appointment {
  id: string;
  scheduledAt: string;
  duration: number;
  type: string;
  status: string;
  counselor: {
    user: {
      name: string | null;
      image: string | null;
    };
    specializations: string[];
    experience: number;
    hourlyRate: number | null;
  };
  notes?: string | null;
}

interface ConfirmationPageProps {
  appointment: Appointment;
  locale: string;
}

export default function ConfirmationPage({ appointment, locale }: ConfirmationPageProps) {
  const getTypeDetails = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return { icon: Video, name: 'Video Call', color: 'text-primary-600' };
      case 'PHONE':
        return { icon: Phone, name: 'Phone Call', color: 'text-secondary-600' };
      case 'CHAT':
        return { icon: MessageCircle, name: 'Text Chat', color: 'text-warm-600' };
      case 'IN_PERSON':
        return { icon: MapPin, name: 'In Person', color: 'text-calm-600' };
      default:
        return { icon: Video, name: 'Video Call', color: 'text-primary-600' };
    }
  };

  const typeDetails = getTypeDetails(appointment.type);
  const TypeIcon = typeDetails.icon;
  const appointmentDate = new Date(appointment.scheduledAt);
  const totalCost = ((appointment.counselor.hourlyRate || 0) * appointment.duration) / 60;

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="font-display font-bold text-3xl text-calm-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-calm-600">
            Your counseling session has been successfully scheduled
          </p>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
            Appointment Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Counselor Info */}
            <div>
              <h3 className="font-semibold text-lg text-calm-900 mb-4">Your Counselor</h3>
              <div className="flex items-center mb-4">
                {appointment.counselor.user.image ? (
                  <img
                    src={appointment.counselor.user.image}
                    alt={appointment.counselor.user.name || 'Counselor'}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-primary-600" size={24} />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-calm-900">{appointment.counselor.user.name || 'Counselor'}</h4>
                  <p className="text-calm-600">{appointment.counselor.experience} years experience</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-calm-800 mb-2">Specializations</h5>
                <div className="flex flex-wrap gap-2">
                  {appointment.counselor.specializations.map((spec) => (
                    <span key={spec} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div>
              <h3 className="font-semibold text-lg text-calm-900 mb-4">Session Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="text-calm-500 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-calm-900">
                      {appointmentDate.toLocaleDateString('en', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-calm-600">
                      {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="text-calm-500 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-calm-900">{appointment.duration} minutes</p>
                    <p className="text-sm text-calm-600">Session duration</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <TypeIcon className={`${typeDetails.color} mr-3`} size={20} />
                  <div>
                    <p className="font-medium text-calm-900">{typeDetails.name}</p>
                    <p className="text-sm text-calm-600">Session type</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-calm-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-calm-900">Total Cost</span>
                    <span className="font-bold text-2xl text-primary-600">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="mt-8 pt-6 border-t border-calm-200">
              <h3 className="font-semibold text-lg text-calm-900 mb-3">Your Notes</h3>
              <p className="text-calm-700 bg-calm-50 p-4 rounded-lg">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-semibold text-primary-900 mb-3">Before Your Session</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li>• You'll receive a reminder email 24 hours before your appointment</li>
                <li>• Prepare any topics or questions you'd like to discuss</li>
                <li>• Ensure you have a quiet, private space for the session</li>
                {appointment.type === 'VIDEO' && (
                  <li>• Test your camera and microphone beforehand</li>
                )}
              </ul>
            </div>

            <div className="bg-secondary-50 p-6 rounded-xl">
              <h3 className="font-semibold text-secondary-900 mb-3">Day of Session</h3>
              <ul className="space-y-2 text-sm text-secondary-800">
                <li>• Join the session 5 minutes early</li>
                <li>• Have water and tissues nearby if needed</li>
                <li>• Turn off notifications on your devices</li>
                <li>• Be open and honest with your counselor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
              <Download size={18} />
              Add to Calendar
            </button>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-calm-300 text-calm-700 rounded-xl font-semibold hover:bg-calm-50 transition-colors">
              <Share2 size={18} />
              Share Details
            </button>

            <Link
              href={`/${locale}/counseling`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-xl font-semibold hover:bg-secondary-700 transition-colors"
            >
              <ArrowRight size={18} />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-calm-600 mb-4">
            Need to reschedule or have questions about your appointment?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/support`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact Support
            </Link>
            <span className="text-calm-400 hidden sm:inline">•</span>
            <Link
              href={`/${locale}/counseling`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}