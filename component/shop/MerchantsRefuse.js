/**
 * Created by hwq on 2018/11/2.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MerchantsRefuse extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            merchantsBeans:[],
            apply_state:"2",
            page:1,
            total:0,
            typeBeans:[
                {name:"医院",value:'1'},
                {name:"名师",value:'2'},
                {name:"海外",value:'3'}],
            merchants_type:"1",
        };
    }
    componentDidMount() {
        this.getMerchantss();
    }
    getMerchantss(){
        this.getDataByPost(1,shop_homeurl+"/merchantsController/v1.0/getMerchantss"
            ,{page:this.state.page,apply_state:this.state.apply_state,merchants_type:this.state.merchants_type,
                merchants_name:this.state.merchants_name
            },{type:2})
    }

    deleteMerchants(){
        this.getDataByPost(2,shop_homeurl+"/merchantsController/v1.0/deleteMerchants",{merchants_id:this.state.merchants_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    merchantsBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMerchantss();
                break;
            case 3:
                this.getMerchantss();
                break;
        }
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
                                this.deleteMerchants();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"拒绝商家"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="商家名称"
                        value={this.state.merchants_name}
                        onChange={(value)=>{
                            this.setState({
                                merchants_name:value
                            })
                        }}/>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="商家类型"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.typeBeans}
                        onChange={(index)=>{
                            this.setState({
                                merchants_type:this.state.typeBeans[index].value
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
                                this.getMerchantss()
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"商家ID",flex:1,key:'merchants_id'},
                        {name:"商家名称",flex:1,key:'merchants_name'},
                        {name:"商家状态",flex:1,key:'merchants_state',type:'radio_select'},
                        {name:"商家头像",flex:1,key:'merchants_img',type:'img'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.merchantsBeans}
                    operationData={[{title:"详情"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_merchants_editor/"+this.state.merchantsBeans[rowID].merchants_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    merchants_id:this.state.merchantsBeans[rowID].merchants_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="merchants_state"){
                            this.getDataByPost(3,shop_homeurl+"/merchantsController/v1.0/updateMerchants"
                                ,{merchants_id:this.state.merchantsBeans[rowID].merchants_id
                                    ,merchants_state:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMerchantss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=MerchantsRefuse;
