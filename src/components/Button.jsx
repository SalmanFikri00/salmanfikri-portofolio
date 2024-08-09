/* eslint-disable react/prop-types */

import { useEffect } from "react"

const Button = ( {text} ) => {

  useEffect(() => {
    let btns = document.querySelectorAll('.btn-custom')
    let mouseHover = false
    const cursor = document.querySelector('.cursor-custom-child')
    const cursor2 = document.querySelector('.cursor-custom-2-child')
    const cursor3 = document.querySelector('.cursor-custom-3-child')

    btns.forEach( btn => {
      btn.lastChild.addEventListener('mousemove', (e) => {
        // console.log(e.offsetX)
        btn.firstChild.style.left = `${(e.offsetX - 37)/2}px`
        btn.firstChild.style.top = `${(e.offsetY - 37)/2}px`
        btn.firstChild.style.transition = '0s'
        btn.firstChild.firstChild.style.left = `${(e.offsetX )/4}px`
        btn.firstChild.firstChild.style.top = `${(e.offsetY )/4}px`
        btn.firstChild.firstChild.style.transition = '0s'

      })

      btn.lastChild.addEventListener('mouseover' ,(e)=> {
        cursor.style.transform = 'scale(.5)'
        cursor2.style.transform = 'scale(2.1)'
        cursor3.style.transform = 'scale(2)'

        if(!mouseHover){
          // console.log(e.offsetX)
          // btn.firstChild.lastChild.style.left = `${e.offsetX - 37}px`
          // btn.firstChild.lastChild.style.top = `${e.offsetY - 37}px`
          btn.firstChild.lastChild.style.transform = `translateX(${(e.offsetX - 37)/2}px) translateY(${(e.offsetY - 37)/2}px)`
          setTimeout(() => {
            if(mouseHover){
              btn.firstChild.lastChild.style.transition = `all 0.3s cubic-bezier(.25,0,.5,.99)`
              btn.firstChild.lastChild.style.width = `250%`
              btn.firstChild.lastChild.style.height = `250%`
              
            }
          }, 10);
          
          mouseHover = true
        }
      })
      
      btn.addEventListener('mouseleave' , (e) => {
        cursor.style.transform = 'scale(1)'
        cursor2.style.transform = 'scale(1)'
        cursor3.style.transform = 'scale(1)'
        btn.firstChild.style.left = `0px`
        btn.firstChild.style.top = `0px`
        btn.firstChild.style.transition = '0s'
        btn.firstChild.firstChild.style.left = `12px`
        btn.firstChild.firstChild.style.top = `12px`
        btn.firstChild.firstChild.style.transition = '0s'
        if(mouseHover){
          btn.firstChild.lastChild.style.width = `0`
          btn.firstChild.lastChild.style.height = `0`
          btn.firstChild.lastChild.style.transform = `translateX(${(e.offsetX - 37)/2}px) translateY(${(e.offsetY - 37)/2}px)`

          setTimeout(() => {
            if(!mouseHover){
              btn.firstChild.lastChild.style.transition = `all 0s cubic-bezier(.25,0,.5,.99)`
            }
          }, 300);
          mouseHover = false
        }
      })
    });
    
  }, [])
  

  return (
    <div className="flex items-center gap-5 ">
        <p>{text}</p>
        <span className="relative flex justify-center items-center btn-custom">
          <span className=" transition-custom relative overflow-hidden border w-10 h-10 flex justify-center items-center rounded-full border-black">
            <i className="fa-solid fa-arrow-right -rotate-45 absolute left-3"></i>
            {/* <span className=" w-10 h-10 bg-black absolute"></span> */}
            <span className=" btn-child rounded-full absolute backdrop-invert "></span>
          </span>
          <span className=" absolute w-20 h-20 rounded-full"></span>
        </span>
    </div>
  )
}

export default Button
