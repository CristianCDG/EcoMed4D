'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Search } from "lucide-react"

interface Document {
  id: string
  name: string
  date: string
  type: string
  size: string
}

export default function Patientfile() {
  const documents: Document[] = [
    {
      id: "1",
      name: "Gráfico Análisis.pdf",
      date: "2024-01-15",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      id: "2",
      name: "Resultados Ecografía.pdf",
      date: "2024-01-14",
      type: "PDF",
      size: "1.8 MB"
    },
    {
      id: "3",
      name: "Informe Médico.pdf",
      date: "2024-01-13",
      type: "PDF",
      size: "3.2 MB"
    }
  ]
  return (
    <div className="w-full h-screen p-4  pt-5"> {/* Quita max-w-6xl y mx-auto */}
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-normal">Resultados de Examenes</h1>
      </div>
      <div className="w-full relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar documentos..." className="w-full pl-8" />
        </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Archivo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Tamaño</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
  
      {documents.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No hay documentos disponibles
        </div>
      )}
    </div>
  )
}