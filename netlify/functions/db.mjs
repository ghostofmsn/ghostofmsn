// A tiny shared database for The Ghost of MSN, kept in Netlify Blobs.
// GET  /api/db?c=name            -> { docs: [{ id, data }] }
// POST /api/db { op, c, id, doc } -> op: add | set | update
import { getStore } from "@netlify/blobs";

const NAME = /^[a-z0-9_-]{1,40}$/;
const CAP = 600, MAXDOC = 6000;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export default async (req) => {
  const store = getStore({ name: "gomsn", consistency: "strong" });
  const url = new URL(req.url);
  if (req.method === "GET") {
    const c = url.searchParams.get("c") || "";
    if (!NAME.test(c)) return json({ error: "bad collection" }, 400);
    const list = (await store.get(c, { type: "json" })) || [];
    return json({ docs: list });
  }
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let body; try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
  const { op, c, id } = body || {}; let doc = body && body.doc;
  if (!NAME.test(c || "") || !doc || typeof doc !== "object") return json({ error: "bad request" }, 400);
  if (JSON.stringify(doc).length > MAXDOC) return json({ error: "too long" }, 413);
  const list = (await store.get(c, { type: "json" })) || [];
  let out = id;
  if (op === "add") { out = rid(); list.unshift({ id: out, data: doc }); }
  else if (op === "set" || op === "update") {
    if (!id || String(id).length > 80) return json({ error: "bad id" }, 400);
    const i = list.findIndex(d => d.id === id);
    if (i >= 0) list[i].data = op === "set" ? doc : Object.assign({}, list[i].data, doc);
    else list.unshift({ id, data: doc });
  } else return json({ error: "bad op" }, 400);
  await store.setJSON(c, list.slice(0, CAP));
  return json({ id: out });
};

export const config = { path: "/api/db" };
