async function test() {
  const start = Date.now();
  try {
    console.log("Fetching ISS API...");
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { signal: AbortSignal.timeout(5000) });
    console.log("ISS API status:", res.status, "took", Date.now() - start, "ms");
    const json = await res.json();
    console.log("ISS API sample:", json);
  } catch (e) {
    console.error("ISS API failed after", Date.now() - start, "ms:", e.message);
  }

  const start2 = Date.now();
  try {
    console.log("Fetching CelesTrak TLE...");
    const res = await fetch("https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE", { signal: AbortSignal.timeout(5000) });
    console.log("CelesTrak TLE status:", res.status, "took", Date.now() - start2, "ms");
    const text = await res.text();
    console.log("TLE sample:", text.substring(0, 100));
  } catch (e) {
    console.error("CelesTrak TLE failed after", Date.now() - start2, "ms:", e.message);
  }
}
test();
