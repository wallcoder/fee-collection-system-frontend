import express from 'express';
import {
    showCourses,
    showCourseById,
    createCourse,
    updateCourse, deleteCourse, showCoursesPaginated, showCourseNames, createCourseName,


} from '../controllers/course.js';
import db from "../config/database.js";
import {
    showFeeComponents,
    showCourse,
    createFeeComponent,
    deleteFeeComponent,
    editFeeComponent

} from '../controllers/feeComponent.js'

import { showAdmins, createAdmin, deleteAdmin } from '../controllers/admin.js';
import { showFeeStatus } from '../controllers/feeStatus.js';
import { updateInstitutionDetails } from '../controllers/myInstitution.js'
const router = express.Router();

import { showInquiries, deleteInquiry } from '../controllers/inquiry.js';
import { showFaqs, createFaq, deleteFaq, editFaq } from '../controllers/faq.js';
import { createFeeStructure, deleteFeeStructure, editFeeStructure, showFeeStructures, showCoursesFs, getFeeMapping, showFeeComponentsFs } from '../controllers/feeStructure.js';
import multer from 'multer';
import { getFaqs } from '../models/faqsModel.js';
import { insertFeeStructure } from '../models/FeeStructureModel.js';
import { adminLoginAuth, showProfile, authenticateToken, searchStudent } from '../controllers/auth.js';
import { showPayments, deletePayment } from '../controllers/payment.js';
import { showStudents, createStudent, editStudent, deleteStudent } from '../controllers/student.js';
import { showStudentFees, createStudentFee, deleteStudentFee, editStudentFee } from '../controllers/studentFee.js';
import { getStudent, getStudentFee, getStudentFeePaid, editLateFee } from '../controllers/studentPanel.js';
import { pay, verifyPayment, paymentDetails } from '../controllers/razorpay.js';
import { storePay } from '../controllers/payFee.js';
import { createInquiry } from '../controllers/contactUs.js';
import { showInstitution, editInstitution } from '../controllers/institution.js';
import { getAccount, editAccount, editPassword } from '../controllers/adminNav.js';
import { showTotalAdmins, showTotalAssAdmins, showTotalCourses, showTotalFeeAmount, showTotalHeadAdmins, showTotalStudents } from '../controllers/dashboard.js';
// import path from 'path';
// Edid account
router.get('/account/:id', getAccount);
router.put('/edit-account/:id', editAccount);
router.put('/edit-password/:id', editPassword);
// stats dashboard
router.get('/dashboard/total-admins', showTotalAdmins)
router.get('/dashboard/total-assistant-admins', showTotalAssAdmins)
router.get('/dashboard/total-head-admins', showTotalHeadAdmins)
router.get('/dashboard/total-courses', showTotalCourses)
router.get('/dashboard/total-fee-amount', showTotalFeeAmount)
router.get('/dashboard/total-students', showTotalStudents)
// institutiom
router.get('/institution', authenticateToken, showInstitution)
router.get('/institution-no-auth', showInstitution)
router.put('/institution', authenticateToken, editInstitution)

// contact us
router.post('/send-inquiry', createInquiry)
// COURSE
router.get("/courses", authenticateToken, showCourses);
router.get("/courses/:id", authenticateToken, showCourseById);
router.post('/courses', authenticateToken, createCourse);
router.put('/courses/:id', authenticateToken, updateCourse);
router.delete('/courses/:id', authenticateToken, deleteCourse);
router.get("/courses-paginated", authenticateToken, showCoursesPaginated);
router.get("/course-names", authenticateToken, showCourseNames);
router.post("/add-course-name", authenticateToken, createCourseName);

// FEE COMPONENTs
router.get("/fee-components", authenticateToken, showFeeComponents);
router.get("/course", authenticateToken, showCourse);
router.post("/fee-components", authenticateToken, createFeeComponent);
router.delete("/fee-components/:id", authenticateToken, deleteFeeComponent);
router.put("/fee-components/:id", authenticateToken, editFeeComponent);

// ADMINS
router.get("/admins", authenticateToken, showAdmins);
router.post("/admins", authenticateToken, createAdmin);
router.delete("/admins/:id", authenticateToken, deleteAdmin);


// FAQS
router.get("/faqs", authenticateToken, showFaqs);
router.get("/faqs-no-auth", showFaqs);
router.post("/faqs", authenticateToken, createFaq);
router.delete("/faqs/:id", authenticateToken, deleteFaq);
router.put("/faqs/:id", authenticateToken, editFaq);

