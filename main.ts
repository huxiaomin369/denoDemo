import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();
const kv = await Deno.openKv();

app.post("/add/:userid", async (c) => {
  const userid = c.req.param("userid");
  const key = ["userid", userid, "count"];
  
  // Check if the key exists
  const existing = await kv.get(key);
  if (!existing.value) {
    // Initialize to 0 if key doesn't exist
    await kv.set(key, 0n);
  }
  
  // Increment the count
  const result = await kv.atomic()
    .sum(key, 1n)
    .commit();
  
  // Get the updated count
  const count = await kv.get(key);
  
  return c.json({ userid, count: count.value });
});