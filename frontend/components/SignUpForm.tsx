'use client';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/Input';
import { cn } from '../utils/cn';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';

interface SignupFormDemoProps {
  onSignInClick?: () => void;
}

interface Errors {
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function SignupFormDemo({ onSignInClick }: SignupFormDemoProps) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Errors>({});
  const [generalMessage, setGeneralMessage] = useState('');

  // Funcion que se ejecuta cuando se envia el formulario para registrarse
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});
    setGeneralMessage('');

    const newErrors: Errors = {};

    // Validar campos
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!lastname) newErrors.lastname = 'El apellido es obligatorio';
    if (!email) newErrors.email = 'El correo es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';

    // Validar que las contraseñas sean iguales
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Verificar si el correo ya está registrado
      const response = await fetch(`http://localhost:5000/api/users/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log('Usuario no encontrado');
        } else {
          throw new Error('Error al verificar el correo');
        }
      } else {
        const data = await response.json();
        if (data.exists) {
          setErrors({
            email: 'El correo ya está registrado. Por favor, use otro.',
          });
          return;
        }
      }

      // Enviar los datos al servidor para crear el usuario
      const createUserResponse = await fetch(
        'http://localhost:5000/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, lastname, email, password }),
        },
      );

      if (!createUserResponse.ok) {
        const errorData = await createUserResponse.json();
        if (errorData.message) {
          setErrors({ general: errorData.message });
        } else {
          throw new Error('Error al crear el usuario');
        }
      } else {
        setGeneralMessage('Registro exitoso');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setGeneralMessage(`Error al enviar el formulario: ${error.message}`);
      } else {
        setGeneralMessage('Error desconocido al enviar el formulario');
      }
    }
  };

  // Funcion que se ejecuta cuando se hace click en el boton de iniciar sesion
  const handleSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSignInClick) {
      onSignInClick();
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md w-full mx-auto rounded-none md:rounded-2xl p-2 sm:p-4 md:p-8 shadow-input bg-white dark:bg-black h-auto sm:h-30">
      <h2 className="text-lg sm:font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenid@ a EcoMed4D
      </h2>
      <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300">
        Registrese llenando los siguientes datos.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Nombre</Label>
            <Input
              id="firstname"
              placeholder="Juan Miguel"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              placeholder="Leon Gomez"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <p style={{ color: 'red' }}>{errors.lastname}</p>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="cristian@hotmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
        </LabelInputContainer>

        {generalMessage && (
          <p
            style={{
              color: generalMessage.includes('exitoso') ? 'green' : 'red',
            }}
          >
            {generalMessage}
          </p>
        )}

        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Registrarse &rarr;
          <BottomGradient />
        </button>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="button"
          onClick={onSignInClick}
        >
          o Inicie sesión &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4"></div>
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
