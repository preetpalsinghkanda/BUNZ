import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import gsap from "gsap";
import Lenis from "lenis"

const lenis = new Lenis({
  smoothWheel : true,
  
})

gsap.ticker.add((time)=>{
  lenis.raf(time*1000)
})


gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
