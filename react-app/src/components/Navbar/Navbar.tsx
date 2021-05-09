import { useLocation, Link, useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import * as P from './parts';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const history = useHistory();

    const { keycloak } = useKeycloak();

    const links = [
        {
            title: 'Strona główna',
            path: '/',
        },
        {
            title: 'Import/export',
            path: '/dataUploadAndDownload',
            checkAuth: true,
        },
        {
            title: 'Moje oferty',
            path: '/myOffers/madeByMe',
            otherPathsToHighlight: [
                '/myOffers/acceptedByMe',
            ],
            checkAuth: true,
        },
        {
            title: 'Dodaj ofertę',
            path: '/addOffer',
            checkAuth: true,
        },
        {
            title: 'Lista ofert',
            path: '/offers',
            checkAuth: true,
        },
        {
            title: 'Panel użytkownika',
            path: '/userPanel',
            checkAuth: true,
        },
    ];

    const handleLogInOut = () => {
        if (keycloak.authenticated) {
            history.push('/');
            keycloak.logout();
        } else {
            keycloak.login();
        }
    };

    const checkAuthenticated = () => {
        if (!keycloak.authenticated) {
            handleLogInOut();
        }
    };

    const getLogInOutText = () => {
        return keycloak.authenticated ? "Logout" : "Login"
    };

    console.log(keycloak.token);

    return (
        <P.Navbar>
            {/* <P.SelectSemester>
                <option>Wybór semestru zrobi się w swoim czasie</option>
            </P.SelectSemester> */}
            <div>
                {links.map(
                    (link, index) => (
                        <Link key={index} to={link.path} style={{ textDecoration: 'none' }} onClick={link?.checkAuth ? checkAuthenticated : () => console.log("nope")}>
                            <P.Link
                                isCurrent={(link.path === location.pathname) || link.otherPathsToHighlight?.includes(location.pathname)}
                            >{link.title}</P.Link>
                        </Link>
                    )
                )}
                <Link key={-1} to={'/login'} style={{ textDecoration: 'none' }} onClick={handleLogInOut}>
                    <P.Link>{getLogInOutText()}</P.Link>
                </Link>
            </div>
        </P.Navbar>
    );
};

export default Navbar;