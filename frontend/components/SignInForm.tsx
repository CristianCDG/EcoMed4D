'use client';
import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/Input';
import { cn } from '../utils/cn';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface SignInFormDemoProps {
  onSignUpClick?: () => void;
}

export function SignInFormDemo({ onSignUpClick }: SignInFormDemoProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Constante que maneja el click en el botón de iniciar sesión
  const handleSignInClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Reset errors and success message
      setErrors({});
      setSuccessMessage('');

      // Validate fields
      const newErrors: { [key: string]: string } = {};
      if (!email) newErrors.email = 'El correo electrónico es obligatorio';
      if (!password) newErrors.password = 'La contraseña es obligatoria';
      if (!confirmPassword)
        newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';
      if (password !== confirmPassword)
        newErrors.confirmPassword = 'Las contraseñas no coinciden';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Attempt to log in
      const loginResponse = await fetch(
        'http://localhost:5000/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!loginResponse.ok) {
        throw new Error('Uno de los campos es incorrecto');
      }

      const loginData = await loginResponse.json();
      setSuccessMessage('Inicio de sesión exitoso');

      // Almacenar el token en localStorage
      localStorage.setItem('token', loginData.token); // Almacenar el token en localStorage

      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al registrar usuario', error);
      setErrors({ general: 'Error al registrar usuario' });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenid@ a EcoMed4D
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Inicie sesión con sus credenciales.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="Juan@hotmail.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Confirmar contraseña</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </LabelInputContainer>

        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="submit"
          onClick={handleSignInClick}
        >
          Inicie sesión &rarr;
          <BottomGradient />
        </button>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="button"
          onClick={onSignUpClick}
        >
          o Registrese &rarr;
          <BottomGradient />
        </button>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="submit"
        >
          ¿Contraseña olvidada? &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
