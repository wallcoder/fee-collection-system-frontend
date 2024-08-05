import Razorpay from 'razorpay';
import crypto from 'crypto';
import { getRazorpayInstance } from '../models/RazorpayModel.js';

let razorpay;

(async () => {
  try {
    razorpay = await getRazorpayInstance();
    
  } catch (error) {
    console.log('Failed to initialize Razorpay instance:', error);
  }
})();

export const pay = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paisa for INR)
      currency: currency,
      receipt: receipt,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log('Order ID:', razorpay_order_id);
  console.log('Payment ID:', razorpay_payment_id);
  const hmac = crypto.createHmac('sha256', razorpay.key_secret);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.send('Payment verification successful');
  } else {
    res.status(400).send('Payment verification failed');
  }
};

export const paymentDetails = async (req, res) => {
  const paymentId = req.params.id;
  console.log(paymentId);
  try {
    const paymentDetails = await razorpay.payments.fetch(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment details' });
  }
};
