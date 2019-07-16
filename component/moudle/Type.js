/**
 * Created by Administrator on 2018/8/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Type extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            typeBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getTypes();
    }
    getTypes(){
        this.getDataByPost(1,moudle_homeurl+"/typeController/v1.0/getTypes"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    typeBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getTypes();
                break;
            case 3:
                this.getTypes();
                break;

        }
    }

    deleteType(){
        this.getDataByPost(2,moudle_homeurl+"/typeController/v1.0/deleteType"
            ,{type_id:this.state.type_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"工种列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/type_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'type_id'},
                        {name:"工种",flex:1,key:'type_name'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.typeBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/type_editor/"+this.state.typeBeans[rowID].type_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        type_id:this.state.typeBeans[rowID].type_id
                                    },()=>{
                                        this.deleteType();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,moudle_homeurl+"/typeController/v1.0/moveType"
                                ,{type_id:this.state.typeBeans[rowID].type_id
                                    ,sort:this.state.typeBeans[rowID].sort,
                                    sort_type:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getTypes()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=Type;

