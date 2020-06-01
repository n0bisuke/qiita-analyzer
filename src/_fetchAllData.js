'use strict';

//全イベントリストページのHTML
const puppeteer = require('puppeteer');
const _structure = require('./_structure.js');

let allPageData = [];
let constPageMaxId = '';

module.exports = async (group_url, pageid=39) => {
    const browser = await puppeteer.launch({
        // headless: false
    });    
    while(1){
        // process.stdout.write('.'); //progress
        console.log(pageid);

        const page = await browser.newPage();
        await page.goto(`${group_url}?page=${pageid}`);
        await page.waitFor('.of-ItemLink');

        const {dimensions, pageMaxId} = await page.evaluate(() => {
            const result = {};
            const elms = Array.from(document.querySelectorAll('.of-ItemLink'));

            result.ids = elms.map(elm => elm.querySelector('.of-ItemLink_header-title').getAttribute('href').split(`/items/`)[1]);
            result.titles = elms.map(elm => elm.querySelector('.of-ItemLink_header-title').text);
            result.timestamps = elms.map(elm => elm.querySelector('.of-ItemLink_header-timestamp').textContent);
            result.users = elms.map(elm => elm.querySelector('.of-ItemLink_meta a').text);
            result.likecounts = elms.map(elm => elm.querySelector('.of-ItemLink_likeCount').textContent);
            const allTagElems = Array.from(elms.map(elm => elm.querySelectorAll('.of-ItemLink_tagList .of-ItemLink_tag')));
            result.tags = allTagElems.map(tagElms => {
                const tagsArr = Array.from(tagElms);
                const tags = tagsArr.map(tag => tag.text);
                return tags;
            });

            result.len = result.titles.length;

            const pageMaxId = document.querySelector('.st-Pager_count span').textContent.split('/')[1].trim();

            return {dimensions: result, pageMaxId: pageMaxId};
        });

        if(constPageMaxId === ''){
            constPageMaxId = pageMaxId;
        }

        //dimensions (obj) -> data (arr)
        const pageData = _structure(dimensions);
        if(pageid < constPageMaxId){
            if(pageData.length !== 0){
                allPageData = allPageData.concat(pageData);
                // console.log('--',allPageData);
                pageid++;
            }
            continue;
        }else{
            await browser.close();
            break;
        }

    }

    return allPageData;
}