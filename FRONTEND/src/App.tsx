import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotlightNewDemo } from "./components/aceternity/Spotlight/spotlight-new-component.tsx";
import { SignupFormDemo } from "./components/aceternity/SignUp/signup-component.tsx";
import { LoginFormDemo } from "./components/aceternity/SignUp/login-component.tsx";
import About from "./components/component_page/About.tsx";
import Contact from "./components/component_page/Contact.tsx";
import { NavbarDemo } from "./components/aceternity/Navbar/resizable-navbar-component.tsx";

function App() {
  return (
          
    
    <Router>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<SpotlightNewDemo />} />
        <Route path="/signup" element={<SignupFormDemo />} />
        <Route path="/login" element={<LoginFormDemo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
