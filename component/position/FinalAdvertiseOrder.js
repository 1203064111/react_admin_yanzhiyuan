/**
 * 2018/12/05 zhuxiong
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="advertiseOrder2";
class AdvertiseOrder extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            advertiseOrderBean:[],
            total:0,
            payTypeBeans:[{name:"全部",value:''},
                {name:"线上",value:'0'},
                {name:"线下",value:'1'}],
            order_type:this.getNull(this.getSessionStorage(type+"order_type"),2),
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            order_state:this.getNull(this.getSessionStorage(type+"order_state"),""),
            order_no:this.getNull(this.getSessionStorage(type+"order_no"),""),
            pay_type:this.getNull(this.getSessionStorage(type+"pay_type"),""),


        };
    }
    componentDidMount() {
        this.getAdvertiseOrders();
    }
    getAdvertiseOrders(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"order_state",this.state.order_state);
        this.setSessionStorage(type+"order_no",this.state.order_no);
        this.setSessionStorage(type+"pay_type",this.state.pay_type);
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getAdvertiseOrders",
            {
                page:this.state.page,
                order_type:this.state.order_type,
                order_state:this.state.order_state,
                order_no:this.state.order_no,
                pay_type:this.state.pay_type,
            });
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    advertiseOrderBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("导出成功");
                window.location.href=texturl+data;
                break;


        }
    }
    exportOrders(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/exportFinalAdvertiseOrders"
            ,{order_type:this.state.order_type,
                order_state:this.state.order_state,
                order_no:this.state.order_no,
                pay_type:this.state.pay_type})
    }

    render(){


        return(
            <div>
                <Widget.Toolbar title={"支付订单列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="支付方式"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.payTypeBeans}
                        onChange={(index)=>{
                            this.setState({
                                pay_type:this.state.payTypeBeans[index].value
                            })
                        }}/>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="订单单号"
                        value={this.state.order_no}
                        onChange={(value)=>{
                            this.setState({
                                order_no:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getAdvertiseOrders()
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="导出"
                        onClick={()=>{
                            this.exportOrders()
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[{name:"订单ID",flex:1,key:'advertise_order_id'},
                        {name:"订单单号",flex:1,key:'order_no'},
                        {name:"支付方式",flex:1,key:'pay_type_show'},
                        {name:"收款",flex:1,key:'order_pay_second'},
                        {name:"打款状态",flex:1,key:'order_close_show'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.advertiseOrderBean}
                    operationData={[{title:"下一级"},{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/final_advertise_order_member/"+this.state.advertiseOrderBean[rowID].position_id);
                                break;
                            case 1:
                                this.props.history.push("/final_advertise_order_detail/"+this.state.advertiseOrderBean[rowID].advertise_order_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    advertise_order_id:this.state.advertiseOrderBean[rowID].advertise_order_id
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
                            this.getAdvertiseOrders()
                        })
                    }}>
                </Widget.List>


            </div>
        )
    }
}

module.exports=AdvertiseOrder;


