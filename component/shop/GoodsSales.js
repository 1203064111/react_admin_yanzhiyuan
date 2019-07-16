/**
 * Created by hwq on 2018/8/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="goods_sales";
class GoodsSales extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,""),
            goodsSaleBeans:{},
            goodsSaleBean:{},
            page:1,
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            goods_name:this.getNull(this.getSessionStorage(type+"goods_name"),""),
            merchants_name:this.getNull(this.getSessionStorage(type+"merchants_name"),""),
        };
    }
    componentDidMount() {
        this.getOrderByGoodsSales();
    }
    getOrderByGoodsSales(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"goods_name",this.state.goods_name);
        this.setSessionStorage(type+"merchants_name",this.state.merchants_name);

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderByGoodsSales"
            ,{page:this.state.page,
                merchants_id:this.state.merchants_id,
                goods_name:this.state.goods_name,
                merchants_name:this.state.merchants_name})
    }

    exportGoodsSales(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/exportGoodsSales"
            ,{goods_name:this.state.goods_name,
                merchants_id:this.state.merchants_id,
                merchants_name:this.state.merchants_name})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsSaleBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("导出成功");
                window.location.href=imgurl+data;
                break;


        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"商品统计"} ></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="商品名称"
                        value={this.state.goods_name}
                        onChange={(value)=>{
                            this.setState({
                                goods_name:value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="供应商名称"
                        value={this.state.merchants_name}
                        onChange={(value)=>{
                            this.setState({
                                merchants_name:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getOrderByGoodsSales();
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="导出"
                        onClick={()=>{
                            this.exportGoodsSales()
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"商家",flex:1,key:'merchants_name'},
                        {name:"品牌",flex:1,key:'brand_name'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"规格",flex:1,key:'specification_names'},
                        {name:"供货价",flex:1,key:'specification_wholesale_price'},
                        {name:"零售价",flex:1,key:'specification_price'},
                        {name:"库存",flex:1,key:'specification_stock'},
                        {name:"销量",flex:1,key:'specification_sales'},
                    ]}
                    dataSource={this.state.goodsSaleBeans}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrderByGoodsSales()
                        })
                    }}>
                </Widget.List>
            </div>

        )
    }
}

module.exports=GoodsSales;

