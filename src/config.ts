import dotenv from 'dotenv';

dotenv.config();

export const config = {
  webstoreId: process.env.TEBEX_WEBSTORE_ID as string,
  port: parseInt(process.env.PORT || '3000', 10)
};