/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import Navbar from "../components/Navbar"
import LocomotiveScroll from 'locomotive-scroll';
import Button from "../components/Button";
import Project from "../components/Project";
import Medsos from "../components/Medsos";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/Cursor";
import Tirai from "../components/Tirai";
import SubHead from "../fragments/SubHead";
import { ScrollTrigger } from "gsap/ScrollTrigger";



const Home = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP( ()=> {
    gsap.from(".text-header",{
      y:150,
      duration: 2,
      ease: 'back.out',
      opacity:0,
      stagger: 0.25,
      delay: 3.7
    })
  })

    useEffect(() => {

        const body = document.querySelector("#body")
        const cursor = document.querySelector('.cursor-custom-child')
        const cursor2 = document.querySelector('.cursor-custom-2-child')
        const cursor3 = document.querySelector('.cursor-custom-3-child')

        const hoverPointer = document.querySelectorAll('.hover-pointer')

        hoverPointer.forEach( (hoverElement) => {

          hoverElement.addEventListener('mouseover' ,() => {
              cursor.style.transform = 'scale(0.5)'
              cursor2.style.transform = 'scale(.3)'
              cursor3.style.transform = 'scale(1.4)'
            })
            
            hoverElement.addEventListener('mouseleave', ()=> {
            cursor3.style.transform = 'scale(1)'
            cursor2.style.transform = 'scale(1)'
            cursor.style.transform = 'scale(1)'

          })

        })
        

        const locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
              wrapper: window,
              content: body,
              lerp: 0.1,
              duration: 1.2,
              orientation: 'vertical',
              gestureOrientation: 'vertical',
              smoothWheel: true,
              smoothTouch: false,
              wheelMultiplier: 1,
              touchMultiplier: 2,
              normalizeWheel: true,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            },
          });
          
        }, [])



  return (
    <div className="scroll-smooth text-white font-['Inter'] cursor-none " id='body' >
     <Navbar />
     <Cursor />
     <Tirai />
      <section className='bg-stone-950 h-screen flex flex-col justify-end p-10 shadow-2xl'>
        <div>
          <h1 className="text-3xl font-bold text-shadow-sm lg:text-8xl md:text-6xl sm:text-4xl  ">
            <p className=" text-header ">FULLSTACK </p><p className=" text-header">WEB DEVELOPER</p>
          </h1>
        </div>
      </section>
      <section data-scroll-section id="aboutme" className="flex flex-col pt-32 px-10 items-center text-black">
        <div className=" max-w-[1200px]">
            <div className="">
                <h3>
                    what you can expect from me?
                </h3>
                <p className="text-2xl md:text-6xl mt-10 flex flex-wrap perspective"> 
                    <SubHead text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente esse itaque quis recusandae porro commodi deleniti nam alias blanditiis ab.'} />
                </p>
            </div>
            <div className=" lg:flex max-w-[1200px] justify-center ">
                <div className="lg:w-1/2 py-10 ">
                    <h4>Skill</h4>
                    <div className=" md:max-w-[500px] pr-4 flex flex-wrap py-10 gap-5">
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/bun.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/adonis.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/elysiajs.webp" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/express.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/go.jpg" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/Laravel.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/next.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/node.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/react.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/rust.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/springboot.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/svelte.png" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/tailwind.webp" className=" " alt="" />
                      </a>
                      <a href="" className=' h-6 w-6 md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src="/skill/tauri.svg" className=" " alt="" />
                      </a>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <p className=" my-10" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste illum eius consequuntur quod nobis, adipisci aliquam odit esse vel?
                    </p>
                    <Button text='More aboute me' />
                </div>
            </div>
        </div>
      </section>
      <div className=" h-[20px] mt-5 flex justify-center" >
        <div className="w-[80vw] rounded-full h-[5px] bg-black opacity-50">
        </div>
      </div>
      <section id="project" className=" flex flex-col justify-center items-center text-black px-10 py-10">
        <div className=" lg:flex max-w-[1200px] gap-10">
          <h2 className=" lg:flex-1 py-10 text-3xl md:text-6xl">
            SOME THE MOST IMPRESIVE PROJECT I HAVE WORKED
          </h2>
          <div className="lg:flex-1 flex flex-col justify-center">
              <p className="mb-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis harum iste rem rerum adipisci quos consequatur facere, assumenda sed. Incidunt!
              </p>
                <Button text='See all project' />
          </div>
        </div>
      </section>

      <Project 
        title={"Trash Go"}
        body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem obcaecati necessitatibus, veritatis voluptates adipisci modi dolores nihil repellendus molestiae! Excepturi."
        img={'/project/trash-go.png'}
        desc={(
          <>
            <p>Category: Frontend</p>
            <p>Role: team lead & frontend</p>
          </>
        )}
      />
      
      <div className=" h-[10px] mt-5 flex justify-center" >
        <div className="w-[50vw] rounded-full h-[3px] bg-black opacity-20">
        </div>
      </div>

      <Project 
        title={"Traditional Instrument"}
        body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem obcaecati necessitatibus, veritatis voluptates adipisci modi dolores nihil repellendus molestiae! Excepturi."
        img={'/project/traditional-instrument.png'}
        desc={(
          <>
            <p>Category: Frontend</p>
            <p>Role: team lead & frontend</p>
          </>
        )}
      />

      <section className=" flex flex-col items-center justify-center text-black p-10 "> 
          <div className="  max-w-[1400px] w-full flex flex-col items-center justify-between ">
            <div className=" md:flex-1 ">
              <p>Have Idea for project?</p>
              <h2 className=" mb-10 text-6xl md:text-8xl lg:text-9xl">Got some idea and want to realize it?</h2>
            <div className=" flex justify-end">
              <Button text={"Let's work together"}/>
            </div>
            </div>
          </div>
          <div className="  max-w-[1450px] h-[10px] mt-5 flex justify-center" >
            <div className="w-[70vw] rounded-full h-[3px] bg-black opacity-20">
            </div>
          </div>
          <div id="contact" className="max-w-[1400px] w-full flex flex-col md:flex-- items gap-5 md:gap-20 md:p-10" >
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-9xl">
                Contact.
              </h1>
            </div>
            <div className="flex flex-col md:flex-row w-[70vw] gap-5 md:gap-20">
              <Medsos medsos={"Phone :"} username={"+62 85161007802"} href={""} />
              <Medsos medsos={"Email Address :"} username={"salmanfikri00.dev@gmail.com"} href={"mailto:salmanfikri00.dev@gmail.com"} />
              <div className=" text-sm">
                  <p>Medsos</p>
                  <div className="  max-w-[1450px] h-[5px] items-center flex justify-center" >
                      <div className="w-full rounded-full h-[2px] bg-black opacity-20">
                      </div>
                  </div>
                  <div className="flex gap-3">
                    <p className='relative overflow-hidden'><a href="https://www.instagram.com/msf.dev_0078/" className="hover-pointer before:bg-black">Instagram</a></p>
                    <p className='relative overflow-hidden'><a href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/" className="hover-pointer before:bg-black">Linkedin</a></p>
                    <p className='relative overflow-hidden'><a href="https://wa.me/+6285161007802" className="hover-pointer before:bg-black">whatsapp</a></p>
                    <p className='relative overflow-hidden'><a href="https://github.com/SalmanFikri00" className="hover-pointer before:bg-black">github</a></p>
                  </div>
              </div>
            </div>
          </div>
      </section>
      <section className="bg-black lg:py-20 py-10 flex flex-col lg:flex-row-reverse items-center justify-center gap-5 md:gap-20">
        <div className="flex flex-col justify-center items-center">
          <span className="-rotate-90 border w-10 h-10 flex justify-center items-center rounded-full border-black"><i className="fa-solid fa-arrow-right"></i></span>
          <p className='relative overflow-hidden'><a href="https://github.com/SalmanFikri00" className="hover-pointer before:bg-white">Scroll To Top</a></p>
        </div>
        <div className="flex items-end">
          <h1 className=" text-[13vw]">SalmanFikri</h1>
          <p className="py-[5vw] text-sm">PORTOFOLIO.</p>
        </div>
      </section>
        <p className="bg-black text-center">Copyrigth©2024</p>

    </div>
  )
}
{/* <Medsos medsos={"Instagram"} username={"msf.dev_0078"} href={"https://www.instagram.com/msf.dev_0078/"} />
<Medsos medsos={"Linkedin"} username={"m salman al fikri"} href={"https://www.linkedin.com/in/m-salman-al-fikri-b28201265/"} /> */}

export default Home
