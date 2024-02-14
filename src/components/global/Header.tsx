"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../ui/button";

import { ThemeSwitcher } from "@components/global";

import { ArrowLeftCircleIcon, Github } from "lucide-react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathName = usePathname();

  const headerVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 25) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 25) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={headerVariants}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={`fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between px-4 py-5 ${!isScrolledDown ? "bg-transparent" : "backdrop-blur-sm"}`}
        >
          {pathName != "/" && (
            <Button variant={"outline"} asChild>
              <Link href={"/"} className="flex items-center gap-x-2">
                <ArrowLeftCircleIcon className="h-[1.2rem] w-[1.2rem]" />
                <span>Back to Login</span>
              </Link>
            </Button>
          )}

          <div className="ml-auto flex items-center justify-center gap-x-3">
            <Button asChild variant={"outline"} size={"icon"}>
              <Link href="https://github.com/g9wz/yu-grades" target="blank_">
                <Github />
              </Link>
            </Button>
            <ThemeSwitcher />
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
