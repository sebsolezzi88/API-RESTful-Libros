import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

//obtemos la palabra secreta de las variable de entorno
const JWT_SECRET = process.env.JWT_SECRET;

//roles validos
const validRoles = ["admin", "user"];


export const registerUser = async (req, res) => {}

export const loginUser = async (req,res) =>{}