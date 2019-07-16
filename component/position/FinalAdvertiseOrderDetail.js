/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class AdvertiseOrderDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            advertise_order_id:this.props.params.advertise_order_id,
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            advertiseOrderBean:[],
            materialBean:[],
            positionBean:[],
            payDetailBeans:[],
        };
    }

    componentDidMount() {
        this.getAdvertiseOrderDetail();
    }



    getAdvertiseOrderDetail(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getAdvertiseOrder",
            {advertise_order_id:this.state.advertise_order_id})
    }
    updateOrderDetail(){
        if(this.isNull(this.state.new_remark)){
            this.showTip("请先添加备注");
            return;
        }
        var today = new Date();
        var todayString = today.getFullYear() + "/" + (today.getMonth()+1)+ "/" + today.getDate();
        var account = this.state.systemAccountBean.system_name;
        var remarkReplace ="";
        if(this.isNull(this.state.order_remark)){
            remarkReplace = today.toLocaleDateString()+"    "+account+"    "+this.state.new_remark;
        }else{
            remarkReplace = this.state.order_remark.toString()+","+todayString+"    "+account+"    "+this.state.new_remark;
        }

        this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/updateAdvertiseOrder",{advertise_order_id:this.state.advertise_order_id,order_remark:remarkReplace})
    }
    doSuccess(index,data){
        switch(index){

            case 1:
                var remark=data.order_remark;
                var remarks=[];
                remarks=remark.split(",");
                this.setState({
                    advertiseOrderBean:data,
                    materialBean:data.materialBean,
                    positionBean:data.positionBean,
                    payDetailBeans:data.payDetailBeans,
                    remarkBeans:remarks,
                    order_remark:data.order_remark,
                });
                break;
            case 2:
                this.showTip("操作成功");
                this.getAdvertiseOrderDetail();
                break;

        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"支付订单详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:100}}
                        input_style={{width:600}}
                        title_style={{display:'none'}}
                        placeholder="备注"
                        value={this.state.new_remark}
                        onChange={(value)=>{
                            this.setState({
                                new_remark:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateOrderDetail()
                        }}/>

                </Widget.View>
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单id",flex:1,key:'advertise_order_id',type:'text'},
                        {name:"用户id",flex:1,key:'member_id',type:'text'},
                        {name:"订单单号",flex:1,key:'order_no',type:'text'},
                        {name:"创建时间",flex:1,key:'create_time',type:'textDate'},
                        {name:"修改时间",flex:1,key:'update_time',type:'textDate'},
                        {name:"订单金额",flex:1,key:'order_pay_second',type:'text'},
                        {name:"手机号",flex:1,key:'mobile',type:'text'},
                        {name:"支付类型",flex:1,key:'pay_way',type:'text'},
                        {name:"支付凭证",flex:1,key:'pay_charge',type:'text'},
                        {name:"支付单号",flex:1,key:'out_trade_no',type:'text'},
                        {name:"修改时间",flex:1,key:'update_time',type:'textDate'},
                    ]}
                    data={this.state.advertiseOrderBean}

                />
                <Widget.Detail
                    title="备注"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                    style={{display:'flex',overflow:'auto',flexDirection:'column',marginLeft:100}}
                    dataSource={this.state.remarkBeans}
                    renderRow={(rowID)=>{
                        return(
                            <div style={{display:'flex'}}>
                                <Widget.Text
                                    titleWidth={60}
                                    title={"备注"+(rowID+1)}
                                    width={600}
                                    value={this.state.remarkBeans[rowID]}/>
                            </div>
                        )
                    }}/>
                </Widget.Detail>
                {this.renderGoods()}
                {this.renderPosition()}




            </div>
        )
    }
    renderPosition(){
        return(
            <div style={{display:'flex'}}>
                <Widget.Detail
                    width={300}
                    title="职位信息"
                    baseData={[{name:"职位标题",flex:1,key:'position_title',type:'text'},
                        {name:"职位类型",flex:1,key:'position_type_show',type:'text'},
                        {name:"审核状态",flex:1,key:'position_apply_show',type:'text'},
                        {name:"招聘状态",flex:1,key:'position_state_show',type:'text'},

                    ]}
                    data={this.state.positionBean}/>
                <Widget.Detail
                    width={300}
                    title="认证信息"
                    baseData={[{name:"认证名称",flex:1,key:'material_name',type:'text'},
                        {name:"认证类型",flex:1,key:'material_type_show',type:'text'},
                        {name:"审核状态",flex:1,key:'material_state_show',type:'text'},
                        {name:"认证简介",flex:1,key:'material_information',type:'text'},

                    ]}
                    data={this.state.materialBean}

                    />
            </div>
        )
    }
    renderGoods(){
        return(
            <Widget.Detail
                title="支付明细"
                baseData={[]}
                data={{}}>
                <Widget.List
                    data={[
                        {name:"支付标题",flex:1,key:'pay_detail_title',type:'text'},
                        {name:"交易类型",flex:1,key:'pay_detail_type_show',type:'text'},
                        {name:"用户id",flex:1,key:'member_id',type:'text'},
                        {name:"金额",flex:1,key:'price',type:'text'},
                        {name:"支付时间",flex:1,key:'create_time',type:'textDate'},




                    ]}
                    dataSource={this.state.payDetailBeans}/>
            </Widget.Detail>
        )
    }
}



module.exports=AdvertiseOrderDetail;
