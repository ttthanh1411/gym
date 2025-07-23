// Mock data for the appointment management system

export const mockCustomers = [
  {
    customerid: '1',
    customername: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0901234567'
  },
  {
    customerid: '2',
    customername: 'Trần Thị Bình',
    email: 'tranthibinh@email.com',
    phone: '0902345678'
  },
  {
    customerid: '3',
    customername: 'Lê Văn Cường',
    email: 'levancuong@email.com',
    phone: '0903456789'
  },
  {
    customerid: '4',
    customername: 'Phạm Thị Dung',
    email: 'phamthidung@email.com',
    phone: '0904567890'
  },
  {
    customerid: '5',
    customername: 'Hoàng Văn Em',
    email: 'hoangvanem@email.com',
    phone: '0905678901'
  }
];

export const mockServices = [
  {
    serviceid: '1',
    servicename: 'Cắt tóc nam',
    price: '150000',
    duration: 30
  },
  {
    serviceid: '2',
    servicename: 'Cắt tóc nữ',
    price: '200000',
    duration: 45
  },
  {
    serviceid: '3',
    servicename: 'Nhuộm tóc',
    price: '500000',
    duration: 120
  },
  {
    serviceid: '4',
    servicename: 'Uốn tóc',
    price: '800000',
    duration: 180
  },
  {
    serviceid: '5',
    servicename: 'Gội đầu massage',
    price: '100000',
    duration: 20
  }
];

export const mockAppointments = [
  {
    appointmentid: '1',
    appointmentname: 'Cắt tóc cho An',
    appointmentdate: '2025-01-15',
    appointmenttime: '09:00',
    price: '150000',
    customerid: '1',
    serviceid: '1',
    status: true,
    scheduleid: 'sch-1'
  },
  {
    appointmentid: '2',
    appointmentname: 'Nhuộm tóc cho Bình',
    appointmentdate: '2025-01-15',
    appointmenttime: '10:30',
    price: '500000',
    customerid: '2',
    serviceid: '3',
    status: false,
    scheduleid: 'sch-2'
  },
  {
    appointmentid: '3',
    appointmentname: 'Cắt tóc cho Cường',
    appointmentdate: '2025-01-16',
    appointmenttime: '14:00',
    price: '150000',
    customerid: '3',
    serviceid: '1',
    status: false,
    scheduleid: 'sch-3'
  },
  {
    appointmentid: '4',
    appointmentname: 'Uốn tóc cho Dung',
    appointmentdate: '2025-01-16',
    appointmenttime: '15:30',
    price: '800000',
    customerid: '4',
    serviceid: '4',
    status: true,
    scheduleid: 'sch-4'
  },
  {
    appointmentid: '5',
    appointmentname: 'Gội đầu cho Em',
    appointmentdate: '2025-01-17',
    appointmenttime: '16:00',
    price: '100000',
    customerid: '5',
    serviceid: '5',
    status: false,
    scheduleid: 'sch-5'
  },
  {
    appointmentid: '6',
    appointmentname: 'Cắt tóc nữ cho Bình',
    appointmentdate: '2025-01-18',
    appointmenttime: '11:00',
    price: '200000',
    customerid: '2',
    serviceid: '2',
    status: false,
    scheduleid: 'sch-6'
  }
];