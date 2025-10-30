/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Project from "../components/Project";
import Medsos from "../components/Medsos";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/Cursor";
import Tirai from "../components/Tirai";
import SubHead from "../fragments/SubHead";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteSlider from "../components/InfiniteSlider";
import CustomEase from "gsap/CustomEase";
import InfiniteSliderReverse from "../components/InfiniteSliderReverse";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";
import { supabaseClient } from "../lib/supabaseClient";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const DEFAULT_ACCENT_COLOR = "bg-neutral-200";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setIsLoadingProjects(true);
      setHasError(false);
      try {
        const [{ data: categoryRows, error: categoriesError }, { data: projectRows, error: projectsError }] =
          await Promise.all([
            supabaseClient
              .from("categories")
              .select("id, name, slug")
              .eq("is_active", true)
              .order("name", { ascending: true }),
            supabaseClient
              .from("project_with_categories")
              .select("id, title, summary, body, image_url, accent_color, project_url, roles, created_at, categories")
              .eq("is_published", true)
              .order("created_at", { ascending: false }),
          ]);

        if (categoriesError) {
          console.error(categoriesError);
          setHasError(true);
        }

        if (projectsError) {
          console.error(projectsError);
          setHasError(true);
        }

        if (!isMounted) return;

        setCategories(categoryRows ?? []);

        if (projectRows && projectRows.length > 0) {
          const formattedProjects = projectRows.map((project, index) => ({
            ...project,
            categories: Array.isArray(project.categories) ? project.categories : [],
            roles: Array.isArray(project.roles) ? project.roles : [],
            gsapKey: `project${index + 1}`,
          }));
          setProjects(formattedProjects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error(error);
        if (!isMounted) return;
        setHasError(true);
        setProjects([]);
        setCategories([]);
      } finally {
        if (isMounted) {
          setIsLoadingProjects(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories?.some((category) => category.slug === activeCategory),
    );
  }, [activeCategory, projects]);

  const categoriesWithAll = useMemo(
    () => [
      { id: "all", name: "All Projects", slug: "all" },
      ...categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })),
    ],
    [categories],
  );

  const handleCategorySelect = (slug) => {
    setActiveCategory(slug);
  };

  useEffect(() => {
    if (activeCategory === "all") return;
    const categoryExists = categories.some((category) => category.slug === activeCategory);

    if (!categoryExists) {
      setActiveCategory("all");
    }
  }, [categories, activeCategory]);


  useGSAP(() => {
    gsap.from(".text-header", {
      y: 150,
      duration: 1.5,
      ease: "back.out",
      opacity: 0,
      stagger: {
        from: "random",
        amount: 0.3,
      },
      delay: 3.4,
    });

    gsap.from(".project1", {
      scrollTrigger: {
        trigger: ".project1",
        start: "bottom bottom",
      },
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x: -200,
      stagger: 0.1,
    });
    gsap.from(".project2", {
      scrollTrigger: {
        trigger: ".project2",
        start: "bottom bottom",
      },
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x: -200,
      stagger: 0.1,
    });
    gsap.from(".project3", {
      scrollTrigger: {
        trigger: ".project3",
        start: "bottom bottom",
      },
      duration: 1,
      ease: "circ.out",
      opacity: 0,
      x: -200,
      stagger: 0.1,
    });
  }, [filteredProjects.length]);

  useEffect(() => {
    
    const body = document.querySelector("#body");
    const cursor = document.querySelector(".cursor-custom-child");
    const cursor2 = document.querySelector(".cursor-custom-2-child");
    const cursor3 = document.querySelector(".cursor-custom-3-child");

    const hoverPointer = document.querySelectorAll(".hover-pointer");

    hoverPointer.forEach((hoverElement) => {
      hoverElement.addEventListener("mouseover", () => {
        cursor.style.transform = "scale(0.5)";
        cursor2.style.transform = "scale(.3)";
        cursor3.style.transform = "scale(1.4)";
      });

      hoverElement.addEventListener("mouseleave", () => {
        cursor3.style.transform = "scale(1)";
        cursor2.style.transform = "scale(1)";
        cursor.style.transform = "scale(1)";
      });
    });

    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      },
    });

    setTimeout(() => {
      locomotiveScroll.start();
    }, 5000);
  }, []);

  return (
    <div
      className="scroll-smooth text-white font-['Inter']"
      id="body"
      data-scroll-container
    >
      <Navbar />
      <Cursor />
      <Tirai />
      <section
        id="hero"
        data-scroll-section
        className="relative flex min-h-screen px-4 py-20 bg-white sm:px-6 lg:px-8"
      >
        {/* Top Left Logo/Text (Assuming Navbar handles this or it's a separate component) */}

        {/* Right Side Navigation/Categories */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-4 text-sm font-medium text-gray-400 uppercase tracking-widest">
          <p className="hover:text-black transition-colors duration-200">Entrepreneur</p>
          <p className="hover:text-black transition-colors duration-200">Fast Learner</p>
          <p className="hover:text-black transition-colors duration-200">Tech Enthusiast</p>
          <p className="hover:text-black transition-colors duration-200">Photographer</p>
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-7xl mx-auto pt-24 pb-12">
          <div className="flex-grow flex items-center justify-between gap-10 lg:gap-20">
            <div className="max-w-4xl text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-black tracking-tight">
                I&apos;m a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Fullstack</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-black/10 -skew-y-1"></span>
                </span>
                <br />
                Developer
                <br />
                <span className="text-gray-400 font-light italic">great experiences</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                I&apos;m <span className="font-semibold text-black">Salman Fikri</span>, a Fullstack Developer living in Jakarta, and I focus on making digital products that are easy to use, enjoyable, and get the job done.
              </p>
            </div>

            {/* Profile Image */}
            <div className="hidden lg:block">
              <img
                src="/salman.png"
                alt="Salman Fikri"
                className="w-[400px] h-auto xl:w-[600px]  drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Left Social Media Links */}
          <div className="flex mt-4 space-x-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
            <a href="https://www.instagram.com/msf.dev/" className="hover-pointer before:bg-black">Instagram</a>
            <a href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/" className="hover-pointer before:bg-black">Linked In</a>
            <a href="https://github.com/SalmanFikri00/" className="hover-pointer before:bg-black">Github</a>
          </div>
        </div>
      </section>
      <section
        data-scroll-section
        id="aboutme"
        className="flex flex-col items-center px-10 pt-32 text-black"
      >
        <div className=" max-w-[1200px]">
          <div className="">
            <h3>About Me!</h3>
            <p className="flex flex-wrap mt-10 mb-8 text-lg font-light md:text-2xl lg:text-4xl perspective">
              <SubHead
                text={
                  "I am a student at SMK Negeri 26 Jakarta, majoring in Information Systems and Network Applications. Driven by curiosity and a passion for learning, I enjoy exploring new and exciting challenges, which has allowed me to develop a diverse skill set."
                }
              />
            </p>
          </div>
          <h4 className="mt-12">What you can expect from me?</h4>
          <div className=" lg:flex-row flex-col-reverse flex  max-w-[1200px] justify-center ">
            <div className="lg:w-1/2 lg:py-10 slider-container">
              <InfiniteSlider />
              <InfiniteSliderReverse />
            </div>
            <div className="lg:w-1/2">
              <p className="my-10 font-light">
                I specialize in building microservices, from selecting the tech
                stack and designing architecture to deployment. I can develop
                both web apps and IoT-integrated systems using MQTT, with
                expertise in microcontrollers like Arduino, ESP, ATtiny, and
                SBCs as needed.I can also help you create an interactive and
                fresh website, whether static or dynamic.
              </p>
              <Link to="/about">
                <Button text="More about me" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>
      <section
        data-scroll-section
        id="project"
        className="flex flex-col justify-center items-center px-10 py-10 text-black"
      >
        <div className=" lg:flex max-w-[1200px] gap-10">
          <h2 className="py-10 text-3xl lg:flex-1 md:text-6xl">
            SOME THE MOST IMPRESIVE PROJECT I HAVE WORKED
          </h2>
          <div className="flex flex-col justify-center lg:flex-1">
            <p className="mb-10 font-light">
              I have worked on various projects, ranging from websites and
              design to IoT. Here are some of the most impressive ones.
            </p>
            <Link to="/projects">
              <Button text="See all project" />
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-center gap-3 px-6 pb-10 text-xs uppercase tracking-[0.3em] text-black">
        {categoriesWithAll.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategorySelect(category.slug)}
              className={`rounded-full border px-5 py-2 transition ${
                isActive ? "bg-black text-white border-black" : "border-black/30 hover:border-black"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {isLoadingProjects && (
        <p className="text-center text-sm uppercase tracking-[0.3em] text-black/60">
          Loading projects...
        </p>
      )}

      {!isLoadingProjects && hasError && (
        <p className="text-center text-sm uppercase tracking-[0.3em] text-red-500">
          Failed to load projects. Please try again later.
        </p>
      )}

      {!isLoadingProjects && !hasError && filteredProjects.length === 0 && (
        <p className="text-center text-sm uppercase tracking-[0.3em] text-black/60">
          No projects found for this category yet.
        </p>
      )}

      <div className="w-full">
        {filteredProjects.map((project, index) => {
          const projectGsap = project.gsapKey ?? `project${index + 1}`;

          return (
            <div key={project.id ?? project.slug ?? index}>
              <Project
                title={project.title}
                body={project.summary ?? project.body ?? ""}
                img={project.image_url}
                bg={project.accent_color ?? DEFAULT_ACCENT_COLOR}
                gsap={projectGsap}
                projectUrl={project.project_url}
                categories={project.categories}
                roles={project.roles}
              />
              {index < filteredProjects.length - 1 && (
                <div className="flex justify-center items-center px-10 py-5">
                  <div className="w-full max-w-[1200px] rounded-full h-[3px] bg-black opacity-20"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section
        data-scroll-section
        className="flex flex-col justify-center items-center p-10 text-black"
      >
        <div className="  max-w-[1400px] w-full flex flex-col items-center justify-between ">
          <div className="md:flex-1">
            <p>Have Idea for project?</p>
            <h2 className="mb-10 text-6xl md:text-8xl lg:text-9xl">
              Got some idea and want to realize it?
            </h2>
            <div className="flex justify-end">
              <div className=" scale-150 translate-x-[-80px]">
                <Button text={"Let's work together"} />
              </div>
            </div>
          </div>
        </div>
        <div className="  max-w-[1450px] h-[10px] mt-5 flex justify-center">
          <div className="w-[70vw] rounded-full h-[3px] bg-black opacity-20"></div>
        </div>
        <div
          id="contact"
          className="max-w-[1400px] w-full flex flex-col md:flex-- items gap-5 md:gap-20 md:p-10"
        >
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-9xl">Contact.</h1>
          </div>
          <div className="flex flex-col md:flex-row w-[70vw] gap-5 md:gap-20">
            <Medsos medsos={"Phone :"} username={"+62 85161007802"} href={""} />
            <Medsos
              medsos={"Email Address :"}
              username={"salmanfikri00.dev@gmail.com"}
              href={"mailto:salmanfikri00.dev@gmail.com"}
            />
            <div className="text-sm">
              <p>Medsos</p>
              <div className="  max-w-[1450px] h-[5px] items-center flex justify-center">
                <div className="w-full rounded-full h-[2px] bg-black opacity-20"></div>
              </div>
              <div className="flex gap-3">
                <p className="overflow-hidden relative">
                  <a
                    href="https://www.instagram.com/msf.dev/"
                    className="hover-pointer before:bg-black"
                  >
                    Instagram
                  </a>
                </p>
                <p className="overflow-hidden relative">
                  <a
                    href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/"
                    className="hover-pointer before:bg-black"
                  >
                    Linkedin
                  </a>
                </p>
                <p className="overflow-hidden relative">
                  <a
                    href="https://wa.me/+6285161007802"
                    className="hover-pointer before:bg-black"
                  >
                    whatsapp
                  </a>
                </p>
                <p className="overflow-hidden relative">
                  <a
                    href="https://github.com/SalmanFikri00"
                    className="hover-pointer before:bg-black"
                  >
                    github
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-scroll-section
        className="flex flex-col gap-5 justify-center items-center py-10 bg-black lg:py-20 lg:flex-row-reverse md:gap-20"
      >
        <div className="flex flex-col justify-center items-center">
          <span className="flex justify-center items-center w-10 h-10 rounded-full border border-black -rotate-90">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
          <p className="overflow-hidden relative">
            <a
              href="https://github.com/SalmanFikri00"
              className="hover-pointer before:bg-white"
            >
              Scroll To Top
            </a>
          </p>
        </div>
        <div className="flex items-end">
          <h1 className=" text-[13vw]">SalmanFikri</h1>
          <p className="py-[5vw] text-sm">PORTOFOLIO.</p>
        </div>
      </section>
      <p className="text-center bg-black">Copyrigth©2024</p>
    </div>
  );
};
{
  /* <Medsos medsos={"Instagram"} username={"msf.dev_0078"} href={"https://www.instagram.com/msf.dev_0078/"} />
<Medsos medsos={"Linkedin"} username={"m salman al fikri"} href={"https://www.linkedin.com/in/m-salman-al-fikri-b28201265/"} /> */
}

export default Home;
