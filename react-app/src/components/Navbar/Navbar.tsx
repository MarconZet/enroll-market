import * as P from './parts';
import { useLocation, Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const location = useLocation();

    const links = [
        {
            title: 'Strona główna',
            path: '/',
        },
        {
            title: 'Import/export',
            path: '/dataUploadAndDownload',
        },
        {
            title: 'Moje oferty',
            path: '/myOffers/madeByMe',
            otherPathsToHighlight: [
                '/myOffers/acceptedByMe',
            ],
        },
        {
            title: 'Dodaj ofertę',
            path: '/addOffer',
        },
        {
            title: 'Lista ofert',
            path: '/offers',
        },
        {
            title: 'Panel użytkownika',
            path: '/userPanel',
        },
    ];

    return (
        <P.Navbar>
            {/* <P.SelectSemester>
                <option>Wybór semestru zrobi się w swoim czasie</option>
            </P.SelectSemester> */}
            <div>
                {links.map(
                    (link, index) => (
                        <Link key={index} to={link.path}>
                            <P.Link isCurrent={(link.path === location.pathname) || link.otherPathsToHighlight?.includes(location.pathname)}>{link.title}</P.Link>
                        </Link>
                    )
                )}
            </div>
        </P.Navbar>
    );
};

export default Navbar;