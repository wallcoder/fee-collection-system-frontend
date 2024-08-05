import db from "../config/database.js"


export const getInstitution = (result) => {
    db.query("SELECT * FROM my_institution", (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const editInstitutionById = (data, result) => {
    console.log(data);
    db.query("update my_institution set name = ?, address = ?, email =?, phone = ?, website_url = ?, api_key = ?, api_secret_key =? where my_institution_id = ?", [data.name, data.address, data.email, data.phone, data.websiteUrl, data.apiKey, data.apiSecretKey, data.id], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}