// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const SECRET_KEY = "tu-clave-secreta"; // En un proyecto real, usa una variable de entorno

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validar que se enviaron email y contraseña
        if (!email || !password) {
            res.status(400).json({ message: "Email y contraseña son requeridos" });
            return;
        }

        // Leer el archivo users.json
        const filePath = path.join(__dirname, "../resources/users.json");
        const data = await readFile(filePath, "utf-8");
        const users = JSON.parse(data);

        // Buscar el usuario
        const user = users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (!user) {
            res.status(401).json({ message: "Credenciales inválidas" });
            return;
        }

        // Generar un JWT con el rol
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            code: 0,
            message: "Success",
            result: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validar que se enviaron email y contraseña
        if (!email || !password) {
            res.status(400).json({ message: "Email y contraseña son requeridos" });
            return;
        }

        // Leer el archivo users.json
        const filePath = path.join(__dirname, "../resources/users.json");
        const data = await readFile(filePath, "utf-8");
        const users = JSON.parse(data);

        // Verificar si el email ya existe
        if (users.find((u: any) => u.email === email)) {
            res.status(409).json({ message: "El email ya está registrado" });
            return;
        }

        // Crear un nuevo usuario
        const newUser = {
            id: `user${Date.now()}`, // ID único basado en timestamp
            email,
            password, // En producción, usar bcrypt para hashear
            role: "user", // Por defecto, nuevos usuarios son 'user'
        };

        // Añadir el usuario y guardar
        users.push(newUser);
        await writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

        // Generar un JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            code: 0,
            message: "Usuario registrado exitosamente",
            result: {
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role,
                },
            },
        });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};