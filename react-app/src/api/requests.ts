import axios from 'axios';
import queryBuilder from '../utils/queryBuilder';
import { OneForOneOffer, OneForOneOfferParams, Subject, Teacher, PaginatedResponse, BasicQueryParams } from './models';
import keycloak from '../keycloak';

const getConfig = () => ({ headers: { 'Authorization': `Bearer ${keycloak?.token ?? ''}` } })

export const getOneForOneOffers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<OneForOneOffer[]>>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers' + (params ? queryBuilder(params) : ''), getConfig());

export const createOneForOneOffer = (params: OneForOneOfferParams) => axios.post(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers', params, getConfig());

export const deleteOneForOneOffer = (id: number) => axios.delete(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers/' + id, getConfig());

export const getSubjects = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Subject[]>>(process.env.REACT_APP_API_PATH + '/api/subjects' + (params ? queryBuilder(params) : ''), getConfig());

export const getTeachers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Teacher[]>>(process.env.REACT_APP_API_PATH + '/api/teachers' + (params ? queryBuilder(params) : ''), getConfig());


export const uploadEnrollData = (file: File, filename: string) => axios.post(process.env.REACT_APP_API_PATH + '/api/enroll/upload', file, {
    headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/vnd.api+json',
        'Content-Disposition': `file; filename="${filename}"`,
        'Authorization': `Bearer ${keycloak?.token ?? ''}`,
    },
});