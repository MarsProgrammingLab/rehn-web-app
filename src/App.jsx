import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Shows from './pages/Shows';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';


export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="booking" element={<Booking/>}/>
        <Route path="shows" element={<Shows/>}/>
        <Route path="notfound" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
