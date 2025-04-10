import { Route, ViewType } from '@/types';
import ofetch from '@/utils/ofetch';
import { load } from 'cheerio';

export const route: Route = {
    path: '/blog',
    categories: ['new-media'],
    view: ViewType.Articles,
    example: '/rhg/blog',
    url: 'rhg.com',
    name: 'Articles',
    maintainers: ['Deja-vuuu'],
    radar: [
        {
            title: 'China',
            source: ['rhg.com/'],
        },
    ],
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    handler,
};

async function handler() {
    const rootUrl = 'https://rhg.com/china/research';
    const response = await ofetch(rootUrl);
    const $ = load(response);
    const items = $('.c-listing__list .c-card')
        .toArray()
        .map((item) => {
            const $item = $(item);
            const title = $item.find('.c-card__title').text();
            const link = $item.find('.c-card__link').attr('href');
            const description = $item.find('.c-card__description').text();
            return {
                title,
                link,
                description,
            };
        });
    return {
        title: '荣鼎咨询-China',
        link: rootUrl,
        item: items,
    };
}
