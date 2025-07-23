'use client';

import { useState } from 'react';
import {
  CreditCard,
  Download,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const paymentStats = [
  {
    name: 'Tổng chi tiêu',
    value: '12,500,000₫',
    change: '+1,800,000₫ tháng này',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Giao dịch thành công',
    value: '18',
    change: '+3 tháng này',
    changeType: 'increase',
    icon: CheckCircle,
  },
  {
    name: 'Đang chờ xử lý',
    value: '1',
    change: 'Chờ xác nhận',
    changeType: 'neutral',
    icon: AlertCircle,
  },
  {
    name: 'Tiết kiệm được',
    value: '3,200,000₫',
    change: 'Từ các ưu đãi',
    changeType: 'increase',
    icon: TrendingUp,
  },
];

const transactions = [
  {
    id: 'INV-2024-001',
    courseName: 'Yoga cơ bản cho người mới',
    instructor: 'Cô Mai Linh',
    amount: 1500000,
    originalAmount: 2000000,
    status: 'completed',
    date: '2024-01-10',
    paymentMethod: 'Thẻ tín dụng',
    transactionId: 'TXN-ABC123',
    discount: 500000,
  },
  {
    id: 'INV-2024-002',
    courseName: 'Cardio đốt cháy mỡ thừa',
    instructor: 'Thầy Nam Khánh',
    amount: 1800000,
    originalAmount: 2400000,
    status: 'completed',
    date: '2024-01-08',
    paymentMethod: 'Ví điện tử',
    transactionId: 'TXN-DEF456',
    discount: 600000,
  },
  {
    id: 'INV-2024-003',
    courseName: 'Tăng cơ cho nam giới',
    instructor: 'Thầy Hùng Cường',
    amount: 2200000,
    originalAmount: 2800000,
    status: 'pending',
    date: '2024-01-15',
    paymentMethod: 'Chuyển khoản',
    transactionId: 'TXN-GHI789',
    discount: 600000,
  },
  {
    id: 'INV-2024-004',
    courseName: 'Personal Training Package',
    instructor: 'Thầy Nam Khánh',
    amount: 3500000,
    originalAmount: 4000000,
    status: 'completed',
    date: '2024-01-05',
    paymentMethod: 'Thẻ tín dụng',
    transactionId: 'TXN-JKL012',
    discount: 500000,
  },
  {
    id: 'INV-2024-005',
    courseName: 'HIIT giảm cân nhanh',
    instructor: 'Cô Lan Anh',
    amount: 1600000,
    originalAmount: 2100000,
    status: 'failed',
    date: '2024-01-12',
    paymentMethod: 'Thẻ tín dụng',
    transactionId: 'TXN-MNO345',
    discount: 500000,
  },
];

export default function PaymentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Thành công';
      case 'pending':
        return 'Đang xử lý';
      case 'failed':
        return 'Thất bại';
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesSearch = transaction.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Lịch sử thanh toán</h1>
        <p className="text-purple-100 text-lg">
          Theo dõi các giao dịch và quản lý hóa đơn của bạn
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-600" />
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Thành công</option>
              <option value="pending">Đang xử lý</option>
              <option value="failed">Thất bại</option>
            </select>
            <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-600 transition-all flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{transaction.courseName}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1">{getStatusText(transaction.status)}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(transaction.date).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                    {transaction.paymentMethod}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">#</span>
                    {transaction.transactionId}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">ID:</span>
                    {transaction.id}
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Giảng viên: <span className="font-medium">{transaction.instructor}</span>
                </p>

                <div className="flex items-center space-x-4 mt-3">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(transaction.amount)}
                    </span>
                    {transaction.originalAmount > transaction.amount && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {formatPrice(transaction.originalAmount)}
                      </span>
                    )}
                  </div>
                  {transaction.discount > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      Tiết kiệm {formatPrice(transaction.discount)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Xem chi tiết">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Tải hóa đơn">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy giao dịch</h3>
            <p className="text-gray-600">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
}