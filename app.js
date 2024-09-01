import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from 'cookie-parser';
import conn from './db.js';
import { checkUser } from './middlewares/authMiddleware.js';
import axios from 'axios';

conn();

const app = express();
const port = 3000;

// EJS şablon motorunu ayarla
app.set("view engine", "ejs");

// Statik dosyalar için middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Tüm GET istekleri için kullanıcı kontrolü
app.use('*', checkUser);

// Ana sayfa route'u
app.get('/', async (req, res) => {
    let city = "Adana"; // Varsayılan şehir, bunu değiştirebilirsiniz
    let weatherData = {};

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`);
        const { temp } = response.data.main;
        const { description } = response.data.weather[0];
        const icon = response.data.weather[0].icon;
        weatherData = { city, temp, description, icon };
    } catch (error) {
        console.error("Weather API Error:", error);
        weatherData = { city: "Error", temp: "N/A", description: "Invalid API key", icon: null };
    }

    res.render('index', weatherData);
});

app.use("/", pageRoute);
app.use("/about.html", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});
