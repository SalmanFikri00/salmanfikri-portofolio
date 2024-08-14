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
import InfiniteSlider from "../components/InfiniteSlider";
import CustomEase from "gsap/CustomEase";
import InfiniteSliderReverse from "../components/InfiniteSliderReverse";



const Home = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

  useGSAP( ()=> {
    gsap.from(".text-header",{
      y:150,
      duration: 1.5,
      ease: 'back.out',
      opacity:0,
      stagger: {
        from:'random',
        amount:0.3,
      },
      delay: 3.4
    })

    gsap.from(".project1",{
      scrollTrigger:{
          trigger: '.project1',
          start: 'bottom bottom'
    }, 
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x:-200,
      stagger: 0.1
    })
    gsap.from(".project2",{
      scrollTrigger:{
        trigger: '.project2',
        start: 'bottom bottom'
      }, 
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x:-200,
      stagger: 0.1
    })
    gsap.from(".project3",{
      scrollTrigger:{
        trigger: '.project3',
        start: 'bottom bottom'
      }, 
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x:-200,
      stagger: 0.1
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
          autoStart: false,
          lenisOptions: {
              wrapper: window,
              content: body,
              lerp: 0.05,
              duration: 1.5,
              orientation: 'vertical',
              gestureOrientation: 'vertical',
              smoothWheel: true,
              smoothTouch: true,
              wheelMultiplier: 1.5,
              touchMultiplier: 2,
              normalizeWheel: true,
              easing: (t) => t < 0.5 
              ? 16 * t * t * t * t * t 
              : 1 - Math.pow(-2 * t + 2, 5) / 2
            },
          });

          setTimeout(() => {
            locomotiveScroll.start();
        }, 3300)
          
        }, [])



  return (
    <div data-scroll-section className="scroll-smooth text-white font-['Inter'] cursor-none overflow-hidden" id='body' >
     <Navbar />
     <Cursor />
     <Tirai />
      <section className='relative bg-stone-950 h-screen flex flex-col justify-end p-10 shadow-2xl'>
        <div className="w-full h-full overflow-hidden flex justify-center absolute top-0 bottom-0">
          {/* <img className='h-[150%] w-fit ' src="/myPhoto.jpg" alt="" width='100vw'/> */}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-shadow-sm lg:text-8xl md:text-6xl sm:text-4xl  ">
            <p className=" text-header ">FULLSTACK </p><p className=" text-header">WEB <span className=" font-thin">|</span> Cloud <span className=" font-thin">|</span> IoT</p>
          </h1>
        </div>
      </section>
      <section id="aboutme" className="flex flex-col pt-32 px-10 items-center text-black">
        <div className=" max-w-[1200px]">
            <div className="">
                <h3>
                    About Me!
                </h3>
                <p className=" font-light text-lg md:text-2xl mb-8 lg:text-4xl mt-10 flex flex-wrap perspective"> 
                    <SubHead text={'I am a student at SMK Negeri 26 Jakarta, majoring in Information Systems and Network Applications. Driven by curiosity and a passion for learning, I enjoy exploring new and exciting challenges, which has allowed me to develop a diverse skill set.'} />
                </p>
            </div>
            <h4 className=" mt-12">What you can expect from me?</h4>
            <div className=" lg:flex-row flex-col-reverse flex  max-w-[1200px] justify-center ">
                <div className="lg:w-1/2 lg:py-10 slider-container ">
                  <InfiniteSlider />
                  <InfiniteSliderReverse />
                </div>
                <div className="lg:w-1/2">
                    <p className=" my-10 font-light" >
                      I specialize in building microservices, from selecting the tech stack and designing architecture to deployment. I can develop both web apps and IoT-integrated systems using MQTT, with expertise in microcontrollers like Arduino, ESP, ATtiny, and SBCs as needed.I can also help you create an interactive and fresh website, whether static or dynamic.
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
              <p className="mb-10 font-light">
              I have worked on various projects, ranging from websites and design to IoT. Here are some of the most impressive ones.  
              </p>
                <Button text='See all project' />
          </div>
        </div>
      </section>

      <Project 
        title={"Trash Go"}
        body="Trash Go is an interactive website designed to educate the public, especially about the waste around us. I created this website while participating in the AWS Cloud Computing Club Competition for static websites."
        img={'/project/trash-go.png'}
        bg='bg-green-200'
        gsap='project1'

        desc={(
          <>
            <p>Category: Static Website</p>
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
        body="During the next AWS Cloud Computing Competition, I created 'Traditional Instruments,' an interactive educational site featuring sounds and playable traditional musical instruments."
        img={'/project/traditional-instrument.png'}
        bg={'bg-amber-900'}
        gsap='project2'
        desc={(
          <>
            <p>Category: Interactive Web apps</p>
            <p>Role: team lead & frontend</p>
          </>
        )}
      />

      <div className=" h-[10px] mt-5 flex justify-center" >
        <div className="w-[50vw] rounded-full h-[3px] bg-black opacity-20">
        </div>
      </div>

      <Project 
        title={"Absensi With RFID CARD"}
        body="My team and I developed an RFID card-based attendance system using the ESP32 S2 Mini microcontroller. Originally a project challenge from alumni, it evolved into full production with 25 units."
        img={'/project/AbsensiRFID.png'}
        bg={'bg-gray-300'}
        gsap='project3'
        desc={(
          <>
            <p>Category: IoT & Fullstack</p>
            <p>Role: team lead & IoT</p>
          </>
        )}
      />

      <section className="  flex flex-col items-center justify-center text-black p-10 "> 
          <div className="  max-w-[1400px] w-full flex flex-col items-center justify-between ">
            <div className=" md:flex-1 ">
              <p>Have Idea for project?</p>
              <h2 className=" mb-10 text-6xl md:text-8xl lg:text-9xl">Got some idea and want to realize it?</h2>
            <div className=" flex justify-end">
              <div className=" scale-150 translate-x-[-80px]">
                <Button text={"Let's work together"}/>
              </div>
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
