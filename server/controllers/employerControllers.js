const exp = require("constants");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Employer = require("../models/employerModel");
const ErrorHandler = require("../utils/ErrorHandlers");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const JobApplication = require("../models/jobApplicationModel");
const Studnt = require("../models/studentModel");
const Student = require("../models/studentModel");
const activationToken = require("../utils/activationToken");
const sendmailActication = require("../utils/sendmail");
const jwt = require('jsonwebtoken');
const { uploadImageToCloudinary } = require("../config/imageUploader");
const addModel = require("../models/adds")
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcj2gzytt",
  // cloud_name: "dcj2gzytt",
  api_key: process.env.CLOUDINARY_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

exports.homepage = catchAsyncError((req, res, next) => {
  res.json({ message: "Employer Homepage of Internshala" });
});

exports.currentemployer = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.id).exec();
  res.json({ employer });
});

exports.employersignup = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, contact, city, password, organisationname } = req.body;

  const employerCurrent = {
    firstname,
    lastname,
    email,
    contact,
    city,
    password,
    organisationname
  }

  const ActivationCode = Math.floor(1000 + Math.random() * 9000);
  console.log(ActivationCode)

  const data = { name: firstname, activationCode: ActivationCode };
  console.log(data)

  try {
    await sendmailActication(
      res,
      next,
      email,
      "Verification code",
      "activationMail.ejs",
      data
    );
    let token = await activationToken(employerCurrent, ActivationCode);
    console.log(token)
    let options = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      succcess: true,
      message: "successfully send mail pleas check your Mail",
      Token: token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  // const isExist = await Employer.findOne({email:email});
  // if(isExist) return next(new ErrorHandler("Employer with this email already exists", 401));
  // const employer = await new Employer(req.body).save();
  // sendtoken(employer, 200, res);
  // res.status(201).json({ employer });
});

exports.avtivateEmployer = catchAsyncError(async (req, res, next) => {
  let { activationCode } = req.body;
  console.log(activationCode)

  if (!activationCode) return next(new ErrorHandler("Provide Activation Code"));

  // const token = req.cookies || req.headers.authorization;
  const token = req.headers.authorization;
  console.log(token)
  const { user, ActivationCode } = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  console.log(user)

  if (!user) return next(new ErrorHandler("Invelide Token"));
  const isEmailExit = await Employer.findOne({ email: user.email });
  console.log(isEmailExit)

  if (isEmailExit)
    return next(new ErrorHandler("User With This Email Address Already Exits", 401));

  if (activationCode != ActivationCode)
    return next(new ErrorHandler("Wrong Activation Code"));

  let { firstname,
    lastname,
    email,
    contact,
    city,
    password,
    organisationname } =
    user;
  console.log(user)
  const newEmployer = await Employer.create({
    firstname,
    lastname,
    email,
    contact,
    city,
    password,
    organisationname
  })
  console.log(newEmployer)
  sendtoken(newEmployer, 200, res, req);

});

exports.employersingin = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employer) {
    return next(
      new ErrorHandler("Employer not found with this Email Address", 404)
    );
  }
  const isMatch = employer.comparepassword(req.body.password);
  if (!isMatch)
    return next(new ErrorHandler("Wrong Employer Credientials", 500));

  sendtoken(employer, 200, res);
});


exports.addCompanyDeatils = catchAsyncError(async (req, res, next) => {
  // const employer = await Employer.findById(req.id);
  // console.log(employer)

  // if (!employer) {
  //   return next(
  //     new ErrorHandler("Employer not found with this Email Address", 404)
  //   );
  // }
  console.log(req.body)

  const { industry, companySize, location, website, socialMedia } = req.body;
  if (!industry ||
    !companySize ||
    !location ||
    !website) return next(new ErrorHandler("Pleas Provide all details", 401));


  const employer = await Employer.findByIdAndUpdate(req.id, req.body)

  if (employer) {
    console.log("enter")
    res.status(200).json({ message: "Password Changed Successfully", employer });

  }

  // employer.industy = industy
  // console.log(employer, industy)
  // employer.companySize = companySize
  // employer.location = location`
  // employer.website = website
  // employer.socialMedia = socialMedia
  // await employer.save();



});


