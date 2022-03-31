import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Watch from './pages/watch/Watch';

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
          exact
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Home type="movie" />} />
        <Route path="/series" element={<Home type="serie" />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
