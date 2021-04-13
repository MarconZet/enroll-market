import axios from 'axios';
import { OneForOneOffer } from './models';

export const getOneForOneOffers = () => axios.get<OneForOneOffer[]>('http://localhost:8080/api/one-to-one-offers');

export const deleteOneForOneOffer = (id: number) => axios.delete('http://localhost:8080/api/one-to-one-offers/' + id);
