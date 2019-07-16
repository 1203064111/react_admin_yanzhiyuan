/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class BaikeClass extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            classBeans:[],
            page:1,
            total:0,
            parent_id:'-1'
        };
    }

    componentDidMount() {
        this.getBaikeClasss();
    }
    getBaikeClasss(){
        this.getDataByPost(1,shop_homeurl+"/baikeController/v1.0/getBaikeClasss"
            ,{page:this.state.page,parent_id:this.state.parent_id},{type:2})
    }

    deleteBaikeClass(){
        this.getDataByPost(2,shop_homeurl+"/baikeController/v1.0/deleteBaikeClass",{baike_class_id:this.state.baike_class_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    classBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBaikeClasss();
                break;
            case 3:
                this.getBaikeClasss();
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
                                this.deleteBaikeClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"一级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/baike_class_editor/-1"+"/"+this.state.parent_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"分类ID",flex:1,key:'baike_class_id'},
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"分类图标",flex:1,key:'class_img',type:'img'},
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.classBeans}
                    operationData={[{title:"二级分类"},{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/baike_class2/"+this.state.classBeans[rowID].baike_class_id);
                                break;
                            case 1:
                                this.props.history.push("/baike_class_editor/"+this.state.classBeans[rowID].baike_class_id+"/"+this.state.parent_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    baike_class_id:this.state.classBeans[rowID].baike_class_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){

                        }else if(key==="class_state"){
                            this.getDataByPost(3,shop_homeurl+"/baikeController/v1.0/updateBaikeClass",
                                {baike_class_id:this.state.classBeans[rowID].baike_class_id,
                                    class_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getBaikeClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=BaikeClass;