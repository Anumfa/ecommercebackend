import dotenv from 'dotenv';
import dns from 'dns';

// Load env vars at the very beginning
dotenv.config();

// Fix for DNS resolution issues with MongoDB Atlas in Node.js 17+
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

// Set DNS servers to Cloudflare DNS which often handles SRV records better
dns.setServers(['1.1.1.1', '1.0.0.1']);

import app from './app.js';
import connectDB from './Config/db.js';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 9000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

export default app;

