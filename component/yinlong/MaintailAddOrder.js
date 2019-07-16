/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MaintailAddOrder extends Widget.Base{
    constructor(props) {
        super(props);
        this.state = {
            maintailOrderBean:{},
            maintailOrderAddressBean:{},
            maintailOrderMaterialBean:{},
            cityBeans:[],
            order_id:this.props.params.order_id,

        };
    }



    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    maintailOrderBean:data,
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
                    cityBeans:data

                })
                break;
        }
    }

    componentDidMount() {

        this.getCitys();

    }
    getCitys(){
        this.getDataByPost(4,member_homeurl+"/settingController/v1.0/getCitys",{});
    }
    insertSheepCLass(){
        if(this.isNull(this.state.maintailOrderBean.order_price)){
            this.showTip("请填写维修总金额！");
            return;
        }
        if(this.isNull(this.state.maintailOrderBean.maintail_remark)){
            this.showTip("请填写维修区域！");
            return;
        }
        var params={};
        params["order_price"]=this.state.maintailOrderBean.order_price;
        params["maintail_remark"]=this.state.maintailOrderBean.maintail_remark;
        params["parts_names"]=this.state.maintailOrderBean.parts_names;
        params["maintail_imgs"]=this.state.maintailOrderBean.maintail_imgs;

        params["address_name"]=this.state.maintailOrderAddressBean.address_name;
        params["address_mobile"]=this.state.maintailOrderAddressBean.address_mobile;
        params["address_detailed"]=this.state.maintailOrderAddressBean.address_detailed;
        params["address_province"]=this.getNull(this.state.maintailOrderAddressBean.address_province,this.state.cityBeans[0].name);
        params["address_city"]=this.getNull(this.state.maintailOrderAddressBean.address_city,this.state.cityBeans[0].cityBeans[0].name);
        params["address_country"]=this.getNull(this.state.maintailOrderAddressBean.address_country,this.state.cityBeans[0].cityBeans[0].cityBeans[0].name);
        params["address_zip_code"]=this.state.maintailOrderAddressBean.address_zip_code;

        params["material_name"]=this.state.maintailOrderMaterialBean.material_name;
        params["material_count"]=this.state.maintailOrderMaterialBean.material_count;
        params["material_price"]=this.state.maintailOrderMaterialBean.material_price;
        if(this.state.order_id+""==="-1"){

            this.getDataByPost(2,maintail_homeurl+"/maintailOrderController/v1.0/insertMaintailOrder",params);
        }
    }


    render(){
        let baseData=[
            {name:'维修总金额',flex:'1',key:'order_price'},
            {name:'维修区域',flex:'1',key:'parts_names'},
            {name:'问题描述',flex:'1',key:'maintail_remark',type:'textarea'},
            {name:'维修图片',flex:'1',key:'maintail_imgs',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        ];
        return(
            <div>
                <Widget.Toolbar title={"创建订单"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="订单基础信息"
                    baseData={baseData}
                    data={this.state.maintailOrderBean}
                    onChange={(key,value)=>{
                        this.state.maintailOrderBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSheepCLass();
                    }}/>
                {this.renderAddress()}
                {this.renderMaterial()}

            </div>
        )
    }




    renderAddress(){
        let baseData=[
            {name:'收货人姓名',flex:'1',key:'address_name'},
            {name:'收货人手机号',flex:'1',key:'address_mobile'},
            {name:"省市区",flex:1,key1:'address_province',key2:'address_city',key3:'address_country',type:'city',addressBeans:this.state.cityBeans},
            {name:'详情地址',flex:'1',key:'address_detailed'},
            {name:'邮编',flex:'1',key:'address_zip_code'},
        ];
        return(
            <div>
                <Widget.Detail
                    title="收货地址基础信息"
                    baseData={baseData}
                    data={this.state.maintailOrderAddressBean}
                    onChange={(key,value)=>{
                        this.state.maintailOrderAddressBean[key]=value;
                        this.refresh();
                    }}
                   />
            </div>
        )
    }

    renderMaterial(){
        let baseData=[
            {name:'材料名称',flex:'1',key:'material_name'},
            {name:'材料数量',flex:'1',key:'material_count'},
            {name:'材料价格',flex:'1',key:'material_price'},
        ];
        return(
            <div>
                <Widget.Detail
                    title="材料基础信息"
                    baseData={baseData}
                    data={this.state.maintailOrderMaterialBean}
                    onChange={(key,value)=>{
                        this.state.maintailOrderMaterialBean[key]=value;
                        this.refresh();
                    }}
                />
            </div>
        )
    }



}




module.exports=MaintailAddOrder;
