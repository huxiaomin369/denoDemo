import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();
const kv = await Deno.openKv();

app.get("/WW_verify_sLiFnl9UzNfQ9jxT.txt", async (c) => {
  // const entries = [];
  // for await (const entry of kv.list({ prefix: [] })) {
  //   entries.push({
  //     userid: entry.key[0],
  //     count: entry.value.toString()
  //   });
  // }
  // return c.json(entries);
  return c.text('sLiFnl9UzNfQ9jxT');
});

app.get("/add/:userid", async (c) => {
  const userid = c.req.param("userid");
  const key = [userid];
  // Increment the count
  await kv.atomic().sum(key, 1n).commit();
  // Get the latest visitor count
  const count = await kv.get(key);
  
  return c.json({ userid, count: count.value.toString() });
});

Deno.serve(app.fetch);