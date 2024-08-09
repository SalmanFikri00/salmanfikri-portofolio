import { useEffect } from "react"
import '../App.css'

const Cursor = () => {

    useEffect(() => {

        let cursor = document.querySelector('.cursor-custom')
        let cursor2 = document.querySelector('.cursor-custom-2')
        let cursor3 = document.querySelector('.cursor-custom-3')

        document.addEventListener('mousemove' ,(e) => {
            cursor.style.left = `${e.clientX}px`
            cursor.style.top = `${e.clientY}px`
            setTimeout(() => {
            cursor2.style.left = `${e.clientX}px`
            cursor2.style.top = `${e.clientY}px`
            cursor3.style.left = `${e.clientX}px`
            cursor3.style.top = `${e.clientY}px`
            }, 30);
          })

    }, [])
    

  return (
    <div className="hidden lg:block custom-cursor-wrapper">
        <div className=" cursor-custom w-5 h-5 rounded-full z-50 fixed translate-x-[-50%] translate-y-[-50%] ">
            <div className="cursor-custom-child w-5 h-5 rounded-full backdrop-invert transition-custom">

            </div>
        </div>
        <div className=" cursor-custom-2 w-[80px] h-[80px] rounded-full z-50  fixed translate-x-[-50%] translate-y-[-50%] ">
            <div className="cursor-custom-2-child w-[80px] h-[80px] rounded-full z-50 backdrop-invert transition-custom ">
                
            </div>
        </div>
        <div className=" cursor-custom-3 w-[75px] h-[75px] rounded-full z-50  fixed translate-x-[-50%] translate-y-[-50%] ">
            <div className="cursor-custom-3-child w-[75px] h-[75px] backdrop-invert transition-custom rounded-full">

            </div>
        </div>
        
    </div>
  )
}

export default Cursor
