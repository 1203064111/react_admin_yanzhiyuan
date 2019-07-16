/**
 * Created by shenjiabo on 16/7/21.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from '../widget/toast';
var storage = require('key-storage');


class BaseComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }

    toFixed(value,count){
        if(value){
            return  value.toFixed(count)
        }

        return 0;
    }


    refresh(){
        this.setState({
            a:1
        })
    }

    openPrompt(title,defaultValue,onChange,formType){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.prompt({title:title?title:'请输入内容', formType:formType?formType:2,value:defaultValue,offset: 'c',}, function(pass, index){
                layer.close(index);
                if(onChange){
                   onChange(pass);
                }
            }.bind(this));
        }.bind(this));
    }


    openTip(title,onPress,btnValue){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                content: title //这里content是一个普通的String
                ,anim: 0
                ,skin: 'layer-ext-yourskin'
                ,btnAlign: 'c'
                ,btn: [btnValue?btnValue:"确定"]
                ,btn1: function(index, layero){
                   layer.close(index)
                   onPress(index);
                },cancel: function(){
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });

        });
    }
    openHtml(content,title){
        var f;
        layui.use('layer', function(){
            var layer = layui.layer;
            f=layer.open({
                title:title,
                type: 1,
                content: $(content) //这里content是一个普通的String
                ,anim: 0
                ,area: '800px'
                ,cancel: function(){
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        });
        return f;
    }
    openSrc(content){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: false,
                area: ['630px', '360px'],
                shade: 0.8,
                closeBtn: 0,
                shadeClose: true,
                content:content
            });
        });
    }

    setStorage(key,value){
        storage.set(key,value);
    }

    getStorage(key,defaultValue){
        let value=storage.get(key);
        if(!value||value===''||value==='undefined'){
            return defaultValue;
        }
        return value;
    }

    setSessionStorage(key,value){
        sessionStorage.setItem(key,value);
    }

    getSessionStorage(key,defaultValue){
        let value=sessionStorage.getItem(key);
        if(!value||value===''||value==='undefined'){
            return defaultValue;
        }
        return value;
    }


    showTip(msg) {
        //toast.show(msg+"");
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(msg + "");
        })
    }


    isNull(value){
        if(!value||value===''||value==='undefined'){
            return true;
        }else{
            return false;
        }
    }

    isNaN(value){
        if(!value||value===''||value==='undefined'){
            return true;
        }

        if(isNaN(value)){
            return true
        }

        return false
    }


    /**
     * 数组删除指定元素
     */
    removeArray(arr,value){
        for(let i=0;i<arr.length;i++){
            if(arr[i]+""===value+""){
                arr.splice(i,1);
                break;
            }
        }
        return arr;
    }

    removeArrayV2(arr,key,value){
        for(let i=0;i<arr.length;i++){
            if(arr[i][key]+""===value+""){
                arr.splice(i,1);
                break;
            }
        }
        return arr;
    }

    array_contain(array, obj){
        for (var i = 0; i < array.length; i++){
            if (array[i]+"" == obj+"")//如果要求数据类型也一致，这里可使用恒等号===
                return true;
        }
        return false;
    }

    split(value){
        if(!value||value===""){
            return [];
        }

        return value.split(",")
    }
    getNull(value,result){
        return this.isNull(value)?result:value;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    /**
     * get方式请求数据
     * @param index
     * @param url
     */
    getDataByGet(index,url,{dataOnly=false}={}){
        $.get(url, function (data) {
            var response = eval("(" + data + ")");
            if (dataOnly) {//不做任何处理
                this.doSuccess(index, data);
            } else {
                if (response.status === 'ok') {
                    this.doSuccess(index,response.data);
                } else if (response.status === 'error') {
                    this.doFailed(index, response.error);
                } else {
                    this.doPending(index, response.error);
                }
            }
        }.bind(this));
    }
    /**
     * post方式请求数据
     * @param index
     * @param url
     * @param parameters
     */
    getDataByPost(index,url,params,{dataOnly=false,type=1}={}){
        // var myDate = new Date();
        // var curtime=this.toFixed(myDate.getTime()/1000,0);
        // var time=storage.get("time");
        //
        // if(curtime-time>60){
        //     storage.set("systemAccountBean","");
        //     this.doPending(0,"token failed")
        // }else{
        //     storage.set("time",curtime);
        // }


        var info=storage.get("systemAccountBean");
        var systemAccountBean=JSON.parse((this.getNull(info,"{}")));

        /* 统一验证token */
        if(params==null){
            params={};
        }

        // console.log(params)
        // if(params["sort"]&&params["sort"]!==""&&isNaN(params["sort"])){
        //     this.doFailed(index, "权重非法");
        //     return;
        // }

        params["account_id1"]=systemAccountBean.account_id+"";
        params["system_token"]=systemAccountBean.system_token+"";

        $.post(url,params, function(data) {
            var response =data;
            if (dataOnly) {//不做任何处理
                this.doSuccess(index, data);
            } else {
                if (response.status === 'ok') {
                    if(type===1){
                        this.doSuccess(index,response.data,response.total);
                    }else if(type===2){
                        this.doSuccess(index,response);
                    }
                } else if (response.status === 'error') {
                    this.doFailed(index, response.error);
                } else {
                    this.doPending(index, response.error);
                }
            }
        }.bind(this));
    }


    getDataByJson(index,url,parameters,{ContentType="application/x-www-form-urlencoded",dataOnly=false}={}){
        var data='';
        if(ContentType==='application/x-www-form-urlencoded'){
            data=parameters;
        }else if(ContentType==='application/json'){
            data=JSON.stringify(parameters);
        }
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //json形式
                'Content-Type': ContentType
            },

            body: data
        };
        fetch(url,options)
            .then((response) => response.json())
            .then((response) => {
                if(dataOnly){//不做任何处理
                    this.doSuccess(index,response);
                }else {
                    if (response.status === 'ok') {
                        this.doSuccess(index, response.data);
                    } else if (response.status === 'error') {
                        this.doFailed(index, response.error);
                    } else {
                        this.doPending(index, response.error);
                    }
                }
            })
            .catch((error) => {
                this.doFailed(index,error.toString());
            });
    };

    /**
     * 表单提交数据
     * @param index
     * @param url
     * @param parameters
     * @param files
     */

    uploadFile(index,url,fileId) {
        var params={};
        $.ajaxFileUpload({
            url:url,
            secureuri:false,
            fileElementId:[fileId],// file标签的id
            dataType: 'JSON',// 返回数据的类型
            data:params,// 一同上传的数据
            success: function (data, status) {
                var response=eval("(" + data + ")");
                if (response.status === 'ok') {
                    this.doSuccess(index, response.data);
                } else if (response.status === 'error') {
                    this.doFailed(index, response.error);
                } else {
                    this.doPending(index, response.error);
                }
            }.bind(this),
            error: function (data, status, e) {
                console.log(JSON.stringify(e));
                this.doFailed(index,"上传失败");
            }.bind(this)
        });
    }


    /*
     * 访问数据错误返回回调
     * @param index
     * @param error
     */
    doFailed(index,error){
        // toast.show(error);
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(error + "");
        })
    }

    /**
     * 访问数据正确返回回调
     * @param index
     * @param data
     */
    doSuccess(index,data){doSuccess

    }

    /**
     * 访问数据待处理回调
     * @param index
     * @param error
     */
    doPending(index,error){
        if(error==='token failed'){
            //this.props.history.push("/");
            window.location.href= htmlurl+"index.html";
        }else{
            //toast.show(error);
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg(error + "");
            })
        }
    }


}

module.exports=BaseComponent;
