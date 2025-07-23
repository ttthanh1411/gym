import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, DollarSign, FileText } from 'lucide-react';

interface AppointmentFormProps {
  appointment?: any;
  customers: any[];
  services: any[];
  onSave: (appointment: any) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  customers,
  services,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    appointmentname: '',
    appointmentdate: '',
    appointmenttime: '',
    price: '',
    customerid: '',
    serviceid: '',
    status: false
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        appointmentname: appointment.appointmentname,
        appointmentdate: appointment.appointmentdate,
        appointmenttime: appointment.appointmenttime,
        price: appointment.price,
        customerid: appointment.customerid,
        serviceid: appointment.serviceid,
        status: appointment.status
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointmentData = {
      ...formData,
      appointmentid: appointment?.appointmentid,
      scheduleid: appointment?.scheduleid || crypto.randomUUID(),
      price: parseFloat(formData.price).toString()
    };

    onSave(appointmentData);
  };

  const handleServiceChange = (serviceid: string) => {
    const selectedService = services.find(s => s.serviceid === serviceid);
    setFormData({
      ...formData,
      serviceid,
      price: selectedService?.price || formData.price
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {appointment ? 'Chỉnh Sửa Cuộc Hẹn' : 'Tạo Cuộc Hẹn Mới'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Appointment Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Tên Cuộc Hẹn
            </label>
            <input
              type="text"
              value={formData.appointmentname}
              onChange={(e) => setFormData({ ...formData, appointmentname: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên cuộc hẹn"
              required
            />
          </div>

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Khách Hàng
            </label>
            <select
              value={formData.customerid}
              onChange={(e) => setFormData({ ...formData, customerid: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn khách hàng</option>
              {customers.map((customer) => (
                <option key={customer.customerid} value={customer.customerid}>
                  {customer.customername} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch Vụ
            </label>
            <select
              value={formData.serviceid}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn dịch vụ</option>
              {services.map((service) => (
                <option key={service.serviceid} value={service.serviceid}>
                  {service.servicename} - {parseInt(service.price).toLocaleString('vi-VN')}đ
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Ngày Hẹn
              </label>
              <input
                type="date"
                value={formData.appointmentdate}
                onChange={(e) => setFormData({ ...formData, appointmentdate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Giờ Hẹn
              </label>
              <input
                type="time"
                value={formData.appointmenttime}
                onChange={(e) => setFormData({ ...formData, appointmenttime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Giá Tiền (VNĐ)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="1000"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Đánh dấu là hoàn thành</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {appointment ? 'Cập Nhật' : 'Tạo Cuộc Hẹn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;