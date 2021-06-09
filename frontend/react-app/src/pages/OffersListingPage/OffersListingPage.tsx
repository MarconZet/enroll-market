import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { FiltersColumn } from '../../components/FiltersColumn/FiltersColumn';
import OneForOneTile from '../../components/OneForOneTile/OneForOneTile';
import ConditionalTile from '../../components/ConditionalTile/ConditionalTile';
import { Pagination } from '../../components/Pagination/Pagination';
import { offersListingIsLoadingSelector, offersListingPageSelector, offersListingSelector, offersListingTotalPagesSelector } from '../../store/offersListing/selectors';
import * as P from './parts';
import * as A from '../../store/offersListing/actions';
import { acceptOfferRequest, deleteOfferRequest } from '../../store/offersManagement/actions';
import { ExtendedOffer, ListingType } from '../../store/offersListing/constants';
import ConditionalEditModal from '../../components/ConditionalEditModal/ConditionalEditModal';
import OneForOneEditModal from '../../components/OneForOneEditModal/OneForOneEditModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

export const OffersListingPage: React.FC = () => {
    const dispatch = useDispatch();

    let currentPage = useSelector(offersListingPageSelector);
    let totalPages = useSelector(offersListingTotalPagesSelector);
    let offers = useSelector(offersListingSelector);
    let isLoading = useSelector(offersListingIsLoadingSelector);
    let location = useLocation();

    useEffect(() => {
        let type: ListingType = 'all';

        if (location.pathname === '/myOffers/active') {
            type = 'myActive';
        } else if (location.pathname === '/myOffers/realised') {
            type = 'myRealised';
        }

        dispatch(A.setType(type));
    }, [dispatch, location]);

    useEffect(() => {
        dispatch(A.getPageRequest(1))
    }, [dispatch]);

    const [isConditionalEditModalOpen, setIsConditionalEditModalOpen] = useState(false);
    const [isOneForOneEditModalOpen, setIsOneForOneEditModalOpen] = useState(false);
    const [conditionalEditModalOffer, setConditionalEditModalOffer] = useState<ExtendedOffer | null>(null);
    const [oneForOneEditModalOffer, setOneForOneEditModalOffer] = useState<ExtendedOffer | null>(null);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmModalText, setConfirmModalText] = useState('');
    const [confirmModalCallback, setConfirmModalCallback] = useState(() => () => {});

    const filtersSubmitCallback = (filters: string) => {
        dispatch(A.applyFilters(filters));
    };

    const onPageChange = (page: number) => {
        dispatch(A.getPageRequest(page));
    }

    const acceptCallback = (offerId: number, courseId: number) => () => {
        dispatch(acceptOfferRequest(offerId, courseId));
        setIsConfirmModalOpen(false);
    }

    const deleteCallback = (id: number) => () => {
        dispatch(deleteOfferRequest(id));
        setIsConfirmModalOpen(false);
    }

    const filtersClearCallback = () => {
        dispatch(A.applyFilters(''));
    }

    return (
        <P.Wrapper>
            <ConfirmModal
                confirmationText={confirmModalText}
                confirmHandler={confirmModalCallback}
                isOpen={isConfirmModalOpen}
                cancelHandler={() => setIsConfirmModalOpen(false)}
            />
            {(location.pathname === '/myOffers/active') && (!!offers.length) && (
                <>
                    <ConditionalEditModal
                        offer={conditionalEditModalOffer}
                        isOpen={isConditionalEditModalOpen}
                        cancelHandler={() => setIsConditionalEditModalOpen(false)}
                    />
                    <OneForOneEditModal
                        offer={oneForOneEditModalOffer}
                        isOpen={isOneForOneEditModalOpen}
                        cancelHandler={() => setIsOneForOneEditModalOpen(false)}
                    />
                </>
            )}
            <P.FiltersContainer>
                {((location.pathname === '/myOffers/active') || (location.pathname === '/myOffers/realised')) && (
                    <P.TypeContainer>
                        <Link to='/myOffers/active'>
                            <P.TypeButton isCurrent={location.pathname === '/myOffers/active'}>Aktywne</P.TypeButton>
                        </Link>
                        <Link to='/myOffers/realised'>
                            <P.TypeButton isCurrent={location.pathname === '/myOffers/realised'}>Zrealizowane</P.TypeButton>
                        </Link>
                    </P.TypeContainer>
                )}
                {location.pathname === '/offers' && (<FiltersColumn submitCallback={filtersSubmitCallback} clearCallback={filtersClearCallback} />)}
            </P.FiltersContainer>
            <P.OffersContainer>
                {
                    isLoading
                        ? <></>
                        : (
                            <>
                                {offers.map((offer, index) => (
                                    offer.isOneToOne
                                    ? (
                                        <OneForOneTile
                                            key={index}
                                            offer={offer}
                                            {...(
                                                (location.pathname === '/myOffers/active')
                                                    ? {
                                                        editCallback: () => {
                                                            setIsOneForOneEditModalOpen(true);
                                                            setOneForOneEditModalOffer(offer);
                                                        },
                                                        deleteCallback: () => {
                                                            setConfirmModalText("Czy na pewno chcesz usunąć tę ofertę?");
                                                            setConfirmModalCallback(() => deleteCallback(offer.id));
                                                            setIsConfirmModalOpen(true);
                                                        },
                                                    }
                                                    : {}
                                            )}
                                            {...(
                                                offer.canAccept
                                                ? {
                                                    acceptCallback: () => {
                                                        setConfirmModalText("Czy na pewno chcesz zaakceptować tę ofertę?");
                                                        setConfirmModalCallback(() => acceptCallback(offer.id, (typeof offer?.takenCourse !== 'undefined') ? offer?.takenCourse.id : 0));
                                                        setIsConfirmModalOpen(true);
                                                    },
                                                }
                                                : {}
                                            )}
                                            reverseOrder={location.pathname === '/myOffers/madeByMe'}
                                        />
                                    )
                                    : (
                                        <ConditionalTile
                                            key={index}
                                            offer={offer}
                                            {...(
                                                (location.pathname === '/myOffers/active')
                                                    ? {
                                                        editCallback: () => {
                                                            setIsConditionalEditModalOpen(true);
                                                            setConditionalEditModalOffer(offer);
                                                        },
                                                        deleteCallback: () => {
                                                            setConfirmModalText("Czy na pewno chcesz usunąć tę ofertę?");
                                                            setConfirmModalCallback(() => deleteCallback(offer.id));
                                                            setIsConfirmModalOpen(true);
                                                        },
                                                    }
                                                    : {}
                                            )}
                                            {...(
                                                offer.canAccept
                                                ? {
                                                    acceptCallback: (offerId, courseId) => () => {
                                                        setConfirmModalText("Czy na pewno chcesz zaakceptować tę ofertę?");
                                                        setConfirmModalCallback(() => acceptCallback(offerId, courseId));
                                                        setIsConfirmModalOpen(true);
                                                    },
                                                }
                                                : {}
                                            )}
                                            reverseOrder={location.pathname === '/myOffers/madeByMe'}
                                        />
                                    )
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
