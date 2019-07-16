/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CouponEditor extends Widget.Base{

    constructor(props) {
        super(props);
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            coupon_type:systemAccountBean.system_type+""==="2"?"2":"1",
            couponBean:{coupon_way:"1",time_type:"1",issue_type:"1",display_type:"1",coupon_range:'1'},
            coupon_id:this.props.params.coupon_id,
            couponTypeBeans:[{name:"平台券",value:"1"},{name:"店铺券",value:"2"}],
            couponWayBeans:[{name:"有门槛",value:"1"},{name:"无门槛",value:"2"}],
            timeTypeBeans:[{name:"绝对时间",value:"1"},{name:"相对时间",value:"2"}],
            issueTypeBeans:[{name:"无限量",value:"1"},{name:"有限量",value:"2"}],
            displayTypeBeans:[{name:"后台直接赠送",value:"1"},{name:"前端主动领取",value:"2"}],
            rangeBeans:[{name:"全场商品",value:"1"},{name:"部分商品",value:"2"}],

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[],

            index:1,
            activityGiveGoodsBean:[],
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        if(this.props.params.coupon_id!=="-1"){
            this.getShopCouponDetail();
        }
    }

    getShopCouponDetail(){
        this.getDataByPost(1,shop_homeurl+"/shopCouponContrllor/v1.0/getShopCouponDetail",{coupon_id:this.state.coupon_id});
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:

                let goods_ids=this.getNull(data.goods_ids,"");
                this.setState({
                    couponBean:data,
                    goods_arr:goods_ids.split(",")
                })
                break;
            case 2:
                if(this.state.couponBean.coupon_range==='1'){
                    this.showTip("保存成功");
                    this.props.history.goBack();
                }else {
                    this.setState({
                        coupon_id: data,
                        index: 2
                    }, ()=> {
                        this.getGoodsOutCoupon();
                    })
                }
                break;
            case 3:
                if(this.state.couponBean.coupon_range==='1'){
                    this.showTip("保存成功");
                    this.props.history.goBack();
                }else{
                    this.setState({
                        index:2
                    },()=>{
                        this.getGoodsOutCoupon();
                        this.getCouponGoodss();
                    })
                }
                break;
            case 4:
                this.setState({
                    goodsBeans:data,
                    goods_total:total
                })
                break;
            case 5:
                this.showTip("添加成功");
                this.getGoodsOutCoupon();
                this.getCouponGoodss();
                break;
            case 6:
                this.setState({
                    activityGiveGoodsBean:data,
                    total:total
                })
                break;
        }
    }

    insertShopCoupon(){
        if(this.isNull(this.state.couponBean.coupon_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["coupon_name"]=this.state.couponBean.coupon_name;
        params["coupon_desc"]=this.state.couponBean.coupon_desc;
        params["coupon_full_price"]=this.state.couponBean.coupon_full_price;
        params["coupon_price"]=this.state.couponBean.coupon_price;
        params["receive_start_time"]=this.state.couponBean.receive_start_time;
        params["receive_end_time"]=this.state.couponBean.receive_end_time;
        params["coupon_range"]=this.state.couponBean.coupon_range;
        params["coupon_need_coin"]=this.state.couponBean.coupon_need_coin;


        if(this.state.coupon_id==="-1"){
            params["coupon_type"]=this.state.coupon_type;
            params["merchants_id"]=this.state.merchants_id;
            params["coupon_way"]=this.state.couponBean.coupon_way;
            params["time_type"]=this.state.couponBean.time_type;
            params["start_time"]=this.state.couponBean.start_time;
            params["end_time"]=this.state.couponBean.end_time;
            params["valid_day"]=this.state.couponBean.valid_day;
            params["issue_type"]=this.state.couponBean.issue_type;
            params["issue_num"]=this.state.couponBean.issue_num;
            params["display_type"]=this.state.couponBean.display_type;
            this.getDataByPost(2,shop_homeurl+"/shopCouponContrllor/v1.0/insertShopCoupon",params);
        }else{
            params["coupon_id"]=this.state.coupon_id;
            this.getDataByPost(3,shop_homeurl+"/shopCouponContrllor/v1.0/updateShopCoupon",params);
        }
    }

    insertCouponGoods(){
        var params={};
        params["goods_ids"]=this.state.goods_arr.toString();
        params["coupon_id"]=this.state.coupon_id;
        this.getDataByPost(5,shop_homeurl+"/shopCouponContrllor/v1.0/updateShopCoupon",params);
    }

    getCouponGoodss(){
        this.getDataByPost(6,shop_homeurl+"/shopCouponContrllor/v1.0/getCouponGoodss",
            {page:this.state.page,coupon_id:this.state.coupon_id})
    }

    getGoodsOutCoupon(){
        this.getDataByPost(4,shop_homeurl+"/shopCouponContrllor/v1.0/getGoodsOutCoupon",
            {page:this.state.goods_page,
                goods_name:this.state.goods_name,
                class_name:this.state.class_name,
                coupon_id:this.state.coupon_id})
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"优惠券详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderBase()}
                {this.renderCoupon()}
            </div>
        )
    }

    renderBase(){
        let baseData=[];
        if(this.state.coupon_id==="-1"){
            baseData=[
                {name:"优惠券名称",flex:1,key:'coupon_name'},
                {name:"优惠券描述",flex:1,key:'coupon_desc',type:'textarea'},
                {name:"领取时间",flex:1,key:'receive_start_time',key2:"receive_end_time",type:"dates",dateType:"datetime"},
                {name:"优惠方式",flex:1,key:'coupon_way',type:'radio',data:this.state.couponWayBeans,show_value:"name",select_value:"value"},
            ];

            if(this.state.couponBean.coupon_way==="1"){
                baseData=baseData.concat([{name:"优惠满足金额",flex:1,key:'coupon_full_price'}])
            }
            baseData=baseData.concat([{name:"优惠金额",flex:1,key:'coupon_price'},
                {name:"有效期类型",flex:1,key:'time_type',type:'radio',data:this.state.timeTypeBeans,show_value:"name",select_value:"value"}
            ])
            if(this.state.couponBean.time_type==="1"){
                baseData=baseData.concat([
                    {name:"使用时间",flex:1,key:'start_time',key2:'end_time',type:'dates',dateType:'datetime'}
                ])
            }else{
                baseData=baseData.concat([{name:"有效天数",flex:1,key:'valid_day'}])
            }

            if(this.state.couponBean.issue_type!=="1"){
                baseData=baseData.concat([{name:"发行量",flex:1,key:'issue_num'}])
            }
          
            baseData=baseData.concat([{name:"领取方式",flex:1,key:'display_type',type:'radio',data:this.state.displayTypeBeans,show_value:"name",select_value:"value"}])
         
            
            baseData=baseData.concat([{name:"使用范围",flex:1,key:'coupon_range',type:'radio',data:this.state.rangeBeans,show_value:"name",select_value:"value"}])

        }else{
            baseData=[{name:"优惠券名称",flex:1,key:'coupon_name'},
                {name:"优惠券描述",flex:1,key:'coupon_desc',type:'textarea'},
                {name:"领取开始时间",flex:1,key:'receive_start_time',type:'text'},
                {name:"领取结束时间",flex:1,key:'receive_end_time',type:'text'},
                {name:"优惠方式",flex:1,key:'coupon_way_show',type:'text'}]
            if(this.state.couponBean.coupon_way==="1"){
                baseData=baseData.concat([{name:"优惠满足金额",flex:1,key:'coupon_full_price'}])
            }
            baseData=baseData.concat([{name:"优惠金额",flex:1,key:'coupon_price'},
                {name:"有效期类型",flex:1,key:'time_type_show',type:'text'},
                {name:"开始时间",flex:1,key:'start_time',type:'text'},
                {name:"结束时间",flex:1,key:'end_time',type:'text'},
                {name:"有效天数",flex:1,key:'valid_day',type:'text'},
                {name:"发行类型",flex:1,key:'issue_type_show',type:'text'},
                {name:"发行量",flex:1,key:'issue_num',type:'text'},
                {name:"领取量",flex:1,key:'take_num',type:'text'},
                {name:"使用量",flex:1,key:'used_num',type:'text'},
                {name:"领取方式",flex:1,key:'display_type_show',type:'text'},
                ])
        }
        if(this.state.couponBean.display_type+""=="2"){//前端主动领取
            baseData=baseData.concat([{name:'金币要求',flex:1,key:'coupon_need_coin',},
            {name:"使用范围",flex:1,key:'coupon_range_show',type:'text'}
        ])

        }else[
            baseData=baseData.concat([{name:"使用范围",flex:1,key:'coupon_range_show',type:'text'}])
        ]
        return(
            <div style={{display:this.state.index==1?'flex':"none",flexDirection:'column'}}>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.couponBean}
                    onChange={(key,value,index)=>{
                        this.state.couponBean[key]=value;
                        this.refresh();
                    }}/>
                <div style={{display:'flex',flex:1,marginTop:10,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value={this.state.couponBean.coupon_range==='1'?"保存":"下一步"}
                        onClick={()=>{
                            this.insertShopCoupon();
                        }}/>
                </div>
            </div>
        )
    }

    renderCoupon(){
        return(
            <div style={{display:this.state.index==2?'flex':"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.openHtml("#goods","请选择商品");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"商品id",flex:2,key:'goods_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.activityGiveGoodsBean}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认删除？",()=>{
                                    this.removeArray(this.state.goods_arr,this.state.activityGiveGoodsBean[index].goods_id);
                                    this.setState({
                                        a:1
                                    },()=>{
                                        this.insertCouponGoods();
                                    })
                                })
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getActivityGiveGoods()
                        })
                    }}>
                </Widget.List>
                {this.renderGoods()}
                <div style={{display:"flex",flex:1,marginTop:10,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="退出"
                        onClick={()=>{
                            this.props.history.goBack();
                        }}/>
                </div>
            </div>
        )
    }

    renderGoods() {
        return (
            <div id="goods" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="商品名称"
                        value={this.state.goods_name}
                        onChange={(value)=> {
                            this.setState({
                                goods_name: value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="分类名称"
                        value={this.state.class_name}
                        onChange={(value)=> {
                            this.setState({
                                class_name: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getGoodsOutCoupon();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertCouponGoods();
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                        {name: "供应商名称", flex: 1, key: 'merchants_name'}
                    ]}
                    dataSource={this.state.goodsBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="goods_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.goods_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_arr,key)
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_page: page
                        }, ()=> {
                            this.getGoodsOutCoupon()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=CouponEditor;