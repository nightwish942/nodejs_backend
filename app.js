import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from 'cookie-parser';
import askBotRoute from "./routes/ask-bot.js"; // Bot route'unu tekrar dahil et
import conn from './db.js';
import { checkUser } from './middlewares/authMiddleware.js';

conn();

const app = express();
const port = 3000; 

// EJS şablon motorunu ayarla
app.set("view engine", "ejs");

// Statik dosyalar için middleware
app.use(express.static('public'));

// Bot route'unu kullan
app.use("/", askBotRoute); // Yorum satırından çıkar ve aktif hale getir

app.use("/", pageRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Tüm GET istekleri için kullanıcı kontrolü
app.get('*', checkUser);

// Diğer route'lar
app.use("/about.html", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});
