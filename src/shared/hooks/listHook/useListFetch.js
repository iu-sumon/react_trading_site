import { useState, useEffect } from "react";
import adminServer from "../../../utilities/server/adminServer";
import errorHandler from "../../../utilities/errorHandler";

const useListFetch = ({ url, server= adminServer, filter={} }) => {
    const [data, setData] = useState({
        isLoading: true,
        hasError: false,
        isComplete: false,
        data: null,
    });

    useEffect(() => {
        loadData(filter);
    }, []);

    const loadData = (filter) => {
        setData( {
            isLoading: true,
            hasError: false,
            isComplete: false,
            data: null,
        });
        const params = {...filter };
        adminServer.get(url, { params })
            .then((res) => {
                setData( {
                    isLoading: false,
                    hasError: false,
                    isComplete: true,
                    data: res.data.data,
                });
            }).catch((error)=>{
                setData( ({
                    isLoading: false,
                    hasError: true,
                    isComplete: false,
                    data: null,
                }))
            errorHandler(error)
        });
    }
    return {
        ...data, loadData, setData
    };
};

export default useListFetch;