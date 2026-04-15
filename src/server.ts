import net from 'node:net';
import process from 'node:process';
import { parseRESP } from './parser.js';
import { commandsRESP } from './commands.js';
const connections: { id: string; connectedAt: number }[] = [];
const MapGetSet = new Map<string, string>();
const server = net.createServer((socket) => {

    const connectionTime = Date.now();
    const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`Client connected: ${clientId} at ${new Date(connectionTime).toISOString()}`);

    connections.push({
        id: clientId,
        connectedAt: connectionTime
    });

    socket.on('data', (data) => {
        const results = parseRESP(data.toString());
        commandsRESP(results, socket, MapGetSet);



    })
    socket.on('end', () => {
        console.log('client disconnected');
        
    });

    socket.on('close',() =>{
        console.log('connection close')
        const index = connections.findIndex((c) => c.id === clientId);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });

    socket.on('error', (err) => {
        console.log('socket error:', err.message);
    });
});
process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close()
    process.exit(0)
});


server.on('error', (err) => {
    throw err;
});

server.listen(6379, () => {
    console.log('MiniRedis listening on port 6379');
});