exports.employesendmailOtp = catchAsyncError(async (req, res, next) => {
  console.log(req.body)
  const employer = await Employer.findOne({ email: req.body.email }).exec();
  console.log("enter");
  console.log(employer);

  if (!employer) {
    return next(
      new ErrorHandler("User not found with this Email Address", 404)
    );
  }

  const ActivationCode = Math.floor(1000 + Math.random() * 9000);

  const data = { name: employer.firstName, activationCode: ActivationCode };

  employer.resetpasswordToken = 1;
  await employer.save();

  try {
    await sendmailActication(
      res,
      next,
      req.body.email,
      "Password Reset code",
      "forgetpassword.ejs",
      data
    );
    let token = await activationToken(employer.email, ActivationCode);


    let options = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      succcess: true,
      message: "successfully send mail pleas check your Mail",
      Token: token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.EmployerforgetlinkCode = catchAsyncError(async (req, res, next) => {

  let { activationCode, password } = req.body;

  if (!activationCode)
    return next(new ErrorHandler("Provide Reset Password Code"));

  if (!password)
    return next(new ErrorHandler("Provide Reset Password"));

  const token = req.header("Authorization");
  console.log(token)

  if (!token) return next(new ErrorHandler("please provide token", 401));

  const { user, ActivationCode } = await jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET
  );
  console.log(user)

  if (!user) return next(new ErrorHandler("Invelide Token"));

  const currUser = await Employer.findOne({ email: user }).select("+password").exec();
  console.log(currUser);

  if (!currUser) return next(new ErrorHandler("User not Found"));

  if (activationCode != ActivationCode)
    return next(new ErrorHandler("Wrong Activation Code"));
  if (currUser.resetpasswordToken == 0)
    return next(new ErrorHandler("You alredy used this Code"));

  const currentuser = await Employer.findByIdAndUpdate(
    currUser.id,
    { password: password, resetpasswordToken: 0 },
    {
      new: true,
    }
  );

  // currUser.resetpasswordToken = 0
  // currUser.save();
  // currUser.password = ""



  res.status(201).json({
    succcess: true,
    message: "successfully update password",
  });
});

// exports.addCompanyDetails = catchAsyncError(async (req, res, next) => {
//   const employer = await Employer.findById(req.id);

// });

exports.employersignout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Signout Employer done!" });
});

exports.employersendmail = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findOne({ email: req.body.email }).exec();

  if (!employer) {
    return next(
      new ErrorHandler("Employer not found with this Email Address", 404)
    );
  }
  const url = `${process.env.FROENTEND_URI}/admin/${employer._id}`;
  sendmail(req, res, next, url);
  employer.resetpasswordToken = "1";
  await employer.save();
  res.json({ employer, url });
});

exports.employeesendmailOtp = catchAsyncError(async (req, res, next) => {
  console.log(req.body)
  const employee = await Employer.findOne({ email: req.body.email }).exec();

  if (!employee) {
    return next(
      new ErrorHandler("User not found with this Email Address", 404)
    );
  }

  const ActivationCode = Math.floor(1000 + Math.random() * 9000);

  const data = { name: employee.name, activationCode: ActivationCode };

  employee.resetpasswordToken = 1;
  await employee.save();

  try {
    await sendmailActication(
      res,
      next,
      req.body.email,
      "Password Reset code",
      "forgetpassword.ejs",
      data
    );
    let token = await activationToken(employee.email, ActivationCode);

    let options = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      succcess: true,
      message: "successfully send mail pleas check your Mail",
      Token: token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.employeeforgetlinkCode = catchAsyncError(async (req, res, next) => {

  let { activationCode, password } = req.body;

  if (!activationCode)
    return next(new ErrorHandler("Provide Reset Password Code"));

  if (!password)
    return next(new ErrorHandler("Provide Reset Password"));

  const token = req.header("Authorization");
  console.log(token)

  if (!token) return next(new ErrorHandler("please provide token", 401));

  const { user, ActivationCode } = await jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET
  );

  if (!user) return next(new ErrorHandler("Invelide Token"));

  const currUser = await Employer.findOne({ email: user }).select("+password").exec();
  console.log(currUser);

  if (!currUser) return next(new ErrorHandler("User not Found"));

  if (activationCode != ActivationCode)
    return next(new ErrorHandler("Wrong Activation Code"));
  if (currUser.resetpasswordToken == 0)
    return next(new ErrorHandler("You alredy used this Code"));

  const currentuser = await Employer.findById(currUser._id).select("+password").exec();
  currentuser.password = password;
  currentuser.resetpasswordToken = 0;
  currentuser.save();


  res.status(201).json({
    succcess: true,
    message: "successfully update password",
  });
});

exports.employerforgetlink = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.params.id).exec();

  if (!employer) {
    return next(
      new ErrorHandler("Employer not found with this Email Address", 404)
    );
  }

  if (employer.resetpasswordToken == "1") {
    employer.resetpasswordToken = "0";
    employer.password = req.body.password;
    await employer.save();
  } else {
    return next(new ErrorHandler("Invalid forget link ! try again", 500));
  }

  res.status(200).json({ message: "Password Changed Successfully" });
});

