/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class PartsClass2 extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            classBeans:[],
            page:1,
            total:0,
            parent_id:this.props.params.parent_id
        };
    }

    componentDidMount() {
        this.getPratsClass();
    }
    getPratsClass(){
        this.getDataByPost(1,maintail_homeurl+"/pratsClassController/v1.0/getPratsClass"
            ,{page:this.state.page,parent_id:this.state.parent_id},{type:2})
    }

    deletePratsClass(){
        this.getDataByPost(2,maintail_homeurl+"/pratsClassController/v1.0/deletePratsClass",{parts_id:this.state.parts_id})
    }
    exportPratsClassesV2(){
        this.getDataByPost(5,maintail_homeurl+"/pratsClassController/v1.0/exportPratsClassesV2",{parent_id:this.state.parent_id})
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
                this.getPratsClass();
                break;
            case 3:
                this.getPratsClass();
                break;
            case 4:
                this.getPratsClass();
                break;
            case 5:
                this.showTip("导出成功");
                window.location.href=imgurl+data;
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
                <Widget.Toolbar title={"二级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/parts_class_editor/-1"+"/"+this.state.parent_id);
                        }}/>

                    <Widget.Button
                        style={{display:"flex",marginLeft:10}}
                        value="下载导入格式"
                        onClick={()=>{
                            this.exportPratsClassesV2()
                        }}/>
                    <Widget.ImgButton
                        url={maintail_homeurl+"/pratsClassController/v1.0/importPratsClass"}
                        value1="导入"
                        onSuccess={
                            ()=>{
                                this.showTip("上传成功");
                                this.getPratsClass();
                            }
                        }
                    />
                </Widget.View>
                <Widget.List
                    data={[{name:"分类ID",flex:1,key:'parts_id'},
                        {name:"分类名称",flex:1,key:'parts_name'},
                        {name:"分类图标",flex:1,key:'parts_img',type:'img'},
                        {name:"分类状态",flex:1,key:'parts_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.classBeans}
                    operationData={[{title:"三级分类"},{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/parts_class3/"+this.state.classBeans[rowID].parts_id);
                                break;
                            case 1:
                                this.props.history.push("/parts_class_editor/"+this.state.classBeans[rowID].parts_id+"/"+this.state.parent_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    parts_id:this.state.classBeans[rowID].parts_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(4,maintail_homeurl+"/pratsClassController/v1.0/movePratsClass"
                                ,{parts_id:this.state.classBeans[rowID].parts_id
                                    , parent_id:this.state.classBeans[rowID].parent_id
                                    ,sort:this.state.classBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="parts_state"){
                            this.getDataByPost(3,maintail_homeurl+"/pratsClassController/v1.0/updatePratsClass",
                                {parts_id:this.state.classBeans[rowID].parts_id,
                                    parts_state:value});
                        }
                    }}
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

module.exports=PartsClass2;