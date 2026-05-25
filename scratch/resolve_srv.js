
import dns from 'dns';

const hostname = '_mongodb._tcp.cluster0.h34q6uh.mongodb.net';

console.log(`Resolving SRV for ${hostname}...`);

dns.resolveSrv(hostname, (err, addresses) => {
    if (err) {
        console.error('Error resolving SRV:', err);
        return;
    }
    console.log('SRV Addresses found:');
    console.log(JSON.stringify(addresses, null, 2));
    
    addresses.forEach(addr => {
        dns.lookup(addr.name, (err, ip) => {
            if (err) {
                console.error(`Error looking up ${addr.name}:`, err);
            } else {
                console.log(`${addr.name} -> ${ip}`);
            }
        });
    });
});
