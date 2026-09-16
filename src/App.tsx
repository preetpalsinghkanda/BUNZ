import React from 'react'
import NavBar from './components/NavBar';
import Cursor from './components/Cursor'

const App = () => {
  return (
    <div className="main">
      <Cursor/>
      <NavBar/>
    </div>
  )
}

export default App