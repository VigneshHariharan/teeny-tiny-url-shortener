---
author: Vignesh
date: 22/05/2024
---

# Topic

Redis as a tool

## Why I am speaking about it?

- Initially I was going to work on it for a project, but I wanted to continue to learn about it because it will enable me to do things that I wasn't able to do before and improve my perspective on other engineering problems especially about disaster recovery

## Objective

- Make it little bit easier to learn if required


## TOC

- What is Redis?
- Getting started on development
- Data types in Redis
- Simple demo of application in node
- Persistance in Redis
- Other important stuff

---

## What is Redis?

- In memory database that persists data on disk
- Think of redis as a server which provides access to change data in a program with a set of commands
- A redis-client will send these commands over the network to manipulate data.
- Redis doesn't have any tables or documents instead it stores all the data in different data structures such as strings, hash, set, list, streams.
- Redis primarily stores data in RAM memory rather than disk, Thus it allows read data in microseconds,
- Millisecond - 1000 microseconds, usually reading from disk depending upon size and hardware might take milliseconds
- Redis is primarily used for caching and session management, but can be used for cases lot more than that.

---

## Getting started on development

- To install redis in mac:
  - `brew install redis`
  - start the redis server `redis-server` in a new terminal
  - Type in `redis-cli` to send commands to the database
- In case of using node: `npm install redis`

---

## How do you store data in redis?

- Redis is a key value store, keys will always be string, there can be multiple data types in values
- Keys are unique, size cannot be more than 512MB, depending on the machine architecture size of a character can vary, usually it is 1 byte for a single character
- Kind of data structures - Strings, Hashes, Lists, Sets, Sorted Sets
- Refs: <https://redis.io/docs/latest/develop/data-types/>

---

### Strings in redis

- You can literally store any value in redis like html, jpeg binary data
- Strings are Binary Safe -> Basically string doesn't end with \0 in C instead it has a fixed length
- String value can't be bigger than 512MB
- Uses -> Caching, Session storage, counter,
- Multiple values can be set using mset and mget commands

set will replace any existing value,

Commands

```
set , get
example: set key value
get key

set key value nx // set only if it doesn't exist
set key value xx // set only if it exists

set key value ex 100 // expiration time 100 seconds
set key value px 100 // expiration time 100 milliseconds

```

---

### Hashes in redis

- Hashes are key value that's created on value in redis
- They can be used store any kind of related data and provides fast lookup and write

Commands:

```
HGET hash-store-name key
HSET hash-store-name key value
HGETALL hash-store-name
```

---

### Lists in Redis

- A doubly linked list where the value is a string
- Since it is linked list, adding and removing an item at head and tail is O(1), accessing an item is O(n)

Commands:

- LPUSH - add new element to head
- RPUSH - add new element to tail
- LPOP - remove element from head
- RPOP - remove element from tail
- LLEN - length of linked list
- LMOVE - move element from one list to another
- LTRIM - reduce the list to specified range of elements

---

### Pub/Sub

Publisher / Subscriber pattern

- Think of listening to a list whenever an items get added to it
- But think that any one can listen to that list for changes

- Redis supports pub sub pattern which can be used as a message broker, but data is not persisted.
- A more powerful data structure for persistent data would be redis streams

Commands:

```

subscribe chat-room-1
publish chat-room-1 message

```

---

### Useful Commands

- TYPE key -> Find the type of value
- MULTI, EXEC -> To Carry out a transaction
- EXPIRE key time -> To set time to live for an expiration

---

## Working example in nodejs

- To use redis with nodejs, a redis client is required which should support RESP - Redis Serialization Protocol which sends commands to the redis server
- Example that uses node-redis: <https://github.com/VigneshHariharan/teeny-tiny-url-shortener>

---

## How Redis persists data?

- Snapshot (RDB) -> Configurable - Redis takes a snapshot of the data in memory at particular point of time or based number of requests.
- Append Only File (AOF) -> Logs every write operation on a different server in case of any failure, when a new server spins up these write operations are performed again
- Both of them can be used simultaneously
- Changes needs to be made in redis.conf and specified before calling redis-server
- If a config has been changed, ``CONFIG REWRITE`` command can be used without restarting the redis server

---

## Other stuff

### Distributed Cache

- Redis has clustering -> One primary database to write and read and replicas for only read , they need to be distributed among servers
- When dataset gets too large, redis has sharding, divides data in multiple machines

### Deployment part

- You will need separate database server, In AWS there are 2 services - Elasticache, MemoryDB for redis
- Elasticache - Primary purpose is cache, but not durable
- MemoryDB - Durable database, but provides reads in microsecond reads and writes in milliseconds
- Durability -> If a transaction is persisted in a database even in case of failuries, it is durable
  
---

## References

- <https://youtu.be/ELk_W9BBTDU?feature=shared>
- Docs: <https://redis.io/docs/latest/develop/data-types/>
- Use cases: <https://youtu.be/WQ61RL1GpEE?feature=shared>
- <https://youtu.be/WQ61RL1GpEE?feature=shared>
