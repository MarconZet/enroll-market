import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    isAdminRoute?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAdminRoute, ...restProps }) => {
    const { keycloak } = useKeycloak();

    return (
        <Route
            {...restProps}
            render={props => (
                keycloak?.authenticated
                    ? (
                        !isAdminRoute || !!keycloak.hasRealmRole('admin')
                            ? <Component {...props} />
                            : <Redirect to={'/unauthorized'} />

                    )
                    : keycloak.login()
            )}
        />
    );
};

export default PrivateRoute