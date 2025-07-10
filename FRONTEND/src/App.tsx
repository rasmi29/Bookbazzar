import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotlightNewDemo } from "./components/aceternity/Spotlight/spotlight-new-component.tsx";
import SignupForm from "./components/component_page/signup-component.tsx";
import { LoginForm } from "./components/component_page/login-component.tsx";
import About from "./components/component_page/About.tsx";
import Contact from "./components/component_page/Contact.tsx";
import { NavbarDemo } from "./components/component_page/Navbar.tsx";
import AllBooks from "./components/component_page/AllBooks.tsx";
import Footer from "./components/component_page/Footer.tsx";
import Thankyou from "./components/component_page/Thankyou.tsx";
import Profile from "./components/component_page/Profile.tsx";
import Verify from "./components/component_page/Verify.tsx";
import BookDetails from "./components/component_page/BookDetails.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<SpotlightNewDemo />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
