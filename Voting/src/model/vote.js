import crypto from 'node:crypto';

export class Vote {
    id;
    pollId;
    optionIndex;
    timestamp;

    constructor(pollId, optionIndex) {
        this.id = crypto.randomUUID();
        this.pollId = pollId;
        this.optionIndex = optionIndex;
        this.timestamp = Date.now();
    }

    getData() {
        return {
            id: this.id,
            pollId: this.pollId,
            optionIndex: this.optionIndex,
            timestamp: this.timestamp,
        };
    }
}