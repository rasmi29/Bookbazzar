import "./App.css";
import { ThreeDCardDemo } from "./components/aceternity/3Dcard/3d-card-component.tsx";
import { AnimatedTestimonialsDemo } from "./components/aceternity/Animated testimonials/animated-testimonials-component.tsx";

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold">Book Bazaar</h1>
      <ThreeDCardDemo />
      <AnimatedTestimonialsDemo />
    </>
  );
}

export default App;
