// Tells Bing, Yandex and other IndexNow engines which URLs changed.
// Run after each deploy:  node scripts/indexnow.js
// Pings every URL in the live sitemap. Google does not use IndexNow.
const KEY = "d932b83f660b43eceb92c7c7be29be2d"; // must match public/d932b83f660b43eceb92c7c7be29be2d.txt
const HOST = "www.amortas.com";

async function main() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
