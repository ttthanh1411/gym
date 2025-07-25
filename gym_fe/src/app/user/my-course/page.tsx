'use client';

import { useEffect, useState } from 'react';
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
import AuthService from '@/service/authService';

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
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) return;
    const customerId = user.userId || user.customerID;
    setLoadingCourses(true);
    fetch(`http://localhost:5231/api/payment/my-courses/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setMyCourses(data);
        setLoadingCourses(false);
      })
      .catch(() => setLoadingCourses(false));
  }, []);

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
        <h1 className="text-3xl font-bold mb-2">Khoá tập của tôi</h1>
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
           {/* My Courses */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Khoá tập đã mua
        </h2>
        {loadingCourses ? (
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Đang tải khoá học...
          </div>
        ) : myCourses.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-gray-500">
            <XCircle className="w-10 h-10 mb-2 text-gray-300" />
            <span className="text-lg font-medium">Bạn chưa mua khoá học nào.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map(course => (
              <div
                key={course.courseid}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative mb-3">
                  <img
                    src={course.imageurl || 'https://placehold.co/320x180?text=No+Image'}
                    alt={course.coursename}
                    className="w-full h-40 object-cover rounded-lg border border-gray-200"
                  />
                  <span className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold shadow">
                    {course.durationweek} tuần
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{course.coursename}</div>
                  <div className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span>PT: {course.personaltrainerid ? course.personaltrainerid : "Chưa có"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Thời lượng: {course.durationweek} tuần</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>Dịch vụ: {course.serviceid ? course.serviceid : "Không rõ"}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-base font-bold text-blue-600">
                      {course.price?.toLocaleString('vi-VN')}₫
                    </span>
                    <button
                      className="px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition"
                      // onClick={() => ...} // Có thể thêm chức năng xem chi tiết
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch tập</h3>
              <p className="text-gray-600 mb-4">Hãy đặt lịch để bắt đầu hành trình fitness của bạn!</p>

            </div>
          )}
        </div>
      )}
    </div>
  );
}