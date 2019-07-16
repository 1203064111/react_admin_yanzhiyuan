/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityLimitGoods extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            activity_id:this.props.params.activity_id,
            activity_type:this.props.params.activity_type,
            activityGoodsBeans:[],
            page:1,
            total:0,

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[],

            goodsTempBeans:[]
        };
    }

    componentDidMount() {
        this.getGoodsOutActivity();
        this.getActivityGoodss();
    }
    getActivityGoodss(){
        this.getDataByPost(1,shop_homeurl+"/shopActivityController/v1.0/getActivityGoodss"
            ,{page:this.state.page,activity_id:this.state.activity_id},{type:2})
    }

    deleteActivityGoods(){
        this.getDataByPost(2,shop_homeurl+"/shopActivityController/v1.0/deleteActivityGoods",{activity_goods_id:this.state.activity_goods_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    activityGoodsBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getActivityGoodss();
                break;
            case 3:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[],
                    goodsTempBeans:[]
                },()=>{
                    this.getGoodsOutActivity()
                    this.getActivityGoodss();
                })
                break;
            case 4:
                var goodsBeans=data;

                for(let i=0;i<goodsBeans.length;i++){
                    for(let j=0;j<this.state.goodsTempBeans.length;j++){
                        if(goodsBeans[i].specification_id+""===this.state.goodsTempBeans[j].specification_id+""){
                            goodsBeans[i].activity_stock=this.state.goodsTempBeans[j].activity_stock;
                            goodsBeans[i].activity_price=this.state.goodsTempBeans[j].activity_price;
                        }
                    }
                }

                this.setState({
                    goodsBeans:goodsBeans,
                    goodsTempBeans:this.state.goodsTempBeans.concat(data),
                    goods_total:total
                })
                break;
        }
    }

    getGoodsOutActivity(){
        this.getDataByPost(4,shop_homeurl+"/shopActivityController/v1.0/getGoodsOutActivity",
            {page:this.state.goods_page,goods_name:this.state.goods_name,
                class_name:this.state.class_name,
                activity_id:this.state.activity_id})
    }

    insertActivityGoods(){
        let json=[]
        for(let k=0;k<this.state.goods_arr.length;k++){
            for(let j=0;j<this.state.goodsTempBeans.length;j++){
                if(this.state.goods_arr[k]===this.state.goodsTempBeans[j].specification_id){
                    json.push({
                        activity_id:this.state.activity_id,
                        specification_id:this.state.goods_arr[k],
                        activity_stock:this.state.goodsTempBeans[j].activity_stock,
                        activity_price:this.state.goodsTempBeans[j].activity_price,
                    })
                }
            }
        }
        this.getDataByPost(3,shop_homeurl+"/shopActivityController/v1.0/insertActivityLimitGoods",
            {json:JSON.stringify(json)})
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
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"规格id",flex:1,key:'specification_id'},
                        {name:"规格名称",flex:1,key:'specification_names'},
                        {name:"活动价格",flex:1,key:'activity_price'},
                        {name:"活动库存",flex:1,key:'activity_stock'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.activityGoodsBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    activity_goods_id:this.state.activityGoodsBeans[rowID].activity_goods_id
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
                            this.getActivityGoodss()
                        })
                    }}>
                </Widget.List>
                {this.renderGoods()}
            </div>
        );
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
                                goods_page: 1
                            }, ()=> {
                                this.getGoodsOutActivity();
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
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                        {name: "供应商名称", flex: 1, key: 'merchants_name'},
                        {name: "规格id", flex: 1, key: 'specification_id'},
                        {name: "规格名称", flex: 1, key: 'specification_names'},
                        {name: "价格", flex: 1, key: 'specification_price'},
                        {name: "库存", flex: 1, key: 'specification_stock'},
                        {name: "活动价",flex:1,key:'activity_price',type:'input'},
                        {name: "活动库存",flex:1,key:'activity_stock',type:'input'},
                    ]}
                    dataSource={this.state.goodsBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="specification_id"
                    onChecked={(key,checked,i)=>{
                        if(checked==='1'){
                            this.state.goods_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_arr,key)
                        }
                        this.refresh();
                    }}
                    onChange={(i,key,value)=>{
                        this.state.goodsBeans[i][key]=value;
                        for(let k=0;k<this.state.goodsTempBeans.length;k++){
                            if(this.state.goodsTempBeans[k].specification_id+""===this.state.goodsBeans[i].specification_id+""){
                                this.state.goodsTempBeans[k][key]=value;
                            }
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_page: page
                        }, ()=> {
                            this.getGoodsOutActivity()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }

}

module.exports=ActivityLimitGoods;