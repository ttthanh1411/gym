'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const appointments = [
  {
    id: 1,
    courseName: 'Yoga cơ bản',
    instructor: 'Cô Mai Linh',
    date: '2024-01-15',
    time: '09:00 - 10:00',
    location: 'Phòng A1',
    status: 'confirmed',
    participants: 12,
    maxParticipants: 15,
    type: 'group',
  },
  {
    id: 2,
    courseName: 'Personal Training',
    instructor: 'Thầy Nam Khánh',
    date: '2024-01-15',
    time: '14:00 - 15:00',
    location: 'Phòng PT1',
    status: 'confirmed',
    participants: 1,
    maxParticipants: 1,
    type: 'personal',
  },
  {
    id: 3,
    courseName: 'Cardio đốt cháy',
    instructor: 'Thầy Nam Khánh',
    date: '2024-01-16',
    time: '19:00 - 20:00',
    location: 'Phòng B2',
    status: 'pending',
    participants: 8,
    maxParticipants: 12,
    type: 'group',
  },
  {
    id: 4,
    courseName: 'Tăng cơ nâng cao',
    instructor: 'Thầy Hùng Cường',
    date: '2024-01-17',
    time: '18:00 - 19:30',
    location: 'Phòng Weight',
    status: 'cancelled',
    participants: 6,
    maxParticipants: 10,
    type: 'group',
  },
];

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const months = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const generateCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const hasAppointment = (date: Date) => {
    return appointments.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Lịch tập của tôi</h1>
        <p className="text-blue-100 text-lg">
          Quản lý và theo dõi các buổi tập của bạn
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Danh sách
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lịch
              </button>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Đặt lịch mới
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Hôm nay
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`p-3 text-center text-sm border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  day.getMonth() !== currentDate.getMonth() ? 'text-gray-400' : 'text-gray-900'
                } ${
                  day.toDateString() === new Date().toDateString() ? 'bg-blue-50 text-blue-600 font-medium' : ''
                }`}
              >
                <div className="relative">
                  {day.getDate()}
                  {hasAppointment(day) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.courseName}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1">{getStatusText(appointment.status)}</span>
                    </span>
                    {appointment.type === 'personal' && (
                      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                        1-1
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(appointment.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {appointment.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {appointment.participants}/{appointment.maxParticipants} người
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Giảng viên: <span className="font-medium">{appointment.instructor}</span>
                  </p>
                </div>

                <div className="flex space-x-2 ml-4">
                  {appointment.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        Xác nhận
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        Hủy
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Đổi lịch
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch tập</h3>
              <p className="text-gray-600 mb-4">Hãy đặt lịch để bắt đầu hành trình fitness của bạn!</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all">
                Đặt lịch ngay
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}