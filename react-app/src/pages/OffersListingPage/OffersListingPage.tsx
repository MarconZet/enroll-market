import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiltersColumn } from '../../components/FiltersColumn/FiltersColumn';
import OneForOneTile from '../../components/OneForOneTile/OneForOneTile';
import { Pagination } from '../../components/Pagination/Pagination';
import { offersListingFiltersDataSelector, offersListingIsLoadingSelector, offersListingPageSelector, offersListingSelector, offersListingTotalPagesSelector } from '../../store/offersListing/selectors';
import * as P from './parts';
import * as A from '../../store/offersListing/actions';
import { Filters } from '../../store/offersListing/constants';

export const OffersListingPage: React.FC = () => {
    const dispatch = useDispatch();
    let currentPage = useSelector(offersListingPageSelector);
    let totalPages = useSelector(offersListingTotalPagesSelector);
    let offers = useSelector(offersListingSelector);
    let isLoading = useSelector(offersListingIsLoadingSelector);
    let filtersData = useSelector(offersListingFiltersDataSelector);

    useEffect(() => {
        dispatch(A.getPageRequest(1));
    }, [dispatch]);

    const filtersSubmitCallback = (data: Filters) => {
        dispatch(A.applyFilters(data));
    };

    const onPageChange = (page: number) => {
        dispatch(A.getPageRequest(page));
    }

    return (
        <P.Wrapper>
            <P.FiltersContainer>
                <FiltersColumn submitCallback={filtersSubmitCallback} timeSlots={filtersData.timeSlots} subjectsList={filtersData.subjectsList} />
            </P.FiltersContainer>
            <P.OffersContainer>
                {
                    isLoading
                        ? <></>
                        : (
                            <>
                                {offers.map((offer, index) => <OneForOneTile key={index} {...offer} />)}
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                            </>
                        )
                }
            </P.OffersContainer>
        </P.Wrapper>
    );
};

export default OffersListingPage;
