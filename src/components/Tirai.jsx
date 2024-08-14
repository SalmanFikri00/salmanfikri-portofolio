import { useGSAP } from "@gsap/react"
import { useEffect } from "react"
import {gsap} from "gsap"
import CustomEase from "gsap/CustomEase"

const Tirai = () => {

    useGSAP( ()=> {
        gsap.to(".tirai-child",{
          y:-300,
          duration: 2,
          ease: 'back.out',
          stagger: {
            from: 'random',
            amount: 0.5
          },
          delay: 3.2
        })

        gsap.to(".tirai-comp",{
          y:-100,
          duration: 1,
          ease: CustomEase.create("custom", "M0,0 C0,0 0.053,0.002 0.098,0.02 0.53,0.19 0.463,0.85 0.924,0.982 0.982,0.998 1,1 1,1 "),
          delay: 0.2
        })

        gsap.to(".tirai-comp",{
          y:-200,
          duration: 1,
          ease: CustomEase.create("custom", "M0,0 C0,0 0.053,0.002 0.098,0.02 0.53,0.19 0.463,0.85 0.924,0.982 0.982,0.998 1,1 1,1 "),
          delay: 1.2
        })

        gsap.to(".tirai-comp",{
          y:-300,
          duration: 1,
          ease: CustomEase.create("custom", "M0,0 C0,0 0.053,0.002 0.098,0.02 0.53,0.19 0.463,0.85 0.924,0.982 0.982,0.998 1,1 1,1 "),
          delay: 2.2
        })

        gsap.to(".alert-recomendation",{
          opacity: 0,
          duration: 1,
          ease: CustomEase.create("custom", "M0,0 C0,0 0.053,0.002 0.098,0.02 0.53,0.19 0.463,0.85 0.924,0.982 0.982,0.998 1,1 1,1 "),
          delay: 2.2
        })

      })


    useEffect(() => {

        

        const tirai = document.querySelector('.tirai')
        // const body = document.querySelector('#root')
        // body.style.overflow = 'hidden'

        setTimeout(() => {
            tirai.style.top = '-100vh'
        }, 3300);
    }, [])

    const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    

  return (
    <div className="tirai w-screen h-screen fixed z-50 top-0 tirai-transition flex flex-wrap justify-center items-start">
        {
            data.map( (d) => (
                <div key={d} className="w-1/5 h-1/5 overflow-hidden" ><div className="tirai-child w-full h-full bg-zinc-900"></div></div>
            ))
        }
        <div className="flex justify-center items-center absolute w-full h-full">
          <div className="">

            <div className="text-white relative text-5xl lg:text-7xl py-5  flex justify-center font-semibold drop-shadow-[0_35px_35px_rgba(255,255,255,0.25)] text-shadow transition-custom">
              <div className=" absolute w-[800px] text-center h-full overflow-hidden py-10">
                <div className="tirai-comp relative flex flex-col gap-12 lg:gap-5">
                  <p>Hello</p>
                  <p>Im Salman Fikri</p>
                  <p>And This My</p>
                  <p>Portofolio...</p>
                </div>
              </div>
              <p className=" opacity-0 ">|</p>
            
            </div>
            <p className="absolute bottom-12 right-12 text-sm md:text-xl alert-recomendation lg:hidden">
              use dektop for best experients*
            </p>
          </div>
        </div>
    </div>
  )
}

export default Tirai
