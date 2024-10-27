import mongoose from 'mongoose';

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }, // El documento expirará en 1 hora
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

export default TempUser;