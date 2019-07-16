/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GoodsClass2 extends Widget.Base{
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
        this.getGoodsClasss();
    }
    getGoodsClasss(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsClasss"
            ,{page:this.state.page,parent_id:this.state.parent_id},{type:2})
    }

    deleteGoodsClass(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoodsClass",{class_uuid:this.state.class_uuid})
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
                this.getGoodsClasss();
                break;
            case 3:
                this.getGoodsClasss();
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
                                this.deleteGoodsClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"二级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_class_editor/-1"+"/"+this.state.parent_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"分类ID",flex:1,key:'class_id'},
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"分类图标",flex:1,key:'class_img',type:'img'},
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.classBeans}
                    operationData={[{title:"三级分类"},{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_class3/"+this.state.classBeans[rowID].class_id);
                                break;
                            case 1:
                                this.props.history.push("/goods_class_editor/"+this.state.classBeans[rowID].class_id+"/"+this.state.parent_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    class_uuid:this.state.classBeans[rowID].class_uuid
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveGoodsClass"
                                ,{class_id:this.state.classBeans[rowID].class_id
                                    ,sort:this.state.classBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="class_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateGoodsClass",
                                {class_id:this.state.classBeans[rowID].class_id,
                                    class_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGoodsClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=GoodsClass2;