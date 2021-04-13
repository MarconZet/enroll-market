import { OffersManagementAction, OffersManagementActionType } from "./constants";

export const deleteOfferRequest = (id: number): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferRequest,
    id,
});

export const deleteOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferSuccess,
});

export const deleteOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferFail,
});