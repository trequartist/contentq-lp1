"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import LogoKiwiQ from "@/components/LogoKiwiQ";

function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 text-white relative overflow-hidden" style={{
      background: "linear-gradient(180deg, rgba(12,16,24,0.92) 0%, rgba(10,12,18,0.96) 60%, rgba(6,8,12,1) 100%)",
      WebkitBackdropFilter: "blur(8px)",
      backdropFilter: "blur(8px)",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8">
                <LogoKiwiQ className="w-8 h-8" title="KiwiQ AI" />
              </div>
              <h2 className="text-lg font-bold text-white">KiwiQ AI</h2>
            </Link>

            {/* Removed attribution and share button */}
            <p className="text-sm text-gray-400 mt-5">
              © {new Date().getFullYear()} KiwiQ AI. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Removed Services column */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                {/* Removed GitHub link */}
                <li>
                  <Link href="https://www.linkedin.com/company/contentq" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/contentq" className="text-gray-400 hover:text-white transition-colors">
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tos" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-400/70 to-gray-600/40 select-none">
            KiwiQ AI
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer };