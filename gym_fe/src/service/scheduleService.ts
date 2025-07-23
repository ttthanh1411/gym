import { Schedule} from '../types/schedule';
import BaseService from './baseService';


const scheduleService = new BaseService<Schedule>('https://localhost:5000/api/schedule');

export default scheduleService;