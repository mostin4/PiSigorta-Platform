import axios from 'axios';

export async function submitProposal(proposal) {
  try {
    if (!proposal || !proposal.title || !proposal.author) {
      throw new Error("Eksik veri: 'title' ve 'author' alanları zorunludur.");
    }

    // GraphQL sorgusunu string enjeksiyonundan kurtarmak için değişkenler (variables) kullanıyoruz
    const query = `
      mutation CreateProposal(
        $space: String!, 
        $type: String!, 
        $title: String!, 
        $body: String!, 
        $choices: [String!]!, 
        $start: Int!, 
        $end: Int!, 
        $snapshot: Int!, 
        $author: String!
      ) {
        propose(
          space: $space,
          type: $type,
          title: $title,
          body: $body,
          choices: $choices,
          start: $start,
          end: $end,
          snapshot: $snapshot,
          author: $author
        ) {
          id
        }
      }
    `;

    const variables = {
      space: proposal.space || "pisigorta.eth",
      type: proposal.type || "single-choice",
      title: proposal.title,
      body: proposal.description || "",
      choices: proposal.choices || [],
      start: proposal.start,
      end: proposal.end,
      snapshot: proposal.snapshot || 12345678,
      author: proposal.author
    };

    const response = await axios.post('https://hub.snapshot.org/graphql', {
      query,
      variables
    });

    // GraphQL katmanından dönen hataları kontrol et
    if (response.data && response.data.errors) {
      throw new Error(`GraphQL Hatası: ${JSON.stringify(response.data.errors)}`);
    }

    return {
      success: true,
      data: response.data.data
    };

  } catch (error) {
    console.error("Snapshot Teklif Gönderim Hatası:", error.message || error);
    return {
      success: false,
      error: error.message || "Teklif gönderilirken bir hata oluştu."
    };
  }
}
