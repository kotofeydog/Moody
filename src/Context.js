import axios from "axios";
import { useState, useEffect } from "react";

const { createContext } = require("react");

const Context = createContext();

const ContextProvider = ({ children }) => {

    const urlAPI = `http://localhost:9000`

    const [Data, setData] = useState([])

    const Request = async (path, params) => {
        try {
            path = urlAPI + path;

            return await axios(path, params)
        } catch (error) {
            console.error(error?.message);

            return error;
        }
    }

    useEffect(()=>{
        Request("/products", {
            method: "GET"
        }).then(response => {
            const data = response.data;

            setData(() => data ? [...data] : [])
        })
    }, [])

    const ContextValues = {
        urlAPI,
        Data, setData,
        Request
    }

    return (
        <Context.Provider value={ContextValues}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }