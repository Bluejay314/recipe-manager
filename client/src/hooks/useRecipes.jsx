import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";

export function useRecipes(amount=null) {
    const [data, setData] = useState([]);
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token };

    useEffect(() => {
        if (currentUser.id) {
            let ignore = false;
            let url = `http://localhost:3010/recipes/all/${currentUser.id}`
            if(amount) 
                url = `http://localhost:3010/recipes/all/${currentUser.id}?amount=${amount}`
            
            axios.get(url,{ headers: headers })
                .then((response) => { if (!ignore) setData(response.data.data) })
                .catch((err) => console.log(err.message));

            return () => {
                ignore = true;
            };
        }
    });

    return data;
}
