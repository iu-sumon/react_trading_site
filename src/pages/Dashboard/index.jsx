import axios from "axios";
import { useEffect, useState } from "react"; // useState is still useful if you need local component state for other things
import adminServer from "../../utilities/server/adminServer";
import { GET_WATCHLIST } from "../../utilities/apiRequest/watchlist";
import { useSelector } from "react-redux";


export default function Dashboard() {
    const symbols = useSelector((state) => state.symbols.symbols); // Access the 'symbols' object directly
    // const [count , setCount] = useState(0); // REMOVE this state if its only purpose was the flawed limiting logic

    useEffect(() => {
        // Your initial data fetching or socket setup logic should go here,
        // often dispatched via Redux thunks.
        // E.g., dispatch(fetchInitialSymbols());
    }, []); // Empty dependency array means this runs once on mount.
            // If symbols data changes, it's handled by useSelector, not this useEffect.

    // Removed the problematic renderSymbolData function

    return (
        <div className="container" >
            <div className="row" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <div className="col-md-12">
                    <h2 className="title">Dashboard</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Change %</th>
                                <th>bid </th>
                                <th>ask </th>
                                <th>bidq </th>
                                <th>askq</th>
                                <th>vol</th>
                                <th>TK</th>
                                <th>Last Q</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(symbols)
                                // 1. Filter items based on the '.PUBLIC' string in the symbol
                                .filter(item =>
                                    item.symbol && typeof item.symbol === 'string' &&
                                    item.symbol.includes('PUBLIC')
                                )
                                // 2. Limit the number of items after filtering
                                .slice(0, 50) // Take the first 50 filtered items
                                // 3. Map over the (filtered and limited) items to render
                                .map(item => (
                                    <tr key={item.symbol}> {/* Always use a stable unique key */}
                                        <td>{item.symbol}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.ltp}</td>
                                        <td>{item.change}</td>
                                        <td>{item.change_per}</td>
                                        <td>{item.bid}</td>
                                        <td>{item.ask}</td>
                                        <td>{item.bidqty}</td>
                                        <td>{item.askqty}</td>
                                        <td>{item.volume}</td>
                                        <td>{item.value}</td>
                                        <td>{item.last_vol}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}