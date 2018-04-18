var express = require('express');
var crypto = require('crypto');
var https = require('https');
var router = express.Router();

var appID = 'wx47131f230e51db8f';
var appsecret = '00b3823c30ce46dc6419a90fb36ea418';

var TOKEN = 'huangzttest';

function sha1(str) {
    var shasum = crypto.createHash('sha1');
    shasum.update(str);
    return shasum.digest('hex');
}

function generateSignature(ticket, url) {
    var obj = {
        jsapi_ticket: ticket,
        timestamp: new Date().getTime(),
        noncestr: Math.random().toString(36).substr(2),
        url: url
    };
    var keys = ['timestamp', 'noncestr', 'jsapi_ticket', 'url'].sort();
    var strArr = [];
    keys.forEach(function(key) {
        strArr.push(key + '=' + obj[key]);
    });
    var str = strArr.join('&');
    return {
        appId: appID,
        timestamp: obj.timestamp,
        nonceStr: obj.noncestr,
        signature: sha1(str)
    };
}

/*来自微信的信息*/
router.get('/', function (req, res, next) {
    // console.log(req.query);
    var query = req.query;
    /*取出四个值*/
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    /*拼成数组，字典排序，再拼接*/
    var tmpArr = [TOKEN, timestamp, nonce];
    tmpArr.sort();
    var tmpStr = tmpArr[0] + tmpArr[1] + tmpArr[2];
    /*进行加密*/
    var shaResult = sha1(tmpStr);
    // console.log("shaResult", shaResult);
    //来自微信的请求，就返回echostr
    if (shaResult == signature) {
        console.log('shaResult', shaResult);
        res.send(echostr);
    }
    else { next(); }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/signature', function(req, res, next) {
    console.log('req.body', req.body);
    https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx47131f230e51db8f&secret=00b3823c30ce46dc6419a90fb36ea418", function(res1) {
        res1.setEncoding('utf8');
        let rawData = '';
        res1.on('data', (chunk) => { rawData += chunk; });
        res1.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log('gettoken', parsedData);
                if (parsedData.errcode) {
                    console.log(res.errmsg);
                } else {
                    var access_token = parsedData.access_token;
                    https.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi", function (res2) {
                        res2.setEncoding('utf8');
                        let rawData = '';
                        res2.on('data', (chunk) => { rawData += chunk; });
                        res2.on('end', () => {
                            const parsedData = JSON.parse(rawData);
                            console.log('getticket', parsedData)
                            if (parsedData.errcode) {
                                console.log(parsedData.errmsg);
                            } else {
                                res.json(generateSignature(parsedData.ticket, req.body.url));
                            }
                        });
                    });
                }
            } catch (e) {
                console.error(e.message);
            }
        });
    })
});

module.exports = router;
