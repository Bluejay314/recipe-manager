import React, { createContext, useContext } from "react";

const RouteContext = createContext();

export const RouteProvider = (props) => {
    const paths = {

    }

    return (
        <RouteContext.Provider value={paths}>
            {props.children}
        </RouteContext.Provider>
    );
};

export const useRouteContext = () => {
    return useContext(RouteContext);
};