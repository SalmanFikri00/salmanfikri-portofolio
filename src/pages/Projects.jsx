import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import Project from "../components/Project";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";
import { supabaseClient } from "../lib/supabaseClient";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DEFAULT_ACCENT_COLOR = "bg-neutral-200";
const PROJECTS_PER_PAGE = 5;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(PROJECTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);

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
              .select("id, title, summary, body, image_url, accent_color, project_url, roles, created_at, categories, is_published")
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

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, displayedCount);
  }, [filteredProjects, displayedCount]);

  const hasMore = displayedCount < filteredProjects.length;

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
    setDisplayedCount(PROJECTS_PER_PAGE);
  };

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + PROJECTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, hasMore]);

  useEffect(() => {
    if (activeCategory === "all") return;
    const categoryExists = categories.some((category) => category.slug === activeCategory);

    if (!categoryExists) {
      setActiveCategory("all");
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, loadMore]);

  useGSAP(() => {
    gsap.from(".project-item", {
      scrollTrigger: {
        trigger: ".project-item",
        start: "top bottom-=100",
      },
      duration: 1,
      ease: "power2.out",
      opacity: 0,
      y: 50,
      stagger: 0.1,
    });
  }, [displayedProjects.length]);

  useEffect(() => {
    const body = document.querySelector("#projects-body");
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
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    locomotiveScroll.start();

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div
      className="scroll-smooth text-white font-['Inter'] bg-white"
      id="projects-body"
      data-scroll-container
    >
      <Navbar />
      <Cursor />

      {/* Hero Section */}
      <section
        data-scroll-section
        className="relative flex px-4 py-20 bg-white sm:px-6 lg:px-8"
      >
        <div className="relative z-10 flex flex-col justify-center w-full h-full max-w-5xl mx-auto pt-24 pb-12">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-black tracking-tight">
              All My
              <br />
              <span className="text-gray-400 font-light italic">Projects</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              Explore all the projects I&apos;ve worked on, from web applications to IoT solutions.
              Each project represents a unique challenge and learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section data-scroll-section className="px-10 py-10">
        <div className="flex flex-wrap items-center justify-center gap-3 pb-10 text-xs uppercase tracking-[0.3em] text-black">
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
      </section>

      {/* Projects List */}
      <section data-scroll-section>
        {isLoadingProjects && (
          <p className="text-center text-sm uppercase tracking-[0.3em] text-black/60 py-20">
            Loading projects...
          </p>
        )}

        {!isLoadingProjects && hasError && (
          <p className="text-center text-sm uppercase tracking-[0.3em] text-red-500 py-20">
            Failed to load projects. Please try again later.
          </p>
        )}

        {!isLoadingProjects && !hasError && filteredProjects.length === 0 && (
          <p className="text-center text-sm uppercase tracking-[0.3em] text-black/60 py-20">
            No projects found for this category yet.
          </p>
        )}

        <div className="w-full">
          {displayedProjects.map((project, index) => {
            const projectGsap = project.gsapKey ?? `project${index + 1}`;

            return (
              <div key={project.id ?? project.slug ?? index} className="project-item">
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
                {!project.is_published && (
                  <div className="flex justify-center -mt-5 mb-5">
                    <span className="text-xs uppercase tracking-widest text-gray-400 bg-gray-100 px-4 py-1 rounded-full">
                      Draft
                    </span>
                  </div>
                )}
                {index < displayedProjects.length - 1 && (
                  <div className="flex justify-center items-center px-10 py-5">
                    <div className="w-full max-w-[1400px] rounded-full h-[3px] bg-black opacity-20"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <div ref={observerTarget} className="flex justify-center py-10">
            {isLoadingMore && (
              <p className="text-sm uppercase tracking-[0.3em] text-black/60">
                Loading more projects...
              </p>
            )}
          </div>
        )}

        {!hasMore && displayedProjects.length > 0 && (
          <div className="flex justify-center py-10">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">
              You&apos;ve reached the end
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <section
        data-scroll-section
        className="flex flex-col gap-5 justify-center items-center py-10 bg-black lg:py-20 lg:flex-row-reverse md:gap-20 mt-20"
      >
        <div className="flex flex-col justify-center items-center">
          <span className="flex justify-center items-center w-10 h-10 rounded-full border border-black -rotate-90">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
          <p className="overflow-hidden relative">
            <a
              href="#"
              className="hover-pointer before:bg-white"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Scroll To Top
            </a>
          </p>
        </div>
        <div className="flex items-end">
          <h1 className="text-[13vw]">SalmanFikri</h1>
          <p className="py-[5vw] text-sm">PORTOFOLIO.</p>
        </div>
      </section>
      <p className="text-center bg-black">Copyright©2024</p>
    </div>
  );
};

export default Projects;
