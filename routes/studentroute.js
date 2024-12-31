// student route will here
const express = require("express");
const router = express.Router();
const Student = require("../model/Student");

// get all students
router.get("/all-students", async (req, res) => {
  
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get single student
router.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// registration of new student
router.post("/register-student", async (req, res) => {
    //extract data
    const { firstName, lastName, email, address, dob, gender } = req.body;
    try {

        // validation
        if (!firstName || !lastName || !email || !address || !dob || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
            // regitser new student
        const student = await Student.create({
            firstName,
            lastName,
            email,
            address,
            dob,
            gender
        });
        res.status(201).json({
            success: true,
            data: student
       
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  approve student
router.patch("/approve-student/:id", async (req, res) => {

    try {
        const student = await Student.findById(req.params.id);
        student.isStudent = true;
        await student.save();
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


//Maye Dave
// update student information
router.put("/update-student/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.email = req.body.email;
        student.address = req.body.address;
        student.dob = req.body.dob;
        student.gender = req.body.gender;
        await student.save();
        res.status(200).json({
            success: true,
            data: student,
            message: "Student updated successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete student information
router.delete("/delete-student/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: student,
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get all approved students
router.get("/all-approved-students", async (req, res) => {
    try {
        const students = await Student.find({ isStudent: true });
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;