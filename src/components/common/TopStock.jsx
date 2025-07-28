import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { FixedSizeList } from "react-window";

export default function TopStock({ type , rowCount = 20 }) {
    const symbols = useSelector((state) => state.symbols.symbols);
    const [TopGainer , setTopGainer] = useState([]);

    useEffect(() => {
        getTopGainers(type , rowCount);
    }, [symbols]);

    function getTopGainers(rankType, rowCount) {
            const symbolArray = Object.values(symbols).filter(item =>
            item.symbol && typeof item.symbol === 'string' && item.symbol.includes('PUBLIC')
        );

        let sorted = [];
        switch (rankType) {
            case 'gainer':
                sorted = symbolArray.sort((a, b) => b.change_per - a.change_per);
                break;
            case 'loser':
                sorted = symbolArray.sort((a, b) => a.change_per - b.change_per);
                break;
            case 'traded':
                // Assuming 'volume' is the key for top traded. You could use 'value' if preferred.
                sorted = symbolArray.sort((a, b) => b.volume - a.volume);
                break;
            case 'value':
                // Assuming 'volume' is the key for top traded. You could use 'value' if preferred.
                sorted = symbolArray.sort((a, b) => b.value - a.value);
                break;
        }
        setTopGainer(sorted.slice(0, rowCount));
        // setTopGainer(topGainers);
    }


    return (
        <div className="top-gainer">
           <table className="table table-striped table-bordered">
              <thead>
                <tr>
                    <th>SYMBOL</th>
                    <th>LTP</th>
                    <th>Ch</th>
                    <th>CHP</th>
                    <th>Vol</th>
                </tr>
              </thead>
              <tbody>
                {TopGainer.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>
                            {item.ltp}
                        </td>
                        <td className={item.change >= 0 ? 'text-success' : 'text-danger'}>
                            {item.change}
                        </td>
                        <td className={item.change_per >= 0 ? 'text-success' : 'text-danger'}>
                            {item.change_per}
                        </td>
                        <td>
                            {item.volume}
                        </td>
                    </tr>
                ))}
              </tbody>
           </table>
        </div>
    );
}