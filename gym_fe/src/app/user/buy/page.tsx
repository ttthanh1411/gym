'use client';

import { useState } from 'react';
import {
  Star,
  Clock,
  Users,
  Zap,
  Heart,
  ShoppingCart,
  Filter,
  Search,
  Check
} from 'lucide-react';

const categories = ['Tất cả', 'Yoga', 'Cardio', 'Tăng cơ', 'HIIT', 'Pilates', 'Boxing'];

const courses = [
  {
    id: 1,
    name: 'Yoga cơ bản cho người mới',
    instructor: 'Cô Mai Linh',
    price: 1500000,
    originalPrice: 2000000,
    duration: '8 tuần',
    sessions: 16,
    rating: 4.8,
    reviews: 124,
    students: 1250,
    category: 'Yoga',
    level: 'Cơ bản',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Khóa học yoga hoàn hảo cho người mới bắt đầu, giúp cải thiện sức khỏe và tinh thần.',
    highlights: ['Cải thiện độ linh hoạt', 'Giảm stress', 'Tăng cường sức khỏe tổng thể'],
    popular: true,
  },
  {
    id: 2,
    name: 'Cardio đốt cháy mỡ thừa',
    instructor: 'Thầy Nam Khánh',
    price: 1800000,
    originalPrice: 2400000,
    duration: '6 tuần',
    sessions: 18,
    rating: 4.9,
    reviews: 89,
    students: 890,
    category: 'Cardio',
    level: 'Trung bình',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Chương trình cardio hiệu quả để đốt cháy calories và cải thiện sức khỏe tim mạch.',
    highlights: ['Đốt cháy 300-500 calories/buổi', 'Cải thiện sức bền', 'Giảm cân hiệu quả'],
    popular: false,
  },
  {
    id: 3,
    name: 'Tăng cơ cho nam giới',
    instructor: 'Thầy Hùng Cường',
    price: 2200000,
    originalPrice: 2800000,
    duration: '10 tuần',
    sessions: 30,
    rating: 4.7,
    reviews: 156,
    students: 560,
    category: 'Tăng cơ',
    level: 'Nâng cao',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Chương trình tăng cơ chuyên sâu với các bài tập nâng tạ và dinh dưỡng khoa học.',
    highlights: ['Tăng khối lượng cơ', 'Cải thiện sức mạnh', 'Hướng dẫn dinh dưỡng'],
    popular: true,
  },
  {
    id: 4,
    name: 'HIIT giảm cân nhanh',
    instructor: 'Cô Lan Anh',
    price: 1600000,
    originalPrice: 2100000,
    duration: '4 tuần',
    sessions: 12,
    rating: 4.6,
    reviews: 78,
    students: 445,
    category: 'HIIT',
    level: 'Trung bình',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tập luyện cường độ cao trong thời gian ngắn, hiệu quả tối ưu cho việc giảm cân.',
    highlights: ['Đốt cháy mỡ 24h', 'Tiết kiệm thời gian', 'Tăng tốc độ trao đổi chất'],
    popular: false,
  },
  {
    id: 5,
    name: 'Pilates cho vóc dáng thon gọn',
    instructor: 'Cô Thu Hà',
    price: 1700000,
    originalPrice: 2200000,
    duration: '6 tuần',
    sessions: 18,
    rating: 4.8,
    reviews: 92,
    students: 680,
    category: 'Pilates',
    level: 'Cơ bản',
    image: 'https://images.pexels.com/photos/3822702/pexels-photo-3822702.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Luyện tập Pilates để có vóc dáng thon gọn, cải thiện tư thế và sức khỏe cột sống.',
    highlights: ['Cải thiện tư thế', 'Tăng độ linh hoạt', 'Giảm đau lưng'],
    popular: false,
  },
  {
    id: 6,
    name: 'Boxing cơ bản',
    instructor: 'Thầy Minh Đức',
    price: 1900000,
    originalPrice: 2500000,
    duration: '8 tuần',
    sessions: 24,
    rating: 4.7,
    reviews: 67,
    students: 320,
    category: 'Boxing',
    level: 'Cơ bản',
    image: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Học boxing từ cơ bản, phát triển sức mạnh, tốc độ và khả năng tự vệ.',
    highlights: ['Học kỹ thuật boxing', 'Tăng sức mạnh', 'Rèn luyện tinh thần'],
    popular: false,
  },
];

export default function BuyCoursePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Khám phá khóa tập</h1>
        <p className="text-emerald-100 text-lg">
          Tìm kiếm khóa tập phù hợp với mục tiêu và trình độ của bạn
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa tập..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="popular">Phổ biến</option>
              <option value="rating">Đánh giá cao</option>
              <option value="price-low">Giá thấp</option>
              <option value="price-high">Giá cao</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {course.popular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Phổ biến
                </div>
              )}
              <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                  {course.level}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.reviews})</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {course.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  {course.sessions} buổi
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {course.highlights.slice(0, 2).map((highlight, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center group">
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa tập</h3>
          <p className="text-gray-600">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc.</p>
        </div>
      )}
    </div>
  );
}