exports.employerresetpassword = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.id).exec();
  employer.password = req.body.password;
  await employer.save();
  sendtoken(employer, 201, res);
});

exports.employerUpdate = catchAsyncError(async (req, res, next) => {
  await Employer.findByIdAndUpdate(req.id, req.body, { new: true }).exec();
  res
    .status(200)
    .json({ success: true, message: "Employer Updated Successfully!" });
});

exports.employerOrganisationLogo = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.id).exec();


  const file = req.files.organisationlogo;
  if (req.files && req.files.organisationlogo) {
    const file = req.files.organisationlogo;

    if (employer.organisationlogo.fileId !== "") {
      await cloudinary.uploader.destroy(
        employer.organisationlogo.fileId,
        (error, result) => {
          if (error) {
            console.error("Error deleting file from Cloudinary:", error);
          } else {
            console.log("File deleted successfully:", result);
          }
        }
      );
    }
    const filepath = req.files.organisationlogo;
    const myavatar = await cloudinary.uploader.upload(filepath.tempFilePath, {
      folder: "organisationlogo",
    });

    employer.organisationlogo = {
      fileId: myavatar.public_id,
      url: myavatar.secure_url,
    };

    await employer.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Profile Picture Updated Successfully!",
      });
  } else {
    // Handle the case where req.files or req.files.resuma is undefined
    return res
      .status(400)
      .json({ success: false, message: "No resuma file provided." });
  }
});

/* ------------ Job Controllers ---------- */

exports.createJob = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.id).exec();
  console.log(req.body)
  const job = await new Job(req.body);
  console.log(job)
  job.employer = employer._id;
  employer.jobs.push(job._id);
  await job.save();
  await employer.save();
  res.status(201).json({ success: true, job });
});

exports.readAllJob = catchAsyncError(async (req, res, next) => {
  const { jobTitle, location, jobType } = req.body; // Extract filter parameters from the request body
  const filters = {};

  if (jobTitle) {
    filters.title = { $regex: new RegExp(jobTitle, "i") }; // Case-insensitive partial match for jobTitle
  }

  if (location) {
    filters.location = { $regex: new RegExp(location, "i") }; // Case-insensitive partial match for location
  }

  if (jobType) {
    filters.jobType = jobType; // Exact match for jobType
  }

  // Use filters in the query to retrieve matching jobs
  const { jobs } = await Employer.findById(req.id)
    .populate({
      path: "jobs",
      match: filters,
    })
    .exec();

  res.status(200).json({ success: true, jobs });
});

exports.readSingleJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body)
    .populate("employer")
    .exec();
  res.status(200).json({ success: true, job });
});

/* ----------------All Applications----------------- */
exports.allApplications = catchAsyncError(async (req, res, next) => {
  const { email, contact, title } = req.body; // Extract filter parameters from query
  const filters = {};

  if (email) {
    filters["studentId.email"] = {
      $regex: new RegExp(email),
    };
  }

  if (title) {
    filters["jobId.title"] = {
      $regex: new RegExp(title),
    };
  }

  if (contact) {
    filters["studentId.contact"] = {
      $regex: new RegExp(contact),
    };
  }

  const applications = await Employer.findById(req.id).populate({
    path: "applications",
    populate: [
      { path: "jobId", match: { title: { $exists: true } } },
      { path: "studentId", match: filters },
    ],
    match: filters,
  });

  res
    .status(200)
    .json({ success: true, applications: applications.applications });
});

