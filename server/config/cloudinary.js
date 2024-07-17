const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: "dcj2gzytt",
			api_key: process.env.CLOUDINARY_PUBLIC_KEY,
			api_secret: process.env.CLOUDINARY_SECRET_KEY,
		});
	} catch (error) {
		console.log(error);
	}
};
