import axios from 'axios';
import { OneForOneOffer, Subject } from './models';

export const getOneForOneOffers = () => axios.get<OneForOneOffer[]>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers');

export const deleteOneForOneOffer = (id: number) => axios.delete(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers/' + id);

export const getSubjects = () => axios.get<Subject[]>(process.env.REACT_APP_API_PATH + '/api/one-to-one-offers');
