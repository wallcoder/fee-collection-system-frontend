import { updateInstitution } from "../models/myInstitutionModel.js";

export const updateInstitutionDetails = (req, res) => {
    const {
        institution_name,
        address,
        email,
        phone,
        website,
        apiKey,
        apiSecretKey
    } = req.body;

    const logo = req.file ? req.file.path : null;

    const data = {
        institution_name,
        address,
        email,
        phone,
        website,
        apiKey,
        apiSecretKey,
        logo
    };

    updateInstitution(data, (err, results) => {
        if (err) {
            res.status(500).send('Error updating institution: ' + err.message);
        } else {
            res.send('Institution updated successfully');
        }
    });
};
