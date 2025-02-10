const kv = await Deno.openKv();

Deno.serve(async () => {
  // increment a count using Deno KV
  await kv.atomic().sum(["visitors"], 1n).commit();

  // Get the latest visitor count
  const count = await kv.get(["visitors"]);

  return new Response(`You are visitor number #${count.value}`);
});
