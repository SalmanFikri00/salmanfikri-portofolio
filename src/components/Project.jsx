/* eslint-disable react/prop-types */
import Button from "./Button"
const Project = ({img, title, body, desc , bg = "bg-neutral-200" , gsap, projectUrl }) => {
  const hasImage = Boolean(img);
  const projectBody = body ?? "";

  return (
    <section className="project-container lg:flex justify-center items-center text-black p-10 ">
    <div className="max-w-[1400px] flex flex-col-reverse lg:flex-row gap-10 md:gap-20">
      <div className=" lg:flex-1 flex flex-col justify-between">
        <div className={"project relative "}>
          <h1 className={" text-4xl mb-5 "+gsap}>
            {title}
          </h1>
          <p className={gsap+ ' font-light'}>{projectBody}</p>
          {desc && (
            <div className={"py-8 "+gsap}>
              {desc}
            </div>
          )}
        </div>
        {projectUrl && (
          <div className={" px-0 py-10 "+gsap}>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text='Project details' />
            </a>
          </div>
        )}
      </div>
      <div className="lg:flex-1 h-full">
        <div className={`py-16 px-10 ${bg}`}>
          {hasImage ? (
            <img src={img} alt={title} />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center text-center text-sm uppercase tracking-[0.3em] text-black/60">
              Preview coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
  )
}

export default Project
