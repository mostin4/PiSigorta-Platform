import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export interface VoteDetail {
  title: string;
  totalVotes: number;
  choices: Record<string, number>;
  percentages: Record<string, number>;
  ipfsCid: string;
  status: string;
  timestamp: number;
}

export interface VotesDatabase {
  [proposalId: string]: VoteDetail;
}

const FILE_PATH = path.join(process.cwd(), 'dao', 'votes.json');

/**
 * Read and parse votes.json. Returns an empty object on error or when file missing.
 */
export async function loadVoteRecords(): Promise<VotesDatabase> {
  try {
    if (!fsSync.existsSync(FILE_PATH)) return {};
    const fileData = await fs.readFile(FILE_PATH, 'utf-8');
    const parsed = JSON.parse(fileData) as VotesDatabase;
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed;
  } catch (error: any) {
    console.error('votes.json read error:', error?.message ?? error);
    return {};
  }
}

/**
 * Write a single proposal record into votes.json using atomic write (tmp -> rename).
 * Creates dao/ directory if needed.
 */
export async function saveVoteRecord(proposalId: string, data: VoteDetail): Promise<boolean> {
  try {
    const dir = path.dirname(FILE_PATH);
    await fs.mkdir(dir, { recursive: true });

    const current = await loadVoteRecords();
    current[proposalId] = data;

    const tmpPath = `${FILE_PATH}.tmp`;
    await fs.writeFile(tmpPath, JSON.stringify(current, null, 2), 'utf-8');
    await fs.rename(tmpPath, FILE_PATH);
    return true;
  } catch (error: any) {
    console.error('votes.json write error:', error?.message ?? error);
    return false;
  }
}

/**
 * Convenience helper: update counts and recompute totals/percentages.
 * Returns true on success.
 */
export async function updateCountsAndSave(
  proposalId: string,
  choicesDelta: Partial<Record<string, number>>,
  meta?: Partial<Pick<VoteDetail, 'title' | 'ipfsCid' | 'status' | 'timestamp'>>
): Promise<boolean> {
  try {
    const db = await loadVoteRecords();
    const existing = db[proposalId] ?? {
      title: meta?.title ?? '',
      totalVotes: 0,
      choices: {},
      percentages: {},
      ipfsCid: meta?.ipfsCid ?? '',
      status: meta?.status ?? 'open',
      timestamp: meta?.timestamp ?? Date.now()
    } as VoteDetail;

    // apply deltas
    for (const [choice, delta] of Object.entries(choicesDelta)) {
      existing.choices[choice] = (existing.choices[choice] ?? 0) + (delta ?? 0);
      if (existing.choices[choice] < 0) existing.choices[choice] = 0;
    }

    // recalc total & percentages
    existing.totalVotes = Object.values(existing.choices).reduce((s, v) => s + v, 0);
    existing.percentages = {};
    for (const [choice, count] of Object.entries(existing.choices)) {
      existing.percentages[choice] = existing.totalVotes > 0 ? +(100 * (count / existing.totalVotes)).toFixed(2) : 0;
    }

    // merge meta
    if (meta) {
      if (meta.title !== undefined) existing.title = meta.title;
      if (meta.ipfsCid !== undefined) existing.ipfsCid = meta.ipfsCid;
      if (meta.status !== undefined) existing.status = meta.status;
      if (meta.timestamp !== undefined) existing.timestamp = meta.timestamp;
    }

    return await saveVoteRecord(proposalId, existing);
  } catch (err) {
    console.error('updateCountsAndSave error:', err);
    return false;
  }
}
