"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/Input";
import { cn } from "../utils/cn";

export default function RegisterPacient() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 mt-10 rounded-lg shadow-lg bg-gray-800">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Registro de Paciente
      </h2>
      <p className="text-gray-300 text-sm mb-6">
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
            className="bg-white text-black placeholder-black" // Estilos para el campo
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            required
            className="bg-white text-black placeholder-black" // Estilos para el campo
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            type="password"
            required
            className="bg-white text-black placeholder-black" // Estilos para el campo
          />
        </LabelInputContainer>

        <button
          className="w-full py-2 px-4 font-medium text-gray-800 bg-white rounded-md shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
          type="submit"
        >
          Registrar un paciente &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-gray-700 to-transparent h-[1px] my-6" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
