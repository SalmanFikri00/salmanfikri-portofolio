import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import Medsos from "../components/Medsos";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.from(".fade-in", {
      scrollTrigger: {
        trigger: ".fade-in",
        start: "top bottom-=100",
      },
      duration: 1,
      ease: "power2.out",
      opacity: 0,
      y: 50,
      stagger: 0.2,
    });
  });

  useEffect(() => {
    const body = document.querySelector("#about-body");
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
      id="about-body"
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
              More About
              <br />
              <span className="text-gray-400 font-light italic">Me</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              Get to know me better - my journey, skills, and what drives me to create amazing digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Introduction</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700">
              Hi! I&apos;m <span className="font-semibold text-black">Salman Fikri</span>, a passionate Fullstack Developer from Jakarta, Indonesia.
              I&apos;m currently studying at SMK Negeri 26 Jakarta, majoring in Information Systems and Network Applications.
              My journey in tech started with curiosity and has grown into a deep passion for creating solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

      {/* Education Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Education</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6 py-4">
                <h3 className="text-2xl font-semibold mb-2">SMK Negeri 26 Jakarta</h3>
                <p className="text-lg text-gray-600 mb-2">Information Systems and Network Applications</p>
                <p className="text-gray-500">2021 - Present</p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Focusing on web development, network infrastructure, and system administration.
                  Learning both theoretical concepts and practical applications in software engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

      {/* Skills Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Frontend Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• React.js</li>
                  <li>• JavaScript/ES6+</li>
                  <li>• HTML5 & CSS3</li>
                  <li>• Tailwind CSS</li>
                  <li>• GSAP Animations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Backend Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Node.js</li>
                  <li>• Express.js</li>
                  <li>• RESTful APIs</li>
                  <li>• Database Design</li>
                  <li>• Microservices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">IoT & Hardware</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Arduino</li>
                  <li>• ESP32/ESP8266</li>
                  <li>• MQTT Protocol</li>
                  <li>• ATtiny</li>
                  <li>• Sensor Integration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Tools & Others</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Git & GitHub</li>
                  <li>• Docker</li>
                  <li>• Linux/Unix</li>
                  <li>• VS Code</li>
                  <li>• Figma</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Database</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• PostgreSQL</li>
                  <li>• MySQL</li>
                  <li>• MongoDB</li>
                  <li>• Supabase</li>
                  <li>• Redis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Soft Skills</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Problem Solving</li>
                  <li>• Team Collaboration</li>
                  <li>• Quick Learner</li>
                  <li>• Communication</li>
                  <li>• Time Management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

      {/* Experience & Interests Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">What I Do</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Fullstack Development</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I specialize in building complete web applications from scratch, handling everything from
                  database design and API development to creating responsive and interactive user interfaces.
                  I focus on writing clean, maintainable code and following best practices.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">IoT Solutions</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I develop IoT-integrated systems using MQTT protocol, working with microcontrollers like
                  Arduino, ESP32, and ATtiny. From sensor integration to real-time data visualization,
                  I create solutions that bridge the physical and digital worlds.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Microservices Architecture</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I design and implement microservices architectures, selecting the right tech stack,
                  designing scalable systems, and handling deployment. I ensure services are maintainable,
                  scalable, and efficient.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Photography</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Beyond coding, I have a passion for photography. It helps me see the world from different
                  perspectives and brings creativity into my technical work. I believe great design comes
                  from observing and understanding visual aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

      {/* Personality Traits */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Personality</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Entrepreneur Mindset</h3>
                <p className="text-gray-700 leading-relaxed">
                  I approach problems with an entrepreneurial mindset, always looking for innovative
                  solutions and opportunities to create value. I&apos;m not afraid to take calculated risks
                  and learn from failures.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Fast Learner</h3>
                <p className="text-gray-700 leading-relaxed">
                  Technology evolves rapidly, and I pride myself on being able to quickly pick up new
                  concepts, tools, and frameworks. I&apos;m always eager to expand my knowledge and stay
                  current with industry trends.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Tech Enthusiast</h3>
                <p className="text-gray-700 leading-relaxed">
                  I&apos;m genuinely passionate about technology and love exploring new tools and techniques.
                  Whether it&apos;s a new JavaScript framework or a hardware project, I dive in with enthusiasm
                  and dedication.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Creative Problem Solver</h3>
                <p className="text-gray-700 leading-relaxed">
                  I believe every problem has a solution, and I enjoy the challenge of finding it.
                  I combine technical skills with creative thinking to develop elegant solutions to
                  complex problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        data-scroll-section
        className="flex flex-col justify-center items-center p-10 text-black"
      >
        <div className="max-w-[1400px] w-full flex flex-col items-center justify-between">
          <div className="md:flex-1 text-center">
            <p>Let&apos;s Connect</p>
            <h2 className="mb-10 text-6xl md:text-8xl lg:text-9xl">
              Want to work together?
            </h2>
          </div>
        </div>
        <div className="max-w-[1450px] h-[10px] mt-5 flex justify-center">
          <div className="w-[70vw] rounded-full h-[3px] bg-black opacity-20"></div>
        </div>
        <div className="max-w-[1400px] w-full flex flex-col md:flex-row items-start gap-5 md:gap-20 md:p-10">
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
              <div className="max-w-[1450px] h-[5px] items-center flex justify-center">
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

      {/* Footer */}
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

export default About;
