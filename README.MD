# mini-redis

A Redis server implementation from scratch in TypeScript. No frameworks, no dependencies, just Node.js standard library.

## Why

Built to understand how databases, networking, and data structures work under the hood. Every line written without AI assistance, using only official documentation as reference.

## What works

| Command | Description | Response |
|---------|-------------|----------|
| `PING` | Health check | `+PONG` |
| `ECHO msg` | Returns the message | `+msg` |
| `SET key value` | Store a key-value pair | `+OK` |
| `GET key` | Retrieve a value by key | `$<len>\r\n<value>` or `$-1` (nil) |
| `DEL key` | Delete a key | `:1` (deleted) or `:0` (not found) |

## Run

```bash
npx tsc
node dist/server.js
```

Connect with any Redis client:

```bash
redis-cli -p 6379
127.0.0.1:6379> SET name davi
OK
127.0.0.1:6379> GET name
"davi"
127.0.0.1:6379> DEL name
(integer) 1
```

## Architecture

```
src/
├── server.ts      # TCP server, connection management
├── parser.ts      # RESP protocol parser
└── commands.ts    # Command execution (SET, GET, DEL, PING, ECHO)
```

- **Transport:** Raw TCP via Node.js `net` module
- **Protocol:** RESP (Redis Serialization Protocol)
- **Storage:** In-memory `Map<string, string>`
- **No external dependencies**

## Roadmap

- [ ] Custom HashTable (replace native Map)
- [ ] Doubly LinkedList for list commands (LPUSH, RPUSH, LPOP, RPOP)
- [ ] Skip List for sorted sets (ZADD, ZRANGE, ZRANK)
- [ ] TTL / key expiration (EXPIRE, TTL, PTTL)
- [ ] AOF persistence (append-only file)
- [ ] RDB snapshots (binary serialization)
- [ ] Pub/Sub (SUBSCRIBE, PUBLISH)
- [ ] LRU / LFU eviction strategies
- [ ] Blocking operations (BLPOP, BRPOP)
- [ ] HTTP layer with JWT auth
- [ ] Bloom Filter (BF.ADD, BF.EXISTS)

## Stack

- TypeScript (strict mode, zero `any`)
- Node.js standard library only
- No frameworks. No Express. No Fastify. No libs.

## Author

Davi Rinaldi