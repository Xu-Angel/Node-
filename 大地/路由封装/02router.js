/**
 * Created by Administrator on 2017/7/8 0008.
 */


//����httpģ��
var http=require('http');

var url=require('url');

var model=require('./model/model.js');


//model['login']('111','22');

////·��:ָ�ľ�����Բ�ͬ����� URL������ͬ��ҵ���߼���
http.createServer(function(req,res){

    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});

    var pathname=url.parse(req.url).pathname.replace('/','');


    if(pathname!='favicon.ico') {

        try {
            model[pathname](req, res);
        } catch (err) {
            model['home'](req, res);
        }

    }

    //console.log(pathname);


}).listen(8001);




