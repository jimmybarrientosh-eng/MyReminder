import { supabase } from '../lib/supabase';

const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const isOnline = () => navigator.onLine !== false;

const store = (key) => ({
  read: () => JSON.parse(localStorage.getItem(key) || '[]'),
  write: (data) => localStorage.setItem(key, JSON.stringify(data)),
});
const stores = (userId) => ({ cache: store(`events:${userId}`), outbox: store(`outbox:${userId}`) });

async function send(op) {
  const table = supabase.from('events');
  const { error } =
    op.type === 'create' ? await table.insert(op.record)
    : op.type === 'update' ? await table.update(op.changes).eq('id', op.id)
    : await table.delete().eq('id', op.id);
  if (error) throw new Error(error.message);
}

function applyLocal(cache, op) {
  const all = cache.read();
  if (op.type === 'create') cache.write([...all, op.record]);
  else if (op.type === 'update') cache.write(all.map((e) => (e.id === op.id ? { ...e, ...op.changes } : e)));
  else cache.write(all.filter((e) => e.id !== op.id));
}

const syncing = new Map();
export function syncPending(userId) {
  if (!supabase) return Promise.resolve(0);
  if (!syncing.has(userId)) {
    const { outbox } = stores(userId);
    const job = (async () => {
      const queue = outbox.read();
      let done = 0;
      for (const op of queue) {
        await send(op);
        done += 1;
        outbox.write(queue.slice(done));
      }
      return done;
    })().finally(() => syncing.delete(userId));
    syncing.set(userId, job);
  }
  return syncing.get(userId);
}

async function mutate(userId, op) {
  const { cache, outbox } = stores(userId);
  if (!supabase) await delay(300);
  else if (isOnline()) {
    await syncPending(userId);
    await send(op);
  } else outbox.write([...outbox.read(), op]);
  applyLocal(cache, op);
}

export async function listEvents(userId) {
  const { cache } = stores(userId);
  if (!supabase) {
    await delay(700);
    return cache.read();
  }
  if (!isOnline()) return cache.read();
  await syncPending(userId);
  const { data, error } = await supabase.from('events').select('*').order('start_at');
  if (error) throw new Error(error.message);
  cache.write(data);
  return data;
}

export async function createEvent(userId, event) {
  const record = { id: uid(), created_at: new Date().toISOString(), ...event };
  await mutate(userId, { type: 'create', record });
  return record;
}

export async function updateEvent(userId, id, changes) {
  await mutate(userId, { type: 'update', id, changes });
  return stores(userId).cache.read().find((e) => e.id === id) ?? { id, ...changes };
}

export async function deleteEvent(userId, id) {
  await mutate(userId, { type: 'delete', id });
  return id;
}
