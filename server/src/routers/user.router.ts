import { Router } from 'express';
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

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
            res.status(400).send("Adresa de e-mail sau parola sunt invalide!");
        }
    }
));

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