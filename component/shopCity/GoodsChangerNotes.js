/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var type="order";
class GoodsChangerNotes extends Widget.Base{//掌牧资讯
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            goodsChangerNotesBean:[],
            page:1,
            total:0,
            changer_no:this.getNull(this.getSessionStorage(type+"changer_no"),""),
        };
    }

    componentDidMount() {
        this.getGoodsChangerNotesBean();
    }
    getGoodsChangerNotesBean(){
        this.setSessionStorage(type+"changer_no",this.state.changer_no);
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getGoodsChangerNotes"
            ,{page:this.state.page,changer_no:this.state.changer_no},{type:2})
    }

    exportOrders(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/exportOrders"
            ,{merchants_id:this.state.merchants_id
                ,order_state:this.state.order_state
                ,member_id:this.state.member_id
                ,order_merchants_no:this.state.order_merchants_no,
                merchants_name:this.state.merchants_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    goodsChangerNotesBean:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("修改成功");
                this.getGoodsChangerNotesBean();
                break;
            case 3:
                this.getGoodsChangerNotesBean();
                break;



        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"兑换列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>


                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="兑换单号"
                        value={this.state.changer_no}
                        onChange={(value)=>{
                            this.setState({
                                changer_no:value
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
                                this.getGoodsChangerNotesBean()
                            })
                            this.getGoodsChangerNotesBean()
                            this.setState({
                                page:1
                            },()=>{
                                this.getGoodsChangerNotesBean()
                            })

                        }}/>

                </Widget.View>

                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'changer_noter_id'},
                        {name:"商品名称",flex:2,key:'goods_name'},
                        {name:'商品图片',flex:1,key:'goods_img',type:'img'},
                        {name:'兑换颜值币',flex:1,key:'goods_monnaie'},
                        {name:"是否发货",flex:1,key:'charge_state',type:'radio_select'},
                        {name:"创建时间",flex:2,key:'create_time',type:'inputDate'},
                        {name:"收货人姓名/收货人手机号/省/市/县/详细地址",flex:9,key:'address',type:'widget'},
                        ]}
                    dataSource={this.state.goodsChangerNotesBean }
                    renderWidget={(key,i)=>{
                        return(
                            <Widget.List
                                is_header="0"
                                data={[
                                    {name:"姓名",flex:1,key:'address_name'},
                                    {name:"手机号",flex:2,key:'address_mobile'},
                                    {name:"省",flex:1,key:'address_province'},
                                    {name:"市",flex:1,key:'address_city'},
                                    {name:"县",flex:1,key:'address_country'},
                                    {name:"详细地址",flex:3,key:'address_detailed'}]}
                                dataSource={this.state.goodsChangerNotesBean[i].orderAddressBeans}>
                            </Widget.List>
                        )
                    }}

                    onChange={(rowID,key,value)=>{
                        if(key==="charge_state"){
                            if(value==="1"){
                                this.openTip("确认发货?",()=>{
                                    this.setState({
                                        changer_noter_id:this.state.goodsChangerNotesBean[rowID].changer_noter_id,
                                    },()=>{
                                        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/updateGoodsChangerNote"
                                            ,{changer_noter_id:this.state.goodsChangerNotesBean[rowID].changer_noter_id,
                                                charge_state:value});
                                    })
                                })

                            }

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGoodsChangerNotesBean()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=GoodsChangerNotes;