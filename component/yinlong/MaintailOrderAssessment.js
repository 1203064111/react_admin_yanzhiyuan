/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MaintailOrderAssessment extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            maintailOrderAssessmentBean:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderAssessments();
    }
    getOrderAssessments(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getOrderAssessments",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
            })
    }





    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    maintailOrderAssessmentBean:data,
                    total:total
                });
                break;

        }
    }



    render(){


        return(
            <div>
                <Widget.Toolbar title={"订单评价列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'assessment_id'},
                        {name:"订单ID",flex:1,key:'order_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"评价内容",flex:1,key:'assessment_desc'},
                        {name:"星级1",flex:1,key:'assessment_star1'},
                        {name:"评价时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.maintailOrderAssessmentBean}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/maintail_order_assessment_editor/"+this.state.maintailOrderAssessmentBean[rowID].assessment_id);
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

module.exports=MaintailOrderAssessment;


