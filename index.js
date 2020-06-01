'use strict';

const _fetchAllData = require('./src/_fetchAllData.js');

class Qiita {
    constructor(group_url, date) {
      this.group_url = group_url;
      this.date = date;
      this.allData = [];
      this.topPageHtml = '';
      this.allPageHtml = '';
      this.allEventsInfo = [];
      this.monthlyHoldingsCount = {};
    }
    _get(){}
    
    //記事リスト
    getArticleList = async () => {
      await this._fetchCheck();
      return this.allData;
    };

    //すべての情報
    getAllData = async () => {
      await this._fetchCheck();
      return this.allData;
    };

    //ページ指定
    getData = async (startPageId=1, endPageId=1) => {
      const data = await _fetchAllData(this.group_url, startPageId, endPageId);
      return data;
    };

    _fetchCheck = async () => {
      if(this.allData.length === 0){
        this.allData = await _fetchAllData(this.group_url);
      }
    }


}

module.exports = Qiita;
