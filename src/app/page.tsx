"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Project from "./sections/project";
import Hero from "./sections/hero";
import About from "./sections/about";
import Experience from "./sections/experience";
import Contact from "./sections/contact";

export default function Portfolio() {
  const [scrolling, setScrolling] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans relative">
      {/* Floating Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 
          backdrop-blur-lg text-white py-3 px-8 flex justify-center items-center z-50 shadow-xl 
          rounded-4xl border border-gray-700 transition-all duration-500 
          ${scrolling ? "bg-opacity-95 shadow-orange-400/50" : ""}`}
      >
        <div className="hidden lg:flex space-x-6">
          {["home", "about", "projects", "experiences", "contact"].map(
            (section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(section)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(section);
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`transition duration-300 text-lg px-6 py-2 rounded-full font-medium tracking-wide capitalize 
                ${
                  activeSection === section
                    ? "bg-orange-400 text-gray-900 font-bold shadow-md shadow-orange-500"
                    : "hover:text-orange-400 hover:bg-gray-700 hover:bg-opacity-40"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            )
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.div
        className="fixed top-6 right-6 z-50 lg:hidden flex items-center justify-center w-12 h-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showNav && (
          <FaBars
            className="text-white text-2xl sm:text-3xl md:text-4xl cursor-pointer"
            onClick={() => setShowNav(true)}
          />
        )}
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNav(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-gray-800 text-white shadow-lg 
            flex flex-col items-center justify-center space-y-6 z-50 rounded-l-2xl"
          >
            <div className="absolute top-6 right-6 flex items-center justify-center w-12 h-12">
              <FaTimes
                className="text-white text-2xl sm:text-3xl md:text-4xl cursor-pointer"
                onClick={() => setShowNav(false)}
              />
            </div>

            {["home", "about", "projects", "experiences", "contact"].map(
              (section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(section)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowNav(false);
                    setActiveSection(section);
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xl font-medium capitalize px-6 py-3 rounded-md w-full text-center 
                  ${
                    activeSection === section
                      ? "bg-orange-400 text-gray-900 font-bold"
                      : "hover:text-orange-400 hover:bg-gray-700"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.a>
              )
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sections */}
      <Hero />
      <About />
      <Project />
      <Experience />
      <Contact />
    </div>
  );
}
