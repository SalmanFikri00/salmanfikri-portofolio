import { useEffect, useState, useRef } from 'react'
import '../App.css'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

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
  if (isAnimating) return;
  setIsAnimating(true);
  setIsOpen(!isOpen);
  setTimeout(() => setIsAnimating(false), 300);
}

const closeNav = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  setIsOpen(false);
  setTimeout(() => setIsAnimating(false), 300);
}

// Close sidebar when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeNav();
    }
  };

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);



  return (
    <nav className=" z-50 fixed top-0 left-0 right-0 px-4 py-6 navbar bg-white shadow-sm ">
    <div className='flex w-full justify-between items-center max-w-7xl mx-auto'>
      <div className="font-bold text-lg text-black">
        <a href="#hero" className="hover:opacity-80 transition">salmanfikri.</a>
      </div>
      <div className="flex items-center space-x-4" >
        <a href="#contact" className="flex items-center px-4 py-2 text-black border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200">
          Let&apos;s Talk <span className="ml-2">→</span>
        </a>
        <button 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 group ${isAnimating ? 'pointer-events-none' : ''}`} 
          onClick={openNav}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className='flex flex-col gap-1 w-6'>
            <div className={`h-[2px] bg-black rounded-full transition-all duration-300 ease-out transform origin-center group-hover:bg-gray-600 ${
              isOpen 
                ? 'rotate-45 translate-y-[6px] scale-110' 
                : 'group-hover:scale-110'
            }`}></div>
            <div className={`h-[2px] bg-black rounded-full transition-all duration-300 ease-out group-hover:bg-gray-600 ${
              isOpen 
                ? 'opacity-0 scale-0' 
                : 'group-hover:scale-110'
            }`}></div>
            <div className={`h-[2px] bg-black rounded-full transition-all duration-300 ease-out transform origin-center group-hover:bg-gray-600 ${
              isOpen 
                ? '-rotate-45 -translate-y-[6px] scale-110' 
                : 'group-hover:scale-110'
            }`}></div>
          </div>
        </button>


      </div>
      {/* Backdrop Blur Overlay */}
      <div 
        ref={backdropRef}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out z-[998] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeNav}
      />
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`h-screen responsive-navbar fixed max-w-80 top-0 right-0 w-[70vw] py-24 px-10 bg-white/95 backdrop-blur-md border-l border-gray-200 flex flex-col gap-10 transform transition-all duration-300 ease-out z-[999] shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
            <button 
              className="absolute top-6 right-6 text-black hover:text-gray-600 transition-all duration-200 hover:rotate-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1" 
              onClick={closeNav}
              aria-label="Close navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
      
            <nav className="flex-col gap-8 flex justify-between" role="navigation">
              {[
                { href: "#hero", text: "Beranda" },
                { href: "#aboutme", text: "Tentang Founder" },
                { href: "#companies", text: "Perusahaan" },
                { href: "#services", text: "Layanan" },
                { href: "#cases", text: "Perjalanan Bisnis" },
                { href: "#contact", text: "Kontak" }
              ].map((item, index) => (
                <div 
                  key={item.href}
                  className={`relative overflow-hidden transform transition-all duration-300 ease-out ${
                    isOpen 
                      ? `translate-x-0 opacity-100 delay-[${100 + index * 50}ms]` 
                      : 'translate-x-8 opacity-0'
                  }`}
                >
                  <a 
                    href={item.href} 
                    className="block text-black hover:text-gray-600 transition-all duration-200 text-lg font-medium hover:translate-x-2 focus:outline-none focus:text-gray-600 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{item.text}</span>
                    <div className="absolute inset-0 bg-gray-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-md -z-10"></div>
                  </a>
                </div>
              ))}
            </nav> 
            <div className={`flex gap-6 text-xl text-black transform transition-all duration-300 ease-out ${
              isOpen 
                ? 'translate-y-0 opacity-100 delay-[400ms]' 
                : 'translate-y-4 opacity-0'
            }`}>
              {[
                { href: "https://www.instagram.com/msf.dev_0078/", icon: "fa-instagram", label: "Instagram" },
                { href: "https://www.linkedin.com/in/m-salman-al-fikri-b28201265/", icon: "fa-linkedin", label: "LinkedIn" },
                { href: "https://github.com/SalmanFikri00", icon: "fa-github-alt", label: "GitHub" }
              ].map((social, index) => (
                <a 
                  key={social.href}
                  href={social.href} 
                  className={`relative overflow-hidden hover:text-gray-600 transition-all duration-200 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-2 transform ${
                    isOpen 
                      ? `translate-y-0 opacity-100 delay-[${450 + index * 50}ms]` 
                      : 'translate-y-4 opacity-0'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={`fa-brands ${social.icon} transition-transform duration-200`}></i>
                </a>
              ))}
            </div>
        </div>
    </div>
  </nav>
  )
}

export default Navbar
