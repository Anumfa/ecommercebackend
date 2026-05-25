
import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';

dotenv.config();

// Try to resolve DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

console.log('Testing connection to:', process.env.DATABASE);

async function test() {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('Successfully connected!');
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:');
        console.error(err);
        process.exit(1);
    }
}

test();
