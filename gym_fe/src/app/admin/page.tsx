'use client';
import React, { useState } from 'react';
import { Menu, X, Home, Users, Building, Settings, LogOut, Bell, Search, Wallpaper, CardSim, Package, Projector } from 'lucide-react';
import Link from 'next/link';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-[#1A1363] to-[#332F42]">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Home className="h-5 w-5 mr-3" />
            Báo cáo
          </Link>
          <Link
            href="/admin/user"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Users className="h-5 w-5 mr-3" />
            Quản lý người dùng
          </Link>
          <Link
            href="/admin/schedule"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Wallpaper className="h-5 w-5 mr-3" />
            Quản lý lịch trình
          </Link>
          <Link
            href="/admin/service"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <CardSim className="h-5 w-5 mr-3" />
            Quản lý dịch vụ
          </Link>
          <Link
            href="/admin/workout"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Package className="h-5 w-5 mr-3" />
            Quản lý Các gói tập
          </Link>
          <Link
            href="/admin/appointment"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Projector className="h-5 w-5 mr-3" />
            Quản lý Các cuộc hẹn
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings className="h-5 w-5 mr-3" />
            Cài Đặt
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="relative text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
