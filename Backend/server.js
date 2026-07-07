const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "HTML")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "HTML", "index.html"));
});
const PORT = process.env.PORT || 5000;
// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("❌ MySQL Connection Failed");
        console.log(err);
        return;
    }

    console.log("✅ Connected to MySQL Database!");
});



// ===========================
// EMAIL TRANSPORTER
// ===========================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

app.post("/reserve", (req, res) => {

    const {
        full_name,
        email,
        phone,
        reservation_date,
        reservation_time,
        guests,
        seating,
        occasion,
        special_request
    } = req.body;

    const sql = `
        INSERT INTO reservations
        (full_name, email, phone, reservation_date, reservation_time, guests, seating, occasion, special_request)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            full_name,
            email,
            phone,
            reservation_date,
            reservation_time,
            guests,
            seating,
            occasion,
            special_request
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            const mailOptions = {

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Reservation Confirmed | BANEUIRE",

    html: `
    
    <div style="
        font-family:Arial;
        background:#111;
        color:white;
        padding:30px;
        border-radius:10px;
    ">

        <h1 style="color:#D4AF37;">
            BANEUIRE
        </h1>

        <h2>Reservation Confirmed</h2>

        <p>Hello <b>${full_name}</b>,</p>

        <p>
        Thank you for reserving a table at
        <b>BANEUIRE</b>.
        </p>

        <hr>

        <p><b>Date :</b> ${reservation_date}</p>

        <p><b>Time :</b> ${reservation_time}</p>

        <p><b>Guests :</b> ${guests}</p>

        <p><b>Occasion :</b> ${occasion || "Not Specified"}</p>

        <hr>

        <p>
        We look forward to serving you.
        </p>

        <h3 style="color:#D4AF37;">
            Team BANEUIRE
        </h3>

    </div>

    `
};

transporter.sendMail(mailOptions, (mailError) => {

    if (mailError) {

        console.log(mailError);

        return res.status(500).json({
            message: "Reservation saved but email failed."
        });

    }

    res.json({
        message: "Reservation saved and email sent successfully!"
    });

});

        }
    );

});


app.get("/reservations", (req, res) => {

    const sql = `
        SELECT *
        FROM reservations
        ORDER BY reservation_date DESC,
                 reservation_time DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

app.put("/reservations/:id", (req, res) => {

    const reservationId = req.params.id;

    // Get reservation details
    const reservationSql = `
        SELECT *
        FROM reservations
        WHERE reservation_id = ?
    `;

    db.query(reservationSql, [reservationId], (err, reservationResult) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (reservationResult.length === 0) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        const reservation = reservationResult[0];

        // Find the smallest available table that can fit the guests
        const tableSql = `
            SELECT *
            FROM restaurant_tables
            WHERE status = 'Available'
            AND seats >= ?
            ORDER BY seats ASC
            LIMIT 1
        `;

        db.query(tableSql, [reservation.guests], (err, tableResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (tableResult.length === 0) {

                return res.json({
                    message: "No available table for this reservation."
                });

            }

            const table = tableResult[0];

            // Reserve the table
            const updateTableSql = `
                UPDATE restaurant_tables
                SET status = 'Reserved'
                WHERE table_id = ?
            `;

            db.query(updateTableSql, [table.table_id], (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                // Confirm reservation and save assigned table
                const updateReservationSql = `
                    UPDATE reservations
                    SET
                        status = 'Confirmed',
                        table_number = ?
                    WHERE reservation_id = ?
                `;

                db.query(
                    updateReservationSql,
                    [table.table_number, reservationId],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.json({
                            message: "Reservation confirmed successfully.",
                            table: table.table_number
                        });

                    }
                );

            });

        });

    });

});

app.delete("/reservations/:id", (req, res) => {

    const reservationId = req.params.id;

    // Find the reservation first
    const reservationSql = `
        SELECT table_number
        FROM reservations
        WHERE reservation_id = ?
    `;

    db.query(reservationSql, [reservationId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        const tableNumber = result[0].table_number;

        // Function to delete the reservation
        const deleteReservation = () => {

            const deleteSql = `
                DELETE FROM reservations
                WHERE reservation_id = ?
            `;

            db.query(deleteSql, [reservationId], (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Reservation Deleted Successfully"
                });

            });

        };

        // If a table was assigned, make it available again
        if (tableNumber) {

            const updateTableSql = `
                UPDATE restaurant_tables
                SET status = 'Available'
                WHERE table_number = ?
            `;

            db.query(updateTableSql, [tableNumber], (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                deleteReservation();

            });

        } else {

            deleteReservation();

        }

    });

});
// ===============================
// GET ALL RESTAURANT TABLES
// ===============================

app.get("/tables", (req, res) => {

    const sql = `
        SELECT *
        FROM restaurant_tables
        ORDER BY table_number
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
// ===============================
// ADMIN LOGIN
// ===============================

app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    const sql = `
        SELECT *
        FROM admins
        WHERE username = ? AND password = ?
    `;

    db.query(sql, [username, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        if (result.length > 0) {

            res.json({
                success: true,
                message: "Login Successful"
            });

        } else {

            res.json({
                success: false,
                message: "Invalid Username or Password"
            });

        }

    });

});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});