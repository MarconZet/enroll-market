import { ApplicationState } from "../applicationState";

export const userAuthIsAdminSelector = (state: ApplicationState) => state.userAuth.isAdmin;

export const userAuthIdSelector = (state: ApplicationState) => state.userAuth.id;

export const userAuthSelector = (state: ApplicationState) => state.userAuth;