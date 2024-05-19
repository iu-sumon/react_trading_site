import React, { useState, useContext } from 'react';
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

  const [showDropdown, setShowDropdown] = useState(false);
  const [config, setConfig] = useState({
    content: [{
      type: 'row',
      content: []
    }]
  });

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
