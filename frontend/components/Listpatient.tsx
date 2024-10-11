"use client"
import { cn } from "../utils/cn";
import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { SidebarComponent } from "./Sidebar"; 

interface Patient {
  cc: string
  name: string
  email: string
  file: File | null
}

const initialPatients: Patient[] = [
  { cc: "25478659", name: 'Juan Pérez', email: 'juan@example.com', file: null },
  { cc: "52369874", name: 'María García', email: 'maria@example.com', file: null },
  { cc: "10236548", name: 'Carlos Rodríguez', email: 'carlos@example.com', file: null },
]

export default function PatientList() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [searchCC, setSearchCC] = useState<string>('')
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(initialPatients)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, patientCC: string) => {
    if (e.target.files) {
      const updatedPatients = patients.map(patient => 
        patient.cc === patientCC ? { ...patient, file: e.target.files![0] } : patient
      )
      setPatients(updatedPatients)
      setFilteredPatients(updatedPatients)
    }
  }

  const handleSendFile = (patient: Patient) => {
    if (patient.file) {
      // Aquí iría la lógica para enviar el archivo al paciente
      console.log(`Enviando archivo "${patient.file.name}" a ${patient.name} (CC: ${patient.cc})`)
      // Después de enviar, podríamos limpiar el archivo
      const updatedPatients = patients.map(p => 
        p.cc === patient.cc ? { ...p, file: null } : p
      )
      setPatients(updatedPatients)
      setFilteredPatients(updatedPatients)
    } else {
      console.log('Por favor, seleccione un archivo primero para este paciente')
    }
  }

  const handleSearch = () => {
    const filtered = patients.filter(patient => patient.cc.includes(searchCC))
    setFilteredPatients(filtered.length > 0 ? filtered : patients)
  }
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
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CC</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Adjuntar Archivo</TableHead>
              <TableHead>Enviar Archivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.cc}>
                <TableCell>{patient.cc}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, patient.cc)}
                    className="max-w-xs"
                    aria-label={`Adjuntar archivo para ${patient.name}`}
                  />
                  {patient.file && (
                    <p className="text-sm text-gray-500 mt-1">{patient.file.name}</p>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSendFile(patient)}
                    disabled={!patient.file}
                    aria-label={`Enviar archivo a ${patient.name}`}
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