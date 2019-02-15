const cheerio = require('cheerio');
const request = require('request');
const requestP  = require('request-promise');
const iconv = require('iconv-lite'); // 文字转码
const fs = require("fs");                   //文件操作
const path = require("path");
// const url = 'https://www.jianshu.com/';// 定义请求地址 1
// const url = 'https://www.douban.com/';
const url = 'https://www.23us.so/files/article/html/35/35647/17014596.html';
let count = 0; // 叠加
let list = []; // 章节 list;
let booksName = ''; //小说名称

const options = {
    method: 'get',
    url: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    },
    encoding: null,
};
/**
 * 获取书的章节信息
 */
const queryBooks = function(body){
	$ = cheerio.load(body);
	const data = $('#contents').text()
	console.log(data);
	let title = $('h1').text()
	fs.writeFile(`${title}.txt`, data, err => {
		if (err) throw err
		console.log('已存在');
	})
	getChapter(list);
}


/**
 * 获取章节信息
 */
const getChapter = function(list){
	// console.log('list',list);
	if(list.length>0){
		list.forEach((item)=>{
			console.log(item,'list');
		})
	}
}
/**
 * 获取章节的内容
 */
const getChapterContent = function(Chapter){

}

/**
 * 写入内容
 */
const writFs = function(){

}

/**
 * 获取页面数据
 */
async function getBooks (){
	await requestP(options,function(err,response,body){
		if(err){
			console.log('err',err);
			return ;
		};
		if(response && response.statusCode == 200){
			// queryBooks(body);
			let html = iconv.decode(body, "utf8");
			queryBooks(html);
		}
	});
}

getBooks();
