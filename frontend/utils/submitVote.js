import axios from 'axios';

export async function submitVote({ proposalId, choiceIndex, voterAddress }) {
  const message = {
    address: voterAddress,
    msg: JSON.stringify({
      version: '0.1.3',
      timestamp: (Date.now() / 1000).toFixed(),
      space: 'pisigorta.eth',
      type: 'vote',
      payload: {
        proposal: proposalId,
        choice: choiceIndex,
        metadata: {}
      }
    }),
    sig: '0xSIGNATURE' // Kullanıcının imzası burada yer almalı
  };

  try {
    const res = await axios.post('https://hub.snapshot.org/api/message', message);
    console.log('✅ Oy gönderildi:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Oy gönderimi hatası:', err);
    return null;
  }
}
