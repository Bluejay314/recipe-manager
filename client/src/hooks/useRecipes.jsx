import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";

export function useRecipes(amount=-1) {
    const [data, setData] = useState([]);
    const { currentUser } = useUserContext();
    const headers = { "x-access-token": currentUser.token };

    useEffect(() => {
        if (currentUser.id) {
            let url = `http://localhost:3010/recipes/all/${currentUser.id}?amount=${amount}`;
            console.log(`url: ${url}`)
            axios.get(url,{ headers: headers })
                .then((response) => setData(response.data.data))
                .catch((err) => console.log(err.message));
        }
    }, []);

    return data;
}
