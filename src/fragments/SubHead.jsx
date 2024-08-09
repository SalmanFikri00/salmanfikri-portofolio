/* eslint-disable react/prop-types */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../App.css'


const SubHead = ({text}) => {
    let t = text.split(' ')
    useGSAP( ()=> {
        gsap.from(".sub-head",{
            scrollTrigger:{
                trigger: '.sub-head',
                start: 'top bottom'
        },
          duration: 0.5,
          ease: "circ.out",
          rotationX: 120,
          opacity: 0,
          y: 40,
          z: 20,
          stagger: 0.04,
        })
      })
  return (
    <>
        {
            t.map( (d,i) => (
                <div className="sub-head pr-4" key={i} >{d}</div>
            ))
        }
    </>
  )
}

export default SubHead
