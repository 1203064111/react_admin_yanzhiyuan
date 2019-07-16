/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MarketingGoods extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,""),
            marketing_type:this.isNull(systemAccountBean.merchants_id)?"2":"2",
            marketingGoodsBeans:[],
            page:1,
            total:0,

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[]
        };
    }

    componentDidMount() {
        this.getGoodsMarketings();
        this.getGoodsOutMarketing();

    }
    getGoodsMarketings(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsMarketings"
            ,{page:this.state.page,marketing_type:this.state.marketing_type,merchants_id:this.state.merchants_id},{type:2})
    }

    deleteActivityGoods(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoodsMarketing",{marketing_id:this.state.marketing_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    marketingGoodsBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodsMarketings();
                this.getGoodsOutMarketing();
                break;
            case 3:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[]
                })
                this.getGoodsMarketings()
                this.getGoodsOutMarketing();
                break;
            case 4:
                this.setState({
                    goodsBeans:data,
                    goods_total:total
                })
                break;
        }
    }

    getGoodsOutMarketing(){
        this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/getGoodsOutMarketing",
            {page:this.state.goods_page,
                marketing_type:this.state.marketing_type
                ,goods_name:this.state.goods_name
                ,class_name:this.state.class_name
                ,merchants_name:this.state.merchants_name,
                merchants_id:this.state.merchants_id})
    }

    insertGoodsMarketings(){
        this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/insertGoodsMarketings",
            {marketing_type:this.state.marketing_type,
                goods_id:this.state.goods_arr.toString()})
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
                <Widget.Toolbar title={"推荐商品"} history={this.props.history}></Widget.Toolbar>
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
                        {name:"ID",flex:1,key:'marketing_id'},
                        {name:"商品id",flex:1,key:'goods_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"供应商id",flex:1,key:'merchants_id'},
                        {name:"供应商名称",flex:1,key:'merchants_name'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.marketingGoodsBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    marketing_id:this.state.marketingGoodsBeans[rowID].marketing_id
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
                            this.getGoodsMarketings()
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

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="供应商名称"
                        value={this.state.merchants_name}
                        onChange={(value)=> {
                            this.setState({
                                merchants_name: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getGoodsOutMarketing();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertGoodsMarketings();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                        {name: "供应商ID", flex: 1, key: 'merchants_id'},
                        {name: "供应商名称", flex: 1, key: 'merchants_name'},
                        {name: "价格", flex: 1, key: 'goods_now_price'},
                        {name: "库存", flex: 1, key: 'goods_stock'}
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
                            this.getGoodsOutMarketing()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MarketingGoods;