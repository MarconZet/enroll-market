import { useSelector, useDispatch } from 'react-redux';
import { FiltersColumn } from '../../components/FiltersColumn/FiltersColumn';
import OneForOneTile from '../../components/OneForOneTile/OneForOneTile';
import { Pagination } from '../../components/Pagination/Pagination';
import { OffersListingPageSelector } from '../../store/offersListing/selectors';
import * as P from './parts';
import * as A from '../../store/offersListing/actions';

export const OffersListingPage: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(OffersListingPageSelector);

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

    const onPageChange = (page: number) => {
        dispatch(A.changePage(page));
    }

    return (
        <P.Wrapper>
            <P.FiltersContainer>
                <FiltersColumn {...mockFiltersProps} />
            </P.FiltersContainer>
            <P.OffersContainer>
                {mockOffers.map((offer) => <OneForOneTile {...offer} />)}
                <Pagination currentPage={currentPage} totalPages={10} onPageChange={onPageChange} />
            </P.OffersContainer>
        </P.Wrapper>
    );
};

export default OffersListingPage;
