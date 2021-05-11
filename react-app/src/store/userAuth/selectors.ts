import { ApplicationState } from "../applicationState";

export const userAuthIdSelector = (state: ApplicationState) => state.userAuth?.id;

export const userAuthSelector = (state: ApplicationState) => state.userAuth;