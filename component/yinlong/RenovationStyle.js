/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class RenovationStyle extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            RenovationStyleBean:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getVillage();
    }
    getVillage(){
        this.getDataByPost(1,maintail_homeurl+"/renovationController/v1.0/getRenovationStyle"
            ,{page:this.state.page})
    }

    deleteVillage(){
        this.getDataByPost(2,maintail_homeurl+"/renovationController/v1.0/deleteRenovationStyle",{style_id:this.state.style_id})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    RenovationStyleBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getVillage();
                break;
            case 3:
                this.getVillage();
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
                                this.deleteVillage();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"装修风格列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/renovation_style_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"装修风格ID",flex:1,key:'style_id'},
                        {name:"装修风格名称",flex:1,key:'style_name'},
                        {name:"风格单价",flex:1,key:'style_price'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.RenovationStyleBean}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/renovation_style_editor/"+this.state.RenovationStyleBean[rowID].style_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    style_id:this.state.RenovationStyleBean[rowID].style_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="is_guarantee"){
                            this.getDataByPost(3,maintail_homeurl+"/renovationController/v1.0/deleteRenovationStyle"
                                ,{style_id:this.state.RenovationStyleBean[rowID].style_id
                                    ,is_guarantee:value})
                        }else if(key==="is_recommed"){
                            this.getDataByPost(3,maintail_homeurl+"/renovationController/v1.0/updateRenovationStyle"
                                ,{style_id:this.state.RenovationStyleBean[rowID].style_id
                                    ,is_recommed:value})
                        }


                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getVillage()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=RenovationStyle;