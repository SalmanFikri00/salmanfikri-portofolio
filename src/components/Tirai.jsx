import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

const Tirai = () => {
  useGSAP(() => {
    const timeline = gsap.timeline()

    // Fade in name and signature
    timeline
      .from(".tirai-name", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      }, 0.2)
      .from(".tirai-signature", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out",
      }, 0.4)
      // Fade out content before curtain closes
      .to([".tirai-name", ".tirai-signature"], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 1.0)
      // Swipe up entire curtain
      .to(".tirai", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          const tirai = document.querySelector('.tirai')
          if (tirai) {
            tirai.style.display = 'none'
          }
        }
      }, 1.3)
  })

  return (
    <div className="tirai fixed inset-0 z-50 flex items-center justify-center bg-zinc-200 transition-transform">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <h1 className="tirai-name text-5xl font-bold text-black drop-shadow-lg md:text-6xl lg:text-8xl">
          salmanfikri.
        </h1>
        <img
          src="/MarkMe.svg"
          alt="Signature"
          className="tirai-signature h-auto w-32 drop-shadow-md md:w-40 lg:w-48"
        />
      </div>
    </div>
  )
}

export default Tirai
