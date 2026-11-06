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
              How I think about systems - the architecture I design, the infrastructure I run, and the things I build to keep them online.
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
              Hi! I&apos;m <span className="font-semibold text-black">Salman Fikri</span>, a Cloud Engineer from Jakarta, Indonesia.
              I just graduated from SMK Negeri 26 Jakarta, where I studied Information Systems and Network Applications — which is why
              I&apos;m comfortable starting a design from the network layer instead of the UI.
              My work sits in the middle of the stack: how the pieces fit together, where they run, and what keeps them online.
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
                <p className="text-gray-500">2022 - 2026 · graduated</p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Three years of networking and systems: routing, switching, server administration, and the
                  operating systems underneath them. Web development came with it, but the network side is what
                  I still reach for first when something has to be designed properly.
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
                <h3 className="text-xl font-semibold mb-4 text-black">Cloud & Infrastructure</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Self-hosted Linux servers</li>
                  <li>• Docker & Docker Compose</li>
                  <li>• Caddy & Traefik reverse proxy</li>
                  <li>• TLS / custom domain strategy</li>
                  <li>• Cloudflare DNS & tunnels</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Architecture & Design</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Solution design & trade-offs</li>
                  <li>• Multi-tenant isolation</li>
                  <li>• Async jobs & queue design</li>
                  <li>• API & service boundaries</li>
                  <li>• Diagrams before code</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Backend & APIs</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Node.js & TypeScript</li>
                  <li>• REST APIs</li>
                  <li>• Redis + BullMQ queues</li>
                  <li>• Webhooks with HMAC verification</li>
                  <li>• Express, Elysia, Adonis, Go, Rust</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">IoT & Edge</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• ESP32 / ESP8266</li>
                  <li>• Arduino & ATtiny</li>
                  <li>• MQTT protocol</li>
                  <li>• Sensor & RFID integration</li>
                  <li>• Edge-to-cloud data flow</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Databases</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• PostgreSQL</li>
                  <li>• MySQL</li>
                  <li>• MongoDB</li>
                  <li>• Redis</li>
                  <li>• Supabase</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• React & Next.js</li>
                  <li>• JavaScript / ES6+</li>
                  <li>• Tailwind CSS</li>
                  <li>• GSAP animations</li>
                  <li>• HTML5 & CSS3</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-gray-700 font-light">
              Everyday tools: Git & GitHub, Linux CLI, VS Code, Dokploy.
            </p>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

      {/* Reference Architecture Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Reference Architecture</h2>
            <p className="text-lg text-gray-700 font-light max-w-3xl leading-relaxed">
              The layout above is Reservasi.Online — a multi-tenant booking platform I designed from an empty
              server. I wrote it out here the way I actually think about it: top to bottom, one request.
            </p>
            <div className="mt-10 space-y-6">
              <div className="border-l-4 border-black pl-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">01 · Traffic in</p>
                <h3 className="text-xl font-semibold mt-2 mb-2">Tenant domains & DNS</h3>
                <p className="text-gray-700 leading-relaxed">
                  Each tenant points their own domain at the platform. Cloudflare handles DNS, and a wildcard
                  covers staging so previews never touch production.
                </p>
              </div>
              <div className="border-l-4 border-black pl-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">02 · Edge</p>
                <h3 className="text-xl font-semibold mt-2 mb-2">Caddy gateway in Docker</h3>
                <p className="text-gray-700 leading-relaxed">
                  One gateway in front of everything: automatic certificates, on-demand TLS, and a validation
                  call back into the app before a new custom domain is trusted. The tricky part here was the
                  loop — the gateway asks the app, so the app&apos;s answer has to route back around the gateway.
                </p>
              </div>
              <div className="border-l-4 border-black pl-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">03 · Deploy</p>
                <h3 className="text-xl font-semibold mt-2 mb-2">Dokploy + Traefik on one host</h3>
                <p className="text-gray-700 leading-relaxed">
                  Everything is self-hosted on a single server, joined by one Docker network. Deliberately not
                  Kubernetes — one host, few moving parts, and I can read every log myself.
                </p>
              </div>
              <div className="border-l-4 border-black pl-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">04 · Services</p>
                <h3 className="text-xl font-semibold mt-2 mb-2">App, notification worker, WhatsApp worker</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Next.js app stays responsive because sending is someone else&apos;s job: a queue worker
                  handles email (React Email + Mailtrap), another handles WhatsApp through WAHA — kept on an
                  internal bind with an HMAC-verified webhook and a persistent session volume, because losing
                  that volume means scanning the QR code again, not losing business data.
                </p>
              </div>
              <div className="border-l-4 border-black pl-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">05 · State</p>
                <h3 className="text-xl font-semibold mt-2 mb-2">Postgres + Redis</h3>
                <p className="text-gray-700 leading-relaxed">
                  Postgres holds the bookings, Redis holds the work in flight. Retries live in the queue, so a
                  provider outage delays a message instead of failing a booking.
                </p>
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
                <h3 className="text-2xl font-semibold mb-4">Solution Architecture</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This is where I start, on every project. What does the system actually need, how many services,
                  where do they run, and what breaks first when traffic grows? I draw the layout before I write
                  code, and I keep the trade-offs written down — because a design you can&apos;t explain is a
                  design you can&apos;t maintain.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Cloud & Deployment</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I run what I design. Linux servers I administer myself, containerised services, a reverse
                  proxy in front, certificates that renew without me, and deployment tooling that keeps
                  production and staging honest. Self-hosted first, cloud-managed when it earns its cost.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">IoT & Edge Systems</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hardware is just another client with worse networking. I design the device side too — ESP32,
                  Arduino, ATtiny, MQTT, sensors and RFID — so the data arrives in the cloud in a shape the
                  system can actually handle.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Fullstack Product Build</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I&apos;m not an architect who only draws boxes. When the layout needs building, I build it:
                  the API, the database, the queue, and the interface on top. That&apos;s what makes the design
                  realistic — I have to live with it afterwards.
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
                  I build products, not assignments. Reservasi.Online is mine — which means every architecture
                  decision eventually lands on my own server and my own bill. That is a very effective way to
                  learn trade-offs.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Self-Taught By Necessity</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nobody handed me a Caddy or a queue system — the product needed it, so I learned it and put it
                  in production. Graduate or not, I&apos;m used to closing the gap between &quot;I read about
                  it&quot; and &quot;I run it&quot;.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Infrastructure Curious</h3>
                <p className="text-gray-700 leading-relaxed">
                  I&apos;m most interested in what happens between the click and the database: the proxy, the
                  certificate, the retry, the container that didn&apos;t start. That layer is invisible when it
                  works and expensive when it doesn&apos;t.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">Practical Problem Solver</h3>
                <p className="text-gray-700 leading-relaxed">
                  I&apos;d rather ship one boring service that scales than five clever ones I can&apos;t debug at
                  2am. Every design I make has to survive being operated by whoever comes next — usually me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Off-screen Section */}
      <section
        data-scroll-section
        className="flex flex-col items-center px-10 py-20 text-black"
      >
        <div className="max-w-[1200px] w-full">
          <div className="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Off-screen</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Photography</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I shoot, edit, and deliver — Lightroom, Illustrator, a bit of motion work in Alight Motion.
                  It keeps my eye honest about composition, which quietly helps the way I lay out a system
                  diagram or an interface.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Everything else</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Tinkering with homelab gear and small hardware projects when nothing is on fire. Most of what
                  I know about networking started as something I wanted to get working at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[20px] mt-5 flex justify-center px-10">
        <div className="w-full max-w-[1400px] rounded-full h-[5px] bg-black opacity-50"></div>
      </div>

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
      <p className="text-center bg-black">Copyright © 2026</p>
    </div>
  );
};

export default About;
