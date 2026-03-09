import { useState } from 'react'
import './App.css'
import Intro from './component/intro'
import Hero from './component/Hero'
import Profile from './component/Profile'
import Index from './component/Index'
import Closing from './component/Closing'

function App() {
  return (
    <>
      {/* 글로벌 노이즈 오버레이 */}
      <div className="noise-overlay"></div>
      <Intro />
      <div className="mian">
        <Hero />
        <Profile/>
        <Index/>
        <Closing/>
      </div>
    </>
  )
}

export default App