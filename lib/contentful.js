// lib/contentful.js

import { createClient } from 'contentful';

// 1. 初始化 Contentful Client（在本機開發環境可能沒有設定憑證）
const hasCredentials =
  Boolean(process.env.CONTENTFUL_SPACE_ID) && Boolean(process.env.CONTENTFUL_ACCESS_TOKEN);

const client = hasCredentials
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  : null;

// --- 現有的部落格 (Blog) 函數 (保持不變) ---

// 2. 輔助函數：解析 Author (作者) 欄位
const parseAuthor = (authorEntry) => {
  if (!authorEntry?.fields) {
    return null;
  }
  return {
    name: authorEntry.fields.name || 'Anonymous',
    profilePhoto: authorEntry.fields.profilePhoto || null,
  };
};

// 3. 輔助函數：解析 Blog Post (部落格文章)
const parseBlogPost = (postEntry) => {
  if (!postEntry?.fields) {
    return null;
  }
  return {
    id: postEntry.sys.id,
    title: postEntry.fields.title || 'Untitled Post',
    slug: postEntry.fields.slug,
    publishedDate: postEntry.fields.publishedDate,
    author: parseAuthor(postEntry.fields.author),
    excerpt: postEntry.fields.excerpt || '',
    content: postEntry.fields.content || null,
    featuredImage: postEntry.fields.featuredImage || null,
  };
};

// 4. 主要的 API 函數：獲取所有部落格文章 (已排序)
export async function fetchBlogPosts() {
  if (!client) {
    console.warn('Contentful credentials missing. Returning empty blog post list.');
    return [];
  }
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
    });

    if (entries.items) {
      return entries.items.map((post) => parseBlogPost(post));
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

// 5. 主要的 API 函數：根據 Slug 獲取單篇文章
export async function fetchBlogPostBySlug(slug) {
  if (!client) {
    console.warn('Contentful credentials missing. Cannot fetch blog post by slug.');
    return null;
  }
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items && entries.items.length > 0) {
      const post = entries.items[0];
      return parseBlogPost(post);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error);
    return null;
  }
}

// --- [ ! ] 新增的資源 (Resource) 函數 ---

// 6. 輔助函數：解析 Resource Item (資源項目)
const parseResourceItem = (resourceEntry) => {
  if (!resourceEntry?.fields) {
    return null;
  }
  return {
    id: resourceEntry.sys.id,
    title: resourceEntry.fields.title || 'Untitled Resource',
    type: resourceEntry.fields.type, // "Worksheet", "Reading", "Audio"
    ctaText: resourceEntry.fields.ctaText || 'Learn More',
    
    // 媒體檔案 (用於 Worksheet)
    file: resourceEntry.fields.file || null, 
    
    // 外部連結 (用於 Reading 或 Audio)
    externalUrl: resourceEntry.fields.externalUrl || null,
  };
};

// 7. 主要的 API 函數：獲取所有資源項目 (依標題排序)
export async function fetchResourceItems() {
  if (!client) {
    console.warn('Contentful credentials missing. Returning empty resource list.');
    return [];
  }
  try {
    const entries = await client.getEntries({
      content_type: 'resource', // 這是我們在 Contentful 建立的 API ID
      order: 'fields.title', // 依據 '標題' 欄位 A-Z 排序
    });

    if (entries.items) {
      // 解析每一個資源
      return entries.items.map((resource) => parseResourceItem(resource));
    }
    return [];
  } catch (error) {
    console.error('Error fetching resource items from Contentful:', error);
    return []; // 發生錯誤時返回空陣列
  }
}