import React from 'react';
import './Watchlist.css';

const Watchlist = () => {
  const data = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150, change: '+1.5' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800, change: '-12' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3400, change: '+15' },
    // Add more data as needed
  ];

  return (
    <div className="container">
      <h2 className="title">Watchlist</h2>
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
          {data.map((item, index) => (
            <tr key={index} className="tr">
              <td className="td">{item.symbol}</td>
              <td className="td">{item.name}</td>
              <td className="td">{item.price}</td>
              <td className="td">{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
