'use strict';

//全イベントリストページのHTML
const puppeteer = require('puppeteer');
const _structure = require('./_structure.js');

let allPageData = [];
let constPageMaxId = '';

module.exports = async (group_url, startPageId=1, endPageId=0) => {
    const browser = await puppeteer.launch({
        // headless: false
    });//puppeteerスタート

    while(1){
        // process.stdout.write('.'); //progress
        console.log(`Page.${startPageId} Fetch...`);
        const page = await browser.newPage();
        await page.goto(`${group_url}?page=${startPageId}`);
        await page.waitFor('.of-ItemLink');

        let {dimensions, pageMaxId} = await page.evaluate(() => {
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

        //終着をどこにするか
        if(constPageMaxId === ''){
            if(endPageId !== 0){
                pageMaxId = endPageId;               
            }
            constPageMaxId = pageMaxId;
        }

        //dimensions (obj) -> data (arr)
        const pageData = _structure(dimensions);
        //pageDataが上手くとれてなかったら再度
        if(pageData.length !== 0){
            allPageData = allPageData.concat(pageData);
        }else{
            continue; //取れてない場合IDを変えず再度ループ
        }

        startPageId++; //次のページへ
        if(startPageId <= constPageMaxId){
            continue;        
        }else{
            break;
        }

    }

    await browser.close(); //puppeteer終了
    return allPageData;
}