import React, { useState, useContext, createContext } from "react";

const RecipeBuildContext = createContext();

export const RecipeBuildProvider = (props) => {
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        tags: [],
        image: ""
    });

    const updateRecipe = (data) => {
        setRecipe({...recipe, ...data})
    }

    return (
        <RecipeBuildContext.Provider value={{ recipe, updateRecipe }}>
            {props.children}
        </RecipeBuildContext.Provider>
    );
};

export const useRecipeBuildContext = () => {
    return useContext(RecipeBuildContext);
};