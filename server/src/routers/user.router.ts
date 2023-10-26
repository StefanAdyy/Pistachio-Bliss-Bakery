import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body; //destructurin assignment
    const user = sample_users.find(user => user.email === email &&
        user.password === password);

    if (user) {
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(400).send("Adresa de e-mail sau parola sunt invalide!");
    }
});

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