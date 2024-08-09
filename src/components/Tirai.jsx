import { useGSAP } from "@gsap/react"
import { useEffect } from "react"
import {gsap} from "gsap"

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
          delay: 3
        })
      })

    useEffect(() => {

        

        const tirai = document.querySelector('.tirai')

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
    </div>
  )
}

export default Tirai
