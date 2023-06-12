import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Detail from './pages/detail';
function App() {

  return (
    <div className="App">
      {/* <h1>hello world</h1> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
