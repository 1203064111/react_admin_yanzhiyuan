/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepComponent extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            sheepBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getSheeps();
    }
    getSheeps(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getSheeps"
            ,{page:this.state.page,},{type:2})
    }

    deleteSheep(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteSheep",{sheep_id:this.state.sheep_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSheeps();
                break;
            case 3:
            this.showTip("移动成功")
                this.getSheeps();
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
                                this.deleteSheep();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"羊列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/sheep_Detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'sheep_id'},
                        {name:"名称",flex:1,key:'sheep_name'},
                        {name:'总数',flex:1,key:'sheep_num'},
                        {name:"类别",flex:1,key:'class_sign'},
                        {name:"图片",flex:1,key:'sheep_img',type:'img'},
                        {name:"排序",flex:1,key:'sort',type:'sort'},
                        {name:'入库时间',flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/moveSheep",
                                    {sheep_id:this.state.sheepBeans[rowID].sheep_id,
                                        sort:this.state.sheepBeans[rowID].sort,
                                        sort_type:value});
                                }
                                this.refresh();
                            }
                        }
                    dataSource={this.state.sheepBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/sheep_detail/"+this.state.sheepBeans[rowID].sheep_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    sheep_id:this.state.sheepBeans[rowID].sheep_id
                                })
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getSheeps()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=SheepComponent;