import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class Welfare extends Widget.Base{

    constructor(props){
           super(props);
           this.state={
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            welfareBean:{},
            sheepClassBean:[],
            sheep_name:'',
            coupon_name:'认养券',
            welfare_id:'1',
            welfareCoupons:[],
            welfareShopCoupons:[],
            page:1,
            total:0,


            sheepCoupons:[],
            coupon_page:1,
            coupon_total:0,
            coupon_arr:[],



           


            shopCoupons:[],
            shopCoupon_page:1,
            shopCoupon_total:0,
            shopCoupon_arr:[],


           }
    }

    componentDidMount() {

        this.getWelfareDetail();
        this.getWelfareCoupons();
        this.getSheepCoupons();
        this.getShopWelfareCoupons();
        

    }
    getWelfareDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getWelfareDetail",{welfare_id:this.state.welfare_id})
    }
    getShopWelfareCoupons(){
        this.getDataByPost(8,sheep_homeurl+"/sheepCouponController/v1.0/getWelfareCouponsV3",{})
    }
    
    getWelfareCoupons(){
        this.getDataByPost(3,sheep_homeurl+"/sheepCouponController/v1.0/getWelfareCoupons",{page:this.state.page},{type:2})
    }
    updateWelfare(a){
        var params={};
       
        if(a==1){
            params['welfare_time']=this.state.welfareBean.welfare_time;//福利天数
            params['vaild_day']=this.state.welfareBean.vaild_day;

        }else if(a==2){
            params['coupon_name']=this.state.welfareBean.coupon_name;
            params['coupon_price']=this.state.welfareBean.coupon_price;
        }
        params['welfare_id']=this.state.welfare_id
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateWelfare",params)

    }
    getShopCoupons(){
        this.getDataByPost(6,sheep_homeurl+"/sheepCouponController/v1.0/getShopCoupons"
            ,{page:this.state.shopCoupon_page,
                coupon_type:"1",
                display_type:'2'
            },{type:2})
    }
    getSheepCoupons(){
        this.getDataByPost(4,sheep_homeurl+"/sheepCouponController/v1.0/getWelfareCouponsV2"
            ,{page:this.state.coupon_page,
                coupon_state:'1',
                coupon_type:'get'},{type:2})
    }
    

    insertWelfareCoupons(){
        if(this.state.coupon_arr.length==0){
            this.showTip("未选择优惠券");
            return ;
        }
      
        this.getDataByPost(5,sheep_homeurl+"/sheepCouponController/v1.0/insertWelfareCoupons",{welfare_id:'1',coupon_id:this.state.coupon_arr.toString()})

    }

    insertShopCoupons(){
        if(this.state.shopCoupon_arr.length==0){
            this.showTip("未选择优惠券");
            return ;

        }
        this.getDataByPost(7,sheep_homeurl+"/sheepCouponController/v1.0/insertShopWelfareCoupons",{welfare_id:'1',shop_coupon_id:this.state.shopCoupon_arr.toString()})


    }
    

    doSuccess(index,data){

        switch(index){
            case 1:
            this.setState(
                {
                    welfareBean:data,
                }
            )
            break;
            case 2:
            this.showTip("保存成功")
            this.getWelfareDetail
            break;
            case 3:
            this.setState(
                {
                    welfareCoupons:data.data,
                    total:data.total,
                }
            )
            break;
            case 4:
        
            this.setState(
                {
                    sheepCoupons:data.data,
                    coupon_total:data.total,
                }
            )
            break;
           
            case 5:
            this.showTip("操作成功")
            this.getWelfareCoupons();
            this.getSheepCoupons();
            this.getShopWelfareCoupons();
            this.setState(
                {  coupon_arr:[] ,
                  shopCoupon_arr:[],
                }
            )
            break;
            case 6:
                this.setState(
                    {
                        shopCoupons:data.data,
                        shopCoupon_total:data.total,
                    },()=>{
                        this.openHtml("#shopCoupon","请选择优惠券")
                    }
                )

            break;
            case 7:
            this.showTip("添加成功")
            this.getShopWelfareCoupons();
            this.setState({
                shopCoupon_arr:[]
            })
            break;
            case 8:
            this.setState(
                {
                    welfareShopCoupons :data,
                }
            )
            break;

        }

    }

    renderShopCoupons(){

        return(
            <div>
                <Widget.Detail
                    title="商城优惠券"
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{ 
                        return(
                            <div>
                       <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                           this.getShopCoupons()
                        }}/>
                            </div>
                        )
                    }
                        
                    }
                    >
                    <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'coupon_id'},
                        {name:"优惠券名称",flex:2,key:'coupon_name'},
                        {name:"优惠金额",flex:1,key:'coupon_price'},
                        {name:'类型',flex:1,key:'coupon_type_show'},
                        {name:"领取量",flex:1,key:'take_num'},
                        {name:"使用量",flex:1,key:'used_num'},
                        {name:'时间类型',flex:1,key:'time_type_show'},
                        {name:"有效天数",flex:1,key:'valid_day'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                   this.getDataByPost(5,sheep_homeurl+"/sheepCouponController/v1.0/deleteShopWelfareCoupon",{shop_coupon_id:this.state.welfareShopCoupons[rowID].coupon_id});
                                    break;
                            }
                        }}
                    dataSource={this.state.welfareShopCoupons}
                    >
                </Widget.List> 
                {this.renderShopCouponHtml()} 
               
                    </Widget.Detail>
            </div>
        )
    }


    render(){
        let baseData=[];
        baseData=[
          
            {name:'名称',flex:1,key:'coupon_name',},
            {name:'有效天数',flex:1,key:'vaild_day', },
            {name:'体验天数',flex:1,key:'welfare_time'},
        ]
       
        return(
            <div>
                 <Widget.Toolbar title={"新手福利"} history={this.props.history}></Widget.Toolbar>
                 <Widget.Detail
                    title="认养体验券"
                    baseData={baseData}
                    data={this.state.welfareBean}
                    onSave={()=>{
                        this.updateWelfare(1);
                    }}
                    onChange={(key,value,index)=>{
                        this.state.welfareBean[key]=value;
                        this.refresh();
                    }}
                    >
                    </Widget.Detail>
                    <Widget.Detail
                    title="认养优惠券"
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{ 
                        return(
                            <div>
                       <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.openHtml("#welfareCoupon","请选择优惠券")
                        }}/>
                            </div>
                        )
                    }
                    }
                    >
                    <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'coupon_id'},
                        {name:"优惠券名称",flex:2,key:'coupon_name'},
                        {name:"优惠金额",flex:1,key:'coupon_price'},
                        {name:'类型',flex:1,key:'coupon_type_show'},
                        {name:"领取量",flex:1,key:'take_num'},
                        {name:"使用量",flex:1,key:'used_num'},
                        {name:'时间类型',flex:1,key:'time_type_show'},
                        {name:"有效天数",flex:1,key:'effective_day'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                console.log(this.state.welfareCoupons[rowID].shop_coupon_id)
                                   this.getDataByPost(5,sheep_homeurl+"/sheepCouponController/v1.0/deleteWelfareCoupon",{welfare_coupon_id:this.state.welfareCoupons[rowID].welfare_coupon_id});
                                    break;
                            }
                        }}
                    dataSource={this.state.welfareCoupons}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getWelfareCoupons()
                        })
                    }}>
                </Widget.List>  
               
                    </Widget.Detail>
                    {this.renderShopCoupons()}

                    
                    {this.renderCouponsHtml()}
            </div>
        )
    }


    
   renderShopCouponHtml(){

    return(
        <div id="shopCoupon" style={{display:"none",flexDirection:'column'}}>
       <Widget.View>         
                <Widget.Button
                    style={{marginLeft:20}}
                    value="添加"
                    onClick={()=> {
                        var layer = layui.layer;
                        layer.close(layer.index)
                        console.log("----")
                        this.sendmsgV2();
                    }}/>
            </Widget.View>
            <Widget.List
               data={[
                {name:'ID',flex:1,key:'-2'},
                {name:"ID",flex:1,key:'coupon_id'},
                {name:"优惠券名称",flex:2,key:'coupon_name'},
                {name:"优惠类型",flex:1,key:'coupon_type_show'},
                {name:"优惠方式",flex:1,key:'coupon_way_show'},
                {name:"优惠满足金额",flex:1,key:'coupon_full_price'},
                {name:"优惠金额",flex:1,key:'coupon_price'},
                {name:"有效期类型",flex:1,key:'time_type_show'},
                {name:"领取开始时间",flex:2,key:'receive_start_time'},
                {name:"领取结束时间",flex:2,key:'receive_end_time'},
                {name:"发行类型",flex:1,key:'issue_type_show'},
                {name:"领取方式",flex:2,key:'display_type_show'},
                {name:"使用范围",flex:2,key:'coupon_range_show'},
                {name:"创建时间",flex:2,key:'create_time'},
               ]}
                
            dataSource={this.state.shopCoupons}
                page={this.state.shopCoupon_page}
                total={this.state.shopCoupon_total}
                checkArr={this.state.shopCoupon_arr}
                checkKey="coupon_id"
                onChecked={(key,checked)=>{
                    if(checked==='1'){
                        this.state.shopCoupon_arr.push(key);
                    }else{
                        this.removeArray(this.state.shopCoupon_arr,key)
                    }
                    this.refresh();
                }}
                onPage={(page)=> {
                    this.setState({
                        shopCoupon_page: shop_page
                    }, ()=> {
                        this.getshopCoupons()
                    })
                }}>
            </Widget.List>
        </div>
        )

   }








    renderCouponsHtml(){
       

        return(
            <div id="welfareCoupon" style={{display:"none",flexDirection:'column'}}>
            <Widget.View>         
                <Widget.Button
                    style={{marginLeft:20}}
                    value="添加"
                    onClick={()=> {
                        var layer = layui.layer;
                        layer.close(layer.index)
                        this.insertWelfareCoupons();
                    }}/>
            </Widget.View>
            <Widget.List
               data={[
                {name:'ID',flex:1,key:'-2'},
                {name:"优惠券ID",flex:1,key:'coupon_id'},
                {name:"优惠券名称",flex:2,key:'coupon_name'},
                {name:"优惠金额",flex:1,key:'coupon_price'},
                {name:'类型',flex:1,key:'coupon_type_show'},
                {name:'状态',flex:1,key:'coupon_state',type:'radio_select'},
                {name:"领取量",flex:1,key:'take_num'},
                {name:"使用量",flex:1,key:'used_num'},
                {name:'时间类型',flex:1,key:'time_type_show'},
                {name:"有效天数",flex:1,key:'effective_day'},
                {name:"开始时间",flex:2,key:'start_use_time'},
                {name:"结束时间",flex:2,key:'end_use_time'},]}
            dataSource={this.state.sheepCoupons}
                page={this.state.coupon_page}
                total={this.state.coupon_total}
                checkArr={this.state.coupon_arr}
                checkKey="coupon_id"
                onChecked={(key,checked)=>{
                    if(checked==='1'){
                        this.state.coupon_arr.push(key);
                        console.log(this.state.coupon_arr)
                    }else{
                        this.removeArray(this.state.coupon_arr,key)
                    }
                    console.log(this.state.coupon_arr+"------")
                    this.refresh();
                }}
                onPage={(page)=> {
                    this.setState({
                        coupon_page: page
                    }, ()=> {
                        this.getSheepCoupons()
                    })
                }}>
            </Widget.List>
        </div>
        )

    }


}
module.exports=Welfare;