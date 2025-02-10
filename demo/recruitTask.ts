const kv = await Deno.openKv();

Deno.cron("Increment a counter", "* * * * *", async () => {
  // increment a count using Deno KV
  await kv.atomic().sum(["task_runs"], 1n).commit();
});

Deno.serve(async () => {
  // Get the latest count
  const count = await kv.get(["task_runs"]);
  return new Response(`The job has been run ${count.value || 0} times.`);
});