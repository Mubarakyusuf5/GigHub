const axios = require('axios');
require('dotenv').config();

const MONNIFY_BASE_URL_LIVE = 'https://api.monnify.com/api';
const MONNIFY_BASE_URL = 'https://sandbox.monnify.com/api';
const MONNIFY_API_KEY = process.env.MONNIFY_API_KEY;
const MONNIFY_CONTRACT_CODE = process.env.MONNIFY_CONTRACT_CODE;
const MONNIFY_SECRET_KEY = process.env.MONNIFY_SECRET_KEY;



// Authenticate with Monnify and get an access token
const getMonnifyToken = async () => {
    try {
        const auth = Buffer.from(`${MONNIFY_API_KEY}:${MONNIFY_SECRET_KEY}`).toString("base64");
        const response = await axios.post(
            `${MONNIFY_BASE_URL}/v1/auth/login`,
            {},
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.responseBody.accessToken;
    } catch (error) {
        console.error("Monnify Auth Error:", error.response?.data || error.message);
        throw new Error("Failed to authenticate with Monnify");
    }
};
//
const createReservedAccount = async (email, accountReference, customerName, nin) => {
    try {
        const token = await getMonnifyToken();

        const response = await axios.post(
            `${MONNIFY_BASE_URL}v2/bank-transfer/reserved-accounts`,
            {
                accountReference,
                accountName: customerName,
                currencyCode: 'NGN',
                contractCode: MONNIFY_CONTRACT_CODE,
                customerEmail: email,
                nin: nin,
                getAllAvailableBanks: true
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return response.data.responseBody;
    } catch (error) {
        console.error("Monnify Account Error:", error.response?.data || error.message);
        throw new Error("Failed to create Monnify reserved account");
    }
};

module.exports = { createReservedAccount };
