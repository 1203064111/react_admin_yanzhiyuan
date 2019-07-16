/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MaintailOrderAssEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            assessment_id:this.props.params.assessment_id,
            maintailOrderAssessmentBean:[],
            maintailOrderBean:[],


        };
    }

    componentDidMount() {
        this.getOrderAssessmentBeanDetail();
    }



    getOrderAssessmentBeanDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getOrderAssessmentDetail",
            {assessment_id:this.state.assessment_id})
    }



    doSuccess(index,data){
        switch(index){

            case 1:
                this.setState({
                    maintailOrderAssessmentBean:data,
                    maintailOrderBean:data.maintailOrderBean,
                })
                break;

        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"评价详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="评价信息"
                    baseData={[
                        {name:"用户id",flex:1,key:'member_id',type:'text'},
                        {name:"订单ID",flex:1,key:'order_id',type:'text'},
                        {name:"评价内容",flex:1,key:'assessment_desc',type:'text'},
                        {name:"评价图片",flex:1,key:'assessment_imgs',type:'text'},
                        {name:"星级1",flex:1,key:'assessment_star1',type:'text'},
                        {name:"星级2",flex:1,key:'assessment_star2',type:'text'},
                        {name:"评价时间",flex:1,key:'create_time',type:'text'},

                    ]}
                    data={this.state.maintailOrderAssessmentBean}


                />
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_no',type:'text'},
                        {name:"总金额",flex:1,key:'order_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                        {name:"维修照片",flex:1,key:'maintail_imgs',type:'img_click'},
                        {name:"服务开始时间",flex:1,key:'service_start_time',type:'text'},
                        {name:"服务结束时间",flex:1,key:'service_end_time',type:'text'},
                        {name:"维修问题描述",flex:1,key:'maintail_remark',type:'text'},
                    ]}
                    data={this.state.maintailOrderBean}
                    onChange={(key,value)=>{
                        this.state.maintailOrderBean[key]=value;
                        this.refresh();
                    }}/>


            </div>
        )
    }
}



module.exports=MaintailOrderAssEditor;
