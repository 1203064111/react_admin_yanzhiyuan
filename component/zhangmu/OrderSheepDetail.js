/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderSheepDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            order_state:"",
            orderBean:{},
            sheepOrderBeans:[],
            orderLogisticsCompanyBeans:[],
            memberCouponBean:{},
        };
    }

    componentDidMount() {
        this.getOrderDetail();
        this.getOrderLogisticsCompanys();
        this.getCitys();
    }
    getOrderDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepOrderController/v1.0/getOrderDetail",{order_id:this.state.order_id});

    }
    getCitys(){
        this.getDataByPost(5,member_homeurl+"/settingController/v1.0/getCitys",{});
    }

    getOrderLogisticsCompanys(){
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/getOrderLogisticsCompanys"
            ,{})
    }
    updateSheepOrder(){

        if(this.isNull(this.state.orderBean.cut_factory)){

           this.showTip("屠宰工厂不可为空");
          return;
        }
        if(this.isNull(this.state.orderBean.cut_time)){

            this.showTip("屠宰时间不可为空");
           return;
         }
         this.getDataByPost(6,shop_homeurl+"/orderController/v1.0/updateSheepOrder"
         ,{
             cut_factory:this.state.orderBean.cut_factory,
             cut_time:this.state.orderBean.cut_time
         }
        )
    }
                      
   


    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    orderBean:data,
                    order_state:data.order_state,
                    orderLogisticsBean:data.orderLogisticsBean,
                    sheepOrderBeans:data.sheepOrderBeans,
                    memberCouponBean:data.memberCouponBean
                })
                break;
           
            case 3:
                this.setState({
                    orderLogisticsCompanyBeans:data,
                })
                break;
            case 4:
                this.showTip("发货成功");
                this.getOrderDetail()
                break;
            case 5:
                this.setState({
                    cityBeans:data
                })
                break;
            case 6:
               this.showTip('保存成功');
               this.getOrderDetail()
               break;    
        }
    }


    sendOrder(){
        var params={};
        params["order_id"]=this.state.order_id;
        params["logistics_no"] = this.state.orderBean.logistics_no;
        params["logistics_name"] = this.getNull(this.state.orderBean.logistics_name,this.state.orderLogisticsCompanyBeans[0].logistics_name);
        params["logistics_pinyin"] = this.getNull(this.state.orderBean.logistics_pinyin,this.state.orderLogisticsCompanyBeans[0].logistics_pinyin);
        params["send_company"] = this.state.orderBean.send_company;
        params["send_name"] = this.state.orderBean.send_name;
        params["send_mobile"] = this.state.orderBean.send_mobile;
        params["send_privince"] = this.state.orderBean.send_privince;
        params["send_city"] = this.state.orderBean.send_city;
        params["send_country"] = this.state.orderBean.send_country;
        params["send_address"] = this.state.orderBean.send_address;
        params[""]=this.state
        this.getDataByPost(4,sheep_homeurl + "/sheepOrderController/v1.0/sendOrder", params)
    }

   
    render(){
        return(
            <div>
                <Widget.Toolbar title={"订单详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_id',type:'text'},
                        {name:"支付金额",flex:1,key:'order_actual_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                        {name:"订单类型",flex:1,key:'order_type_show',type:'text'},
                        {name:'用户账号',flex:1,key:'member_account',type:'text'},
                        {name:'屠宰工厂',flex:1,key:'cut_factory'},
                        {name:'屠宰时间',flex:1,key:'cut_time',type:'data'},
                    ]

                    }
                    onSave={
                        ()=>{
                            this.updateOrder();

                        }
                    }
                    data={this.state.orderBean}
                    onChange={(key,value)=>{
                        this.state.orderBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderSheeps()}
                {this.renderCoupon()}
                {this.renderInvoice()}
                {this.renderSend()}
                
            </div>
        )
    }

    

    renderSend(){
        return(
            <div style={{display:'flex'}}>
                <Widget.Detail
                    width={300}
                    title="地址信息"
                    baseData={[{name:"地址id",flex:1,key:'address_id',type:'text'},
                        {name:"收货人姓名",flex:1,key:'address_name',type:'text'},
                        {name:"收货人手机号",flex:1,key:'address_mobile',type:'text'},
                        {name:"省",flex:1,key:'address_province',type:'text'},
                        {name:"市",flex:1,key:'address_city',type:'text'},
                        {name:"区",flex:1,key:'address_country',type:'text'},
                        {name:"详情地址",flex:1,key:'address_detail',type:'text'},
                    ]}
                    data={this.state.orderBean}/>
                <Widget.Detail
                    width={300}
                    title="发货信息"
                    baseData={[{name:"快递单号",flex:1,key:'logistics_no'},
                        {name:"快递公司",flex:1,key:'logistics_pinyin',type:'select',data:this.state.orderLogisticsCompanyBeans,show_value:"logistics_name",select_value:"logistics_pinyin"},
                        {name:"发件人公司名称",flex:1,key:'send_company'},
                        {name:"发件人姓名",flex:1,key:'send_name'},
                        {name:"发件人手机号",flex:1,key:'send_mobile'},
                        {name:"发件人省市区",flex:1,key1:'send_privince',key2:'send_city',key3:'send_country',type:'city',addressBeans:this.state.cityBeans},
                        {name:"发件人地址",flex:1,key:'send_address'},
                    ]}
                    data={this.state.orderBean}
                    onChange={(key,value,index)=>{
                        this.state.orderBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:this.state.order_state === "wait_receive"?"flex":"none",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.openTip("确认保存?",()=>{//更改发货信息
                                            this.updateOrder()
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{display:this.state.order_state === "wait_send"?"flex":"none",marginRight:20}}
                                    value="发货"
                                    onClick={()=>{
                                       
                                        this.openTip("确认发货?",()=>{
                                            this.sendOrder()
                                        })
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }

   

    renderSheeps(){
        return(
            <Widget.Detail
                title="羊只信息"
                baseData={[]}
                data={{}}>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'order_sheep_id',type:'text'},
                        {name:'名称',flex:1,key:'sheep_name',},
                        {name:"耳标",flex:1,key:'ear_sign',type:'text'},
                        {name:'入栏重量',flex:1,key:'sheep_kg',},
                        {name:'羊栏',flex:1,key:'sheep_room',},
                        {name:"价格",flex:1,key:'sheep_price',type:'text'},
                        {name:'出栏日期',flex:1,key:'sheep_end_time',},
                        {name:'购买日期',flex:1,key:'create_time',},
                    ]}
                    dataSource={this.state.sheepOrderBeans}/>
            </Widget.Detail>
        )
    }
     renderCoupon(){

        let baseData=[]
        baseData=[
            {name:'ID',flex:1,key:'coupon_id',type:'text'},
            {name:"券名",flex:1,key:'coupon_name',type:'text'},
            {name:'券类型',flex:1,key:'coupon_class_show',type:'text'},
            {name:'获取方式',flex:1,key:'coupon_type_show',type:'text'},
            {name:'优惠价格',flex:1,key:'coupon_price',type:'text'},
            {name:'图片',flex:1,key:'coupon_img',type:'img_click'},
            {name:'生效时间',flex:1,key:'start_use_time',type:'text'},
            {name:'失效时间',flex:1,key:'end_use_time',type:'text'},
        ]
        return(
            <div style={{display:this.state.orderBean.is_coupon+""==="1"?"flex":"none"}}>
            <Widget.Detail
            title="优惠券"
            baseData={
                baseData
            }
            data={this.state.memberCouponBean}
           />
            </div>
            
        )

     }




    renderInvoice(){
        let baseData=[];
        
        baseData = baseData.concat([{name:'发票类型',flex:1,key:'invoice_class_show',type:'text'}
        ,{name:'发票抬头',flex:1,key:'invoice_type_show',type:'text'}
        ])
       this.state.orderBean.invoice_type+""=="1"?
       baseData= baseData.concat([{name:'名称',flex:1,key:'invoice_member_name',type:'text'}])

       :baseData=baseData.concat([{name:'公司名称',flex:1,key:'invoice_company_name',type:'text'}
       ,{name:'纳税人识别号',flex:1,key:'invoice_company_no',type:'text'}
    ])
        this.state.orderBean.invoice_class+""==="2"?
        baseData= baseData.concat([{name:'收件人邮箱',flex:1,key:'invoice_email',type:'text'},
                        ])

        :baseData=baseData.concat([{name:'收件人',flex:1,key:'invoice_name',type:'text'},
                         {name:'发票手机号',flex:1,key:'invoice_mobile',type:'text'},
                         {name:'收票地址',flex:1,key:'invoice_address',type:'text'}
                        ])

                        console.log(baseData)
        
        return(
            <div style={{display:this.state.orderBean.is_invoice+""==="1"?"flex":"none"}}>
            <Widget.Detail
            title="发票信息"
            baseData={
                baseData
            }
            data={this.state.orderBean}
            onChange={(key,value)=>{
                this.state.orderBean[key]=value;
                this.refresh();
            }}/>
            </div>
            
        )
    }

}






module.exports=OrderSheepDetail;
