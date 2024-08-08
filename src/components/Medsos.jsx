/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../App.css'

const Medsos = ( { medsos , href , username }) => {
  return (
    <div className=" text-sm">
        <p>{medsos}</p>
        <div className="  max-w-[1450px] h-[5px] items-center flex justify-center" >
            <div className="w-full rounded-full h-[2px] bg-black opacity-20">
            </div>
        </div>
        <p className='relative overflow-hidden'><a href={href} className="hover-pointer before:bg-black">{username}</a></p>
    </div>
  )
}

export default Medsos
