import  { Poll } from '../model/poll' 
import { Vote } from '../model/vote';
import { RollupStateHandler } from '../shared/rollup-state-handler';
import { pollStorage } from '../storage/pollStorage';
import { voteStorage } from '../storage/voteStorage';

export class VotingController {
    async createPoll(data) {
        if (!data.question || !data.options || data.options.length < 2) {
            return await RollupStateHandler.handleReport({
                error: 'Poll must have a question and at least two options.',
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            const newPoll = new Poll(data);
            pollStorage.addOne(newPoll);
            return {
                ok: true,
                message: 'Poll created successfully!',
                data: newPoll.getData(),
            };
        });
    }

    async getAllPolls() {
        return await RollupStateHandler.inspectWrapper(() =>
            pollStorage.getAll()
        );
    }

    async getPollById(data) {
        const pollId = data[0];
        const poll = pollStorage.getOneById(pollId);
        if (!poll) {
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });
        }
        return await RollupStateHandler.inspectWrapper(() => poll.getData());
    }

    async vote(data) {
        const { pollId, optionIndex } = data;
        const poll = pollStorage.getOneById(pollId);
        if (!poll) {
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            if (poll.vote(optionIndex)) {
                const vote = new Vote(pollId, optionIndex);
                voteStorage.addOne(vote);
                pollStorage.updateOne(poll);
                return {
                    ok: true,
                    message: 'Vote recorded successfully!',
                    data: vote.getData(),
                };
            } else {
                return {
                    ok: false,
                    message: 'Invalid option index.',
                };
            }
        });
    }

    async getPollResults(data) {
        const pollId = data[0];
        const poll = pollStorage.getOneById(pollId);
        if (!poll) {
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });
        }
        return await RollupStateHandler.inspectWrapper(() => poll.getResults());
    }

    async deletePoll(data) {
        const pollId = data.id;
        return await RollupStateHandler.advanceWrapper(() => {
            const deleted = pollStorage.deleteOne(pollId);
            if (deleted) {
                return {
                    ok: true,
                    message: `Poll '${pollId}' deleted successfully!`,
                };
            } else {
                return {
                    ok: false,
                    message: `Poll '${pollId}' not found or could not be deleted.`,
                };
            }
        });
    }
}