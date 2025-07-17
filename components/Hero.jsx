"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";

export const DemoIcon = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
      <svg
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          fill={fill}
        />
      </svg>
    );
  };

  export const ProjectIcon = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
      <svg
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M3 3h18v18H3V3zm2 2v14h14V5H5zm4 4h6v2H9V9zm0 4h6v2H9v-2z"
          fill={fill}
        />
      </svg>
    );
  };
  

const Hero = () => {
    const imageref = useRef(null);

    useEffect(() => {
        const imageElement = imageref.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollthreshold = 50;

            if (scrollPosition > scrollthreshold) {
                imageElement.classList.add("hero-image-scrolled");
            } else {
                imageElement.classList.remove("hero-image-scrolled");
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className="pb-20 px-4">
            <div className="container w-auto text-center">
                <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title animate-pulse">
                    Manage Your Wealth <br /> With Intelligence 
                </h1>
                <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                    An AI-powered financial management tool that helps you track expenses, set budgets, and achieve your financial goals effortlessly.
                </p>

                {/* Fixed button section with better styling */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                    <Link href="/dashboard">
                        <Button 
                            color="primary" 
                            endContent={<DemoIcon/>} 
                            variant="bordered"
                            className="min-w-[150px] text-white border-white hover:bg-white hover:text-blue-900 transition-colors"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Link href="https://github.com/Soumitra945/WealthWise.git">
                        <Button 
                            color="danger" 
                            endContent={<ProjectIcon/>} 
                            variant="bordered"
                            className="min-w-[150px] text-white border-white hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Visit Project
                        </Button>
                    </Link>
                </div>

                {/* Fixed image section */}
                <div className="mt-12 flex justify-center">
                    <div ref={imageref} className="transition-transform duration-300 hover:scale-105">
                        <Image 
                            src="/banner.png"
                            width={1280}
                            height={720}
                            alt="Dashboard Preview"
                            className="rounded-lg shadow-2xl border mx-auto max-w-full h-auto"
                            priority 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero