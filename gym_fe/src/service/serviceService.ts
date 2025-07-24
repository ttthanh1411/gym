import { Service } from '../type/service';
import BaseService from './baseService';

const serviceService = new BaseService<Service>('http://localhost:5231/api/service');

export default serviceService;