import axios from 'axios';
import queryBuilder from '../utils/queryBuilder';
import { OneForOneOffer, OneForOneOfferParams, Subject, Teacher, PaginatedResponse, BasicQueryParams, Offer, OffersQueryParams, OfferParams, StudentWithCourses, Course } from './models';
import keycloak from '../keycloak';

const getConfig = () => ({ headers: { 'Authorization': `Bearer ${keycloak?.token ?? ''}` } });

const getFileUploadConfig = (filename: string) => ({
    headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/vnd.api+json',
        'Content-Disposition': `file; filename="${filename}"`,
        'Authorization': `Bearer ${keycloak?.token ?? ''}`,
    },
});

///////////////

export const getOffers = (params?: OffersQueryParams) => axios.get<PaginatedResponse<Offer[]>>(process.env.REACT_APP_API_PATH + '/api/offers' + (params ? queryBuilder(params) : ''), getConfig());

export const createOffer = (params: OfferParams) => axios.post(process.env.REACT_APP_API_PATH + '/api/offers', params, getConfig());

export const deleteOffer = (id: number) => axios.delete(process.env.REACT_APP_API_PATH + '/api/offers/' + id, getConfig());

export const canAcceptOffer = (id: number) => axios.get<boolean>(process.env.REACT_APP_API_PATH + '/api/offers/' + id + '/can-accept', getConfig());

export const acceptOffer = (offerId: number, courseId: number) => axios.post(process.env.REACT_APP_API_PATH + '/api/offers/' + offerId + '/accept?courseId=' + courseId, '', getConfig());

export const getMatchingOffers = (id: number) => axios.get<Course[]>(process.env.REACT_APP_API_PATH + '/api/offers/' + id + '/courses', getConfig());

///////////////

export const getOneForOneOffer = (id: number) => axios.get<OneForOneOffer>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers/' + id, getConfig());

export const getOneForOneOffers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<OneForOneOffer[]>>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers' + (params ? queryBuilder(params) : ''), getConfig());

export const createOneForOneOffer = (params: OneForOneOfferParams) => axios.post(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers', params, getConfig());

export const deleteOneForOneOffer = (id: number) => axios.delete(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers/' + id, getConfig());

///////////////

export const getMe = () => axios.get<StudentWithCourses>(process.env.REACT_APP_API_PATH + '/api/students/me', getConfig());

export const getMyCourses = () => axios.get<Course[]>(process.env.REACT_APP_API_PATH + '/api/students/me/courses', getConfig());

export const getSubjects = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Subject[]>>(process.env.REACT_APP_API_PATH + '/api/subjects' + (params ? queryBuilder(params) : ''), getConfig());

export const getTeachers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Teacher[]>>(process.env.REACT_APP_API_PATH + '/api/teachers' + (params ? queryBuilder(params) : ''), getConfig());

////////////////

export const uploadEnrollData = (file: File, filename: string) => axios.post(process.env.REACT_APP_API_PATH + '/api/enroll/upload', file, getFileUploadConfig(filename));