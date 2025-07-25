'use client';

import {
  Calendar,
  TrendingUp,
  Trophy,
  Clock,
  Target,
  Flame,
  Users,
  Award
} from 'lucide-react';
import AuthService from '@/service/authService';

const stats = [
  {
    name: 'Khóa học đã mua',
    value: '12',
    change: '+2 tháng này',
    changeType: 'increase',
    icon: Trophy,
  },
  {
    name: 'Buổi tập hoàn thành',
    value: '48',
    change: '+12 tuần này',
    changeType: 'increase',
    icon: Target,
  },
  {
    name: 'Calories đã đốt',
    value: '2,840',
    change: '+340 hôm nay',
    changeType: 'increase',
    icon: Flame,
  },
  {
    name: 'Thời gian tập',
    value: '24.5h',
    change: 'Tháng này',
    changeType: 'neutral',
    icon: Clock,
  },
];

const upcomingClasses = [
  {
    id: 1,
    name: 'Yoga cơ bản',
    instructor: 'Cô Mai',
    time: '09:00 - 10:00',
    date: 'Hôm nay',
    participants: 12,
    maxParticipants: 15,
  },
  {
    id: 2,
    name: 'Cardio đốt cháy',
    instructor: 'Thầy Nam',
    time: '14:00 - 15:00',
    date: 'Hôm nay',
    participants: 8,
    maxParticipants: 12,
  },
  {
    id: 3,
    name: 'Tăng cơ nâng cao',
    instructor: 'Thầy Hùng',
    time: '19:00 - 20:30',
    date: 'Ngày mai',
    participants: 6,
    maxParticipants: 10,
  },
];

const recentAchievements = [
  {
    id: 1,
    title: 'Hoàn thành 30 ngày tập liên tiếp',
    description: 'Bạn đã duy trì thói quen tập luyện tuyệt vời!',
    date: '2 ngày trước',
    type: 'streak',
  },
  {
    id: 2,
    title: 'Đạt mục tiêu calories tuần',
    description: 'Đốt cháy 2,500 calories trong tuần',
    date: '1 tuần trước',
    type: 'goal',
  },
];

export default function UserDashboard() {
  const user = AuthService.getCurrentUser();
  return (
    <div className="space-y-8 container">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại, {user?.name || 'User'}! 👋</h1>
          <p className="text-emerald-100 text-lg">
            Hôm nay bạn có 2 buổi tập. Hãy cùng chinh phục mục tiêu fitness của mình!
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Xem lịch tập
            </button>
            <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors">
              Khám phá khóa học
            </button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming classes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Lịch tập sắp tới</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingClasses.map((class_) => (
                <div key={class_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{class_.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {class_.instructor} • {class_.time}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {class_.date}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {class_.participants}/{class_.maxParticipants}
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    Tham gia
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Xem tất cả lịch tập →
            </button>
          </div>
        </div>

        {/* Recent achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Thành tích gần đây</h3>
              <Award className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Xem tất cả thành tích →
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-lg transition-all group">
            <Calendar className="w-5 h-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-emerald-700">Đặt lịch tập</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all group">
            <Target className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-blue-700">Đặt mục tiêu</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg transition-all group">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-orange-700">Xem báo cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
}