// FEE STATUS
router.get("/fee-status", authenticateToken, showFeeStatus);


// FEE STRUCTURE
router.get("/fee-structures", authenticateToken, showFeeStructures);
router.post("/fee-structures", authenticateToken, createFeeStructure);
router.delete("/fee-structures/:id", authenticateToken, deleteFeeStructure);
router.put("/fee-structures/:id", authenticateToken, editFeeStructure)
router.get("/fee-structures/courses", authenticateToken, showCoursesFs);
router.get("/fee-structures/fee-components", authenticateToken, showFeeComponentsFs);
router.get("/fee-structures/fee-mapping/:id", authenticateToken, getFeeMapping)


// MY INSTITUTION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Custom file naming
    },
});

// Initialize Multer
const upload = multer({ storage });

// INQUIRIES
router.get("/inquiries", authenticateToken, showInquiries);
router.delete("/inquiries/:id", authenticateToken, deleteInquiry);

// ADMIN LOGIN
router.post("/auth/login", adminLoginAuth);
router.get("/profile", authenticateToken, showProfile);

// Payments
router.get("/payments", authenticateToken, showPayments)
router.delete("/payments/:id", authenticateToken, deletePayment)

// Student
router.get("/students", authenticateToken, showStudents)
router.post("/students", authenticateToken, createStudent)
router.put("/students/:id", authenticateToken, editStudent)
router.delete("/students/:id", authenticateToken, deleteStudent)

// Student Fees
router.get("/student-fees", authenticateToken, showStudentFees)
router.delete("/student-fees/:id", authenticateToken, deleteStudentFee)
router.post("/student-fees", authenticateToken, createStudentFee)
router.put("/student-fees/:id", authenticateToken, editStudentFee)

// Student Search
router.get("/search-registration-number/:id", searchStudent)

// Student Panel
router.get("/student-profile/:id", getStudent)
router.get("/student-profile/student-fee/:id", getStudentFee)
router.get("/student-profile/student-fee-paid/:id", getStudentFeePaid)
router.get("/student-profile/fee-mapping/:id", getFeeMapping)
router.put("/student-profile/late-fee/:id", editLateFee)


// Define the route for updating institution
router.put('/update-institution', upload.single('logo'), updateInstitutionDetails);

// razorpay
router.post('/createOrder', pay)
router.post('/verify-payment', verifyPayment)
router.get('/payment-details/:id', paymentDetails)

// payment details
router.post('/store-payment-details', storePay)

































































router.get('/payment-summary', (req, res) => {
    try {
        
        const query = `
            SELECT 
              CASE 
                WHEN status = 'paid' AND state = 'active' THEN 'Paid Fees' 
                WHEN status = 'unpaid' AND state = 'active' THEN 'Unpaid Fees' 
              END as fee_status,
              COUNT(*) as fee_count
            FROM 
              student_fee
            WHERE 
              status IN ('paid', 'unpaid') AND state = 'active'
            GROUP BY 
              fee_status;
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log("Raw Results: ", results); 

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'No data found' });
            }

            const paymentSummary = results.reduce((acc, row) => {
                acc[row.fee_status] = parseInt(row.fee_count);
                return acc;
            }, {});

            console.log("Payment Summary: ", paymentSummary); 

            res.json(paymentSummary);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/monthly-payment-summary', (req, res) => {
    try {
        const query = `
            SELECT 
              DATE_FORMAT(payment_date, '%Y-%m') AS month,
              SUM(payment_amount) AS total_amount
            FROM 
              payment
            WHERE 
              status = 'success' AND state = 'active'
            GROUP BY 
              month
            ORDER BY 
              month;
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log("Raw Results: ", results); 

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'No data found' });
            }

            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/payment-status-summary', (req, res) => {
    try {
        
        const query = `
            SELECT 
              CASE 
                WHEN status = 'success' AND state = 'active' THEN 'Success' 
                WHEN status = 'failure' AND state = 'active' THEN 'Failure' 
              END as payment_status,
              COUNT(*) as payment_count
            FROM 
              payment
            WHERE 
              status IN ('success', 'failure') AND state = 'active'
            GROUP BY 
              payment_status;
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log("Raw Results: ", results); 

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'No data found' });
            }

            const paymentStatusSummary = results.reduce((acc, row) => {
                acc[row.payment_status] = parseInt(row.payment_count);
                return acc;
            }, {});

            console.log("Payment Status Summary: ", paymentStatusSummary); 

            res.json(paymentStatusSummary);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;



