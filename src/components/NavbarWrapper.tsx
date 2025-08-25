"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SimpleNavbar from "@/components/SimpleNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <>
      {isHomePage ? <Navbar /> : <SimpleNavbar />}
    </>
  );
}