/* ------------ Intership Controllers ---------- */
exports.createInternship = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findById(req.id).exec();
  const internship = await new Internship(req.body);
  internship.employer = employer._id;
  employer.internships.push(internship._id);
  await internship.save();
  await employer.save();
  res.status(201).json({ success: true, internship });
});

exports.readAllInternship = catchAsyncError(async (req, res, next) => {
  const { internships } = await Employer.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ success: true, internships });
});

exports.readSingleInternship = catchAsyncError(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});

/* -------- Sensitive Delete Employer ------ */
exports.deleteEmployer = catchAsyncError(async (req, res, next) => {
  const deletingEmployerId = req.id;
  try {
    const deletedEmployer = await Employer.findByIdAndDelete(
      deletingEmployerId
    );
    if (!deletedEmployer)
      return next(new ErrorHandler("Student Not Found", 404));
    res.status(200).json({
      status: true,
      message: "Employer Account Deleted Successfully",
      deletedEmployer,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server issue",
    });
  }
});

exports.applicationsStatus = catchAsyncError(async (req, res, next) => {
  const { id, status } = req.body;
  const applicationstatus = await JobApplication.findById(id);

  applicationstatus.status = status;
  await applicationstatus.save();
  res.status(200).json({
    status: true,
    message: "Application updated",
  });
});

exports.SearchUsers = catchAsyncError(async (req, res, next) => {
  try {
    let searchQuery = req.query.q;
    let admin = await Employer.findById(req.id);

    // Check if search parameter is provided, if not, retrieve all users
    if (!searchQuery) {
      const allUsers = await getAllUsers();
      res.json(allUsers);
    } else {
      // Search based on provided parameter
      const users = await searchUsers(searchQuery);
      res.json(users);
    }
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  async function searchUsers(query) {
    const searchRegex = new RegExp(query, "i");

    const queryObj = {
      $or: [
        { name: { $regex: searchRegex } }, // Search in first name
        { email: { $regex: searchRegex } },  // Search in last name
      ]
    };

    return Student.find(queryObj);
  }

  async function getAllUsers() {
    return Student.find(); // Retrieve all users
  }
});

exports.SearchEmploye = catchAsyncError(async (req, res, next) => {
  try {
    let searchQuery = req.query.q;

    // Check if search parameter is provided, if not, retrieve all users
    if (!searchQuery) {
      const employes = await getAllEmploye();
      res.json(employes);
    } else {
      // Search based on provided parameter
      const employes = await SearchEmploye(searchQuery);
      res.json(employes);
    }
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  async function SearchEmploye(query) {
    const searchRegex = new RegExp(query, "i");

    const queryObj = {
      $or: [
        { firstname: { $regex: searchRegex } }, // Search in first name
        { lastname: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },  // Search in last name
        { organisationname: { $regex: searchRegex } },
      ]
    };

    return Employer.find(queryObj);
  }

  async function getAllEmploye() {
    return Employer.find(); // Retrieve all users
  }
});

exports.SearchJobs = catchAsyncError(async (req, res, next) => {
  try {
    let searchQuery = req.query.q;

    // Check if search parameter is provided, if not, retrieve all users
    if (!searchQuery) {
      const jobs = await getAllJobs();
      res.json(jobs);
    } else {
      // Search based on provided parameter
      const jobs = await searchJobs(searchQuery);
      res.json(jobs);
    }
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  async function getAllJobs() {
    return Job.find().populate("employer"); // Retrieve all users
  }

  async function searchJobs(query) {
    const searchRegex = new RegExp(query, "i"); // 'i' for case-insensitive
    return Job.find({
      $or: [
        { title: { $regex: searchRegex } },
        { skills: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { preferences: { $regex: searchRegex } },
      ],
    }).populate("employer");
  }
});

exports.DeleteUser = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await Student.findByIdAndDelete(id);
    const alluser = await Student.find();
    res.json({ success: true, message: "Delete User", user: alluser });
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

exports.DeleteEmployer = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const employer = await Employer.findByIdAndDelete(id);
    await Job.deleteMany({ employer: id });
    const allemployer = await Employer.find();
    res.json({ success: true, message: "Delete User", user: allemployer });
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

exports.MakeAdmin = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const employe = await Employer.findById(id);
    employe.isAdmin = true;
    employe.save();
    const allemploye = await Employer.find();
    res.json({ success: true, message: "Made Author", employe: allemploye });
  } catch (error) {
    console.error("Error in SearchUsers route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// exports.SerchJobs = catchAsyncError(async (req, res, next) => {
// 	try {
// 		const searchQuery = req.query.q; // Get search query from URL query parameters
// 		const location = req.query.location;

// 		const jobs = await searchJobs(searchQuery,location);
// 		res.json(jobs);
// 	} catch (error) {
// 		console.error('Error in AllJobs route:', error);
// 		res.status(500).json({ success: false, error: 'Internal Server Error' });
// 	}
// 	async function searchJobs(query,location) {
// 		const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive
// 		const locationRegex = new RegExp(location, 'i')
// 		return Job.find({
// 			$or: [
// 				{ title: { $regex: searchRegex } },
// 				{ skills: { $regex: searchRegex } },
// 				{ location: { $regex: locationRegex } },
// 				{ description: { $regex: searchRegex } },
// 				{ preferences: { $regex: searchRegex } },
// 			]
// 		});
// 	}
// });

// exports.AdminResgisterState = catchAsyncError(async (req, res, next) => {
// 	try {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const tomorrow = new Date();
//         tomorrow.setHours(24, 0, 0, 0);

//         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//         const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// 		console.log(firstDayOfMonth)
// 		console.log(lastDayOfMonth)
//         const registrationsToday = await Employer.countDocuments({
//             createdAt: { $gte: today, $lt: tomorrow }
//         });
// 		console.log(registrationsToday)

//         const registrationsThisMonth = await Employer.countDocuments({
//             createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
//         });
// 		console.log(registrationsThisMonth)

//         res.json({
//             today: registrationsToday,
//             thisMonth: registrationsThisMonth
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }

// });

exports.AdminResgisterState = catchAsyncError(async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the start of the current day
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Start date of the last 7 days

    const dates = []; // Array to store dates of the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    // Define an array to store the count of registrations for each day
    const registrationsLastSevenDays = [];

    // Loop through the dates and count registrations for each day
    for (const date of dates) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1); // End date for the query (exclusive)
      const registrationsCount = await Student.countDocuments({
        createdAt: { $gte: date, $lt: nextDate },
      });
      //   Format date as '2 May' or '3 May' without the year
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short'
      });
      registrationsLastSevenDays.push({
        date: formattedDate, // Format date as YYYY-MM-DD
        users: registrationsCount,
      });
    }
    res.json(registrationsLastSevenDays);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});





