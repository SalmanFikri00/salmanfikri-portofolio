/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import '../App.css'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {




    const nav = document.querySelector('.navbar')
    // const menu = document.querySelector('.menu') // This line is no longer needed
 
  window.addEventListener('scroll' , () => {
    // console.log(window.visualViewport.height)
    if(window.visualViewport.height - 50 < scrollY){
      nav.classList.add('text-black')
      nav.classList.add('black')

    }else{
      nav.classList.remove('text-black')
      nav.classList.remove('black')
    }
  })
}, [])

const openNav = () => {
  setIsOpen(!isOpen);
}

const closeNav = () => {
  setIsOpen(false);
}



  return (
    <nav className=" z-50 fixed top-0 left-0 right-0 px-4 py-6 navbar bg-white shadow-sm ">
    <div className='flex w-full justify-between items-center max-w-7xl mx-auto'>
      <div className="font-bold text-lg text-black">
        <p className="">salmanfikri.</p>
      </div>
      <div className="flex items-center space-x-4" >
        <a href="#contact" className="flex items-center px-4 py-2 text-black border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200">
          Let&apos;s Talk <span className="ml-2">→</span>
        </a>
        <div className={`md:hidden flex flex-col items-center justify-center w-10 h-10 transition-colors duration-200`} onClick={openNav} >
          <div className='flex flex-col gap-1 w-5 '>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
          </div>
        </div>
        <div className={`hidden md:flex flex-col items-center justify-center w-10 h-10 transition-colors duration-200`} onClick={openNav} >
          <div className='flex flex-col gap-1 w-5 '>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`relative h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
          </div>
        </div>


      </div>
      <div className={`h-screen responsive-navbar fixed max-w-80 top-0 right-0 w-[70vw] py-24 px-10 bg-white flex flex-col gap-10 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-[999]`}>
            <div className="absolute top-6 right-6 text-black" onClick={closeNav}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
      
            <div className=" flex-col gap-10 flex md:w-1/3 lg:w-1/4 justify-between cursor-none text-shadow text-black" >
              <p className='relative overflow-hidden'><a href="#aboutme" className="hover-pointer" onClick={() => setIsOpen(false)}>About me</a></p>
              <p className='relative overflow-hidden'><a href="#project" className="hover-pointer" onClick={() => setIsOpen(false)}>Project</a></p>
              <p className='relative overflow-hidden'><a href="#contact" className="hover-pointer" onClick={() => setIsOpen(false)}>Contact</a></p>
            </div> 
            <div className=" flex gap-5  cursor-none text-lg text-shadow text-black">
              <a href="https://www.instagram.com/msf.dev_0078/" className='relative overflow-hidden '><p className='hover-pointer'><i className="fa-brands fa-instagram"></i></p></a>
              <a href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/" className='relative overflow-hidden'><p className='hover-pointer '><i className="fa-brands fa-linkedin"></i></p></a>
              <a href="https://github.com/SalmanFikri00" className='relative overflow-hidden'><p className='hover-pointer'><i className="fa-brands fa-github-alt"></i></p></a>
            </div>
        </div>
    </div>
  </nav>
  )
}

export default Navbar
