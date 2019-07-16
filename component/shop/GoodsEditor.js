/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class GoodsEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            goods_id:this.props.params.goods_id,
            goods_type:this.props.params.goods_type,
            merchants_id:this.getNull(systemAccountBean.merchants_id,-1),
            merchants_name:this.getNull(systemAccountBean.merchants_name,"平台"),
            display_class:this.props.params.goods_id==="-1" && this.props.params.goods_type === "1"?"flex":"none",
            display_detail:this.props.params.goods_id==="-1" && this.props.params.goods_type === "1"?"none":"flex",
            goodsClassBeans:[],
            merchantsBeans:[],
            apply_state:"1",
            index1:0,
            index2:0,
            index3:0,
            goodsBean:{goods_state:"0"},




        };
    }

    componentDidMount() {
        if(this.props.params.goods_id!=="-1"){
            this.getGoodsDetail();
        }
        this.getGoodsClasssNoPage();
        this.getMerchantssNoPage();
    }




    getGoodsDetail(){
        this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/getGoodsDetail",{goods_id:this.state.goods_id})
    }
    getGoodsClasssNoPage(){
        this.getDataByPost(7,shop_homeurl+"/goodsController/v1.0/getGoodsClasssNoPage",{goods_id:this.state.goods_id})
    }

    getMerchantssNoPage(){
        this.getDataByPost(8,shop_homeurl+"/merchantsController/v1.0/getMerchantssNoPage",{goods_id:this.state.goods_id})
    }

    doSuccess(index,data){
        switch(index){

            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;

            case 4:
                this.setState({
                    goodsBean:data,
                })
                break;

            case 6:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 7:
                this.setState({
                    goodsClassBeans:data
                })
                break;
            case 8:
                this.setState({
                    merchantsBeans:data
                })
                break;

        }
    }

    insertGoods(){
        if(this.state.merchantsBeans.length<=0){
            this.showTip("请先设置供应商");
            return;
        }
        if(this.state.goodsClassBeans.length<=0){
            this.showTip("请先设置商品分类");
            return;
        }
        var params={};


        params["class_name"]=this.state.class_name;



        params["goods_name"]=this.state.goodsBean.goods_name;
        params["goods_img"]=this.state.goodsBean.goods_img;
        params["goods_img2"]=this.state.goodsBean.goods_img2;
        params["goods_video_url"]=this.state.goodsBean.goods_video_url;
        params["goods_video_url2"]=this.state.goodsBean.goods_video_url2;

        params["goods_desc"]=this.state.goodsBean.goods_desc;
        params["goods_url_desc"]=this.state.goodsBean.goods_url_desc;

        params["goods_origin_price"]=this.state.goodsBean.goods_origin_price;
        params["goods_now_price"]=this.state.goodsBean.goods_now_price;
        params["goods_wholesale_price"]=this.state.goodsBean.goods_wholesale_price;
        params["goods_monnaie"]=this.state.goodsBean.goods_monnaie;

        params["goods_weight"]=this.state.goodsBean.goods_weight;
        params["goods_weight_unit"]=this.state.goodsBean.goods_weight_unit;
        params["goods_volume"]=this.state.goodsBean.goods_volume;
        params["goods_volume_unit"]=this.state.goodsBean.goods_volume_unit;

        params["goods_state"]=this.state.goodsBean.goods_state;
        params["goods_stock"]=this.state.goodsBean.goods_stock;
        params["goods_total_sales"]=this.state.goodsBean.goods_total_sales;

        params["class_id"]=this.isNull(this.state.goodsBean.class_id)?this.state.goodsClassBeans[0].class_id:this.state.goodsBean.class_id;
        params["merchants_id"]=this.isNull(this.state.goodsBean.merchants_id)?this.state.merchantsBeans[0].merchants_id:this.state.goodsBean.merchants_id;

        params["goods_type"]=this.state.goods_type;
        params["apply_state"]=this.state.apply_state;
        if(this.state.goods_type==="2"){
            params["merchants_id"]="-1";
        }

        if(this.state.goods_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertGoods",params)
        }else{
            params["goods_id"]=this.state.goods_id;
            params["apply_state"]=this.state.apply_state;
            this.getDataByPost(6,shop_homeurl+"/goodsController/v1.0/updateGoods",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"添加商品"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}

            </div>
        )
    }
    renderDetails(){
        return(
            <Widget.Detail
                title="图文详情"
                marginBottom={20}
                baseData={[]}
                data={{}}>
                <WangeditorComponent
                    name="html"
                    url_desc={this.state.goodsBean.goods_url_desc}
                    onChange={(desc)=>{
                        this.state.goodsBean.goods_url_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }

    renderDetail(){
        let baseData=[{name:"商品名称",flex:1,key:'goods_name'},

            {name:"商品简介",flex:1,key:'goods_desc'},
            {name:"商品图片",flex:1,key:'goods_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:"宝贝视频",flex:1,key:'goods_video_url',type:'video',img_style:{width:100,height:100,marginLeft:10}},
            ];
        if(this.state.goods_type === "2"){

            baseData = baseData.concat([{name:"商品颜值币",flex:1,key:'goods_monnaie'},{name:"库存",flex:1,key:'goods_stock'},]) ;
        }else{
            if(this.state.merchants_id==="-1"){
                baseData = baseData.concat([
                    {name:"供应商",flex:1,key:'merchants_id',type:'select',data:this.state.merchantsBeans,show_value:"merchants_name",select_value:"merchants_id"},
                    {name:"商品分类",flex:1,key:'class_id',type:'select',data:this.state.goodsClassBeans,show_value:"class_name",select_value:"class_id"},
                    {name:"商品原价",flex:1,key:'goods_origin_price'},
                    {name:"商品现价",flex:1,key:'goods_now_price'},]);
            }else{
                baseData = baseData.concat([
                    {name:"商品分类",flex:1,key:'class_id',type:'select',data:this.state.goodsClassBeans,show_value:"class_name",select_value:"class_id"},
                    {name:"商品原价",flex:1,key:'goods_origin_price'},
                    {name:"商品现价",flex:1,key:'goods_now_price'},]);
            }

        }

        baseData = baseData.concat([

        ]);

        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.goodsBean}
                    onChange={(key,value,index)=>{
                        this.state.goodsBean[key]=value;
                        this.setState({
                            apply_state:"1",
                        })
                    }}

                />
                {this.renderDetails()}





                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.insertGoods();
                        }}/>


                </div>

            </div>
        )
    }



}



module.exports=GoodsEditor;