// lib/sectionize.js
import { orderSections } from "./orderSections";

/** 將沒有 sections[] 的服務概覽/子頁資料「包裝成 sections[]」供排序使用（不改原資料） */
export function sectionizeServiceOverview(serviceData = {}) {
  const sections = [];
  const pushItems = (items, title) => {
    if (Array.isArray(items) && items.length) {
      sections.push({ title, items });
    }
  };

  pushItems(serviceData?.who?.items, "Who this is for");
  pushItems(serviceData?.scenarios, "Scenarios");
  pushItems(serviceData?.cases?.items, "Cases");
  pushItems(serviceData?.key_points?.items, "Key points");
  pushItems(serviceData?.process?.steps, "Process");
  pushItems(serviceData?.boundaries?.items, "Boundaries");
  pushItems(serviceData?.faq?.items, "FAQ");

  return orderSections(sections);
}

export function sectionizeSubpage(kind, data = {}) {
  // 針對 pricing/readiness/faq/agreement/process/cases 統一轉成 sections[]
  if (Array.isArray(data?.sections) && data.sections.length) {
    return orderSections(data.sections);
  }
  const sections = [];
  // 定義各子頁可辨識的鍵 → 統一包裝，不改字串、不改鍵名來源
  if (kind === "pricing") {
    // default.plans[] / intro / notes
    if (data?.intro) sections.push({ title: "Intro", paragraphs: [data.intro] });
    if (Array.isArray(data?.plans)) sections.push({ title: "Plans", items: data.plans });
    if (Array.isArray(data?.policies)) sections.push({ title: "Policies", items: data.policies });
    if (Array.isArray(data?.notes)) sections.push({ title: "Notes", items: data.notes });
  } else if (kind === "readiness") {
    if (Array.isArray(data?.checklist)) sections.push({ title: "Checklist", items: data.checklist });
    if (Array.isArray(data?.what_to_prepare)) sections.push({ title: "What to prepare", items: data.what_to_prepare });
    if (Array.isArray(data?.signals)) sections.push({ title: "Signals", items: data.signals });
  } else if (kind === "faq") {
    if (Array.isArray(data?.items)) sections.push({ title: "FAQ", items: data.items });
  } else if (kind === "agreement") {
    if (Array.isArray(data?.sections)) return orderSections(data.sections);
  } else if (kind === "process") {
    if (Array.isArray(data?.steps)) sections.push({ title: "Process", items: data.steps });
  } else if (kind === "cases") {
    if (Array.isArray(data?.items)) sections.push({ title: "Cases", items: data.items });
  }
  return orderSections(sections);
}
