const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/_data/ram.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const seenSlugs = new Set();
const seenAsins = new Set();
let slugFixes = 0;
let asinFixes = 0;

const cleanedData = data.map((item) => {
    // 1. Fix Slugs (Essential for 11ty not to crash)
    let originalSlug = item.slug || "ram-kit";
    let newSlug = originalSlug;
    let sCounter = 1;
    while (seenSlugs.has(newSlug)) {
        newSlug = `${originalSlug}-${sCounter}`;
        sCounter++;
        slugFixes++;
    }
    seenSlugs.add(newSlug);
    item.slug = newSlug;

    // 2. Fix ASINs (Good for data integrity)
    if (item.asin) {
        if (seenAsins.has(item.asin)) {
            // If ASIN is a duplicate, we mark it so you can find it later
            item.asin = `${item.asin}-FIXME`; 
            asinFixes++;
        } else {
            seenAsins.add(item.asin);
        }
    }

    return item;
});

fs.writeFileSync(dataPath, JSON.stringify(cleanedData, null, 2));

console.log(`
✅ SUCCESS!
--------------------------
Total Items: ${cleanedData.length}
Slug Fixes:  ${slugFixes} (Pages saved from crashing)
ASIN Fixes:  ${asinFixes} (Duplicates marked with -FIXME)
--------------------------
`);