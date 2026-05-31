import About from "./components/About"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default App