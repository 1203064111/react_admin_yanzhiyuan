/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Goods extends Widget.Base{//默认商家为1（无商家版本）
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goodsBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getGoodss();
    }
    getGoodss(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodss"
            ,{page:this.state.page
            ,goods_name:this.state.goods_name
            ,class_name:this.state.class_name
            })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodss();
                break;
            case 3:
                this.getGoodss();
                break;
        }
    }

    deleteGoods(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoods"
            ,{goods_id:this.state.goods_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"商品列表"} history={this.props.history}></Widget.Toolbar>
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
                        placeholder="分类名称"
                        value={this.state.class_name}
                        onChange={(value)=>{
                            this.setState({
                                class_name:value
                            })
                        }}/>

                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getGoodss();
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_editor/-1/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"商品ID",flex:1,key:'goods_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"价格",flex:1,key:'goods_now_price'},
                        {name:"库存",flex:1,key:'goods_stock'},
                        {name:"商品图标",flex:1,key:'goods_img',type:'img'},
                        {name:"商品状态",flex:1,key:'goods_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.goodsBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_editor/"
                                +this.state.goodsBeans[rowID].goods_id+"/"+this.state.goodsBeans[rowID].class_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        goods_id:this.state.goodsBeans[rowID].goods_id
                                    },()=>{
                                        this.deleteGoods();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveGoods"
                                ,{goods_id:this.state.goodsBeans[rowID].goods_id
                                    ,sort:this.state.goodsBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="goods_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateGoodsState",
                                {goods_id:this.state.goodsBeans[rowID].goods_id,
                                    goods_state:value});
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGoodss()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=Goods;

