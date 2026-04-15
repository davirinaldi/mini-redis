export function parseRESP(data: string): string[] {


const parser = data.split('\r\n');

        let position = 0;
        let numbers: number | null = null;
        const results: string[] = []
        while (position < parser.length) {



            if (parser[position]?.startsWith('*')) {
                numbers = parseInt(parser[position]?.slice(1) ?? '0');

            }
            if (numbers === null) break;
            position++
            {
                for (let i = 0; i < numbers; i++) {

                    if (parser[position]?.startsWith('$')) {
                        position++
                        results.push(parser[position] ?? '')
                        position++

                    }
                }
            }
        }

        return results;






}