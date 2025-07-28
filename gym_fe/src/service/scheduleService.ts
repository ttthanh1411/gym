import { Schedule } from '../type/schedule';
import BaseService from './baseService';

const scheduleService = new BaseService<Schedule>('http://localhost:5231/api/schedule');

export default scheduleService;