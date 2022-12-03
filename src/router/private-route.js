import {Redirect, Route} from "react-router-dom";
import React from "react";

const PrivateRoute = ({children, role, requiredRoles, ...rest}) => {

    const getComponentOrRedirect = (props) => {
        let content = children;
        if (!requiredRoles || !requiredRoles.length) {
            return content;
        }

        if (role && requiredRoles.includes(role)) {
            return content;
        }

        return <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>;
    };

    return (
        <Route
            {...rest}
            render={(props) => getComponentOrRedirect(props)}
        />
    )
}

export default PrivateRoute