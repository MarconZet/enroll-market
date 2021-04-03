export const mockOffer = {
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
    }
};

export const mockOffers = Array(10).fill(mockOffer);

export const mockFiltersData = {
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
