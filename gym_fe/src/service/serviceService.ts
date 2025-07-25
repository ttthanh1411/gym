import { Service } from '../type/service';
import BaseService from './baseService';

const serviceService = new BaseService<Service>('http://localhost:5231/api/service');

export default serviceService;

export async function fetchPagedServices(keyword = '', page = 1, pageSize = 5) {
    const url = `http://localhost:5231/api/service/paged?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${pageSize}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
}

export async function fetchAllServices() {
    const url = 'http://localhost:5231/api/service';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch all services');
    return await res.json();
}