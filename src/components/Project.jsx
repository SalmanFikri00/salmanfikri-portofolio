/* eslint-disable react/prop-types */
import Button from "./Button"
const Project = ({img, title, body, desc , bg , gsap }) => {

  return (
    <section className="project-container lg:flex justify-center items-center text-black p-10 ">
    <div className="max-w-[1400px] flex flex-col-reverse lg:flex-row gap-10 md:gap-20">
      <div className=" lg:flex-1 flex flex-col justify-between">
        <div className={"project relative "}>
          <h1 className={" text-4xl mb-5 "+gsap}>
            {title}
          </h1>
          <p className={gsap+ ' font-light'}>{body}</p>
          <div className={"py-8 "+gsap}>
            {desc}
          </div>
        </div>
        <div className={" px-0 py-10 "+gsap}>
          <Button text='Project details' />
        </div>
      </div>
      <div className="lg:flex-1 h-full">
        <div className={`py-16 px-10 ${bg}`}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  </section>
  )
}

export default Project
