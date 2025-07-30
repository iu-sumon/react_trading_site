import { useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from 'react';
import { FixedSizeList } from "react-window";
// import { Flash } from '@lab49/react-value-flash';
import ValueFlash from "../../components/util/ValueFlash";
import TopStock from "../../components/common/TopStock";

import './Dashboard.css'; // <--- THIS IS HOW YOU IMPORT IT
import Portfolio from "../../components/portfolio/Portfolio";


export default function Dashboard() {
    const symbols = useSelector((state) => state.symbols.symbols);
    const bbos = useSelector((state) => state.symbols.bbo_symbols);
    const time_and_sales = useSelector((state) => state.timesales.time_and_sales);
    const user = useSelector((state) => state.user);
    // if current user type is client then get client code from user state
    const [clientCode, setClientCode] = useState(user.userData.users_roles === 'client' ? user.userData.username : null);

    // useEffect(() => {
    //     console.log(user.userData);
    //     if (user.userData.users_roles === 'client') {
    //         setClientCode(user.userData.username);
    //     } else {
    //         setClientCode(null);
    //     }
    // }, [user]);

    const filteredSymbols = Object.values(symbols);

    // --- Configuration for react-window (Market Watch) ---
    // You'll need to measure these accurately after CSS changes
    const itemHeight = 35;
    const marketWatchHeight = 750;

    // Market Watch Row Renderer
    const MarketWatchRow = ({ index, style }) => {
        const item = filteredSymbols[index];
        if (!item) return null;

        let bid = bbos[item.symbol]?.bid || 0;
        let bidqty = bbos[item.symbol]?.bidqty || 0;
        let ask = bbos[item.symbol]?.ask || 0;
        let askqty = bbos[item.symbol]?.askqty || 0;

        return (
            // Apply the style from react-window to this div
            <div className="market-watch-row" style={style}>
                <div className="market-watch-cell">{item.symbol}</div>
                <div className="market-watch-cell">{item.company_name}</div>
                <div className="market-watch-cell">{item.ltp}</div>
                <div className="market-watch-cell">
                    <span className={item.change_per >= 0 ? 'text-success' : 'text-danger'}>{item.change}</span>
                </div>
                <div className="market-watch-cell">
                    <span className={item.change_per >= 0 ? 'text-success' : 'text-danger'}>
                        {item.change_per}</span>
                </div>
                <div className="market-watch-cell bg-success">{bid}</div>
                <div className="market-watch-cell bg-success">{bidqty}</div>
                <div className="market-watch-cell bg-danger">{ask}</div>
                <div className="market-watch-cell bg-danger">{askqty}</div>
                <div className="market-watch-cell">{item.volume}</div>
                <div className="market-watch-cell">{item.value}</div>
                <div className="market-watch-cell">{item.last_vol}</div>
                <div className="market-watch-cell">{item.close}</div>
            </div>
        );
    };

    // --- Configuration for react-window (Time and Sales) ---
    const timeSalesItemHeight = 30;
    const timeSalesHeight = 750;

    const TimeAndSalesRow = ({ index, style }) => {
        const item = time_and_sales[index];
        if (!item) return null;

        return (
            <div className="time-sales-row" style={style}>
                <div className={`time-sales-cell ${item.side === 'S' ? 'text-success' : 'text-danger'}`}>{item.symbol}</div>
                <div className={`time-sales-cell ${item.side === 'S' ? 'text-success' : 'text-danger'}`}>{item.exchange}</div>
                <div className={`time-sales-cell ${item.side === 'S' ? 'text-success' : 'text-danger'}`}>{item.ltp}</div>
                <div className={`time-sales-cell ${item.side === 'S' ? 'text-success' : 'text-danger'}`}>{item.qty}</div>
                <div className={`time-sales-cell ${item.side === 'S' ? 'text-success' : 'text-danger'}`}>{item.time}</div>
            </div>
        );
    };

    return (
        <div className="container-fluid">
            <h2 className="title">Dashboard</h2>
            <div className="row">

                <div className="col-md-9" style={{ maxHeight: '800px', overflowY: 'hidden' }}>
                    <h6 className="title">Market watch</h6>
                    {/* Replaced table with divs for header */}
                    <div className="market-watch-header-container">
                        <div className="market-watch-header-row">
                            <div className="market-watch-header-cell">Symbol</div>
                            <div className="market-watch-header-cell">Name</div>
                            <div className="market-watch-header-cell">Price</div>
                            <div className="market-watch-header-cell">Change</div>
                            <div className="market-watch-header-cell">Change %</div>
                            <div className="market-watch-header-cell bg-success">bid</div>
                            <div className="market-watch-header-cell bg-success">bidq</div>
                            <div className="market-watch-header-cell bg-danger">ask</div>
                            <div className="market-watch-header-cell bg-danger">askq</div>
                            <div className="market-watch-header-cell">vol</div>
                            <div className="market-watch-header-cell">TK</div>
                            <div className="market-watch-header-cell">Last Q</div>
                            <div className="market-watch-header-cell">CP</div>
                        </div>
                    </div>
                    {/* FixedSizeList now directly renders into a div structure */}
                    <FixedSizeList
                        height={marketWatchHeight}
                        itemCount={filteredSymbols.length}
                        itemSize={itemHeight}
                        width="100%"
                        className="market-watch-list" // Add a class for styling the scrollable area
                    >
                        {MarketWatchRow}
                    </FixedSizeList>
                </div>

                <div className="col-md-3" style={{ maxHeight: '800px', overflowY: 'hidden' }}>
                    <h6 className="title">Time and Sales Ticker</h6>
                    <div className="time-sales-header-container">
                        <div className="time-sales-header-row">
                            <div className="time-sales-header-cell">Symbol</div>
                            <div className="time-sales-header-cell">XC</div>
                            <div className="time-sales-header-cell">Price</div>
                            <div className="time-sales-header-cell">Volume</div>
                            <div className="time-sales-header-cell">Time</div>
                        </div>
                    </div>
                    <FixedSizeList
                        height={timeSalesHeight}
                        itemCount={time_and_sales.length}
                        itemSize={timeSalesItemHeight}
                        width="100%"
                        className="time-sales-list"
                    >
                        {TimeAndSalesRow}
                    </FixedSizeList>
                </div>
            </div>

            <div className="row">
                <h6 className="title">Top Stock</h6>
                <div className="col-md-4">
                    <h6>Top Gainer</h6>
                    <TopStock type={'gainer'} rowCount={10} />
                </div>
                <div className="col-md-4">
                    <h6>Top Looser</h6>
                    <TopStock type={'loser'} rowCount={10} />
                </div>
                <div className="col-md-4">
                    <h6>Top Traded</h6>
                    <TopStock type={'traded'} rowCount={10} />
                </div>
            </div>

            <div className="row">
                <h6 className="title">Others</h6>
                <div className="col-md-6">
                    <Portfolio clientCode={clientCode} />
                </div>

            </div>
        </div>
    );
}