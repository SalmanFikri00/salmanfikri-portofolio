/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import useScrollToTop from './useScrollToTop';


const App = () => {
  // useScrollToTop()

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
