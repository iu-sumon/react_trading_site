import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUsers,
  faAddressBook,
  faReceipt,
  faUser,
  faCalendar,
  faQuestionCircle,
  faChartBar,
  faChartPie,
  faChartLine,
  faMap
} from "@fortawesome/free-solid-svg-icons";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#ffffff", // Adjust color as needed
      }}
      onClick={() => setSelected(title)}
      icon={<FontAwesomeIcon icon={icon} />}
    >
      <span>{title}</span>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarPro = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");


  return (
    <div
      style={{
        backgroundColor: "rgb(245, 245, 245)", // Adjust background color as needed
        height: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <FontAwesomeIcon icon={faBars} /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#ffffff",
            }}
          >
            {!isCollapsed && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <span style={{ fontSize: "1.5rem", color: "#ffffff" }}>UFTFAST</span>
                <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ background: 'none', border: 'none', color: '#ffffff' }}>
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            )}
          </MenuItem>

          <div style={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
            <Item
              title="Dashboard"
              to="/"
              icon={faHome}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <span style={{ fontSize: "1rem", color: "#aaaaaa", margin: "15px 0 5px 20px" }}>Data</span> */}
            <Item
              title="Trade"
              to="/trade"
              icon={faUsers}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Watchlist"
              to="/watchlist  "
              icon={faAddressBook}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={faReceipt}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <span style={{ fontSize: "1rem", color: "#aaaaaa", margin: "15px 0 5px 20px" }}>Pages</span> */}
            <Item
              title="Profile Form"
              to="/form"
              icon={faUser}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={faCalendar}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={faQuestionCircle}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <span style={{ fontSize: "1rem", color: "#aaaaaa", margin: "15px 0 5px 20px" }}>Charts</span> */}
            <Item
              title="Bar Chart"
              to="/bar"
              icon={faChartBar}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={faChartPie}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={faChartLine}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={faMap}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default SidebarPro;
