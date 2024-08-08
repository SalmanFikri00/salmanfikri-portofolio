/* eslint-disable react/prop-types */

const Button = ( {text} ) => {
  return (
    <div className="flex items-center gap-5 cursor-pointer">
        <p>{text}</p>
        <span className="-rotate-45 border w-10 h-10 flex justify-center items-center rounded-full border-black"><i className="fa-solid fa-arrow-right"></i></span>
    </div>
  )
}

export default Button
