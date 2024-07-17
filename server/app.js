const express = require('express');
const app = express();
const connectDb = require('./models/database');
const loggger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Database Connection
connectDb.databaseConnect();

//Express FileUpload
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");


app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
cloudinaryConnect();

// Express-Session , Cookie-parser
const cookieparser = require('cookie-parser');
app.use(cookieparser());

// CORS setup
const allowedOrigins = [
	'https://demoto.vercel.app',
	'https://satisfiedjob.com',
	'http://satisfiedjob.com',
	'http://localhost:3000',
];

app.use(cors({
	// origin: 'https://demoto.vercel.app',
	// origin: 'https://satisfiedjob.com',
	origin: allowedOrigins,
	credentials: true,
	optionsSuccessStatus: 200 // Address potential preflight request issues
}));


// app.use(cors({x
// 	origin: "https://final-satisfiend-job.onrender.com/",
// 	credentials: true,
// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// 	optionsSuccessStatus: 200 // Address potential preflight request issues
// }));

//logger
app.use(loggger('tiny'));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const session = require('express-session');
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.EXPRESS_SESSION_SECRET,
	})
);


//Routes
app.use('/user', require('./routes/indexRoutes'));
app.use('/resume', require('./routes/resumeRoutes.js'));
app.use('/employer', require('./routes/employerRoutes.js'));

app.use("/course", require("./routes/course.js"));

//Error Handling
const ErrorHandler = require('./utils/ErrorHandlers');
const { generatedErrors } = require('./middlewares/error');
app.all('*', (req, res, next) => {
	next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(
	process.env.PORT,
	console.log(`Server is RunninG on Port ${process.env.PORT}`)
);

module.exports = app;
