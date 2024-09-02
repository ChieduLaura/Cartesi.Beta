import { VotingController } from './votingController';

const votingController = new VotingController();

export const controller = {
    createPoll: votingController.createPoll.bind(votingController),
    getAllPolls: votingController.getAllPolls.bind(votingController),
    getPollById: votingController.getPollById.bind(votingController),
    vote: votingController.vote.bind(votingController),
    getPollResults: votingController.getPollResults.bind(votingController),
    deletePoll: votingController.deletePoll.bind(votingController),
};