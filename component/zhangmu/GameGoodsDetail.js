/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameGoodsDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameGoodsBean:{},
            goods_id:this.props.params.goods_id,
            class_id:this.props.params.class_id,

           
        };
    }

    componentDidMount() {
        if(this.props.params.goods_id!=="-1"){//添加
            this.getGameGoodsDetil();
        }
    }

    getGameGoodsDetil(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameGoodsDetil",{goods_id:this.state.goods_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameGoodsBean:data,
                    class_id:data.class_id,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertGameGoods(){
        var params={};
        params["goods_name"]=this.state.gameGoodsBean.goods_name;
        params["goods_desc"]=this.state.gameGoodsBean.goods_desc;
        params["goods_img"]=this.state.gameGoodsBean.goods_img;
        params["goods_need_coin"]=this.state.gameGoodsBean.goods_need_coin;
        params["goods_need_bush"]=this.state.gameGoodsBean.goods_need_bush;
        params["goods_use_time"]=this.state.gameGoodsBean.goods_use_time;
        params["goods_imgs"]=this.state.gameGoodsBean.goods_imgs;
        params["goods_open_grade"]=this.state.gameGoodsBean.goods_open_grade;
       
        params["init_img"]=this.state.gameGoodsBean.init_img;
        params["ill_img"]=this.state.gameGoodsBean.ill_img;
        params["feed_img"]=this.state.gameGoodsBean.feed_img;
        params["hello_img"]=this.state.gameGoodsBean.hello_img;
        params["crue_img"]=this.state.gameGoodsBean.crue_img;
        params["hunger_img"]=this.state.gameGoodsBean.hunger_img;
        params["foot_img"]=this.state.gameGoodsBean.foot_img;
        params["sleep_img"]=this.state.gameGoodsBean.sleep_img;
        params["happy_img"]=this.state.gameGoodsBean.happy_img;
        params["ill_img2"]=this.state.gameGoodsBean.ill_img2;
        params["feed_img2"]=this.state.gameGoodsBean.feed_img2;
        params["hello_img2"]=this.state.gameGoodsBean.hello_img2;
        params["crue_img2"]=this.state.gameGoodsBean.crue_img2;
        params["hunger_img2"]=this.state.gameGoodsBean.hunger_img2;
        params["foot_img2"]=this.state.gameGoodsBean.foot_img2;
        params["sleep_img2"]=this.state.gameGoodsBean.sleep_img2;
        params["happy_img2"]=this.state.gameGoodsBean.happy_img2;
        params["init_img2"]=this.state.gameGoodsBean.init_img2;
        if(this.state.goods_id==="-1"){
            params["class_id"]=this.state.class_id;
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertGameGoods",params);
        }else{
            params["goods_id"]=this.state.goods_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateGameGoods",params);
        }
    }


    render(){
       
        // 1装扮，2成长，3药品，4背景
        let baseData=[
            {name:'道具名称',flex:'1',key:'goods_name'},]

          baseData=baseData.concat([
            {name:'道具图标',flex:1,key:'goods_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'购买权限（等级）',flex:1,key:'goods_open_grade'},
             ])
        if(this.state.gameGoodsBean.class_id+""==="2"){
            //成长物品
            baseData=baseData.concat([
                {name:'道具用图',flex:1,key:'goods_imgs',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'兑换所需苜蓿',flex:'1',key:'goods_need_bush'},
                {name:'购买所需金币',flex:'1',key:'goods_need_coin'},
                {name:'持续时间(时)',flex:'1',key:'goods_use_time'},
                {name:'道具说明',flex:'1',key:'goods_desc',type:'textarea'},
            ]);
        }
        else if(this.state.gameGoodsBean.class_id+""==="3"||this.state.gameGoodsBean.class_id+""==="4") {
            //背景，或治疗用品
            baseData=baseData.concat([
                {name:'道具用图',flex:1,key:'goods_imgs',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'购买所需金币',flex:'1',key:'goods_need_coin'},
                {name:'道具说明',flex:'1',key:'goods_desc',type:'textarea'},]);
        }else{//装扮
            baseData=baseData.concat([
                {name:'购买所需金币',flex:'1',key:'goods_need_coin'},
                {name:'道具说明',flex:'1',key:'goods_desc',type:'textarea'},]);

        }
       
       
        return(
            <div>
                
                <Widget.Toolbar title={"道具详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.gameGoodsBean}
                    onChange={(key,value,index)=>{
                        this.state.gameGoodsBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertGameGoods();
                    }}/>
                    {this.renderSheepImg()}
                    
            </div>
        )
    }

    renderSheepImg(){
        let baseData=[];
        baseData=[
            {name:'初始状态',flex:1,key:'init_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'生病',flex:1,key:'ill_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'喂食',flex:1,key:'feed_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'打招呼',flex:1,key:'hello_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'治疗',flex:1,key:'crue_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'饥饿',flex:1,key:'hunger_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'散步',flex:1,key:'foot_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'睡觉',flex:1,key:'sleep_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'开心',flex:1,key:'happy_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            
        ]
       let baseData2=[
        {name:'初始状态',flex:1,key:'init_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'生病',flex:1,key:'ill_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'喂食',flex:1,key:'feed_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'打招呼',flex:1,key:'hello_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'治疗',flex:1,key:'crue_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'饥饿',flex:1,key:'hunger_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'散步',flex:1,key:'foot_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'睡觉',flex:1,key:'sleep_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'开心',flex:1,key:'happy_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},]

        return(
            <div style={{display:this.state.class_id+""==="1"?'flex':'none'}}>
                <Widget.Detail
               
                   title="羊只初始化（小）"
                    baseData={baseData}
                    data={this.state.gameGoodsBean}
                    onChange={(key,value,index)=>{
                        this.state.gameGoodsBean[key]=value;
                       
                        this.refresh();
                    }}
                    >
                        </Widget.Detail>
                        <Widget.Detail
               
                   title="羊只初始化（大）"
                    baseData={baseData2}
                    data={this.state.gameGoodsBean}
                    onChange={(key,value,index)=>{
                        this.state.gameGoodsBean[key]=value;
                        this.refresh();
                    }}
                    
                    >
               
                        </Widget.Detail>
          
            </div>
        )
    }


}

module.exports=GameGoodsDetail;