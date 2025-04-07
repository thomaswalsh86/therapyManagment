import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Client from "./pages/client";
import Session from "./pages/session";
import Therapist from "./pages/therapist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="client" element={<Client />} />
        <Route path="session" element={<Session />} />
        <Route path="therapist" element={<Therapist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;