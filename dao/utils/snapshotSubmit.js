import axios from 'axios';

export async function submitProposal(proposal) {
  const response = await axios.post('https://hub.snapshot.org/graphql', {
    query: `
      mutation {
        propose(
          space: "pisigorta.eth",
          type: "single-choice",
          title: "${proposal.title}",
          body: "${proposal.description}",
          choices: ${JSON.stringify(proposal.choices)},
          start: ${proposal.start},
          end: ${proposal.end},
          snapshot: 12345678,
          author: "${proposal.author}"
        ) {
          id
        }
      }
    `
  });
  return response.data;
}
