/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderLogisticsEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            logistics_id:this.props.params.logistics_id,
            orderLogisticsBean:[],
        };
    }

    componentDidMount() {

        this.getOrderLogisticsDetail();

    }


    getOrderLogisticsDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderLogisticsCompanyDetail",{logistics_id:this.state.logistics_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    orderLogisticsBean:data,
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

    insertOrderLogistics(){

        var params={};
        params["logistics_name"]=this.state.orderLogisticsBean.logistics_name;

        params["logistics_pinyin"]=this.state.orderLogisticsBean.logistics_pinyin;



        if(this.state.logistics_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/insertOrderLogisticsCompany",params)
        }else{
            params["logistics_id"]=this.state.logistics_id;
            this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateOrderLogisticsCompany",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"快递详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.logistics_id==="-1"){
            baseData=[{name:"快递名称",flex:1,key:'logistics_name'},
                {name:"快递简称",flex:1,key:'logistics_pinyin'},];
        }else{
            baseData=[{name:"ID",flex:1,key:'logistics_id',type:'text'},
                {name:"快递名称",flex:1,key:'logistics_name'},
                {name:"快递简称",flex:1,key:'logistics_pinyin'},
                {name:"创建时间",flex:1,key:'create_time',type:'textDate'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.orderLogisticsBean}


                    onChange={(key,value)=>{
                        this.state.orderLogisticsBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertOrderLogistics();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=OrderLogisticsEditor;
