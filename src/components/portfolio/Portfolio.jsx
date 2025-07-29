import { useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from 'react';
import adminServer from "../../utilities/server/adminServer";
import errorHandler from "../../utilities/errorHandler";

export default function Portfolio({ clientCode }) {
    const symbols = useSelector((state) => state.symbols.symbols);
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        getPortfolio(clientCode);
    }, [clientCode]);

    function getPortfolio(clientCode) {
        if (!clientCode) {
            console.error("Client code is required to fetch portfolio data.");
            return;
        }
        adminServer.get(`/portfolio/${clientCode}`)
            .then((response) => {
                const portfolioData = response.data.data || [];
                setPortfolio(portfolioData);
            })
            .catch((error) => {
                console.error("Error fetching portfolio data:", error);
                errorHandler(error);
            });
    }

    // Derived portfolio with computed values
    const calculatedPortfolio = useMemo(() => {
        return portfolio.map((item) => {
            const key = `${item.symbol}.${item.board}`;
            const ltp = symbols[key]?.ltp ?? 0;
            const mktValue = ltp * item.total_qty;
            const gain = mktValue - item.total_cost;
            const gainPercent = item.total_cost > 0 ? (gain / item.total_cost) * 100 : 0;

            return {
                ...item,
                ltp,
                mktValue,
                gain,
                gainPercent,
            };
        });
    }, [portfolio, symbols]);

    // Calculate totals
    const { totalGain, total_cost } = useMemo(() => {
        return calculatedPortfolio.reduce(
            (acc, item) => {
                acc.totalGain += item.gain;
                acc.total_cost += item.total_cost;
                return acc;
            },
            { totalGain: 0, total_cost: 0 }
        );
    }, [calculatedPortfolio]);

    const totalGainPercent = total_cost > 0 ? (totalGain / total_cost) * 100 : 0;

    return (
        <div className="portfolio">
            <h6>Portfolio {clientCode}</h6>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>SYMBOL</th>
                        <th>Total Qty</th>
                        <th>Sellable</th>
                        <th>Avg Cost</th>
                        <th>Total Cost</th>
                        <th>Mkt Price</th>
                        <th>Mkt Value</th>
                        <th>Gain</th>
                        <th>Gain %</th>
                    </tr>
                </thead>
                <tbody>
                    {calculatedPortfolio.map((item, index) => (
                        <tr key={index + 'portfolio'}>
                            <td>{item.symbol}{item.board}</td>
                            <td>{item.total_qty}</td>
                            <td>{item.saleable_qty}</td>
                            <td>{Number(item.avg_cost)?.toFixed(2) || '0.00'}</td>
                            <td>{Number(item.total_cost)?.toFixed(2) || '0.00'}</td>
                            <td>{Number(item.ltp)?.toFixed(1) || '0.0'}</td>
                            <td>{Number(item.mktValue)?.toFixed(2) || '0.00'}</td>
                            <td className={item.gain >= 0 ? 'text-success' : 'text-danger'}>
                                {Number(item.gain)?.toFixed(2) || '0.00'}
                            </td>
                            <td className={item.gainPercent >= 0 ? 'text-success' : 'text-danger'}>
                                {Number(item.gainPercent)?.toFixed(2) || '0.00'}%
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="fw-bold">
                        <td colSpan="6">Total</td>
                        <td></td>
                        <td className={totalGain >= 0 ? 'text-success' : 'text-danger'}>
                            {Number(totalGain)?.toFixed(2) || '0.00'}
                        </td>
                        <td className={totalGainPercent >= 0 ? 'text-success' : 'text-danger'}>
                            {Number(totalGainPercent)?.toFixed(2) || '0.00'}%
                        </td>
                    </tr>
                </tfoot>

            </table>
        </div>
    );
}
