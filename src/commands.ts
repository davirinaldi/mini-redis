import type net from 'node:net';
export function commandsRESP(results: string[],socket: net.Socket,MapGetSet: Map<string, string>): void{

const command = results[0]?.toUpperCase();
        switch (command) {
            case 'PING':
                socket.write('+PONG\r\n');
                break;
            case 'ECHO':
                const message = results[1] ?? '';
                socket.write(`+${message}\r\n`);
                break;
            case 'SET':

                MapGetSet.set(results[1] ?? '', results[2] ?? '')
                socket.write(`+OK\r\n`);
                break;
            case 'GET':
                const valor = MapGetSet.get(results[1] ?? '')
                if (valor && valor.trim().length > 0) {

                    socket.write(`$${valor.length}\r\n${valor}\r\n`)
                } else {
                    socket.write('$-1\r\n')
                }
                break;
            case 'DEL':

                if (MapGetSet.delete(results[1] ?? '')) {
                    socket.write(':1\r\n')
                } else {
                    socket.write(':0\r\n')
                }
                break;
            default:
                socket.write('-ERR unknown command\r\n');
                break;

}
}