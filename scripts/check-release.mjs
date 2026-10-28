import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const load=path=>readFile(new URL(path,root));
const hash=value=>createHash('sha256').update(value).digest('hex');
const manifest=JSON.parse(await load('assets/manifest.json'));
const index=await load('index.html'),viewer=await load('viewer.html');
const scriptPattern=/<script([^>]*)>([\s\S]*?)<\/script>/g;
function inspect(html){const json=new Map();for(const match of html.toString().matchAll(scriptPattern)){if(match[1].includes('application/json')){const id=match[1].match(/id="([^"]+)"/)[1];json.set(id,JSON.parse(match[2]));}else new Script(match[2]);}return json;}
const json=inspect(index);inspect(viewer);
assert(index.length<=manifest.indexBudgetBytes,'Index exceeds the payload budget');
assert(!index.toString().includes('data:image/'),'Images must be external assets');
assert(!index.toString().includes('.srcdoc='),'Viewer must be a separate document');
assert(!index.toString().includes('atob('),'PDFs must load without base64 decoding');
const plants=JSON.parse(viewer.toString().match(/const DATA=(\[.*?\]);let index=/s)[1]);
assert.equal(plants.length,17);assert.deepEqual(json.get('plant-data'),plants);
for(const [id,expected]of Object.entries(manifest.preservedDataHashes))assert.equal(hash(JSON.stringify(json.get(id))),expected,'Source data changed: '+id);
const assetPaths=new Set(manifest.assets.map(asset=>asset.path));
for(const asset of manifest.assets){const bytes=await load(asset.path);assert.equal(bytes.length,asset.bytes,'Asset size: '+asset.path);assert.equal(hash(bytes),asset.sha256,'Asset hash: '+asset.path);}
for(const plant of plants){const image=plant.svg.match(/class="ortho"><image[^>]*href="([^"]+)/)[1];assert(assetPaths.has(image),'Missing ortho: '+plant.id);}
for(const doc of json.get('rec-data')){assert(assetPaths.has(doc.pdf));assert(assetPaths.has(doc.image));}
const report=json.get('technical-data');assert.equal(report.page_count,24);assert.equal(report.pages.length,report.page_count);assert(assetPaths.has(report.pdf));report.pages.forEach(page=>assert(assetPaths.has(page)));
const initialBytes=index.length+viewer.length+(await load(manifest.logo)).length+(await load(manifest.firstOrtho)).length;
assert(initialBytes<=manifest.initialPayloadBudgetBytes,'Initial page exceeds 1.5 MB');
console.log(JSON.stringify({valid:true,plants:plants.length,reportPages:report.page_count,verifiedAssets:assetPaths.size,indexBytes:index.length,initialBytes,reductionPercent:Number(((1-initialBytes/manifest.baselineHtmlBytes)*100).toFixed(2))},null,2));
