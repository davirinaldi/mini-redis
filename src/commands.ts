import type net from 'node:net';
import * as Serializer from './serializer.js';
export function commandsRESP(results: string[],socket: net.Socket,MapGetSet: Map<string, string>): void{

const command = results[0]?.toUpperCase();
        switch (command) {
            case 'PING':
                socket.write(Serializer.serializeSimpleString('PONG'));
                break;
            case 'ECHO':
                const message = results[1] ?? '';
                socket.write(Serializer.serializeSimpleString(message));
                break;
            case 'SET':

                MapGetSet.set(results[1] ?? '', results[2] ?? '')
                socket.write(Serializer.serializeSimpleString('OK'));
                break;
            case 'GET':
                const valor = MapGetSet.get(results[1] ?? '')
                if (valor && valor.trim().length > 0) {

                    socket.write(Serializer.serializeBulkString(valor))
                } else {
                    socket.write(Serializer.serializeNull())
                }
                break;
            case 'DEL':

                if (MapGetSet.delete(results[1] ?? '')) {
                    socket.write(Serializer.serializeInteger(1))
                } else {
                    socket.write(Serializer.serializeInteger(0))
                }
                break;
            default:
                socket.write(Serializer.serializeError('unknown command'));
                break;

}
}