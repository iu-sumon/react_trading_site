

export default function Dashboard() {
    return (
        <div className="container">
            <h2 className="title">Dashboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Symbol</th>
                        <th className="th">Name</th>
                        <th className="th">Price</th>
                        <th className="th">Change</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map((item, index) => (
                        <tr key={index} className="tr">
                            <td className="td">{item.symbol}</td>
                            <td className="td">{item.name}</td>
                            <td className="td">{item.price}</td>
                            <td className="td">{item.change}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
}