import { FiltersColumn } from '../../components/FiltersColumn/FiltersColumn';
import OneForOneTile from '../../components/OneForOneTile/OneForOneTile';
import * as P from './parts';

export const OffersPage: React.FC = () => {
    const mockFiltersProps = {
        submitCallback: (data: any) => {
            console.log(data);
        },
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

    const mockOffer = {
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

    const mockOffers = Array(10).fill(mockOffer);

    return (
        <P.Wrapper>
            <P.FiltersContainer>
                <FiltersColumn {...mockFiltersProps} />
            </P.FiltersContainer>
            <P.OffersContainer>
                {mockOffers.map((offer) => <OneForOneTile {...offer} />)}
            </P.OffersContainer>
        </P.Wrapper>
    );
};

export default OffersPage;
