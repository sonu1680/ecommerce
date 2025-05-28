import { Applicant } from "../db_schema/jobSchema.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/resumes/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

export const job= async (req, res) => {
  try {
    const { fullName, birthDate, gender, address, aadhar, contact, email } =
      req.body;
console.log(req.body)
    // Save new applicant
    const newApplicant = new Applicant({
      fullName,
      birthDate,
      gender,
      address,
      aadhar,
      contact,
      email,
      resumeUrl: req.file ? req.file.path : null,
    });

    await newApplicant.save();
    res.status(201).json({ message: "Application saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
