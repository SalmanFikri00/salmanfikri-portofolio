import { gsap } from "gsap"
import { useEffect } from "react"

const PageTransition = ({ isTransitioning, onTransitionComplete }) => {
  useEffect(() => {
    if (isTransitioning) {
      const timeline = gsap.timeline({
        onComplete: () => {
          if (onTransitionComplete) {
            onTransitionComplete()
          }
        }
      })

      // Reset content visibility
      gsap.set([".transition-name", ".transition-signature"], { opacity: 1 })

      // Swipe down to cover screen with content fade in
      timeline
        .to(".page-transition", {
          y: "0%",
          duration: 0.6,
          ease: "power3.inOut",
        })
        .from(".transition-name", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.3")
        .from(".transition-signature", {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "back.out",
        }, "-=0.2")
    } else {
      const timeline = gsap.timeline()

      // Fade out content first, then swipe up
      timeline
        .to([".transition-name", ".transition-signature"], {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(".page-transition", {
          y: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
        }, "+=0.1")
    }
  }, [isTransitioning, onTransitionComplete])

  return (
    <div
      className="page-transition fixed inset-0 z-[100] flex items-center justify-center bg-zinc-200"
      style={{ transform: 'translateY(-100%)' }}
    >
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <h1 className="transition-name text-5xl font-bold text-black drop-shadow-lg md:text-6xl lg:text-8xl">
          SalmanFikri
        </h1>
        <img
          src="/MarkMe.svg"
          alt="Signature"
          className="transition-signature h-auto w-32 drop-shadow-md md:w-40 lg:w-48"
        />
      </div>
    </div>
  )
}

export default PageTransition
