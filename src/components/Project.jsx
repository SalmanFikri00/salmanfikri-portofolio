/* eslint-disable react/prop-types */
import Button from "./Button"

const Project = ({img, title, body, desc}) => {
  return (
    <section className=" lg:flex justify-center items-center text-black p-10 ">
    <div className="max-w-[1200px] flex flex-col-reverse lg:flex-row gap-10 md:gap-20">
      <div className=" lg:flex-1 flex flex-col justify-between">
        <div className="">
          <h1 className=" text-4xl">
            {title}
          </h1>
          <p>{body}</p>
          <div className="py-8">
            {desc}
          </div>
        </div>
        <div className=" px-0 py-10">
          <Button text='Project details' />
        </div>
      </div>
      <div className="lg:flex-1 ">
        <div className=" py-16 px-10 bg-slate-300 rounded-2xl">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  </section>
  )
}

export default Project
