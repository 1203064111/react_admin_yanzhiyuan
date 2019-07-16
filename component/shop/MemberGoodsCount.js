/**
 * Created by hwq on 2018/8/16.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberGoodsCount extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            goodsConsumeBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getGoodsConsumeCounts();
    }
    getGoodsConsumeCounts(){
        if(this.state.goods_min_time > this.state.goods_max_time){
            this.showTip("时间错误");
            return;
        }

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getGoodsConsumeCounts"
            ,{page:this.state.page,goods_min_time:this.state.goods_min_time,
                goods_max_time:this.state.goods_max_time})
    }


    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsConsumeBeans:data,
                    total:total
                });
                break;



        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"商品销售统计"} ></Widget.Toolbar>

                    <Widget.View>
                        <Widget.Date
                            style={{display:'flex',marginLeft:20}}
                            title_style={{display:'none'}}
                            type="datetime"
                            placeholder="最小时间"
                            value={this.state.goods_min_time}
                            onChange={(value)=>{
                                this.setState({
                                    goods_min_time:value
                                })
                            }}/>
                        <Widget.Date
                            style={{display:'flex',marginLeft:20}}
                            title_style={{display:'none'}}
                            type="datetime"
                            placeholder="最大时间"
                            value={this.state.goods_max_time}
                            onChange={(value)=>{
                                this.setState({
                                    goods_max_time:value
                                })
                            }}/>
                        <Widget.Button
                            style={{display:"flex",marginLeft:20}}
                            value="搜索"
                            onClick={()=>{
                                this.getGoodsConsumeCounts();
                            }}/>

                    </Widget.View>
                    <Widget.List
                        data={[{name:"商品ID",flex:1,key:'goods_id'},
                            {name:"商品名称",flex:1,key:'goods_name'},
                            {name:"商品销量",flex:1,key:'goods_num'},
                        ]}
                        dataSource={this.state.goodsConsumeBeans}


                        page={this.state.page}
                        total={this.state.total}
                        onPage={(page)=>{
                            this.setState({
                                page:page
                            },()=>{
                                this.getGoodsConsumeCounts()
                            })
                        }}>
                    </Widget.List>
            </div>

        )
    }
}

module.exports=MemberGoodsCount;

