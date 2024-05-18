import { useState } from 'react';
import './App.css';
import Sidebar from './pages/global/SidebarPro';
import Topbar from './pages/global/Topbar';
import Watchlist from './pages/Watchlist/Watchlist';
// import Login from './pages/login/Login';

function App() {
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}></Topbar>
            <Watchlist></Watchlist>
            {/* <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes> */}
          </main>
        </div>
  );
}

export default App;
