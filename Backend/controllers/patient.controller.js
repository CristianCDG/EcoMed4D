import Patient from "../models/patient.model.js"
import bycrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const getPatients = async (req, res) => {
    const patients = await Patient.find({
        user: req.user.id
    }).populate('user')
    console.log(patients)
    res.json(patients);
}

export const createPatient = async (req, res) => {
    const {name, email, password} = req.body

    const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "El paciente ya existe" });
        }

        // Se encripta la contraseña del paciente y se crea el nuevo usuario
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

    const newPatient = new Patient({
        name, 
        email,
        password: hashedPassword,
        user: req.user.id
    });

    const savedPatient = await newPatient.save()
    res.json(savedPatient)

}

// export const getPatient = async (req, res) => {
    // const patientFound = await Task.findById(req.params.id).populate('user')
    // if(!patientFound) return res.status(404).json({ message: "Paciente no encontrado"})
    // console.log(patientFound); // Imprime el objeto antes de enviarlo
    // res.json(patientFound);
//}

// export const updateTask = async (req, res) => {
   // const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, {
     //   new : true
    // });
    // if(!taskFound) return res.status(404).json({ message: "Paciente no encontrado"})
    // res.json(taskFound);
// }

// export const deleteTask = async (req, res) => {
   // const taskFound = await Task.findByIdAndDelete(req.params.id)
   // if(!taskFound) return res.status(404).json({ message: "Task not found"})
   // return res.sendStatus(204);
// }