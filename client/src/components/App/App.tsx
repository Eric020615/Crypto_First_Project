import Footer from "../../common/Footer"
import Navbar from "../../common/Navbar"
import Services from "../Services"
import Transactions from "../Transactions"
import Welcome from "../Welcome"

import './styles.css'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  )
}

export default App
