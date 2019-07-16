/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderAssessment extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            assessment_type:this.props.params.assessment_type,
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderAssessmentBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderAssessments();
    }
    getOrderAssessments(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderAssessments",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
            })
    }


    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderAssessmentBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getOrderAssessments();
                break;

        }
    }

    deleteOrderAssessment(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/deleteOrderAssessment"
            ,{assessment_id:this.state.assessment_id})
    }


    render(){


        return(
            <div>
                <Widget.Toolbar title={"订单评价列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'assessment_id'},
                        {name:"订单ID",flex:1,key:'order_merchants_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"关联id",flex:1,key:'relation_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"评价内容",flex:1,key:'assessment_desc'},
                        {name:"评价类型",flex:1,key:"assessment_type_show"},
                        {name:"星级1",flex:1,key:'assessment_star1'},
                        {name:"图片",flex:3,key:'assessment_imgs',type:'imgs'},
                        {name:"评价时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderAssessmentBeans}
                    operationData={[{title:"详情"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_assessment_editor/"+this.state.orderAssessmentBeans[rowID].assessment_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        assessment_id:this.state.orderAssessmentBeans[rowID].assessment_id
                                    },()=>{
                                        this.deleteOrderAssessment();
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
                            this.getOrderAssessments()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderAssessment;


