import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotlightNewDemo } from "./components/aceternity/Spotlight/spotlight-new-component.tsx";
import { SignupForm } from "./components/component_page/signup-component.tsx";
import { LoginForm } from "./components/component_page/login-component.tsx";
import About from "./components/component_page/About.tsx";
import Contact from "./components/component_page/Contact.tsx";
import { NavbarDemo } from "./components/aceternity/Navbar/resizable-navbar-component.tsx";
import AllBooks from "./components/component_page/AllBooks.tsx";
import Footer from "./components/component_page/Footer.tsx";

function App() {
  return (
    <Router>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<SpotlightNewDemo />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allBooks" element={<AllBooks />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
