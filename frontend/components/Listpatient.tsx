"use client";
import { cn } from "../utils/cn";
import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { SidebarComponent } from "./Sidebar";
import jwt from "jsonwebtoken";

// Interfaz Datarow usando _id
interface Datarow {
  _id: string;
  name: string;
  email: string;
  file: File | null;
}

export default function PatientList() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<Datarow[]>([]);
  const [searchCC, setSearchCC] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState<Datarow[]>([]);
  const [usuario, setUsuario] = useState<{ name: string; id: string } | null>(null); // Usuario autenticado

  // Efecto para obtener los datos del paciente y validar el token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
    
        if (!token) {
          console.error("No estás autenticado. Redirigiendo al login.");
          window.location.href = "/dashboard"; // Redirige al login si no hay token
          return;
        }
        // Decodificar el token y establecer el usuario autenticado
        const decodedToken: any = jwt.decode(token);
        if (decodedToken) {
          setUsuario({ name: decodedToken.name, id: decodedToken.id });
        }

        // Hacer la solicitud GET con las cookies incluidas
        const response = await fetch('http://localhost:5000/api/patients', {
          method: "GET",
          credentials: "include", // Incluir cookies en la solicitud
          headers: {
            "Content-Type": "application/json",          
          },
        });

        if (response.status === 401) {
          console.error("Acceso no autorizado. Redirigiendo al login.");
          window.location.href = "/dashboard";
          return;
        }

        const result: Datarow[] = await response.json();
        setPatients(result);
        setFilteredPatients(result);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    patientCC: string
  ) => {
    if (e.target.files) {
      const updatedPatients = patients.map((patient) =>
        patient._id === patientCC
          ? { ...patient, file: e.target.files![0] }
          : patient
      );
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    }
  };

  const handleSendFile = (patient: Datarow) => {
    if (patient.file) {
      const updatedPatients = patients.map((p) =>
        p._id === patient._id ? { ...p, file: null } : p
      );
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    } else {
      console.log("Por favor, seleccione un archivo primero para este paciente");
    }
  };

  const handleSearch = () => {
    const filtered = patients.filter((patient) =>
      patient._id.includes(searchCC)
    );
    setFilteredPatients(filtered.length > 0 ? filtered : patients);
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-full"
      )}
    >
      {/* Sidebar a la izquierda */}
      <SidebarComponent open={open} setOpen={setOpen} />

      {/* Contenido principal a la derecha */}
      <div className="flex-1 container p-4 ml-auto">
        <div className="mb-4 flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Buscar por CC del paciente"
            value={searchCC}
            onChange={(e) => setSearchCC(e.target.value)}
            aria-label="Buscar por cédula de ciudadanía del paciente"
          />
          <Button onClick={handleSearch} style={{ cursor: "pointer" }}>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Adjuntar Archivo</TableHead>
              <TableHead>Enviar Archivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(filteredPatients) &&
              filteredPatients.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, row._id)}
                      className="max-w-xs cursor-pointer"
                    />
                    {row.file && (
                      <p className="text-sm text-green-500 mt-1">
                        Se seleccionó 1 archivo
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleSendFile(row)}
                      disabled={!row.file}
                      className={row.file ? "bg-green-500" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      Enviar Archivo
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
