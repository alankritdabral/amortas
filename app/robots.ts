import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

/**
 * Served at /robots.txt. Everything public is open to every crawler; only
 * API routes and the WhatsApp redirect endpoint (no content, just a 307 to
 * wa.me) are kept out.
 *
 * AI crawlers are listed by name and explicitly allowed, so that answer
 * engines (ChatGPT, Claude, Perplexity, Gemini, Copilot, Meta AI, Apple
 * Intelligence and others) can read and cite the site. A crawler obeys only
 * the most specific group that names it, so each named group repeats the
 * same Disallow lines as `*`.
 *
 * Names are the user-agent tokens each company documents. Add new ones here
 * as they are announced; an unknown token is harmless.
 */
const DISALLOW = ['/api/', '/whatsapp-chat'];

const SEARCH_ENGINES = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Slurp', // Yahoo
  'DuckDuckBot',
  'YandexBot',
  'Baiduspider',
  'Applebot',
];

const AI_CRAWLERS = [
  // OpenAI (ChatGPT)
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Anthropic (Claude)
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'anthropic-ai',
  // Google (Gemini, AI Overviews / AI Mode training control)
  'Google-Extended',
  'GoogleOther',
  'Google-CloudVertexBot',
  // Microsoft (Copilot uses Bingbot above)
  'BingPreview',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Apple Intelligence
  'Applebot-Extended',
  // Meta AI
  'meta-externalagent',
  'meta-externalfetcher',
  'FacebookBot',
  // Amazon (Alexa, Rufus)
  'Amazonbot',
  // xAI (Grok)
  'GrokBot',
  'xAI-Bot',
  // Mistral (Le Chat)
  'MistralAI-User',
  // DeepSeek
  'DeepSeekBot',
  // ByteDance (Doubao)
  'Bytespider',
  // Cohere
  'cohere-ai',
  'cohere-training-data-crawler',
  // DuckDuckGo AI answers
  'DuckAssistBot',
  // You.com
  'YouBot',
  // Common Crawl (training data for most open models)
  'CCBot',
  // Allen Institute for AI
  'AI2Bot',
  // Diffbot (knowledge graph used by many AI tools)
  'Diffbot',
  // Huawei (Petal search / Celia)
  'PetalBot',
  // Others in common use
  'Timpibot',
  'iaskspider',
  'Kangaroo Bot',
  'ImagesiftBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: SEARCH_ENGINES, allow: '/', disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
