import axios, { AxiosRequestConfig } from 'axios';
import queryBuilder from '../utils/queryBuilder';
import { OneForOneOffer, OneForOneOfferParams, Subject, Teacher, PaginatedResponse, BasicQueryParams, Offer, OffersQueryParams, OfferParams, StudentWithCourses, Course } from './models';
import keycloak from '../keycloak';

const getConfig = (): AxiosRequestConfig => ({ headers: { 'Authorization': `Bearer ${keycloak?.token ?? ''}` } });

const getFileUploadConfig = (filename: string): AxiosRequestConfig => ({
    headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/vnd.api+json',
        'Content-Disposition': `file; filename="${filename}"`,
        'Authorization': `Bearer ${keycloak?.token ?? ''}`,
    },
});

const getFileDownloadConfig = (): AxiosRequestConfig => ({
    headers: {
        'Authorization': `Bearer ${keycloak?.token ?? ''}`,
    },
    responseType: 'blob'
});

const api_path = process.env.REACT_APP_API_PATH;

///////////////

export const getOffers = (params?: OffersQueryParams) => axios.get<PaginatedResponse<Offer[]>>(api_path + '/api/offers' + (params ? queryBuilder(params) : ''), getConfig());

export const createOffer = (params: OfferParams) => axios.post(api_path + '/api/offers', params, getConfig());

export const editOffer = (id: number, params: OfferParams) => axios.put(api_path + '/api/offers/' + id, params, getConfig());

export const deleteOffer = (id: number) => axios.delete(api_path + '/api/offers/' + id, getConfig());

export const canAcceptOffer = (id: number) => axios.get<boolean>(api_path + '/api/offers/' + id + '/can-accept', getConfig());

export const acceptOffer = (offerId: number, courseId: number) => axios.post(api_path + '/api/offers/' + offerId + '/accept?courseId=' + courseId, '', getConfig());

export const getMatchingOffers = (id: number) => axios.get<Course[]>(api_path + '/api/offers/' + id + '/courses', getConfig());

///////////////

export const getOneForOneOffer = (id: number) => axios.get<OneForOneOffer>(api_path + '/api/one-to-one-offers/' + id, getConfig());

export const getOneForOneOffers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<OneForOneOffer[]>>(api_path + '/api/one-to-one-offers' + (params ? queryBuilder(params) : ''), getConfig());

export const createOneForOneOffer = (params: OneForOneOfferParams) => axios.post(api_path + '/api/one-to-one-offers', params, getConfig());

export const editOneForOneOffer = (id: number, params: OneForOneOfferParams) => axios.put(api_path + '/api/one-to-one-offers/' + id, params, getConfig());

export const deleteOneForOneOffer = (id: number) => axios.delete(api_path + '/api/one-to-one-offers/' + id, getConfig());

///////////////

export const getMe = () => axios.get<StudentWithCourses>(api_path + '/api/students/me', getConfig());

export const getMyCourses = () => axios.get<Course[]>(api_path + '/api/students/me/courses', getConfig());

export const getMyActiveOffers = (params?: OffersQueryParams) => axios.get<PaginatedResponse<Offer[]>>(api_path + '/api/students/me/active-offers' + (params ? queryBuilder(params) : ''), getConfig());

export const getMyRealisedOffers = (params?: OffersQueryParams) => axios.get<PaginatedResponse<Offer[]>>(api_path + '/api/students/me/realised-offers' + (params ? queryBuilder(params) : ''), getConfig());

export const getSubjects = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Subject[]>>(api_path + '/api/subjects' + (params ? queryBuilder(params) : ''), getConfig());

export const getTeachers = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Teacher[]>>(api_path + '/api/teachers' + (params ? queryBuilder(params) : ''), getConfig());

////////////////

export const uploadEnrollData = (file: File, filename: string) => axios.post(api_path + '/api/enroll/upload', file, getFileUploadConfig(filename));

export const getEnrollData = () => axios.get(api_path + '/api/enroll/download/all', getFileDownloadConfig());

export const getEnrollDataForTeacher = (id: number) => axios.get(api_path + '/api/enroll/download/teacher/' + id, getFileDownloadConfig());

export const createKeycloakStudents = (file: File, filename: string) => axios.post(api_path + '/api/keycloak/students', file, getFileUploadConfig(filename));

export const deleteKeycloakStudents = () => axios.delete(api_path + '/api/keycloak/students', getConfig());

////////////////

export const getStudentIcsCalendar = (indexNumber: string) => axios.get(api_path + '/api/enroll/download/student/calendar/' + indexNumber, getFileDownloadConfig());

////////////////

export const changeCourse = (fromId: number, toId: number) => axios.post(api_path + '/api/courses/' + fromId + '/enroll/' + toId, {}, getConfig());

export const getCoursesWithoutColision = (id: number) => axios.get<{ ids: number[] }>(api_path + '/api/courses/' + id + '/without-colision', getConfig());

export const getAllCourses = (params?: BasicQueryParams) => axios.get<PaginatedResponse<Course[]>>(api_path + '/api/courses' + (params ? queryBuilder(params) : ''), getConfig());
