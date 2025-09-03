"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import SimpleNavbar from "@/components/landing/SimpleNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <>
      {isHomePage ? <Navbar /> : <SimpleNavbar />}
    </>
  );
}
