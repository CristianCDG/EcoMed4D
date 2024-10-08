"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSlideshow,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
import { IconCalendar, IconHospital, IconUser, IconBuildingHospital } from "@tabler/icons-react";


export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },{
      label: "Videos ecografía 4D",
      href: "/ultrasoundMedia",
      icon: (
        <IconSlideshow className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Perfíl",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Configuración",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Salír",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
    className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-full" // Cambiado de "max-w-7xl" a "w-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Cristian Dominguez",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard_UltrasoundMedia />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        EcoMed4D
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Content UltrasoundMedia
const Dashboard_UltrasoundMedia = () => {
    return (
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          
          {/* Cuatro rectángulos superiores */}
          <div className="flex gap-2">
            <div className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 flex items-center">
              <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-2" />
              <div className="text-black">
                <div>Fecha: 2023-10-06</div>
                <div>Hora: 09:22</div>
              </div>
            </div>
            <div className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 flex items-center">
              <IconHospital className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-2" />
              <div className="text-black">
                <div>Doctor: Dr. Smith</div>
                <div>Cargo: Pediatra</div>
              </div>
            </div>
            <div className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 flex items-center">
              <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-2" />
              <div className="text-black">
                <div>Paciente: Bebe 7 meses</div>
                <div>John</div>
              </div>
            </div>
            <div className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 flex items-center">
              <IconBuildingHospital className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-2" />
              <div className="text-black">
                <div>Hospital: General Hospital</div>
                <div>Lugar: Nueva York</div>
              </div>
            </div>
          </div>
  
          {/* Dos cuadros con videos */}
          <div className="flex gap-2 flex-1">
            {[...new Array(2)].map((i) => (
              <div key={1 + i} className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4 flex flex-col items-center">
                <h2 className="text-center mb-4 text-black">Número de video {i + 1}</h2>
                <video controls className="w-full max-w-2xl rounded-lg">
                  <source src="ruta_del_video.mp4" type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
