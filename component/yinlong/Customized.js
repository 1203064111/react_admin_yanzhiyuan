/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Customized extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            customizedBean:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getPratsClass();
    }
    getPratsClass(){
        this.getDataByPost(1,maintail_homeurl+"/customizedController/v1.0/getCustomizeds"
            ,{page:this.state.page},{type:2})
    }

    deletePratsClass(){
        this.getDataByPost(2,maintail_homeurl+"/customizedController/v1.0/deleteCustomized",{customized_id:this.state.customized_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    customizedBean:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getPratsClass();
                break;
            case 3:
                this.getPratsClass();
                break;
            case 4:
                this.getPratsClass();
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
                                this.deletePratsClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"一级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/customized_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"定制ID",flex:1,key:'customized_id'},
                        {name:"定制名称",flex:1,key:'customized_name'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.customizedBean}
                    operationData={[{title:"二级分类"},{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/customizedhuxing/"+this.state.customizedBean[rowID].customized_id);
                                break;
                            case 1:
                                this.props.history.push("/customized_editor/"+this.state.customizedBean[rowID].customized_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    customized_id:this.state.customizedBean[rowID].customized_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=> {
                        if(key==="sort"){
                            this.getDataByPost(4,maintail_homeurl+"/customizedController/v1.0/moveCustomized"
                                ,{customized_id:this.state.customizedBean[rowID].customized_id
                                    ,sort:this.state.customizedBean[rowID].sort,
                                    sort_type:value})

                        }
                        this.refresh();

                    }

                    }

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getPratsClass()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Customized;