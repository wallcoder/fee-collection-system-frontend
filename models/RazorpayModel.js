import Razorpay from 'razorpay';
import db from '../config/database.js';

export const getRazorpayInstance = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM my_institution LIMIT 1', (err, results) => {
      if (err) {
        console.log('Error fetching Razorpay credentials:', err);
        reject(err);
      } else {
        const rzp = results[0];
        const instance = new Razorpay({
          key_id: rzp.api_key,
          key_secret: rzp.api_secret_key,
        });
        resolve(instance);
      }
    });
  });
};
