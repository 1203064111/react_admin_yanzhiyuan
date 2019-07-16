/**
 * Created by shenjiabo on 16/8/31.
 */
import React,{Component} from 'react'

import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {toast} from 'react-android-style-toast';
var storage = require('key-storage');
var BaseComponent=require('./../component/BaseComponent');
var Button=require('./button');

var limit=10;//一页多少数据
var pageCount=4;//页面展示最大页数
class PageComponent extends BaseComponent{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            curIndex:1,
        };
    }

    render(){
        let pageView=[];
        if(this.props.count>limit){
            pageView.push(
                <div
                    style={{width:25,height:20,borderWidth:1,
                        background:"#ffffff",
                       marginLeft:5,
                        display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}

                    onClick={()=>{
                        if(this.props.curIndex===1){
                            toast.show("已是首页");
                        }else{
                            this.props.onPage(parseInt(this.props.curIndex)-1);
                        }
                    }}>
                    <p1 style={{fontSize:10,color:'RGB(24,128,224)'}}>{"<"}</p1>
                </div>
            )
            let totalCount=parseInt(this.props.count%limit===0?this.props.count/limit:this.props.count/limit+1);//总共多少页
            if(totalCount>1){
                pageView.push(
                    <div style={{width:25,height:20,borderWidth:1,
                        background:this.props.curIndex+""===1+""?"RGB(24,128,224)":"#ffffff",
                        borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                        display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}
                         onClick={()=>{
                             this.props.onPage(1);
                         }}>
                        <p1 style={{fontSize:10,color:this.props.curIndex+""===1+""?"#ffffff":"RGB(24,128,224)"}}>{1}</p1>
                    </div>
                );
            }

            let start=0;
            let maxPage=0;
            if(totalCount>2&&totalCount<=7){
                start=2;
                maxPage=totalCount;
            }else if(totalCount>7){
                if(this.props.curIndex<=4){
                    start=2;
                    maxPage=start+5;
                }else if(totalCount-this.props.curIndex<=4){
                    start=totalCount-5;
                    maxPage=start+5;
                }else{
                    start=this.props.curIndex-2;
                    maxPage=start+5;
                }

                if(this.props.curIndex>4){
                    pageView.push(
                        <div style={{width:25,height:20,borderWidth:1,
                            background:"#ffffff",
                            borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                            display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                            <p1 style={{fontSize:10,color:"RGB(24,128,224)"}}>...</p1>
                        </div>
                    )
                }

            }



            if(maxPage>2){
                for(let i=start;i<maxPage;i++){
                    pageView.push(
                        <div style={{width:25,height:20,borderWidth:1,
                            background:this.props.curIndex+""===i+""?"RGB(24,128,224)":"#ffffff",
                            borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                            display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}
                             onClick={()=>{
                                 this.props.onPage(i);
                             }}>
                            <p1 style={{fontSize:10,color:this.props.curIndex+""===i+""?"#ffffff":"RGB(24,128,224)"}}>{i}</p1>
                        </div>
                    );
                }
            }

            if(totalCount>8){
                if(totalCount-this.props.curIndex>4){
                    pageView.push(
                        <div style={{width:25,height:20,borderWidth:1,
                            background:"#ffffff",
                            borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                            display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                            <p1 style={{fontSize:10,color:"RGB(24,128,224)"}}>...</p1>
                        </div>
                    )
                }

            }else if(totalCount==8){
                if(totalCount-this.props.curIndex>=4){
                    pageView.push(
                        <div style={{width:25,height:20,borderWidth:1,
                            background:"#ffffff",
                            borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                            display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                            <p1 style={{fontSize:10,color:"RGB(24,128,224)"}}>...</p1>
                        </div>
                    )
                }
            }

            if(totalCount>1){
                pageView.push(
                    <div style={{width:25,height:20,borderWidth:1,
                        background:this.props.curIndex+""===totalCount+""?"RGB(24,128,224)":"#ffffff",
                        borderColor:'RGB(204,204,204)',borderStyle:'solid',marginLeft:5,
                        display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}
                         onClick={()=>{
                             this.props.onPage(totalCount);
                         }}>
                        <p1 style={{fontSize:10,color:this.props.curIndex+""===totalCount+""?"#ffffff":"RGB(24,128,224)"}}>{totalCount}</p1>
                    </div>
                );
            }
            pageView.push(
                <div
                    style={{width:20,height:20,borderWidth:1,
                        background:"#ffffff",
                        marginLeft:5,
                        display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}}
                    onClick={()=>{
                        if(this.props.curIndex>=this.props.count/limit){
                            toast.show("已是尾页");
                        }else{
                            this.props.onPage(parseInt(this.props.curIndex)+1);
                        }
                    }}>
                    <p1 style={{fontSize:10,color:'RGB(24,128,224)'}}>{">"}</p1>
                </div>
            )
        }
        return(
            <div style={{display:'flex',flexDirection:'row',
                alignItems:'center',justifyContent:'flex-end',flex:1,
                height:50}}>
                {pageView}

                <Button
                    style={{display:pageView.length>0?"flex":"none",height:20,marginLeft:10,background:'RGB(24,128,224)'}}
                    p_style={{fontSize:5}}
                    value="转至"
                    onClick={()=>{
                        if(isNaN(this.state.page)){
                            this.showTip("页数非法");
                            return;
                        }
                        if(parseInt(this.state.page)>parseInt(this.props.count%limit===0?this.props.count/limit:this.props.count/limit+1)){
                            this.showTip("超过最大页数");
                            return;
                        }
                        this.props.onPage(parseInt(this.state.page));
                    }}/>
                <input
                    type={"text"}
                    style={{display:pageView.length>0?"flex":"none",marginLeft:10,fontSize:8,width:30,height:20,borderRadius:5}}
                    value={this.state.page}
                    onChange={(e)=>{
                        this.setState({
                            page: e.target.value
                        })
                    }}/>
                <p1 style={{fontSize:12,marginLeft:10,marginRight:20}}>
                    共
                    <p1 style={{fontSize:12,color:'RGB(252,13,28)'}}>
                        {this.props.count}
                    </p1>
                    条记录
                    共
                    <p1 style={{fontSize:12,color:'RGB(252,13,28)'}}>
                        {parseInt(this.props.count%limit===0?this.props.count/limit:this.props.count/limit+1)}
                    </p1>
                    页</p1>
            </div>
        )
    }
}

module.exports=PageComponent;