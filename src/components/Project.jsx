/* eslint-disable react/prop-types */
import Button from "./Button"
const Project = ({img, title, body, categories, roles, bg = "bg-neutral-200" , gsap, projectUrl }) => {
  const hasImage = Boolean(img);
  const projectBody = body ?? "";

  const categoryLabel =
    categories && categories.length > 0
      ? categories.map((category) => category.name).join(", ")
      : "Uncategorized";

  return (
    <section className="lg:flex justify-center items-center text-black py-10 ">
    <div className="flex flex-col-reverse lg:flex-row gap-10 md:gap-20 w-full max-w-[1400px]">
      <div className=" lg:flex-1 flex flex-col justify-between">
        <div className={"project relative "}>
          <h1 className={" text-4xl mb-5 "+gsap}>
            {title}
          </h1>
          <p className={gsap+ ' font-light'}>{projectBody}</p>
          <div className={"py-8 "+gsap}>
            <p>Category: {categoryLabel}</p>
            {roles && roles.length > 0 && <p>Role: {roles.join(", ")}</p>}
          </div>
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
      <div className="lg:flex h-full">
        <div className={` ${bg} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl max-h-[300px] max-w-[400px]`}>
          {hasImage ? (
            <div className="relative overflow-hidden rounded-lg group max-h-[300px] max-w-[400px] flex justify-center">
              <img
                src={img}
                alt={title}
                className="h-full w-auto transition-transform max-h-[300px] max-w-[400px] rounded-2xl duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] max-h-[500px] items-center justify-center text-center text-sm uppercase tracking-[0.3em] text-black/60 rounded-lg border-2 border-dashed border-black/20">
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
