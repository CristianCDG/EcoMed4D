import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/Input';
import { cn } from '../utils/cn';

interface SignupFormDemoProps {
  onSignInClick?: () => void;
}

export function SignupFormDemo({ onSignInClick }: SignupFormDemoProps) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Reset errors and success message
      setErrors({});
      setSuccessMessage('');

      // Validate fields
      const newErrors: { [key: string]: string } = {};
      if (!name) newErrors.name = 'El nombre es obligatorio';
      if (!lastname) newErrors.lastname = 'El apellido es obligatorio';
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

      // Check if email already exists
      const emailCheckResponse = await fetch(
        `http://localhost:5000/api/user/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!emailCheckResponse.ok) {
        throw new Error('Error al verificar el correo electrónico');
      }

      const emailCheckData = await emailCheckResponse.json();
      if (emailCheckData.exists) {
        setErrors({ email: 'El correo electrónico ya está registrado' });
        return;
      }

      // Register user
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastname, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({
          general: errorData.message || 'Error al registrar usuario',
        });
        return;
      }

      setSuccessMessage('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar usuario', error);
      setErrors({ general: 'Error al registrar usuario' });
    }
  };

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
        Regístrese llenando los siguientes datos.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Nombre</Label>
            <Input
              id="firstname"
              placeholder="Juan"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              placeholder="Cruz"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="juan@gmail.com"
            type="email"
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
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
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </LabelInputContainer>
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="submit"
        >
          Registrarse &rarr;
        </button>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-3"
          type="button"
          onClick={handleSignInClick}
        >
          o Inicie sesión &rarr;
        </button>
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
