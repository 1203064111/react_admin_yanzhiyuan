/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MaintailOrderEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            order_state:"",
            orderMerchantsBean:{},
            maintailOrderAddressBean:{},
            maintailOrderMaterialBeans:[],

            memberWorkerBean:{},
            page:1,
            total:0,
            memberWorkerBeans:[],

            woker_arr:[]
        };
    }

    componentDidMount() {
        this.getOrderMerchantsDetail();
        this.getMemberWorker();

    }


    getMemberWorker(){
        this.getDataByPost(5,maintail_homeurl+"/yinlongMemberController/v1.0/getMemberWorkerV2",{member_name:this.state.member_name
            ,member_phone:this.state.member_phone});
    }


    getOrderMerchantsDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getMaintailOrderDetail",{order_id:this.state.order_id})
    }
    deleteOrderMaterial(){
        this.getDataByPost(6,maintail_homeurl+"/maintailOrderController/v1.0/deleteOrderMaterial",{order_id:this.state.order_id
            ,order_material_id:this.state.order_material_id,order_price:this.state.material_price})
    }

    doSuccess(index,data,total){
        switch(index){
            case 1:
                this.setState({
                    orderMerchantsBean:data,
                    order_state:data.order_state,
                    maintailOrderAddressBean:data.maintailOrderAddressBean,
                    memberWorkerBean:data.memberWorkerBean,
                    maintailOrderMaterialBeans:data.maintailOrderMaterialBeans
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.getOrderMerchantsDetail();
                break;
            case 3:
                this.setState({
                    orderMerchantsBean:data,
                })
                break;
            case 4:
                this.showTip("指派成功");
                this.getOrderMerchantsDetail()
                break;
            case 5:
                this.setState({
                    memberWorkerBeans:data,
                    total:total
                })
                break;
            case 6:
                this.showTip("删除成功！");
                this.getOrderMerchantsDetail()
                break;
        }
    }


    sendOrder(){
        var params={};
        params["order_id"]=this.state.orderMerchantsBean.order_id;
        params["worker_id"]=this.state.woker_arr[0];
        this.getDataByPost(4,maintail_homeurl + "/maintailOrderController/v1.0/sendOrder", params)
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"订单详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Button
                        style={{display:this.state.order_state === "1"?"flex":"none",marginRight:20,marginLeft:20}}
                        value="指派维修师傅"
                        onClick={()=>{
                            this.openHtml("#wokers","请指派师傅");
                        }}/>
                </Widget.View>
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_no',type:'text'},
                        {name:"总金额",flex:1,key:'order_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                        {name:"维修图片",flex:1,key:'maintail_imgs',type:'img_click'},
                        {name:"维修部位",flex:1,key:'parts_names',type:'text'},
                        {name:"维修前图片",flex:1,key:'order_maintail_imgs1',type:'img_click'},
                        {name:"维修后图片",flex:1,key:'order_maintail_imgs2',type:'img_click'},
                        {name:"服务开始时间",flex:1,key:'service_start_time',type:'text'},
                        {name:"服务结束时间",flex:1,key:'service_end_time',type:'text'},
                        {name:"维修问题描述",flex:1,key:'maintail_remark',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}
                    onChange={(key,value)=>{
                        this.state.orderMerchantsBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderGoods()}
                {this.renderSend()}
                {this.renderWokers()}
            </div>
        )
    }

    renderSend(){
        return(
            <div style={{display:'flex'}}>
                <Widget.Detail
                    width={300}
                    title="地址信息"
                    baseData={[{name:"收货人姓名",flex:1,key:'address_name',type:'text'},
                        {name:"收货人手机号",flex:1,key:'address_mobile',type:'text'},
                        {name:"省",flex:1,key:'address_province',type:'text'},
                        {name:"市",flex:1,key:'address_city',type:'text'},
                        {name:"区",flex:1,key:'address_country',type:'text'},
                        {name:"详情地址",flex:1,key:'address_detailed',type:'text'},
                        {name:"邮编",flex:1,key:'address_zip_code',type:'text'},
                    ]}
                    data={this.state.maintailOrderAddressBean}/>

                <Widget.Detail
                    width={300}
                    title="维修师傅信息"
                    baseData={[{name:"维修师傅ID",flex:1,key:'member_id',type:'text'},
                        {name:"姓名",flex:1,key:'member_name',type:'text'},
                        {name:"工种",flex:1,key:'worker_type',type:'text'},
                        {name:"联系号码",flex:1,key:'member_phone',type:'text'},
                        {name:"评论平均星级",flex:1,key:'assessment_star',type:'text'},
                    ]}
                    data={this.state.memberWorkerBean}
                    onChange={(key,value)=>{
                        this.state.memberWorkerBean[key]=value;
                        this.refresh();
                    }}/>
            </div>
        )
    }



    renderGoods(){
        return(
            <Widget.Detail
                title="维修材料信息"
                baseData={[]}
                data={{}}>
                <Widget.List
                    data={[
                        {name:"材料ID",flex:1,key:'order_material_id',type:'text'},
                        {name:"材料名称",flex:1,key:'material_name',type:'text'},
                        {name:"材料数量",flex:1,key:'material_count'},
                        {name:"材料价格",flex:1,key:'material_price'},
                        {name:"操作",flex:1,key:"-1"},
                    ]}
                    dataSource={this.state.maintailOrderMaterialBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        order_material_id:this.state.maintailOrderMaterialBeans[rowID].order_material_id,
                                        material_price:this.state.maintailOrderMaterialBeans[rowID].material_price
                                    },()=>{
                                        this.deleteOrderMaterial();
                                    })
                                })
                                break;
                        }
                    }}
                />
            </Widget.Detail>
        )
    }
    renderWokers() {
        return (
            <div id="wokers" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="姓名"
                        value={this.state.member_name}
                        onChange={(value)=> {
                            this.setState({
                                member_name: value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="电话号码"
                        value={this.state.member_phone}
                        onChange={(value)=> {
                            this.setState({
                                member_phone: value
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getMemberWorker();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="指派维修师傅"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.sendOrder();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name: "选择", flex: 1, key: '-4'},
                        {name: "维修师傅ID", flex: 1, key: 'member_id'},
                        {name: "姓名", flex: 1, key: 'member_name'},
                        {name: "电话号码", flex: 1, key: 'member_phone'},
                        {name:"工种",flex:1,key:'worker_type'},
                        {name:"评论平均星级",flex:1,key:'assessment_star'},
                        {name: "所在省", flex: 1, key: 'member_provider'},
                        {name: "所在市", flex: 1, key: 'member_city'},
                        {name: "所在区", flex: 1, key: 'member_country'}
                    ]}
                    dataSource={this.state.memberWorkerBeans}
                    page={this.state.page}
                    total={this.state.total}
                    checkArr={this.state. woker_arr}
                    checkKey="member_id"
                    onChecked={(key,checked,rowID)=>{
                        this.state.woker_arr=[];
                        this.state.woker_arr.push(key);
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            page: page
                        }, ()=> {
                            this.getMemberWorker()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}



module.exports=MaintailOrderEditor;
