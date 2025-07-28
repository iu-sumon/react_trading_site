import React, { useState, useContext , useEffect } from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoldenLayoutComponent from '../../components/GoldenLayoutComponent';
import {
  faSun,
  faMoon,
  faBell,
  faCog,
  faUser,
  faSearch,
  faTh
} from '@fortawesome/free-solid-svg-icons';
import { ColorModeContext } from '../../theme';

const Topbar = () => {
  const colorMode = useContext(ColorModeContext);
  const indexes = useSelector((state) => state.indexes.indexes);
  const cse_indexes = useSelector((state) => state.indexes.cse_indexes);
  const dseMktHealth = useSelector((state) => state.mktHealth.dse_mkt_health);
  const cseMktHealth = useSelector((state) => state.mktHealth.cse_mkt_health);
  const [currentIndex, setCurrentIndex] = useState('DSEX'); // Default index
  const [currentCseIndex, setCurrentCseIndex] = useState('CSCX'); // Default index

  const [showDropdown, setShowDropdown] = useState(false);
  const [config, setConfig] = useState({
    content: [{
      type: 'row',
      content: []
    }]
  });

  // useEffect(() => {

  // }, []);

  const addPage = (page) => {
    const newConfig = { ...config };
    newConfig.content[0].content.push({
      type: 'react-component',
      component: page,
      title: page
    });
    setConfig(newConfig);
  };

//   const handleToggleColorMode = () => {
//     colorMode.toggleColorMode();
//   };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

 
  return (
    <div style={styles.topbar}>
      {/* SEARCH BAR */}
      <div style={styles.searchBar}>
        <input style={styles.input} placeholder="Search" />
        <button type="button" style={styles.iconButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>


      <div className="p-0 top-total-section">
         <div > 
          <div className="d-flex justify-content-between align-items-center mb-1">
             <span className="total_trade_title">DSE Total Trade : </span> <span className="total_trade_val"
              id="market_trade_dse"> { dseMktHealth ? dseMktHealth.total_trade : '' }</span> 
              </div>
               <div className="d-flex justify-content-between align-items-center mb-1"> 
                <span className="total_volume_title">Total Volume : </span> <span className="total_volume_val" id="market_volume_dse"> { dseMktHealth ? dseMktHealth.total_volume : '' }</span> 
                </div> 
                <div className="d-flex justify-content-between align-items-center top-turnover-section-dse"> 
                  <div  title="All Board(Public, SME and ATB)" > 
                    <span className="total_turnover_title">Turnover : </span> <span><i className="fa fa-info turnover_info_btn" aria-hidden="true"></i></span>
                     </div> <span className="total_turnover_val" id="market_turnover_dse"> { dseMktHealth ? dseMktHealth.total_turnover : '' }</span> </div> </div> <div >
          </div>
      </div>

      {/* index select option  */}
      <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
        <div>
      <select
        className='form-control'
        value={currentIndex}
        onChange={(e) => setCurrentIndex(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px' }}
      >
        {Object.keys(indexes).map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
        </div>





    <div id="globalidx_dse" className="globalidx_container" style={{ marginLeft: '10px', padding: '5px' }}>
          <span 

            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-info turnover_info_btn" aria-hidden="true"></i>
          </span>
          
          <span 
            style={{
              background: 'rgb(139, 11, 8)',
              borderRadius: '5px',
              color: 'white',
              padding : '5px 10px',
            }} 
            className={indexes[currentIndex] && indexes[currentIndex].index_change > 0 ?  'bg-success' : 'bg-danger'  }
          >
            {indexes[currentIndex] ? parseFloat(indexes[currentIndex].index_value).toFixed(2) : 'N/A'}
          </span>
          
          <br />
          
          <span className="globalidx-lower-section">
            <span className={indexes[currentIndex] && indexes[currentIndex].index_change > 0 ?  'text-success' : 'text-danger'  }>{indexes[currentIndex] ? parseFloat(indexes[currentIndex].index_change).toFixed(2) : 'N/A'}</span>
             &nbsp;
            <span className={indexes[currentIndex] && indexes[currentIndex].index_change > 0 ?  'text-success' : 'text-danger'  }>({indexes[currentIndex] ? parseFloat(indexes[currentIndex].index_changeper).toFixed(2) : 'N/A'})</span>
          </span>
        </div>
      </div>

      
      <div className="p-0 top-total-section">
         <div > 
          <div className="d-flex justify-content-between align-items-center mb-1">
             <span className="total_trade_title">CSE Total Trade : </span> <span className="total_trade_val"
              id="market_trade_dse"> { cseMktHealth ? cseMktHealth.total_trade : '' }</span> 
              </div>
               <div className="d-flex justify-content-between align-items-center mb-1"> 
                <span className="total_volume_title">Total Volume : </span> <span className="total_volume_val" id="market_volume_cse"> { cseMktHealth ? cseMktHealth.total_volume : '' }</span> 
                </div> 
                <div className="d-flex justify-content-between align-items-center top-turnover-section-cse"> 
                  <div  title="All Board(Public, SME and ATB)" > 
                    <span className="total_turnover_title">Turnover : </span> <span><i className="fa fa-info turnover_info_btn" aria-hidden="true"></i></span>
                     </div> <span className="total_turnover_val" id="market_turnover_cse"> { cseMktHealth ? cseMktHealth.total_turnover : '' }</span> </div> </div> <div >
          </div>
      </div>

      <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
        <div>
      <select
        className='form-control'
        value={currentCseIndex}
        onChange={(e) => setCurrentCseIndex(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px' }}
      >
        {Object.keys(cse_indexes).map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
        </div>


    <div id="globalidx_dse" className="globalidx_container" style={{ marginLeft: '10px', padding: '5px' }}>
          <span 

            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-info turnover_info_btn" aria-hidden="true"></i>
          </span>
          
          <span 
            style={{
              background: 'rgb(139, 11, 8)',
              borderRadius: '5px',
              color: 'white',
              padding : '5px 10px',
            }} 
            className={cse_indexes[currentCseIndex] && cse_indexes[currentCseIndex].index_change > 0 ?  'bg-success' : 'bg-danger'  }
          >
            {cse_indexes[currentCseIndex] ? parseFloat(cse_indexes[currentCseIndex].index_value).toFixed(2) : 'N/A'}
          </span>
          
          <br />
          
          <span className="globalidx-lower-section">
            <span className={cse_indexes[currentCseIndex] && cse_indexes[currentCseIndex].index_change > 0 ?  'text-success' : 'text-danger'  }>{cse_indexes[currentCseIndex] ? parseFloat(cse_indexes[currentCseIndex].index_change).toFixed(2) : 'N/A'}</span>
             &nbsp;
            <span className={cse_indexes[currentCseIndex] && cse_indexes[currentCseIndex].index_change > 0 ?  'text-success' : 'text-danger'  }>({cse_indexes[currentCseIndex] ? parseFloat(cse_indexes[currentCseIndex].index_changeper).toFixed(2) : 'N/A'})</span>
          </span>
        </div>
      </div>

    {/* index select option  */}

      {/* ICONS */}
      <div style={styles.icons}>
        <button onClick={toggleDropdown} style={styles.iconButton}>
          <FontAwesomeIcon icon={faTh} />
        </button>
        {showDropdown && (
          <ul style={styles.dropdown}>
            <li style={styles.dropdownItem} onClick={() => addPage('watchlist')}>
              Watchlist
            </li>
          </ul>
        )}
        {/* Other icons */}
      </div>

      {/* <GoldenLayoutComponent config={config} /> */}
    </div>
  );
};

const styles = {
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f5f5f5', // Adjust according to light/dark mode
  },
  searchBar: {
    display: 'flex',
    backgroundColor: '#e0e0e0', // Adjust according to light/dark mode
    borderRadius: '3px',
  },
  input: {
    marginLeft: '8px',
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '8px',
  },
  iconButton: {
    padding: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  icons: {
    display: 'flex',
    position: 'relative', // For positioning the dropdown
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '0px 0px 0px 0px',
    zIndex: 1,
    minWidth: '150px', // Adjust width as needed
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for dropdown
    listStyleType: 'none', // Remove bullet points
  },
  dropdownItem: {
    padding: '8px 12px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  dropdownItemHover: {
    backgroundColor: '#f0f0f0',
  },
};

export default Topbar;
