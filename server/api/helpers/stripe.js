import stripe from 'stripe';
import env from 'dotenv';

env.config();

const Stripe = stripe(process.env.STRIPE_KEY);

export const stripeCharges = async (amount, currency, stripeToken, customerEmail) => {
  try {
    const charge = await Stripe.charges.create({
      amount,
      currency,
      source: stripeToken,
      receipt_email: customerEmail,
    });

    return charge;
  } catch (error) {
    return error;
  }
};

export default stripeCharges;
