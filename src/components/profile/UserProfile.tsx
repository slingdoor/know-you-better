'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  User,
  Edit3,
  Settings,
  Calendar,
  MessageSquare,
  BarChart3,
  Shield,
  Bell,
  Download,
  Trash2,
  LogOut,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Cake,
  Globe
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  profile: {
    bio: string | null;
    dateOfBirth: string | null;
    phone: string | null;
    address: string | null;
    emergencyContact: string | null;
    preferredLanguage: string | null;
    timezone: string | null;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
}

interface UserStats {
  totalAppointments: number;
  totalPosts: number;
  totalAnalyses: number;
}

interface UserProfileProps {
  user: UserProfile;
  userStats: UserStats;
  locale: string;
}

export default function UserProfile({ user, userStats, locale }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.profile?.bio || '',
    phone: user.profile?.phone || '',
    address: user.profile?.address || '',
    emergencyContact: user.profile?.emergencyContact || '',
    preferredLanguage: user.profile?.preferredLanguage || locale,
    timezone: user.profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    isPrivate: user.profile?.isPrivate || false
  });

  const handleSave = async () => {
    // TODO: Implement actual profile update
    setIsEditing(false);
    alert('Profile updated successfully! (Mock implementation)');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement actual image upload
      alert('Image upload will be implemented soon!');
    }
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString('en', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-calm-900 mb-4">
            My Profile
          </h1>
          <p className="text-xl text-calm-600">
            Manage your account settings and view your activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'Profile'}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                      <User className="text-primary-600" size={32} />
                    </div>
                  )}
                  <label
                    htmlFor="avatar-upload"
                    className="absolute -bottom-2 -right-2 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-colors"
                  >
                    <Camera size={14} />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <h2 className="font-semibold text-xl text-calm-900 mb-1">
                  {user.name || 'User'}
                </h2>
                <p className="text-calm-600 text-sm mb-4">
                  Member since {memberSince}
                </p>
                
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm"
                  >
                    <Edit3 size={14} />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {[
                  { id: 'overview', name: 'Overview', icon: BarChart3 },
                  { id: 'personal', name: 'Personal Info', icon: User },
                  { id: 'activity', name: 'My Activity', icon: Calendar },
                  { id: 'settings', name: 'Settings', icon: Settings },
                  { id: 'privacy', name: 'Privacy', icon: Shield }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                        activeTab === item.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-calm-600 hover:bg-calm-50 hover:text-calm-700'
                      }`}
                    >
                      <Icon size={18} className="mr-3" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
              
              <div className="pt-6 mt-6 border-t border-calm-200">
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}` })}
                  className="w-full text-left p-3 rounded-lg transition-colors flex items-center text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
                    Account Overview
                  </h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="text-primary-600" size={24} />
                        <span className="text-2xl font-bold text-primary-600">
                          {userStats.totalAppointments}
                        </span>
                      </div>
                      <h3 className="font-semibold text-primary-900">Counseling Sessions</h3>
                      <p className="text-sm text-primary-700">Total appointments booked</p>
                    </div>

                    <div className="bg-secondary-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <MessageSquare className="text-secondary-600" size={24} />
                        <span className="text-2xl font-bold text-secondary-600">
                          {userStats.totalPosts}
                        </span>
                      </div>
                      <h3 className="font-semibold text-secondary-900">Community Posts</h3>
                      <p className="text-sm text-secondary-700">Forum contributions</p>
                    </div>

                    <div className="bg-warm-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <BarChart3 className="text-warm-600" size={24} />
                        <span className="text-2xl font-bold text-warm-600">
                          {userStats.totalAnalyses}
                        </span>
                      </div>
                      <h3 className="font-semibold text-warm-900">Drawing Analyses</h3>
                      <p className="text-sm text-warm-700">HTP assessments completed</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="font-semibold text-lg text-calm-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link
                        href={`/${locale}/counseling`}
                        className="p-4 border-2 border-dashed border-primary-300 rounded-xl text-center hover:border-primary-500 hover:bg-primary-50 transition-all"
                      >
                        <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <div className="font-semibold text-primary-600">Book Session</div>
                        <div className="text-sm text-calm-600">Schedule counseling</div>
                      </Link>

                      <Link
                        href={`/${locale}/analysis`}
                        className="p-4 border-2 border-dashed border-secondary-300 rounded-xl text-center hover:border-secondary-500 hover:bg-secondary-50 transition-all"
                      >
                        <BarChart3 className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                        <div className="font-semibold text-secondary-600">New Analysis</div>
                        <div className="text-sm text-calm-600">Upload drawing</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display font-bold text-2xl text-calm-900">
                      Personal Information
                    </h2>
                    {isEditing && (
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-calm-900 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        ) : (
                          <div className="p-3 bg-calm-50 rounded-xl flex items-center">
                            <User size={16} className="text-calm-500 mr-2" />
                            {user.name || 'Not provided'}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-calm-900 mb-2">
                          Email Address
                        </label>
                        <div className="p-3 bg-calm-50 rounded-xl flex items-center">
                          <Mail size={16} className="text-calm-500 mr-2" />
                          {user.email || 'Not provided'}
                        </div>
                        <p className="text-xs text-calm-500 mt-1">
                          Email cannot be changed here
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-calm-900 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                          placeholder="Tell us a bit about yourself..."
                        />
                      ) : (
                        <div className="p-3 bg-calm-50 rounded-xl min-h-[80px]">
                          {formData.bio || 'No bio provided'}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-calm-900 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        ) : (
                          <div className="p-3 bg-calm-50 rounded-xl flex items-center">
                            <Phone size={16} className="text-calm-500 mr-2" />
                            {formData.phone || 'Not provided'}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-calm-900 mb-2">
                          Emergency Contact
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.emergencyContact}
                            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                            className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Name and phone number"
                          />
                        ) : (
                          <div className="p-3 bg-calm-50 rounded-xl">
                            {formData.emergencyContact || 'Not provided'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
                    My Activity
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-calm-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg text-calm-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="text-primary-600 mr-3" size={16} />
                            <span className="text-calm-700">Counseling session completed</span>
                          </div>
                          <span className="text-sm text-calm-500">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center">
                            <MessageSquare className="text-secondary-600 mr-3" size={16} />
                            <span className="text-calm-700">Posted in Community Forum</span>
                          </div>
                          <span className="text-sm text-calm-500">1 week ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center">
                            <BarChart3 className="text-warm-600 mr-3" size={16} />
                            <span className="text-calm-700">Drawing analysis completed</span>
                          </div>
                          <span className="text-sm text-calm-500">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-calm-900 mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-calm-900 mb-2">
                            Preferred Language
                          </label>
                          <select
                            value={formData.preferredLanguage}
                            onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                            className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="en">English</option>
                            <option value="zh-CN">简体中文</option>
                            <option value="zh-TW">繁體中文</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-calm-900 mb-2">
                            Timezone
                          </label>
                          <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            className="w-full p-3 border border-calm-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-calm-900 mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-calm-50 rounded-lg">
                          <div>
                            <div className="font-medium text-calm-900">Email Notifications</div>
                            <div className="text-sm text-calm-600">Appointment reminders and updates</div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="text-primary-600 rounded focus:ring-primary-500"
                          />
                        </label>
                        
                        <label className="flex items-center justify-between p-3 bg-calm-50 rounded-lg">
                          <div>
                            <div className="font-medium text-calm-900">Community Updates</div>
                            <div className="text-sm text-calm-600">New replies to your posts</div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="text-primary-600 rounded focus:ring-primary-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-calm-900 mb-6">
                    Privacy Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-calm-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg text-calm-900 mb-4">Profile Visibility</h3>
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-calm-900">Private Profile</div>
                          <div className="text-sm text-calm-600">
                            Hide your profile from other community members
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.isPrivate}
                          onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                          className="text-primary-600 rounded focus:ring-primary-500"
                        />
                      </label>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-semibold text-lg text-red-900 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Export Your Data</h4>
                          <p className="text-sm text-red-700 mb-3">
                            Download all your data including posts, appointments, and analysis results.
                          </p>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            <Download size={16} />
                            Request Data Export
                          </button>
                        </div>
                        
                        <div className="pt-4 border-t border-red-200">
                          <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                          <p className="text-sm text-red-700 mb-3">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            <Trash2 size={16} />
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}