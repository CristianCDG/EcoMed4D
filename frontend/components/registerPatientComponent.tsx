"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { cn } from "../utils/cn";
import { SidebarComponent } from "./Sidebar";

export default function RegisterPatientComponent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado");
    router.push("/dashboard");
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-full"
      )}
    >
      {/* Sidebar reutilizable */}
      <SidebarComponent open={open} setOpen={setOpen} />

      {/* Contenido principal */}
      <div className="flex-1 container p-4 ml-auto">
        <div className="p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 w-full h-full">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Registro de Paciente
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Por favor, complete los siguientes datos para registrar a un paciente.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Nombre</Label>
                <Input
                  id="firstname"
                  placeholder="Nombre del paciente"
                  type="text"
                  required
                  className="bg-white text-black placeholder-black"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  id="lastname"
                  placeholder="Apellido del paciente"
                  type="text"
                  required
                  className="bg-white text-black placeholder-black"
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="paciente@example.com"
                type="email"
                required
                className="bg-white text-black placeholder-black"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                required
                className="bg-white text-black placeholder-black"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                placeholder="••••••••"
                type="password"
                required
                className="bg-white text-black placeholder-black"
              />
            </LabelInputContainer>

            <button
              type="submit"
              className="w-full py-2 px-4 font-medium text-gray-800 bg-white rounded-md shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
            >
              Registrar un paciente &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
