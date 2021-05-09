import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...restProps }) => {
    const { keycloak } = useKeycloak();

    return (
        <Route
            {...restProps}
            render={props => (
                keycloak?.authenticated ? <Component {...props} /> : keycloak.login()
            )}
        />
    );
};

export default PrivateRoute