import React, { useState, useContext, createContext } from "react";
import { useUserContext } from "./UserContext";

const RecipeBuildContext = createContext();

export const RecipeBuildProvider = (props) => {
    const { currentUser } = useUserContext();
    const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    tags: "",
    favourite: false,
    image: "",
    canEdit: false
});

    const updateRecipe = (data) => {
        setRecipe({...recipe, ...data})
    }

    const resetRecipe = () => {

    }

    const getCreateFormData = () => {
        let formData = new FormData();
        formData.append("user", currentUser.id);
        formData.append("title", recipe.title);
        formData.append("tags", recipe.tags);
        formData.append("description", recipe.description)
        formData.append("file", recipe.image);

        return formData;
    }

    const getUpdateFormData = () => {
        const dontInclude = ["_id", "createdAt", "updatedAt", "image"];
        let formData = {};

        for(const key in recipe) {
            if(!dontInclude.includes(key)) {
                formData[key] = recipe[key];
            }
        }
        return formData;
    }

    return (
        <RecipeBuildContext.Provider value={{ recipe, updateRecipe, resetRecipe, getCreateFormData, getUpdateFormData }}>
            {props.children}
        </RecipeBuildContext.Provider>
    );
};

export const useRecipeBuildContext = () => {
    return useContext(RecipeBuildContext);
};