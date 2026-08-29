const fs = require("fs");

function parseReport(filename) {
  try {
    const raw = fs.readFileSync(filename, "utf-8");
    const data = JSON.parse(raw);

    return {
      perf: Math.round(data.categories.performance.score * 100),
      acc: Math.round(data.categories.accessibility.score * 100),
      bp: Math.round(data.categories["best-practices"].score * 100),
      seo: Math.round(data.categories.seo.score * 100),
      fcp: data.audits["first-contentful-paint"].numericValue / 1000,
      lcp: data.audits["largest-contentful-paint"].numericValue / 1000,
      cls: data.audits["cumulative-layout-shift"].numericValue,
      tbt: data.audits["total-blocking-time"].numericValue,
    };
  } catch (err) {
    console.error(`Failed to parse ${filename}:`, err.message);
    return null;
  }
}

const beforeMobile = parseReport("lh-mobile.json");
const afterMobile = parseReport("lh-mobile-after.json");
const beforeDesktop = parseReport("lh-desktop.json");
const afterDesktop = parseReport("lh-desktop-after.json");

console.log("=== LIGHTHOUSE PERFORMANCE REGRESSION REPORT ===");
if (beforeMobile && afterMobile) {
  console.log("\n--- MOBILE METRICS ---");
  console.log(`Performance:    ${beforeMobile.perf} -> ${afterMobile.perf}`);
  console.log(`Accessibility:  ${beforeMobile.acc} -> ${afterMobile.acc}`);
  console.log(`Best Practices: ${beforeMobile.bp} -> ${afterMobile.bp}`);
  console.log(`SEO:            ${beforeMobile.seo} -> ${afterMobile.seo}`);
  console.log("------------------------");
  console.log(`FCP (seconds):  ${beforeMobile.fcp.toFixed(2)}s -> ${afterMobile.fcp.toFixed(2)}s`);
  console.log(`LCP (seconds):  ${beforeMobile.lcp.toFixed(2)}s -> ${afterMobile.lcp.toFixed(2)}s`);
  console.log(`CLS (shift):    ${beforeMobile.cls.toFixed(3)} -> ${afterMobile.cls.toFixed(3)}`);
  console.log(`TBT (ms):       ${beforeMobile.tbt}ms -> ${afterMobile.tbt}ms`);
}

if (beforeDesktop && afterDesktop) {
  console.log("\n--- DESKTOP METRICS ---");
  console.log(`Performance:    ${beforeDesktop.perf} -> ${afterDesktop.perf}`);
  console.log(`Accessibility:  ${beforeDesktop.acc} -> ${afterDesktop.acc}`);
  console.log(`Best Practices: ${beforeDesktop.bp} -> ${afterDesktop.bp}`);
  console.log(`SEO:            ${beforeDesktop.seo} -> ${afterDesktop.seo}`);
  console.log("------------------------");
  console.log(`FCP (seconds):  ${beforeDesktop.fcp.toFixed(2)}s -> ${afterDesktop.fcp.toFixed(2)}s`);
  console.log(`LCP (seconds):  ${beforeDesktop.lcp.toFixed(2)}s -> ${afterDesktop.lcp.toFixed(2)}s`);
  console.log(`CLS (shift):    ${beforeDesktop.cls.toFixed(3)} -> ${afterDesktop.cls.toFixed(3)}`);
  console.log(`TBT (ms):       ${beforeDesktop.tbt}ms -> ${afterDesktop.tbt}ms`);
}
console.log("\n");
