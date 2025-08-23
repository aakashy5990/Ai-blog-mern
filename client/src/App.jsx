import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Homes"
import Blog from './pages/Blog'

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/blog' element={<Blog/>}></Route>
        </Routes>
    </>
  )
}

export default App