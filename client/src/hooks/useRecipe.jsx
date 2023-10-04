import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";

export function useRecipe(recipeId) {
    const [data, setData] = useState({});
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token };

    useEffect(() => {
        if (currentUser.id) {
            let ignore = false;
            console.log(`recipe id: ${recipeId}`)
            axios.get(`http://localhost:3010/recipes/${recipeId}`, {headers: headers})
                .then(response => { if (!ignore) setData(response.data.data)})
                .catch(err => console.log(err.message));

            return () => {
                ignore = true;
            };
        } else console.log(`No user: ${currentUser.id}`)
    }, [recipeId]);

    return data;
}
