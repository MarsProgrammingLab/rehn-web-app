import { Routes, Route, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { About } from './pages/About';
import { Shows } from './pages/Shows';
import { NotFound } from './pages/NotFound';

function Layout() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet/>
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="booking" element={<Booking/>}/>
        <Route path="shows" element={<Shows/>}/>
        <Route path="not-found" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
