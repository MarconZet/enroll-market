import { FiltersData, Offer } from "./constants";

export const mockOffer: Offer = {
    id: 1,
    subjectName: 'Systemy rozproszone',
    wantedGroup: {
        teacherName: 'Jan Kowalski',
        timeSlot: 'Wt. 12.50 - 14.20',
    },
    offeredGroup: {
        teacherName: 'Tomasz Nowak',
        timeSlot: 'Śr. 9.35 - 11.05',
        comment: 'Płacę w walucie miasteczkowej',
        whoOffers: 'Marcin Woźniak',
    },
    offerentId: '911',
};

export const mockMyOffer: Offer = {
    id: 1,
    subjectName: 'Systemy rozproszone',
    wantedGroup: {
        teacherName: 'Jan Kowalski',
        timeSlot: 'Wt. 12.50 - 14.20',
    },
    offeredGroup: {
        teacherName: 'Tomasz Nowak',
        timeSlot: 'Śr. 9.35 - 11.05',
        comment: 'gg ez bot',
        whoOffers: 'Adam Kowalski',
    },
    offerentId: '2137',
};

export const mockOffers: Offer[] = Array(5).fill(mockOffer).concat(Array(5).fill(mockMyOffer));

export const mockFiltersData: FiltersData = {
    subjectsList: [
        'Systemy rozproszone',
        'Inżynieria oprogramowania',
        'Architektora komputerów',
    ],
    timeSlots: [
        'Pn, 8.00 - 9.30',
        'Wt, 8.00 - 9.30',
    ],
};
