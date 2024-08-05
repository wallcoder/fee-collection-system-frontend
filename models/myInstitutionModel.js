// models/institutionModel.js
import db from "../config/database.js";

export const updateInstitution = (data, result) => {
    const {
        institution_name,
        address,
        email,
        phone,
        website,
        apiKey,
        apiSecretKey,
        logo
    } = data;

    const query = `
        UPDATE my_institution
        SET 
            institution_name = ?, 
            address = ?, 
            email = ?, 
            phone = ?, 
            website = ?, 
            apiKey = ?, 
            apiSecretKey = ?, 
            logo = ?
        WHERE my_institution_id = 1
    `;

    const values = [
        institution_name,
        address,
        email,
        phone,
        website,
        apiKey,
        apiSecretKey,
        logo
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};
