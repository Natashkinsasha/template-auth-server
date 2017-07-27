const RedisMock = require('ioredis-mock').default;

function RedisMockClient() {
    return new RedisMock();
}

export default RedisMockClient;
