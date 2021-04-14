import axios from 'axios';
import { OneForOneOffer, OneForOneOfferParams, Subject } from './models';

export const getOneForOneOffers = () => axios.get<OneForOneOffer[]>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers');

export const createOneForOneOffer = (params: OneForOneOfferParams) => axios.post(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers', params);

export const deleteOneForOneOffer = (id: number) => axios.delete(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers/' + id);

export const getSubjects = () => axios.get<Subject[]>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers');

export const uploadEnrollData = (file: File, filename: string) => axios.post(process.env.REACT_APP_API_PATH + '/api/enroll/upload', file, {
    headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/vnd.api+json',
        'Content-Disposition': `file; filename="${filename}"`
    },
});