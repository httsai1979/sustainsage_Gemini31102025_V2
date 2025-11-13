import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();

const LOCALES = ['en-GB','zh-TW','zh-CN'];
const FILES_BY_LOCALE = (loc) => [
  `content/home/${loc}.json`,
  `content/about/${loc}.json`,
  `content/services/index.${loc}.json`,
  // three pathways overview
  `content/services/immigrant-job.${loc}.json`,
  `content/services/career-return.${loc}.json`,
  `content/services/graduate-start.${loc}.json`,
];

const SEO_TEXT = {
  'en-GB': {
    home: { title: 'SustainSage Coaching — UK bilingual career coaching', description: 'Calm, evidence-led coaching for returners, graduates, and immigrants in the UK. Small steps, visible proof, honest guidance.' },
    about: { title: 'About — SustainSage Group', description: 'Bilingual coaches based in the UK. ICF-aligned, confidential by default, practical and culture-aware.' },
    servicesIndex: { title: 'Services — Pathways you can start today', description: 'Three clear pathways: career return, immigrant job search, and graduate start. Short steps, visible outcomes.' },
    immigrant: { title: 'Immigrant job search — coaching pathway', description: 'Turn experience into UK-relevant proof points. CV/LinkedIn clarity, outreach scripts, interview practice.' },
    career: { title: 'Career return — coaching pathway', description: 'Bridge your gap with confidence. Story, evidence, cadence around care and workload.' },
    graduate: { title: 'Graduate start — coaching pathway', description: 'From coursework to evidence. One page, one story, one link. Keep steps small and visible.' },
    subpage: (name) => ({ title: `${name} — SustainSage coaching`, description: `Details for ${name.toLowerCase()} in this pathway.` }),
  },
  'zh-TW': {
    home: { title: 'SustainSage 雙語教練（英國）', description: '冷靜、以證據為核心的職涯教練：重返職場、移民求職、畢業求職。小步走、可見成果、誠實引導。' },
    about: { title: '關於我們 — SustainSage Group', description: '英國在地雙語教練。ICF 對齊，預設保密，務實且理解文化差異。' },
    servicesIndex: { title: '服務 — 你可以立即開始的路徑', description: '三條清楚路徑：重返職場、移民求職、畢業求職。小步走、看得到成果。' },
    immigrant: { title: '移民求職 — 教練路徑', description: '把經驗轉成英國在地證據點。CV/LinkedIn 清楚度、主動聯繫腳本、面試練習。' },
    career: { title: '重返職場 — 教練路徑', description: '不道歉地橋接空窗。故事、證據、節奏與照護/時段的平衡。' },
    graduate: { title: '畢業求職 — 教練路徑', description: '把課程變成證據：一頁、一個故事、一個連結。用小步驟累積可見成果。' },
    subpage: (name) => ({ title: `${name} — SustainSage 教練`, description: `${name} 的詳細說明。` }),
  },
  'zh-CN': {
    home: { title: 'SustainSage 双语教练（英国）', description: '冷静、以证据为核心的职业教练：重返职场、移民求职、毕业求职。小步走、可见成果。' },
    about: { title: '关于我们 — SustainSage Group', description: '英国本地双语教练。ICF 对齐，默认保密，务实且理解文化差异。' },
    servicesIndex: { title: '服务 — 你可以立即开始的路径', description: '三条清晰路径：重返职场、移民求职、毕业求职。小步走、看得到成果。' },
    immigrant: { title: '移民求职 — 教练路径', description: '把经验转为英国在地证据点。CV/LinkedIn 清晰度、主动联系脚本、面试练习。' },
    career: { title: '重返职场 — 教练路径', description: '不道歉地桥接空窗。故事、证据、节奏与照护/时段平衡。' },
    graduate: { title: '毕业求职 — 教练路径', description: '把课程变成证据：一页、一个故事、一个链接。用小步骤累积可见成果。' },
    subpage: (name) => ({ title: `${name} — SustainSage 教练`, description: `${name} 的详细说明。` }),
  },
};

function safePatch(relPath, fn) {
  const file = path.join(ROOT, relPath);
  if (!fs.existsSync(file)) return;
  const raw = fs.readFileSync(file, 'utf8');
  const j = JSON.parse(raw);
  fn(j);
  fs.writeFileSync(file, JSON.stringify(j, null, 2), 'utf8');
  console.log('SEO patched:', relPath);
}

for (const loc of LOCALES) {
  const files = FILES_BY_LOCALE(loc);
  const t = SEO_TEXT[loc];
  // home
  safePatch(files[0], (j) => { j.title = t.home.title; j.description = t.home.description; });
  // about
  safePatch(files[1], (j) => { j.title = t.about.title; j.description = t.about.description; });
  // services index
  safePatch(files[2], (j) => { j.title = t.servicesIndex.title; j.description = t.servicesIndex.description; });
  // immigrant / career / graduate overview
  safePatch(files[3], (j) => { j.title = t.immigrant.title; j.description = t.immigrant.description; });
  safePatch(files[4], (j) => { j.title = t.career.title; j.description = t.career.description; });
  safePatch(files[5], (j) => { j.title = t.graduate.title; j.description = t.graduate.description; });
}
console.log('SEO titles/descriptions patched in content JSON (EN/TW/SC).');
