/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Industry extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            industryBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getIndustrys();
    }
    getIndustrys(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getIndustrys"
            ,{page:this.state.page},{type:2})
    }

    deleteIndustry(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteIndustry",{industry_id:this.state.industry_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    industryBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getIndustrys();
                break;
            case 3:
                this.getIndustrys();
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
                                this.deleteIndustry();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"行业列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_industry_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"行业ID",flex:1,key:'industry_id'},
                        {name:"行业名称",flex:1,key:'industry_name'},
                        {name:"行业状态",flex:1,key:'industry_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.industryBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_industry_editor/"+this.state.industryBeans[rowID].industry_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    industry_id:this.state.industryBeans[rowID].industry_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveIndustry"
                                ,{industry_id:this.state.industryBeans[rowID].industry_id
                                    ,sort:this.state.industryBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="industry_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateIndustry",
                                {industry_id:this.state.industryBeans[rowID].industry_id,
                                    industry_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getIndustrys()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Industry;