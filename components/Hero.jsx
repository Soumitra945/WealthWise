"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";


const Hero = () => {

    const imageref=useRef(null);

    useEffect(() => {
        const imageElement=imageref.current;

        const handleScroll=()=>{
            const scrollPosition=window.scrollY;
            const scrollthreshold=50;
            console.log("Scroll Position:", scrollPosition);

            if (scrollPosition > scrollthreshold) {
                console.log("Adding class 'hero-image-scrolled'");
                imageElement.classList.add("hero-image-scrolled");
            } else {
                console.log("Removing class 'hero-image-scrolled'");
                imageElement.classList.remove("hero-image-scrolled");
            }
        }

        window.addEventListener("scroll",handleScroll);

        return () => window.removeEventListener("scroll",handleScroll);

    }, [])

  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
                Manage Your Finances <br /> With Intelligence </h1>
            <p className="text-xl text-grey-600 mb-8 max-w-2xl mx-auto">An AI-powered financial management tool that helps you track expenses, set budgets, and achieve your financial goals effortlessly.</p>

            <div className="flex justify-center space-x-4">
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">Get Started</Button>
                </Link>
                <Link href="/google.com">
                    <Button size="lg" className="px-8">Visit Project</Button>
                </Link>
            </div>

            <div className="hero-image-wrapper">
                <div ref={imageref} className="hero-image">
                    <Image src="/banner.png"
                    width={1280}
                    height={720}
                    alt="Dashboard Preview"
                    className="rounded-lg shadow-2xl border mx-auto"
                    priority 
                    />
                </div>
            </div>
        
        </div>
    </div>
  )
}

export default Hero
