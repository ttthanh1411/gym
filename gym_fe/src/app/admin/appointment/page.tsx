'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Filter, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';
import Dashboard from '../../../component/appointment/Dashboard';
import AppointmentCalendar from '../../../component/appointment/AppointmentCalendar';
import AppointmentList from '../../../component/appointment/AppointmentList';
import AppointmentForm from '../../../component/appointment/AppointmentForm';
import Sidebar from '../../../component/appointment/Sidebar';
import { mockAppointments, mockCustomers, mockServices } from '../../../service/appointment';

function Appointment() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [customers] = useState(mockCustomers);
  const [services] = useState(mockServices);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateAppointment = (appointmentData:any) => {
    const newAppointment = {
      ...appointmentData,
      appointmentid: crypto.randomUUID(),
    };
    setAppointments([...appointments, newAppointment]);
    setShowForm(false);
  };

  const handleUpdateAppointment = (appointmentData:any) => {
    setAppointments(appointments.map(apt => 
      apt.appointmentid === appointmentData.appointmentid ? appointmentData : apt
    ));
    setShowForm(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId:any) => {
    setAppointments(appointments.filter(apt => apt.appointmentid !== appointmentId));
  };

  const handleEditAppointment = (appointment:any) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard appointments={appointments} customers={customers} services={services} />;
      case 'calendar':
        return (
          <AppointmentCalendar 
            appointments={appointments}
            onEditAppointment={handleEditAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        );
      case 'appointments':
        return (
          <AppointmentList 
            appointments={appointments}
            customers={customers}
            services={services}
            onEditAppointment={handleEditAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        );
      default:
        return <Dashboard appointments={appointments} customers={customers} services={services} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === 'dashboard' && 'Dashboard'}
                {currentView === 'calendar' && 'Lịch Hẹn'}
                {currentView === 'appointments' && 'Quản Lý Cuộc Hẹn'}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentView === 'dashboard' && 'Tổng quan hệ thống quản lý cuộc hẹn'}
                {currentView === 'calendar' && 'Xem lịch hẹn theo tháng'}
                {currentView === 'appointments' && 'Danh sách tất cả cuộc hẹn'}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedAppointment(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tạo Cuộc Hẹn
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentView()}
        </main>
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          customers={customers}
          services={services}
          onSave={selectedAppointment ? handleUpdateAppointment : handleCreateAppointment}
          onCancel={() => {
            setShowForm(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}

export default Appointment;