import './App.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './AppLayout';
import Home from './Home';
import AddEditInventory from './Home/AddEditInventory/AddEditInventory';

function App() {
  return (
    <div className="App">
      <Helmet defaultTitle="ThinkBridge" title="ThinkBridge">
        <link rel="preconnect" href={process.env.REACT_APP_API_URL} />
        {/* TODO: */}
        {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
        <meta name="description" content="ThinkBridge" />
        <meta name="application-name" content="ThinkBridge" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/add" element={<AddEditInventory />} />
            <Route path="/edit/:id" element={<AddEditInventory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
