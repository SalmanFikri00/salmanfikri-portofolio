/* eslint-disable no-unused-vars */
import { useEffect } from "react";
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
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const projects = [
    {
      title: "AyAgent Indonesia",
      body: "Membangun agensi growth marketing yang fokus membantu UMKM dan brand lokal meningkatkan penjualan melalui strategi digital yang terukur dan sustainable.",
      img: "/project/trash-go.png",
      bg: "bg-blue-100",
      gsap: "project1",
      desc: (
        <>
          <p>Tahun: 2023 - Sekarang</p>
          <p>Focus: Growth Marketing & Digital Strategy</p>
        </>
      ),
    },
    {
      title: "LapakLokal.com",
      body: "Mengembangkan platform marketplace yang memberdayakan brand lokal dengan menyediakan akses ke pasar yang lebih luas dan tools untuk mengelola bisnis mereka.",
      img: "/project/traditional-instrument.png",
      bg: "bg-green-100",
      gsap: "project2",
      desc: (
        <>
          <p>Tahun: 2024 - Sekarang</p>
          <p>Focus: Marketplace & Business Empowerment</p>
        </>
      ),
    },
    {
      title: "Ekosistem UMKM",
      body: "Menciptakan sinergi antara teknologi, strategi bisnis, dan komunitas untuk membangun ekosistem yang mendukung pertumbuhan berkelanjutan UMKM Indonesia.",
      img: "/project/smart-home.png",
      bg: "bg-amber-100",
      gsap: "project3",
      desc: (
        <>
          <p>Vision: Sustainable Growth</p>
          <p>Impact: Community & Economic Development</p>
        </>
      ),
    },
  ];

  let url = import.meta.env
  console.log(url)
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

  useGSAP(() => {
    // Enhanced hero animations
    gsap.from(".text-header", {
      y: 150,
      duration: 2,
      ease: "power3.out",
      opacity: 0,
      stagger: {
        from: "start",
        amount: 0.5,
      },
      delay: 3.4,
    });

    // Timeline line animation for roadmap
    gsap.fromTo(".timeline-line", 
      { height: "0%" },
      {
        height: "100%",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#roadmap",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Roadmap items stagger animation
    gsap.fromTo(".roadmap-item", 
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#roadmap",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Smooth scroll-triggered animations for projects
    gsap.from(".project1", {
      scrollTrigger: {
        trigger: ".project1",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 1.2,
      ease: "power2.out",
      opacity: 0,
      y: 100,
      scale: 0.9,
      stagger: 0.2,
    });
    
    gsap.from(".project2", {
      scrollTrigger: {
        trigger: ".project2",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 1.2,
      ease: "power2.out",
      opacity: 0,
      y: 100,
      scale: 0.9,
      stagger: 0.2,
    });
    
    gsap.from(".project3", {
      scrollTrigger: {
        trigger: ".project3",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 1.2,
      ease: "power2.out",
      opacity: 0,
      y: 100,
      scale: 0.9,
      stagger: 0.2,
    });

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        ease: "power2.out",
        opacity: 0,
        y: 50,
        delay: i * 0.1,
      });
    });

    // Parallax effect for background elements
    gsap.utils.toArray(".animate-float").forEach((element, i) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -50 * (i + 1),
        ease: "none",
      });
    });
  });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
    
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
      {/* HERO SECTION - Enhanced with animations */}
      <section
        id="hero"
        data-scroll-section
        className="relative flex min-h-screen px-4 py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-2xl animate-spin-slow"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-7xl mx-auto pt-24 pb-12">
          <div className="flex-grow flex items-center justify-start">
            <div className="max-w-4xl text-left">
              <div className="text-header overflow-hidden">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight bg-gradient-to-r from-gray-800 via-black to-gray-900 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500">
                  Membangun Ekosistem untuk Brand Lokal
                </h1>
              </div>
              <div className="text-header overflow-hidden">
                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed backdrop-blur-sm bg-white/30 p-4 rounded-lg border border-white/20 shadow-lg">
                  Saya, <span className="font-semibold text-gray-900">Salman Fikri</span>, founder AyAgent Indonesia dan LapakLokal.com.
                  Berfokus membangun solusi yang memberdayakan UMKM dan brand lokal untuk berkembang.
                </p>
              </div>

            </div>
          </div>

          <div className="flex mt-4 space-x-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
            <a href="https://www.instagram.com/msf.dev/" className="hover-pointer before:bg-black">Instagram</a>
            <a href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/" className="hover-pointer before:bg-black">Linked In</a>
            <a href="https://github.com/SalmanFikri00/" className="hover-pointer before:bg-black">Github</a>
          </div>
        </div>
      </section>

      {/* COMPANIES SECTION - Enhanced */}
      <section id="companies" data-scroll-section className="relative z-10 flex flex-col items-center px-10 pt-20 pb-20 text-black bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-[1200px] w-full">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-4">Ekosistem Perusahaan</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Membangun sinergi antara teknologi, strategi, dan komunitas untuk mendorong pertumbuhan bisnis lokal yang berkelanjutan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group hover-lift glass p-8 rounded-3xl border border-gray-200/50 bg-gradient-to-br from-gray-50/80 to-gray-100/80 shadow-xl hover:shadow-2xl transition-all duration-500 animate-float">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mr-4 animate-pulse-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">AyAgent Indonesia</h4>
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                AyAgent Indonesia membantu brand dan UMKM meningkatkan penjualan melalui strategi growth terpadu dan eksekusi marketing yang terukur.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                  <span>Growth Marketing & Performance</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Website, Landing Page & CRO</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Automasi Operasional & Integrasi</span>
                </div>
              </div>
              <div className="relative z-40 transform group-hover:scale-105 transition-transform duration-300">
                <Button text="Konsultasi dengan AyAgent" href="https://wa.me/+6285161007802" target="_blank" />
              </div>
            </div>
            
            <div className="group hover-lift glass p-8 rounded-3xl border border-gray-200/50 bg-gradient-to-br from-gray-50/80 to-gray-100/80 shadow-xl hover:shadow-2xl transition-all duration-500 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mr-4 animate-pulse-glow" style={{animationDelay: '0.5s'}}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">LapakLokal.com</h4>
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                LapakLokal.com memberdayakan brand lokal lewat ekosistem penjualan yang mudah, akses ke buyer, dan dukungan operasional.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                  <span>Onboarding & Listing Produk</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Manajemen Katalog & Order</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Program Promosi & Kolaborasi</span>
                </div>
              </div>
              <div className="relative z-40 transform group-hover:scale-105 transition-transform duration-300">
                <Button text="Kerja Sama dengan LapakLokal" href="https://wa.me/+6285161007802" target="_blank" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT FOUNDER - Enhanced */}
      <section id="aboutme" data-scroll-section className="relative z-20 flex flex-col items-center px-10 pt-20 pb-20 text-black bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="max-w-[1200px] w-full">
          <div className="text-center">
            <h3 className="relative z-30 text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-8">Tentang Founder</h3>
            <div className="relative z-30 glass p-8 rounded-3xl shadow-2xl hover-lift max-w-4xl mx-auto">
              <div className="flex flex-wrap mt-6 mb-8 text-lg font-light md:text-2xl lg:text-3xl perspective text-gray-700 leading-relaxed">
                <SubHead text={"Saya percaya bisnis lokal bisa tumbuh pesat dengan strategi yang tepat dan teknologi yang tepat guna. Fokus saya: hasil nyata dan relasi jangka panjang."} />
              </div>
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">5+</div>
                    <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">50+</div>
                    <div className="text-sm text-gray-600">Klien Terlayani</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">2</div>
                    <div className="text-sm text-gray-600">Perusahaan Didirikan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Enhanced */}
      <section id="services" data-scroll-section className="relative z-10 flex flex-col items-center px-10 pt-20 pb-20 text-black bg-white">
        <div className="max-w-[1200px] w-full">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-4">Layanan Unggulan</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Solusi terintegrasi untuk mengakselerasi pertumbuhan bisnis Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group hover-lift glass p-8 rounded-3xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-pink-50/80 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors">Growth Marketing</h4>
              <p className="text-gray-700 leading-relaxed">Iklan berbayar, konten, funnel, dan analitik untuk mendorong penjualan dengan ROI yang terukur.</p>
            </div>
            
            <div className="group hover-lift glass p-8 rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">Website & CRO</h4>
              <p className="text-gray-700 leading-relaxed">Landing page, web apps, dan optimasi konversi untuk meningkatkan performa digital.</p>
            </div>
            
            <div className="group hover-lift glass p-8 rounded-3xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">Operasional & Automasi</h4>
              <p className="text-gray-700 leading-relaxed">Integrasi tools, otomasi proses, dan efisiensi operasional untuk mengoptimalkan produktivitas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP HIDUP - Interactive Timeline */}
      <section id="roadmap" data-scroll-section className="relative z-20 flex flex-col items-center px-10 pt-20 pb-20 text-black bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-gray-200/10 to-gray-400/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-gray-300/10 to-gray-500/10 rounded-full blur-lg animate-float" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-[1200px] w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-6">Roadmap Hidup</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Perjalanan pendidikan dan karir yang membentuk visi entrepreneurship saya</p>
          </div>
          
          {/* Interactive Timeline */}
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 rounded-full opacity-40 timeline-line"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {/* SD */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up">
                <div className="w-1/2 pr-8 text-right">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center justify-end mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Sekolah Dasar</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2010 - 2016</p>
                    <p className="text-gray-700 text-sm leading-relaxed">SDN 1 Sukamaju - Fondasi pendidikan dan mulai tertarik dengan teknologi</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-gray-800 to-black rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-200"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              {/* SMP */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="200">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-200"></div>
                <div className="w-1/2 pl-8">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Sekolah Menengah Pertama</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2016 - 2019</p>
                    <p className="text-gray-700 text-sm leading-relaxed">SMPN 2 Sukamaju - Mulai belajar programming dan tertarik dengan dunia digital</p>
                  </div>
                </div>
              </div>
              
              {/* SMK */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="400">
                <div className="w-1/2 pr-8 text-right">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center justify-end mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">SMK Teknik Informatika</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2019 - 2022</p>
                    <p className="text-gray-700 text-sm leading-relaxed">SMKN 1 Sukamaju - Fokus pada pengembangan web dan mobile, mulai freelancing</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-200"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              {/* PKL & First Business */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="600">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-200"></div>
                <div className="w-1/2 pl-8">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">PKL & Bisnis Pertama</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2021 - 2022</p>
                    <p className="text-gray-700 text-sm leading-relaxed">Praktek kerja lapangan sambil membangun bisnis digital marketing pertama</p>
                  </div>
                </div>
              </div>
              
              {/* AyAgent Indonesia */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="800">
                <div className="w-1/2 pr-8 text-right">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center justify-end mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">AyAgent Indonesia</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2023 - Sekarang</p>
                    <p className="text-gray-700 text-sm leading-relaxed">Mendirikan agensi growth marketing untuk memberdayakan UMKM dan brand lokal</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              {/* LapakLokal.com */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="1000">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-green-700 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="w-1/2 pl-8">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">LapakLokal.com</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2024 - Sekarang</p>
                    <p className="text-gray-700 text-sm leading-relaxed">Platform marketplace untuk memberdayakan brand lokal Indonesia</p>
                  </div>
                </div>
              </div>
              
              {/* Future Vision */}
              <div className="roadmap-item flex items-center relative group" data-aos="fade-up" data-aos-delay="1200">
                <div className="w-1/2 pr-8 text-right">
                  <div className="glass p-6 rounded-2xl hover-lift hover-glow transition-all duration-500 group-hover:scale-105 border-2 border-dashed border-purple-300">
                    <div className="flex items-center justify-end mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3 animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Visi Masa Depan</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">2025 & Beyond</p>
                    <p className="text-gray-700 text-sm leading-relaxed">Membangun ekosistem teknologi yang berkelanjutan untuk ekonomi Indonesia</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-16">
            <div className="relative z-50 transform hover:scale-105 transition-transform duration-300">
              <Button text="Mari Berkolaborasi" href="#contact" />
            </div>
          </div>
        </div>
      </section>



      {/* FINAL CTA + CONTACT - Enhanced */}
      <section data-scroll-section className="relative z-10 flex flex-col justify-center items-center p-10 text-black bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-bl from-gray-300/20 to-gray-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-gray-400/20 to-gray-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-30 max-w-[1400px] w-full flex flex-col items-start justify-between">
          <div className="text-left w-full">
            <div className="glass p-12 rounded-3xl shadow-2xl hover-lift max-w-5xl">
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">Siap Bergabung Membangun Masa Depan?</p>
              <h2 className="mb-10 text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-800 via-black to-gray-900 bg-clip-text text-transparent font-bold leading-tight">Mari Berkolaborasi</h2>
              <p className="text-lg text-gray-700 mb-10 max-w-3xl leading-relaxed">Saya sedang mencari investor strategis untuk mengembangkan ekosistem teknologi yang berkelanjutan. Mari berkolaborasi membangun solusi inovatif yang dapat mengubah lanskap bisnis digital Indonesia.</p>
              <div className="flex gap-6 flex-wrap">
                <div className="relative z-50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <Button text={"Ayo Join via WhatsApp"} href="https://wa.me/+6285161007802" target="_blank" />
                </div>
                <div className="relative z-50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <Button text={"Kirim Proposal Investasi"} href={"mailto:salmanfikri00.dev@gmail.com"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-[1450px] h-[10px] mt-12 flex justify-center">
          <div className="w-[70vw] rounded-full h-[3px] bg-gradient-to-r from-blue-400 to-purple-600 opacity-30"></div>
        </div>
        <div id="contact" className="max-w-[1400px] w-full flex flex-col md:flex-- items gap-5 md:gap-20 md:p-10">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl">Contact.</h1>
          </div>
          <div className="flex flex-col md:flex-row w-[70vw] gap-5 md:gap-20">
            <Medsos medsos={"Phone :"} username={"+62 85161007802"} href={""} />
            <Medsos medsos={"Email Address :"} username={"salmanfikri00.dev@gmail.com"} href={"mailto:salmanfikri00.dev@gmail.com"} />
            <div className="text-sm">
              <p>Medsos</p>
              <div className="  max-w-[1450px] h-[5px] items-center flex justify-center">
                <div className="w-full rounded-full h-[2px] bg-black opacity-20"></div>
              </div>
              <div className="flex gap-3">
                <p className="overflow-hidden relative">
                  <a href="https://www.instagram.com/msf.dev/" className="hover-pointer before:bg-black">Instagram</a>
                </p>
                <p className="overflow-hidden relative">
                  <a href="https://www.linkedin.com/in/m-salman-al-fikri-b28201265/" className="hover-pointer before:bg-black">Linkedin</a>
                </p>
                <p className="overflow-hidden relative">
                  <a href="https://wa.me/+6285161007802" className="hover-pointer before:bg-black">whatsapp</a>
                </p>
                <p className="overflow-hidden relative">
                  <a href="https://github.com/SalmanFikri00" className="hover-pointer before:bg-black">github</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section data-scroll-section className="flex flex-col gap-5 justify-center items-center py-10 bg-black lg:py-20 lg:flex-row-reverse md:gap-20">
        <div className="flex flex-col justify-center items-center">
          <span className="flex justify-center items-center w-10 h-10 rounded-full border border-black -rotate-90">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
          <p className="overflow-hidden relative">
            <a href="#hero" className="hover-pointer before:bg-white">Scroll To Top</a>
          </p>
        </div>
        <div className="flex items-end">
          <h1 className=" text-[13vw]">SalmanFikri</h1>
          <p className="py-[5vw] text-sm">FOUNDER.</p>
        </div>
      </section>
      <p className="text-center bg-black">Copyrigth©2024</p>
    </div>
  );
};

export default Home;
