class VoteStorage {
    votes;

    constructor() {
        this.votes = new Map();
    }

    addOne(vote) {
        this.votes.set(vote.id, vote);
    }

    getByPollId(pollId) {
        return Array.from(this.votes.values())
            .filter(vote => vote.pollId === pollId)
            .map(vote => vote.getData());
    }
}

export const voteStorage = new VoteStorage();