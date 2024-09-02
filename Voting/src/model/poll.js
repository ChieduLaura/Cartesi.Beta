import crypto from 'node:crypto';

export class Poll {
    id;
    createdAt;
    question;
    options;
    votes;

    constructor({ question, options }) {
        this.id = crypto.randomUUID();
        this.createdAt = Date.now();
        this.question = question;
        this.options = options;
        this.votes = options.map(() => 0);
    }

    vote(optionIndex) {
        if (optionIndex >= 0 && optionIndex < this.options.length) {
            this.votes[optionIndex]++;
            return true;
        }
        return false;
    }

    getData() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            question: this.question,
            options: this.options,
            votes: this.votes,
        };
    }

    getResults() {
        return this.options.map((option, index) => ({
            option,
            votes: this.votes[index],
        }));
    }
}
