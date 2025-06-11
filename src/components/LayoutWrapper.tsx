"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <>
      <Navbar setNavHeight={setNavHeight} />
      <main style={{ paddingTop: `${navHeight}px` }} className="min-h-screen">
        {children}
      </main>
    </>
  );
}
