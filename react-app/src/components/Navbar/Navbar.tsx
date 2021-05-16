import { useLocation, Link, useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import * as P from './parts';
import { useSelector } from 'react-redux';
import { userAuthSelector } from '../../store/userAuth/selectors';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    let userData = useSelector(userAuthSelector);

    const { keycloak } = useKeycloak();

    const links = [
        {
            title: 'Strona główna',
            path: '/',
        },
        {
            title: 'Mój plan',
            path: '/timetable',
            checkAuth: true,
        },
        {
            title: 'Import/export',
            path: '/dataUploadAndDownload',
            checkAuth: true,
        },
        {
            title: 'Moje oferty',
            path: '/myOffers/active',
            otherPathsToHighlight: [
                '/myOffers/realised',
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
        return keycloak.authenticated ? "Wyloguj" : "Zaloguj"
    };

    console.log(keycloak.token);

    return (
        <P.Navbar>
            {/* <P.SelectSemester>
                <option>Wybór semestru zrobi się w swoim czasie</option>
            </P.SelectSemester> */}
            <P.UserName>{!userData.id ? 'Użytkownik niezalogowany' : `Witaj, ${userData.name} ${userData.surname}`}</P.UserName>
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
