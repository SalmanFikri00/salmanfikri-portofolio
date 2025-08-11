/* eslint-disable react/prop-types */
import Button from "./Button"
const Project = ({img, title, body, desc , bg , gsap }) => {

  return (
    <section className="project-container lg:flex justify-center items-center text-black p-10 relative z-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-blue-500/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-[1400px] flex flex-col-reverse lg:flex-row gap-10 md:gap-20 relative z-10">
        <div className="lg:flex-1 flex flex-col justify-between">
          <div className={"project relative "+gsap+" group"}>
            <h1 className="text-4xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
              {title}
            </h1>
            <div className="glass-morphism-dark rounded-2xl p-6 hover-lift hover-glow transition-all duration-500">
              <p className="font-light text-gray-700 leading-relaxed mb-4">{body}</p>
              <div className="py-4 border-t border-gray-200/30">
                {desc}
              </div>
            </div>
          </div>
          <div className={"relative z-50 px-0 py-10 "+gsap+" transform hover:scale-105 transition-transform duration-300"}>
            <Button text='Diskusi lebih lanjut' href="#contact" />
          </div>
        </div>
        <div className="lg:flex-1 h-full">
          <div className={`py-16 px-10 ${bg} rounded-3xl glass-morphism hover-lift hover-glow transition-all duration-500 group overflow-hidden relative`}>
            {/* Image container with enhanced effects */}
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={img} 
                alt={title}
                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-pink-400 to-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Project
