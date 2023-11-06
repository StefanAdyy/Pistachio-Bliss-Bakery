import { Router } from 'express';
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();

        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is done!");
    }
));

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body; //destructurin assignment
        const user = await UserModel.findOne({ email, password });

        if (user) {
            res.send(generateTokenResponse(user));
        }
        else {
            res.status(HTTP_BAD_REQUEST).send("Adresa de e-mail sau parola sunt invalide!");
        }
    }
));

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(HTTP_BAD_REQUEST)
                .send('Utilizatorul exista deja, conecteaza-te!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLoweCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);

        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "Text random", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
}

export default router;