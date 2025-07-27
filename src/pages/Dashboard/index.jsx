import { useSelector } from "react-redux";


export default function Dashboard() {
    const symbols = useSelector((state) => state.symbols.symbols);
    const time_and_sales = useSelector((state) => state.timesales.time_and_sales); 

    return (
        <div className="container-fluid" >
             <h2 className="title">Dashboard</h2>
            <div className="row" >
               
                <div className="col-md-9" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    <h6 className="title">Market watch</h6>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Change %</th>
                                <th className="bg-success">bid </th>
                                <th className="bg-success">bidq </th>
                                <th className="bg-danger">ask </th>
                                <th className="bg-danger">askq</th>
                                <th>vol</th>
                                <th>TK</th>
                                <th>Last Q</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(symbols)
                                .filter(item =>
                                    item.symbol && typeof item.symbol === 'string' &&
                                    item.symbol.includes('PUBLIC')
                                )
                                .map(item => (
                                    <tr key={item.symbol}> {/* Always use a stable unique key */}
                                        <td>{item.symbol}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.ltp}</td>
                                        <td><span className={item.change_per >= 0 ? 'text-success' : 'text-danger'}>{item.change}</span></td>
                                        <td><span className={item.change_per >= 0 ? 'text-success' : 'text-danger'}>
                                            {item.change_per}</span></td>
                                        <td className="bg-success">{item.bid}</td>
                                        <td className="bg-success">{item.bidqty}</td>
                                        <td className="bg-danger">{item.ask}</td>
                                       
                                        <td className="bg-danger">{item.askqty}</td>
                                        <td>{item.volume}</td>
                                        <td>{item.value}</td>
                                        <td>{item.last_vol}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-3" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                    <h6 className="title">Time and Sales Ticker</h6>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                              
                                <th>Symbol</th>
                                <th>XC</th>
                                <th>Price</th>
                                <th>Volume</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                      {time_and_sales.map((item, index) => (
                        <tr key={index + 'time-and-sales'} >
                            <td className={item.side === 'S' ? 'text-success' : 'text-danger'} >{item.symbol}</td>
                            <td className={item.side === 'S' ? 'text-success' : 'text-danger'} >{item.exchange}</td>
                            <td className={item.side === 'S' ? 'text-success' : 'text-danger'} >{item.ltp}</td>
                            <td className={item.side === 'S' ? 'text-success' : 'text-danger'} >{item.qty}</td>
                            <td className={item.side === 'S' ? 'text-success' : 'text-danger'} >{item.time}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}