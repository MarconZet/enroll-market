import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FiltersColumn } from '../../components/FiltersColumn/FiltersColumn';
import OneForOneTile from '../../components/OneForOneTile/OneForOneTile';
import { Pagination } from '../../components/Pagination/Pagination';
import { offersListingIsLoadingSelector, offersListingPageSelector, offersListingSelector, offersListingTotalPagesSelector } from '../../store/offersListing/selectors';
import * as P from './parts';
import * as A from '../../store/offersListing/actions';
import { userAuthIdSelector } from '../../store/userAuth/selectors';
import { acceptOfferRequest, deleteOfferRequest } from '../../store/offersManagement/actions';

export const OffersListingPage: React.FC = () => {
    const dispatch = useDispatch();
    let currentPage = useSelector(offersListingPageSelector);
    let totalPages = useSelector(offersListingTotalPagesSelector);
    let offers = useSelector(offersListingSelector);
    let isLoading = useSelector(offersListingIsLoadingSelector);
    let userId = useSelector(userAuthIdSelector);
    let location = useLocation();

    // useEffect(() => {
    //     let type: ListingType = 'all';

    //     if (location.pathname === '/myOffers/madeByMe') {
    //         type = 'madeByMe';
    //     } else if (location.pathname === '/myOffers/acceptedByMe') {
    //         type = 'acceptedByMe';
    //     }

    //     dispatch(A.setType(type));
    // }, [dispatch, location]);

    useEffect(() => {
        dispatch(A.getPageRequest(1))
    }, [dispatch])

    const filtersSubmitCallback = (filters: string) => {
        dispatch(A.applyFilters(filters));
    };

    const onPageChange = (page: number) => {
        dispatch(A.getPageRequest(page));
    }

    const acceptCallback = (offerId: number, courseId: number) => () => {
        dispatch(acceptOfferRequest(offerId, courseId));
    }

    const editCallback = (id: number) => () => {
        console.log('edit ' + id);
    }

    const deleteCallback = (id: number) => () => {
        dispatch(deleteOfferRequest(id));
    }

    const othersOfferProps = (offerId: number, courseId: number) => ({
        acceptCallback: acceptCallback(offerId, courseId),
    });

    const myOfferProps = (id: number) => ({
        editCallback: editCallback(id),
        deleteCallback: deleteCallback(id),
    });

    return (
        <P.Wrapper>
            <P.FiltersContainer>
                {/* ((location.pathname === '/myOffers/madeByMe') || (location.pathname === '/myOffers/acceptedByMe')) && (
                    <P.TypeContainer>
                        <Link to='/myOffers/madeByMe'>
                            <P.TypeButton isCurrent={location.pathname === '/myOffers/madeByMe'}>Złożone przeze mnie</P.TypeButton>
                        </Link>
                        <Link to='/myOffers/acceptedByMe'>
                            <P.TypeButton isCurrent={location.pathname === '/myOffers/acceptedByMe'}>Zaakceptowane przeze mnie</P.TypeButton>
                        </Link>
                    </P.TypeContainer>
                ) */}
                <FiltersColumn submitCallback={filtersSubmitCallback} />
            </P.FiltersContainer>
            <P.OffersContainer>
                {
                    isLoading
                        ? <></>
                        : (
                            <>
                                {offers.map((offer, index) => (
                                    <OneForOneTile
                                        key={index}
                                        offer={offer}
                                        {...(
                                            offer.student.id === userId
                                                ? myOfferProps(offer.id)
                                                : othersOfferProps(offer.id, offer.givenCourse.id)
                                        )}
                                        reverseOrder={location.pathname === '/myOffers/madeByMe'}
                                    />
                                ))}
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                            </>
                        )
                }
            </P.OffersContainer>
        </P.Wrapper>
    );
};

export default OffersListingPage;
