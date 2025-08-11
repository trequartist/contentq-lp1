"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 bg-slate-900 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <h2 className="text-lg font-bold text-white">ContentQ</h2>
            </Link>

            <h1 className="text-gray-300 mt-4">
              Built by{" "}
              <span className="text-[#94D82D]">
                <Link href="https://x.com/anishcodes">@AnishAcharya</Link>
              </span>
            </h1>
            <div className="mt-2">
            <Link href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23ContentQ%20share%20your%20thought%20%40anishcodes%20">
              <Button variant='secondary'>
                Share Your Thoughts On
                <Icons.twitter className="icon-class ml-1 w-3.5 " />
              </Button>
            </Link>
            </div>
            <p className="text-sm text-gray-400 mt-5">
              © {new Date().getFullYear()} ContentQ. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    Content Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/authority" className="text-gray-400 hover:text-white transition-colors">
                    Authority Building
                  </Link>
                </li>
                <li>
                  <Link href="/ai-optimization" className="text-gray-400 hover:text-white transition-colors">
                    AI Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/linkedin" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn Growth
                  </Link>
                </li>
                <li>
                  <Link href="https://blog.contentq.ai/" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
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
                <li>
                  <Link href="https://github.com/contentq" className="text-gray-400 hover:text-white transition-colors">
                    Github
                  </Link>
                </li>
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
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-gray-600 select-none">
            ContentQ
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer };