/**
 * Created by sjb on 18/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityGiveEditor extends Widget.Base{

    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            merchants_id:this.isNull(systemAccountBean.merchants_id)?"-1":systemAccountBean.merchants_id,
            activity_id:this.props.params.activity_id,
            activityBean:{activity_type:'1'},
            activityGiveBean:{give_type:"1"},
            typeBeans:[{name:"赠送商品",value:"1"}],

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[],

            index:1,
            activityGiveGoodsBean:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        if(this.props.params.activity_id!=="-1"){
            this.getActivityGiveDetail();
        }
    }

    getActivityGiveDetail(){
        this.getDataByPost(1,shop_homeurl+"/shopActivityController/v1.0/getActivityGiveDetail",{activity_id:this.state.activity_id});
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    activityBean:data,
                    merchants_id:data.merchants_id,
                    activityGiveBean:data.activityGiveBean
                })
                break;
            case 2:
                this.setState({
                    activity_id:data,
                    index:2
                })
                this.getGoodsOutGiveActivity();
                break;
            case 3:
                this.setState({
                    index:2
                })
                this.getGoodsOutGiveActivity();
                this.getActivityGiveGoods();
                break;
            case 4:
                this.setState({
                    goodsBeans:data,
                    goods_total:total
                })
                break;
            case 5:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 6:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 7:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[]
                })
                this.getGoodsOutGiveActivity()
                this.getActivityGiveGoods();
                break;
            case 8:
                this.setState({
                    activityGiveGoodsBean:data,
                    total:total
                })
                break;
        }
    }

    insertActivity(){
        if(this.isNull(this.state.activityBean.activity_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["merchants_id"]=this.state.merchants_id;

        params["activity_name"]=this.state.activityBean.activity_name;
        params["activity_desc"]=this.state.activityBean.activity_desc;
        params["activity_type"]=this.isNull(this.state.activityBean.activity_type)?"1":this.state.activityBean.activity_type;
        params["activity_state"]=this.state.activityBean.activity_state;
        params["activity_img"]=this.state.activityBean.activity_img;
        params["start_time"]=this.state.activityBean.start_time;
        params["end_time"]=this.state.activityBean.end_time;


        if(this.state.activity_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/shopActivityController/v1.0/insertActivity",params);
        }else{
            params["activity_id"]=this.state.activity_id;
            this.getDataByPost(3,shop_homeurl+"/shopActivityController/v1.0/updateActivity",params);
        }
    }

    insertActivityGive(){
        if(this.isNull(this.state.activityBean.activity_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["activity_id"]=this.state.activity_id;
        params["give_full_price"]=this.state.activityGiveBean.give_full_price;
        params["give_type"]=this.state.activityGiveBean.give_type;
        params["give_integral_value"]=this.state.activityGiveBean.give_integral_value;

        if(this.isNull(this.state.activityGiveBean.give_id)){
            this.getDataByPost(5,shop_homeurl+"/shopActivityController/v1.0/insertActivityGive",params);
        }else{
            params["give_id"]=this.state.activityGiveBean.give_id;
            this.getDataByPost(6,shop_homeurl+"/shopActivityController/v1.0/updateActivityGive",params);
        }
    }

    getGoodsOutGiveActivity(){
        this.getDataByPost(4,shop_homeurl+"/shopActivityController/v1.0/getGoodsOutGiveActivity",
            {page:this.state.goods_page,goods_name:this.state.goods_name,
                class_name:this.state.class_name,
                merchants_id:this.state.merchants_id,
                activity_id:this.state.activity_id})
    }

    insertActivityGiveGoods(){
        this.getDataByPost(7,shop_homeurl+"/shopActivityController/v1.0/insertActivityGiveGoods",
            {activity_id:this.state.activity_id,specification_id:this.state.goods_arr.toString()})
    }

    getActivityGiveGoods(){
        this.getDataByPost(8,shop_homeurl+"/shopActivityController/v1.0/getActivityGiveGoods",{activity_id:this.state.activity_id});
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"满赠详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderBase()}
                {this.renderGive()}
            </div>
        )
    }


    renderBase(){
        return(
            <div style={{display:this.state.index==1?'flex':"none",flexDirection:'column'}}>
                <Widget.Detail
                    title="活动信息"
                    baseData={[{name:"活动名称",flex:2,key:'activity_name'},
                        {name:"活动描述",flex:1,key:'activity_desc',type:'textarea'},
                        {name:"活动封面",flex:1,key:'activity_img',type:'img',img_style:{height:80,width:80,marginLeft:10}},
                        {name:"开始时间",flex:1,key:'start_time',type:"date",dateType:"datetime"},
                        {name:"结束时间",flex:1,key:'end_time',type:"date",dateType:"datetime"},
                        {name:"活动状态",flex:1,key:'activity_state',type:'radio_select'}
                    ]}
                    data={this.state.activityBean}
                    onChange={(key,value,index)=>{
                        this.state.activityBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertActivity();
                    }}/>

                <div style={{display:"flex",marginTop:10,flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="下一步"
                        onClick={()=>{
                            this.insertActivity();
                        }}/>
                </div>
            </div>
        )
    }

    renderGive(){
        return(
            <div style={{display:this.state.index==2?'flex':"none",flexDirection:'column'}}>

                <Widget.Detail
                    title="优惠信息"
                    baseData={[
                        {name:"满赠类型",flex:1,key:'give_type',type:'select',data:this.state.typeBeans,show_value:"name",select_value:"value"},
                        {name:"满足金额",flex:1,key:'give_full_price'},
                    ]}
                    data={this.state.activityGiveBean}
                    onChange={(key,value,index)=>{
                        this.state.activityGiveBean[key]=value;
                        this.refresh();
                    }}/>
                <Widget.View>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.openHtml("#goods","请选择商品");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"商品id",flex:2,key:'goods_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"规格id",flex:1,key:'specification_id'},
                        {name:"规格名称",flex:1,key:'specification_names'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.activityGiveGoodsBean}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    give_goods_id:this.state.activityGiveGoodsBean[rowID].give_goods_id
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
                            this.getActivityGiveGoods()
                        })
                    }}>
                </Widget.List>
                {this.renderGoods()}
                <div style={{display:"flex",flex:1,marginTop:10,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.insertActivityGive()
                        }}/>
                </div>
            </div>
        )
    }

    renderGoods() {
        return (
            <div id="goods" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="商品名称"
                        value={this.state.goods_name}
                        onChange={(value)=> {
                            this.setState({
                                goods_name: value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="分类名称"
                        value={this.state.class_name}
                        onChange={(value)=> {
                            this.setState({
                                class_name: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getGoodsOutGiveActivity();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertActivityGiveGoods();
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                        {name: "供应商名称", flex: 1, key: 'merchants_name'},
                        {name: "规格id", flex: 1, key: 'specification_id'},
                        {name: "规格名称", flex: 1, key: 'specification_names'},
                        {name: "价格", flex: 1, key: 'specification_price'},
                        {name: "库存", flex: 1, key: 'specification_stock'}
                    ]}
                    dataSource={this.state.goodsBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="specification_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.goods_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_arr,key)
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_page: page
                        }, ()=> {
                            this.getGoodsOutGiveActivity()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=ActivityGiveEditor;