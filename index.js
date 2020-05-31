'use strict';

const _fetchHtml = require('./src/_fetchHtml.js');

class Qiita {
    constructor(group_url, date) {
      this.group_url = group_url;
      this.date = date;
      this.topPageHtml = '';
      this.allPageHtml = '';
      this.allEventsInfo = [];
      this.monthlyHoldingsCount = {};
    }
    _get(){}
    
    //記事リスト
    getArticleList = async () => {
        const allHtml = await _fetchHtml();
        console.log(allHtml);
        // await this._fetchCheckTop();
        // return getGroupId(this.topPageHtml);
    };


}

module.exports = Qiita;