exports.AdminAllInfo = catchAsyncError(async (req, res, next) => {
  try {
    const userCount = await Student.countDocuments();
    const employerCount = await Employer.countDocuments();
    const jobCount = await Job.countDocuments();
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    const studentregistrationToday = await Student.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    const employerregistrationToday = await Employer.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    const jobregistrationToday = await Job.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    res.json({
      userCount,
      employerCount,
      jobCount,
      TodayUserRegistration: studentregistrationToday,
      TodayEmployerRegistration: employerregistrationToday,
      TodayJobRegistration: jobregistrationToday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


exports.deletEmployee = catchAsyncError(async (req, res, next) => {
  const employer = await Employer.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employer) {
    return next(
      new ErrorHandler("Employer not found with this Email Address", 404)
    );
  }
  const isMatch = employer.comparepassword(req.body.password);
  if (!isMatch)
    return next(new ErrorHandler("Wrong Employer Credientials pleas enter write password", 500));


  await Employer.findByIdAndDelete(employer._id);

  res.status(200).json({
    status: true,
    message: "Delete Successfully",
  });

});

exports.adds = async (req, res) => {
  try {
    const thumbnail = req.files.image;

    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const ad = await addModel.create({
      image: thumbnailImage.secure_url,
    });

    res.status(200).send({
      success: true,
      message: "Ad created successfully",
      ad,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create ad API!",
      error: error.message,
    });
  }
};
exports.getAllAds = async (req, res) => {
  try {
    const adds = await addModel.find({});
    res.status(200).send({
      success: true,
      adds
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in geting adds API!",
      error: error.message,
    });
  }
};
exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const deletedAd = await addModel.findByIdAndDelete(adId);

    if (!deletedAd) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ad deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting ad API!",
      error: error.message,
    });
  }
};