import React, { useEffect, useState } from 'react';
import Sidebar from '../components/global/SidebarPro';
import Topbar from '../components/global/Topbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import adminServer from '../utilities/server/adminServer';
import {ALL_SYMBOL} from '../utilities/apiRequest/watchlist';
import { setSymbols , updateLtp , upodateBBO } from '../slices/symbolsSlice';
import { io } from "socket.io-client";

const MainLayout = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [isSidebar, setIsSidebar] = useState(true);
    const dispatch = useDispatch();
    const socket = io("https://ws-md.quantbd.com", {
        transports: ['websocket'],
        auth: {
            token: "your-auth-token"
        }
    });

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/login');
        }

        if (user.isLoggedIn) {
            getAllSymbols();
        }

 


                // Connect and subscribe
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
            socket.emit("subscribe", 'ltp'); // subscribe to channel
            socket.emit("subscribe", 'bbo'); // subscribe to channel
        });

        // Listen for updates
        socket.on("ltp", (data) => {
/*             console.log(data); */
            parserObject(data,'ltp', 'ltp');
            // Update Redux state
            // dispatch(updateSymbol(data));
        });
        socket.on("bbo", (data) => {
/*             console.log(data); */
            parserObject(data,'bbo', 'bbo');
            // Update Redux state
            // dispatch(updateSymbol(data));
        });

        // Cleanup on unmount
        // return () => {
        //     socket.off("symbol_update");
        //     socket.disconnect();
        // };
        // const worker = new Worker(new URL('../workers/ws_worker_fix.js', import.meta.url));

        // worker.onmessage = (event) => {
        //     console.log('Message from worker:', event.data);
        // };
    }, [user]);

   function parserObject(msg, propertyName, type) {
        const parsedData = JSON.parse(msg[propertyName]);
        if (Object.keys(parsedData).length > 0) {
            for (const key in parsedData) {
                if (parsedData.hasOwnProperty(key)) {
                    // dispatch(updateLtp(parsedData[key]));
                    let data = parsedData[key];
                    if(type == 'ltp')
                    {
                          dispatch(updateLtp(data));
                    }
                    if(type == 'bbo')
                    {
                          dispatch(upodateBBO(data));
                    }
                }
            }
        }
    }

    

    const getAllSymbols = () => {
        adminServer.get(ALL_SYMBOL+'?exchange=DSE')
            .then((response) => {
                let new_array = {};
                response.data.data.forEach((item) => {
                    new_array[item.symbol]  =  {
                        ...item,
                        'bid' : null,
                        'ask' : null,
                        'bidqty' : null,
                        'askqty' : null,
                        'ltp' : null,
                        'change' : null,
                        'change_per' : null,
                        'volume' : null,
                        'value' : null,
                        'open' : null,
                        'high' : null,
                        'low' : null,
                        'close' : null,
                        'last_vol' : null,
                        'dh' : null,
                        'dl' : null,
                        'cu' : null,
                        'cd' : null,
                    }
                });

                dispatch(setSymbols(new_array));
            })
            .catch((error) => {
                console.error('Error fetching all symbols:', error);
        });
    }


    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar}></Topbar>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;