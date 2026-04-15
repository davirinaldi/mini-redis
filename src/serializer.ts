


export function serializeSimpleString(valor: string){
    return `+${valor}\r\n`;

}

export function serializeBulkString(valor : string){

    return `$${valor.length}\r\n${valor}\r\n`

}

export function serializeNull(){
    return `$-1\r\n`
}

export function serializeInteger(valor: number){
    return `:${valor}\r\n`
}


export function serializeError(mensagem: string){
    return `-ERR ${mensagem}\r\n`
}