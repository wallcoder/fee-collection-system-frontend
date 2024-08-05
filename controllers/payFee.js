import { storePayment } from "../models/PayFeeModel.js";

export const storePay = (req, res) => {
    const data = req.body;
    storePayment(data, (err, results) => {
        if (err) {
            console.error('Error storing payment:', err);
            return res.status(500).json({ error: 'Error storing payment details' });
        }
        res.status(200).json(results);
    });
};
