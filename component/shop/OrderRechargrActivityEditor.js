/**
 * Created by hwq on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderRechargrActivityEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            activity_id:this.props.params.activity_id,
            orderRechargeActivityBean:[],
        };
    }

    componentDidMount() {

        this.getOrderRechargeActivityDetail();

    }


    getOrderRechargeActivityDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRechargeActivityDetail",
            {activity_id:this.state.activity_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    orderRechargeActivityBean:data,
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

    insertOrderRechargeActivity(){

        var params={};
        params["activity_need_price"]=this.state.orderRechargeActivityBean.activity_need_price;

        params["activity_give_price"]=this.state.orderRechargeActivityBean.activity_give_price;



        if(this.state.activity_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/insertOrderRechargeActivity",params)
        }else{
            params["activity_id"]=this.state.activity_id;
            this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateOrderRechargeActivity",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"退款原因"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.activity_id==="-1"){
            baseData=[{name:"满足金额",flex:1,key:'activity_need_price'},
                {name:"赠送金额",flex:1,key:'activity_give_price'},];
        }else{
            baseData=[{name:"ID",flex:1,key:'activity_id',type:'text'},
                {name:"满足金额",flex:1,key:'activity_need_price'},
                {name:"赠送金额",flex:1,key:'activity_give_price'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.orderRechargeActivityBean}


                    onChange={(key,value)=>{
                        this.state.orderRechargeActivityBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertOrderRechargeActivity();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=OrderRechargrActivityEditor;