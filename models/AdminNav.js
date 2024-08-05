import db from "../config/database.js";
import bcrypt from 'bcrypt'

export const getAccountById = (id, result) => {
    db.query("SELECT * FROM admin where admin_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err)
            result(err, null)
            console.log("f")
        } else {
            console.log("g")
            result(null, results)
        }
    })
}

export const editAccountById = (id, data, result) => {
    console.log("ACC DETAILS", data)
    db.query("SELECT * FROM admin WHERE email = ? AND admin_id != ?", [data.email, id], (err, results) => {
        if (err) {
            console.log("err 1")
            console.log(err);
            result(err, null);
            return;
        }

        if (results.length > 0) {
            console.log("E")
            result(null, { emailErrorMessage: "Email already used" });
            return;
        }
        db.query(
            "UPDATE admin SET fname = ?, lname = ?, email = ?, phone = ? WHERE admin_id = ?",
            [data.fName, data.lName, data.email, data.phone, id],
            (err, results) => {
                if (err) {
                    console.log(err);
                    console.log("err 4")
                    result(err, null);
                    return;
                }
                console.log("success 1")
                result(null, { successMessage: 'Account updated successfully' });
            }
        );


        // db.query("SELECT password FROM admin WHERE admin_id = ?", [id], (err, results) => {
        //     if (err) {
        //         console.log(err);
        //         result(err, null);
        //         return;
        //     }

        //     if (results.length === 0) {
        //         console.log(err);
        //         result(null, { currPasswordErrorMessage: "Admin not found" });
        //         return;
        //     }

        //     const hashedPassword = results[0].password;

        //     bcrypt.compare(data.currPassword, hashedPassword, (err, isMatch) => {
        //         if (err) {
        //             console.log(err);
        //             console.log("err 3")
        //             result(err, null);
        //             return;
        //         }

        //         if (!isMatch) {
        //             console.log("b")
        //             result(null, { currPasswordErrorMessage: 'Password incorrect' });
        //             return;
        //         }

        //         // Check if the new passwords match
        //         if (data.newPassword !== data.conPassword) {
        //             console.log("c")
        //             result(null, { conPasswordErrorMessage: 'Passwords not matching' });
        //             return;
        //         }

        //         // Hash the new password
        //         bcrypt.hash(data.newPassword, 10, (err, newHashedPassword) => {
        //             if (err) {
        //                 console.log(err);
        //                 console.log("err 5")
        //                 result(err, null);
        //                 return;
        //             }

        //             // Update the admin table with the provided data and the hashed password
        //             db.query(
        //                 "UPDATE admin SET fname = ?, lname = ?, email = ?, phone = ?, password = ? WHERE admin_id = ?",
        //                 [data.fName, data.lName, data.email, data.phone, newHashedPassword, id],
        //                 (err, results) => {
        //                     if (err) {
        //                         console.log(err);
        //                         console.log("err 4")
        //                         result(err, null);
        //                         return;
        //                     }
        //                     console.log("success 1")
        //                     result(null, { successMessage: 'Account updated successfully' });
        //                 }
        //             );
        //         });
        //     });
        // });
    });
};

export const editPasswordById = (id, data, result) => {
    console.log("ACC DETAILS", data)

    db.query("SELECT password FROM admin WHERE admin_id = ?", [id], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }

            if (results.length === 0) {
                console.log(err);
                result(null, { currPasswordErrorMessage: "Password incorrect" });
                return;
            }

            const hashedPassword = results[0].password;

            bcrypt.compare(data.currPassword, hashedPassword, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    console.log("err 3")
                    result(err, null);
                    return;
                }

                if (!isMatch) {
                    console.log("b")
                    result(null, { currPasswordErrorMessage: 'Password incorrect' });
                    return;
                }

                // Check if the new passwords match
                if (data.newPassword !== data.conPassword) {
                    console.log("c")
                    result(null, { conPasswordErrorMessage: 'Passwords not matching' });
                    return;
                }

                // Hash the new password
                bcrypt.hash(data.newPassword, 10, (err, newHashedPassword) => {
                    if (err) {
                        console.log(err);
                        console.log("err 5")
                        result(err, null);
                        return;
                    }

                    // Update the admin table with the provided data and the hashed password
                    db.query(
                        "UPDATE admin SET  password = ? WHERE admin_id = ?",
                        [ newHashedPassword, id],
                        (err, results) => {
                            if (err) {
                                console.log(err);
                                console.log("err 4")
                                result(err, null);
                                return;
                            }
                            console.log("success 1")
                            result(null, { successMessage: 'Password updated successfully' });
                        }
                    );
                });
            });
        });
    // db.query("SELECT * FROM admin WHERE email = ? AND admin_id != ?", [data.email, id], (err, results) => {
    //     if (err) {
    //         console.log("err 1")
    //         console.log(err);
    //         result(err, null);
    //         return;
    //     }

    //     if (results.length > 0) {
    //         console.log("E")
    //         result(null, { emailErrorMessage: "Email already used" });
    //         return;
    //     }
    //     db.query(
    //         "UPDATE admin SET fname = ?, lname = ?, email = ?, phone = ? WHERE admin_id = ?",
    //         [data.fName, data.lName, data.email, data.phone, id],
    //         (err, results) => {
    //             if (err) {
    //                 console.log(err);
    //                 console.log("err 4")
    //                 result(err, null);
    //                 return;
    //             }
    //             console.log("success 1")
    //             result(null, { successMessage: 'Account updated successfully' });
    //         }
    //     );


        
    // });
};