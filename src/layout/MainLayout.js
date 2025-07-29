import React, { useEffect, useState } from 'react';
import Sidebar from '../components/global/SidebarPro';
import Topbar from '../components/global/Topbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import adminServer from '../utilities/server/adminServer';
import { ALL_SYMBOL } from '../utilities/apiRequest/watchlist';
import { setSymbols } from '../slices/symbolsSlice';
import { setIndex, setCseIndex } from '../slices/indexSlicer';
import { setDseMktHealth, setCseMktHealth } from '../slices/GlobalMarketSlicer';
import WsFeedMd from '../components/feed/WsFeedMd';
import errorHandler from '../utilities/errorHandler';

const MainLayout = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [isSidebar, setIsSidebar] = useState(true);
    const dispatch = useDispatch();



    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/login');
        }

        if (user.isLoggedIn) {
            getAllSymbols();

            getAllIndexes('DSE');
            getAllIndexes('CSE');

            // mkt health 
            getMarketHealth('DSE');
            getMarketHealth('CSE');
        }

    }, [user]);






    const getAllSymbols = () => {
        adminServer.get(ALL_SYMBOL + '?exchange=DSE')
            .then((response) => {
                let new_array = {};
                response.data.data.forEach((item) => {
                    new_array[item.symbol] = {
                        ...item,
                        'bid': null,
                        'ask': null,
                        'bidqty': null,
                        'askqty': null,
                        'ltp': 0,
                        'change': null,
                        'change_per': null,
                        'volume': null,
                        'value': null,
                        'open': null,
                        'high': null,
                        'low': null,
                        'close': null,
                        'last_vol': null,
                        'dh': null,
                        'dl': null,
                        'cu': null,
                        'cd': null,
                    }
                });

                dispatch(setSymbols(new_array));


            })
            .catch((error) => {
                errorHandler(error);
            });
    }


    const getAllIndexes = (exchange) => {
        adminServer.get('market-data/index-value?exchange=' + exchange)
            .then((response) => {
                let indexes = {};
                response.data.data.forEach((item) => {
                    indexes[item.index_name] = item;
                });
                if (exchange === 'DSE') {
                    dispatch(setIndex(indexes));
                }
                if (exchange === 'CSE') {
                    dispatch(setCseIndex(indexes));
                }
            })
            .catch((error) => {
                errorHandler(error);
            });
    }

    const getMarketHealth = (exchange) => {
        adminServer.get('/market-data/trade-info?exchange=' + exchange)
            .then((response) => {
                const data = response.data.data;
                console.log(data);
                if (exchange === 'DSE') {
                    dispatch(setDseMktHealth(data));
                } else if (exchange === 'CSE') {
                    dispatch(setCseMktHealth(data));
                }
            })
            .catch((error) => {
                errorHandler(error);
            });
    }


    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                {user.isLoggedIn && <WsFeedMd />}
                <Topbar setIsSidebar={setIsSidebar}></Topbar>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;