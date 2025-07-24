import { Customer } from '../type/customer';
import BaseService from './baseService';

const customerService = new BaseService<Customer>('http://localhost:5231/api/customer');

export default customerService;
