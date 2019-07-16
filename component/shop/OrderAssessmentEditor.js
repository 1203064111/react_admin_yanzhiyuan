/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderAssessmentEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            assessment_id:this.props.params.assessment_id,
            orderAssessmentBean:[],


        };
    }

    componentDidMount() {
        this.getOrderAssessmentBeanDetail();
    }



    getOrderAssessmentBeanDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderAssessmentBeanDetail",
            {assessment_id:this.state.assessment_id})
    }



    doSuccess(index,data){
        switch(index){

            case 1:
                this.setState({
                    orderAssessmentBean:data,
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
                        {name:"用户昵称",flex:1,key:'member_nick_name',type:'text'},
                        {name:"订单ID",flex:1,key:'order_merchants_id',type:'text'},
                        {name:"订单号",flex:1,key:'order_merchants_no',type:'text'},
                        {name:"商品名称",flex:1,key:'goods_name',type:'text'},
                        {name:"商品图片",flex:1,key:'goods_img',type:'text'},
                        {name:"商家名称",flex:1,key:'merchants_name',type:'text'},
                        {name:"商家图片",flex:1,key:'merchants_img',type:'text'},
                        {name:"评价内容",flex:1,key:'assessment_desc',type:'text'},
                        {name:"评价图片",flex:1,key:'assessment_imgs',type:'text'},
                        {name:"评价类型",flex:1,key:'assessment_type_show',type:'text'},
                        {name:"星级1",flex:1,key:'assessment_star1',type:'text'},
                        {name:"星级2",flex:1,key:'assessment_star2',type:'text'},
                        {name:"星级3",flex:1,key:'assessment_star3',type:'text'},
                        {name:"评价时间",flex:1,key:'create_time',type:'text'},

                    ]}
                    data={this.state.orderAssessmentBean}

                />



            </div>
        )
    }
}



module.exports=OrderAssessmentEditor;
