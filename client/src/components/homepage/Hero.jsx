import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
// import {  } from "";

export const Hero = () => {
  return (
    <section className="text-center px-4 bg-heroPattern bg-center bg-opacity-5 pt-20 min-h-[90vh] bg-no-repeat bg-cover ">
      <div className="mb-10 max-w-3xl bg mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Find the Perfect <span className="italic">Freelancer</span> for Your Next Project
        </h1>
        <p className="text-xl text-muted-foreground mb-7">
          Hire top-rated professionals in design, development, writing, and
          more. Safe, fast, and reliable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-7">
          <Link to={"/login"} className="bg-sky-400 hover:bg-sky-500  transition duration-300 text-white px-3 py-2.5 rounded-md font-medium">Post a Job</Link>
          <Link to={"/signup"} className="border border-gray-400 transition duration-300 hover:bg-gray-100 px-3 py-2.5 rounded-md font-medium" >Join as a Freelancer</Link>
        </div>
        {/* <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for any service..."
            className="pl-4 pr-10 py-3.5 outline-none border rounded-md border-gray-400 w-full"
          />
          <MagnifyingGlassIcon className="absolute h-9 w-9 p-1.5 rounded-md cursor-pointer bg-slate-800 hover:bg-slate-700 transition duration-300 text-white right-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div> */}
      </div>
    </section>
  );
};
