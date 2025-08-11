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
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
        },
          duration: 0.8,
          ease: "power3.out",
          rotationX: 90,
          opacity: 0,
          y: 50,
          z: 30,
          scale: 0.8,
          stagger: {
            amount: 0.3,
            from: "start"
          },
        })
        
        // Add hover effect for individual words
        gsap.utils.toArray(".sub-head").forEach((word) => {
          word.addEventListener("mouseenter", () => {
            gsap.to(word, {
              duration: 0.3,
              scale: 1.1,
              color: "#3b82f6",
              ease: "power2.out"
            });
          });
          
          word.addEventListener("mouseleave", () => {
            gsap.to(word, {
              duration: 0.3,
              scale: 1,
              color: "inherit",
              ease: "power2.out"
            });
          });
        });
      })
  return (
    <>
        {
            t.map( (d,i) => (
                <div 
                  className="sub-head pr-4 cursor-pointer transition-all duration-300 hover:text-blue-500 inline-block" 
                  key={i}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {d}
                </div>
            ))
        }
    </>
  )
}

export default SubHead
