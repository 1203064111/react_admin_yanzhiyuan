/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderLogistics extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderLogisticsBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderLogisticss();
    }
    getOrderLogisticss(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderLogisticsCompanys"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderLogisticsBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getOrderLogisticss();
                break;

        }
    }

    deleteOrderLogistics(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/deleteOrderLogisticsCompany"
            ,{logistics_id:this.state.logistics_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"快递列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/order_logistics_company_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'logistics_id'},
                        {name:"快递名称",flex:1,key:'logistics_name'},
                        {name:"快递简称",flex:1,key:'logistics_pinyin'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.orderLogisticsBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_logistics_company_editor/"+this.state.orderLogisticsBeans[rowID].logistics_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        logistics_id:this.state.orderLogisticsBeans[rowID].logistics_id
                                    },()=>{
                                        this.deleteOrderLogistics();
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
                            this.getOrderLogisticss()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderLogistics;

