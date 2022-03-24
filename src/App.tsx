import './App.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './AppLayout';
import Home from './Home';
import AddEditInventory from './Home/AddEditInventory/AddEditInventory';

function App() {
  return (
    <div className="App">
      <Helmet defaultTitle="Vityl" title="Vityl">
        <link rel="preconnect" href={process.env.REACT_APP_API_URL} />
        {/* TODO: */}
        {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
        <meta name="description" content="Vityl" />
        <meta name="application-name" content="Vityl" />
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
