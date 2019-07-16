/**
 * Created by liyong on 2018/8/27.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class ActivityOneYuanShoppingGoodsDetail extends Widget.Base{
    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            goods_id:this.props.params.goods_id,
            activity_id:this.props.params.activity_id,
            ZMActivityGoodsBean:{},
            freightBeans:[],
        };
    }

    componentDidMount() {
        this.getActivityGoodsDetail();
        this.getFreightsNoPage();
    }

    getActivityGoodsDetail(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivityGoodsDetail",
            {goods_id:this.state.goods_id,activity_id:this.state.activity_id});
    }

    updateActivityGoodsDetail(){
        this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/updateActivityGoodsDetail",
            {goods_id:this.state.goods_id,activity_id:this.state.activity_id,
                goods_img:this.state.ZMActivityGoodsBean.goods_img,
                goods_name:this.state.ZMActivityGoodsBean.goods_name,
                activity_people:this.state.ZMActivityGoodsBean.activity_people,
                activity_people_win:this.state.ZMActivityGoodsBean.activity_people_win,
                goods_url_desc:this.state.ZMActivityGoodsBean.goods_url_desc,
                freight_id:this.state.ZMActivityGoodsBean.freight_id});
    }

    getFreightsNoPage(){
        this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/getFreightsNoPage")
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ZMActivityGoodsBean:data,
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
            case 4:
                this.setState({
                    freightBeans:data
                })
                break;
        }

    }

    insertActivity(){
        if(this.isNull(this.state.ZMActivityGoodsBean.activity_name)){
            this.showTip("请先添加名称");
            return;
        }

        if(this.state.freightBeans.length<=0){
            this.showTip("请先设置运费模板");
            return;
        }

        var params={};
        params["goods_id"]=this.state.ZMActivityGoodsBean.goods_id;
        params["goods_img"]=this.state.ZMActivityGoodsBean.goods_img;
        params["goods_name"]=this.state.ZMActivityGoodsBean.goods_name;
        params["activity_people"]=this.state.ZMActivityGoodsBean.activity_people;
        params["activity_people_win"]=this.state.ZMActivityGoodsBean.activity_people_win;
        params["goods_url_desc"]=this.state.ZMActivityGoodsBean.goods_url_desc;
        params["freight_id"]=this.isNull(this.state.ZMActivityGoodsBean.freight_id)?this.state.ZMActivityGoodsBean[0].freight_id:this.state.ZMActivityGoodsBean.freight_id;

        if(this.state.activity_id==="-1"){
            this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/insertActivity",params);
        }else{
            params["activity_id"]=this.state.activity_id;
            params["goods_id"]=this.state.goods_id;
            this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/updateActivityGoodsDetail",params);
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"一元抢购商品详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="商品信息"
                    data={this.state.ZMActivityGoodsBean}
                    baseData={[
                        {name:"商品id",flex:1,key:'goods_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"活动人数",flex:1,key:'activity_people'},
                        {name:"活动中奖人数",flex:1,key:'activity_people_win'},
                        {name:"运费模板",flex:1,key:'freight_id',type:'select',data:this.state.freightBeans,show_value:"freight_name",select_value:"freight_id"},
                        {name:"商品图片",flex:1,key:'goods_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                    ]}
                    onChange={(key,value,index)=>{
                    this.state.ZMActivityGoodsBean[key]=value;
                    this.refresh(); }}
                />
                <Widget.Detail
                    title="图文详情"
                    marginBottom={20}
                    baseData={[]}
                    data={{}}>
                    <WangeditorComponent
                        name="goods"
                        url_desc={this.state.ZMActivityGoodsBean.goods_url_desc}
                        onChange={(desc)=>{
                            this.state.ZMActivityGoodsBean.goods_url_desc=desc;
                            this.refresh();
                        }}/>
                </Widget.Detail>
                <Widget.Button
                    style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                    value="保存"
                    onClick={()=>{
                            this.updateActivityGoodsDetail();
                        }}/>
            </div>
        )
    }

}

module.exports=ActivityOneYuanShoppingGoodsDetail;
