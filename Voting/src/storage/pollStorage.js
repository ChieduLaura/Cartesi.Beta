class PollStorage {
    polls;

    constructor() {
        this.polls = new Map();
    }

    addOne(poll) {
        this.polls.set(poll.id, poll);
    }

    getAll() {
        return Array.from(this.polls.values()).map(poll => poll.getData());
    }

    getOneById(id) {
        return this.polls.get(id);
    }

    updateOne(poll) {
        if (this.polls.has(poll.id)) {
            this.polls.set(poll.id, poll);
            return true;
        }
        return false;
    }

    deleteOne(id) {
        return this.polls.delete(id);
    }
}

export const pollStorage = new PollStorage();
