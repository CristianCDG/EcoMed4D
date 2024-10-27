"use client";
import React, { useState,useEffect } from "react";
import { SidebarComponent } from "./Sidebar"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Mail, User } from "lucide-react"
import { cn } from "../utils/cn";
import jwt from "jsonwebtoken";


type User = { email: string; name: string; id: string } | null;

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<User>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); 
      if (token) {
        const decodeToken: any = jwt.decode(token);
      
        console.log(decodeToken)
        if (decodeToken) {
          const loginUser = { name: decodeToken.name, id: decodeToken.id, email: decodeToken.email};
          setUsuario(loginUser);
        }
      }
    }
  }, []); 

  return (
    <div
    className={cn(
      "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      "h-screen w-full"
    )}
  >
    <SidebarComponent open={open} setOpen={setOpen} />
    <div className="flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-primary/20 to-background min-h-screen">
        <div className="container px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Avatar className="w-40 h-40 mx-auto">
                <AvatarImage src="https://avatars.githubusercontent.com/u/1561955?v=4" alt="Foto de perfil" />
                <AvatarFallback>Cristian</AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-bold">Perfil del Usuario</h1>
              <p className="text-xl text-muted-foreground">
                {usuario?.email}
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-lg p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Nombre de Usuario</h2>
                  <p className="text-muted-foreground">
                    {usuario?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold">Correo Electrónico</h2>
                  <p className="text-muted-foreground">
                    {usuario?.email}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button variant="destructive" size="lg" className="w-full max-w-md">
                <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}