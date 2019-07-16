/**
 * Created by liyong on 2018/7/25.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityOneYuanShoppingGoods extends Widget.Base{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            activity_id:this.props.params.activity_id,
            activity_price:this.props.params.activity_price,
            goods_id:this.props.params.goods_id,
            ZMActivityGoodsBean:[],
            page:1,
            total:0,

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[],
        };
    }

    componentDidMount() {
        this.getOutOneYuanGoods()
        this.getActivityGoods();
    }
    getActivityGoods(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivityGoods"
            ,{page:this.state.page,activity_id:this.state.activity_id},{type:2})
    }

    deleteActivityGoods(){
        this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/deleteActivityGoods",{activity_goods_id:this.state.activity_goods_id})
    }

    getFreightsNoPage(){
        this.getDataByPost(5,shop_homeurl+"/goodsController/v1.0/getFreightsNoPage")
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    ZMActivityGoodsBean:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getActivityGoods();
                break;
            case 3:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[]
                })
                this.getOutOneYuanGoods()
                this.getActivityGoods();
                break;
            case 4:
                this.setState({
                    goodsBeans:data,
                    goods_total:total
                })
                break;
            case 5:
                this.setState({
                    freightBeans:data
                })
                break;
        }
    }

    getOutOneYuanGoods(){
        this.getDataByPost(4,sheep_homeurl+"/activityController/v1.0/getOutOneYuanGoods",
            {page:this.state.goods_page,goods_name:this.state.goods_name,
                class_name:this.state.class_name,
                activity_id:this.state.activity_id})
    }

    insertActivityGoods(){
        this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/insertActivityGoods",
            {activity_id:this.state.activity_id,goods_id:this.state.goods_arr.toString()})
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteActivityGoods();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"活动商品"} history={this.props.history}></Widget.Toolbar>
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
                        {name:"ID",flex:1,key:'activity_goods_id'},
                        {name:"商品id",flex:2,key:'goods_id'},
                        {name:"商品图",flex:2,key:'goods_img',type:'img'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"原价",flex:1,key:'goods_now_price'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"参与人数",flex:1,key:'activity_people'},
                        {name:"中奖人数",flex:1,key:'activity_people_win'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.ZMActivityGoodsBean}
                    operationData={[{title:"删除"},{title:"修改"},{title:"订单"},{title:"晒单"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    activity_goods_id:this.state.ZMActivityGoodsBean[rowID].activity_goods_id
                                })
                                break;

                            case 1:
                                this.props.history.push("/activity_one_yuan_shopping_goodsDetail/"+this.state.ZMActivityGoodsBean[rowID].goods_id+"/"+this.state.ZMActivityGoodsBean[rowID].activity_id);
                                break;
                                
                            case 2:
                                this.props.history.push("/activity_one_yuan_order/"+this.state.ZMActivityGoodsBean[rowID].goods_id+"/"+this.state.ZMActivityGoodsBean[rowID].activity_id);
                                break;

                            case 3:
                                this.props.history.push("/activity_one_yuan_sunburn/"+this.state.ZMActivityGoodsBean[rowID].goods_id+"/"+this.state.ZMActivityGoodsBean[rowID].activity_id);
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getActivityGoods()
                        })
                    }}>
                </Widget.List>
                {this.renderGoods()}
            </div>
        );
    }

    renderGoods() {
        console.log(JSON.stringify(this.state.goods_arr))
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
                                goods_page: 1
                            }, ()=> {
                                this.getOutOneYuanGoods();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertActivityGoods();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name: "复选框", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                    ]}
                    dataSource={this.state.goodsBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="goods_id"
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
                            this.getOutOneYuanGoods()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }

}

module.exports=ActivityOneYuanShoppingGoods;