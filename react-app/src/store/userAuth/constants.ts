//TODO: this is only temporary mock; update when auth is being done

export interface UserAuthState {
    isAdmin: boolean;
    id: string;
    name: string;
    surname: string;
}

export const InitialUserAuthState: UserAuthState = {
    isAdmin: true,
    id: '2137',
    name: 'Adam',
    surname: 'Kowalski',
}