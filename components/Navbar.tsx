"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Session } from "inspector";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopopVisible, setIsPopupVisible] = useState(true);
  const popupREf = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(popupREf.current && !popupREf.current.contains(e.target as Node)){
        setIsPopupVisible(false)
      }
    };

    document.addEventListener("click",handleClickOutside);
    if (!isPopopVisible) {
      document.removeEventListener("click",handleClickOutside);
      
    }

    return () => {
      document.removeEventListener("click",handleClickOutside);
    }
  },[isPopopVisible]);

  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">Exploring Tomorrows Innovation.</p>
      </div>

      {status === "authenticated" ? (
        <>
          <div 
          ref={popupREf}
          className={`absolute z-30 righ-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopopVisible ? "flex" : "hidden"}`}>
            <div className="font-bold">{session.user?.name}</div>
            <div>{session.user?.email}</div>
            <Link onClick={() => setIsPopupVisible(false)} className="hover:underline" href={"/dashboard"}>Dashboard</Link>
            <Link onClick={() => setIsPopupVisible(false)}  className="hover:underline" href={"/create-post"}>Create Post</Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Link href={'/create-post'} className="hidden md:flex gap-2 items-center mr-6">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              src={session.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
              onClick={() => setIsPopupVisible(!isPopopVisible)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
