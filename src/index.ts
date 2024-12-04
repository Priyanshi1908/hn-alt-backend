import * as cheerio from 'cheerio';

export default {
  async fetch(request: Request): Promise<Response> {
    const response = await fetch('https://news.ycombinator.com/');
    const html = await response.text();
    const $ = cheerio.load(html);

    const stories: Array<{ title: string; link: string }> = [];
    $('.athing').each((index, element) => {
      const title = $(element).find('.titleline > a').text();
      const link = $(element).find('.titleline > a').attr('href') || ''; // Default to empty string if undefined
      stories.push({ title, link });
    });

    return new Response(JSON.stringify(stories), {
      headers: { 'content-type': 'application/json' },
    });
  },
};