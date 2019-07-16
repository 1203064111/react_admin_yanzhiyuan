/**
 * Created by shenjiabo on 16/8/31.
 */
 var member_homeurl="http://localhost:8180/tst-consumer-member/";
 var clue_homeurl="http://localhost:8180/tst-consumer-maiziliao/";
 var shop_homeurl="http://localhost:8180/tst-consumer-shop/";
 var moudle_homeurl="http://localhost:8180/tst-consumer-moudle/";
 var maintail_homeurl="http://localhost:8180/tst-consumer-yinlong/";
 var information_homeUrl="http://localhost:8180/tst-consumer-information/";

 var koubei_homeurl="http://localhost:8180/tst-consumer-koubei/";

 var img_homeUrl='http://localhost:8180/tst-consumer-member/';

var htmlurl="http://localhost:8099/";
var texturl='http://yzy-img.facework.club/';
 var imgurl='http://storage.facework.club/';
 var company_name='base';


var sheep_homeurl="http://localhost:8180/tst-consumer-zhangmu/";


var displayTypeBeans=[{name:"赠送券",value:"1"},{name:"领取券",value:"2"},{name:"新手券",value:"3"},{name:"签到券",value:"4"}];//1:
var welcome_type="2";//1:不需要欢迎页面 2:需要
// var member_homeurl="http://member.tstweiguanjia.com/";
// var moudle_homeurl="http://moudle.tstweiguanjia.com/";
// var clue_homeurl="http://clue.tstweiguanjia.com/";
// var shop_homeurl="http://shop.tstweiguanjia.com/";
// var img_homeUrl="http://member.tstweiguanjia.com/";
// var maintail_homeurl="http://yinlong.tstweiguanjia.com/";
// var htmlurl="http://clue-admin.tstweiguanjia.com/";
// var imgurl='http://clue-img.tstweiguanjia.com/';
// var company_name='base';

function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

/**
 * 链接参数
 */

function getParameter(index,name){
    var str =decodeURIComponent(window.location.search); // location.search是从当前URL的?号开始的字符串
    // 例如：http://www.51job.com/viewthread.jsp?tid=22720
    // 它的search就是?tid=22720
    str = str.substring(1, str.length);
    var arr = str.split('&');

    if (arr[index].indexOf(name) != -1) {
        var pos_start = arr[index].indexOf(name) + name.length + 1;
        var pos_end = arr[index].indexOf("&", pos_start);
        if (pos_end == -1) {
            return arr[index].substring(pos_start);
        } else {
            
        }
    }
}


function getDataByPost(index,url,params,dataOnly){
    /* 统一验证token */
    if(params==null){
        params={};
    }
    $.post(url,params, function(data) {
        if(dataOnly=='1'){
            doSuccess(index,data);
        }else{
            var result = eval("(" + data + ")");
            if (result.status == "ok") {
                doSuccess(index,result.data);
            } else if (result.status == "error"){

            }else{

            }
        }
    });
}

