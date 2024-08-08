/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect } from 'react'
import '../App.css'


const Navbar = () => {

  useEffect(() => {

    
    const nav = document.querySelector('.navbar')
    const menu = document.querySelector('.menu')
    
 
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

const openNav = (e) => {
  e.target.classList.toggle('open')
  console.log(e.target.classList)
}

  return (
    <nav className="fixed w-screen px-10 navbar">
    <div className='flex w-full justify-between h-28 items-center'>
      <div className=" font-semibold drop-shadow-[0_35px_35px_rgba(255,255,255,0.25)] text-shadow">
        <p className="">SALMAN-FIKRI</p>
        <p>PORTOFOLIOO</p>
      </div>
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 justify-between cursor-pointer text-shadow" >
        <p className='relative overflow-hidden'><a data-scroll-to href="#aboutme" className="hover-pointer">About me</a></p>
        <p className='relative overflow-hidden'><a data-scroll-to href="#project" className="hover-pointer" >Project</a></p>
        <p className='relative overflow-hidden'><a data-scroll-to href="#contact" className="hover-pointer" >Contact</a></p>
      </div>
      <div className="hidden md:flex gap-5 cursor-pointer text-lg text-shadow">
        <a href="" className='relative overflow-hidden'><p className='hover-pointer'><i className="fa-brands fa-instagram"></i></p></a>
        <a href="" className='relative overflow-hidden'><p className='hover-pointer '><i className="fa-brands fa-linkedin"></i></p></a>
        <a href="" className='relative overflow-hidden'><p className='hover-pointer'><i className="fa-brands fa-github-alt"></i></p></a>
      </div>
      <div>
        <div className='flex flex-col gap-1 open'>
          <div className='relative  h-[2px] bg-black rounded-full h-list'></div>
          <div className='relative  h-[2px] bg-black rounded-full h-list'></div>
        </div>
      </div>
      <div className=' bg-[#f5f5dc3c] h-screen fixed -right-[70vw] top-0 px-16 w-[70vw] py-24 flex flex-col gap-10'>
        <div>
          
        </div>
          <div className=" flex-col gap-10 flex md:w-1/3 lg:w-1/4 justify-between cursor-pointer text-shadow" >
            <p className='relative overflow-hidden'><a data-scroll-to href="#aboutme" className="hover-pointer">About me</a></p>
            <p className='relative overflow-hidden'><a data-scroll-to href="#project" className="hover-pointer" >Project</a></p>
            <p className='relative overflow-hidden'><a data-scroll-to href="#contact" className="hover-pointer" >Contact</a></p>
          </div> 
          <div className=" flex gap-5  cursor-pointer text-lg text-shadow">
            <a href="" className='relative overflow-hidden '><p className='hover-pointer'><i className="fa-brands fa-instagram"></i></p></a>
            <a href="" className='relative overflow-hidden'><p className='hover-pointer '><i className="fa-brands fa-linkedin"></i></p></a>
            <a href="" className='relative overflow-hidden'><p className='hover-pointer'><i className="fa-brands fa-github-alt"></i></p></a>
          </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
