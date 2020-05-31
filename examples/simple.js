'use strict';

const Qiita = require('../index.js');
const groupname = 'protoout-studio';
const community = new Qiita(`https://qiita.com/organizations/${groupname}`);

(async () => {
    const cd = {}; // community data

    cd.name = groupname;
    cd.articleList = await community.getArticleList();

    console.log(cd);
})();