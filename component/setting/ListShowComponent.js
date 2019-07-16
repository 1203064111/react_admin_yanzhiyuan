/**
 * Created by shenjiabo on 16/12/10.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var list_type_index=-1;

/**
 * 商品分类(2.0版本)
 */
class ListShowComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listShowBeans: [],
            page: 1,
            total: 0,
            list_index:-1,
            listTypeBeans:[],
            type_value:this.getSessionStorage("type_value")
        };
    }

    componentDidMount() {
        this.getListShows();
        this.getListTypes();
    }
    getListTypes(){
        this.getDataByPost(2, member_homeurl + "/settingController/v1.0/getListTypes",
            {type_type:"list"});
    }

    getListShows() {
        this.setSessionStorage("type_value",this.state.type_value);
        this.getDataByPost(1, member_homeurl + "/settingController/v1.0/getListShows", {page:this.state.page,list_type:this.state.type_value});
    }

    deleteListShow(){
        this.getDataByPost(3, member_homeurl + "systemController.api?deleteSystemListShow"
            , {id: this.state.listShowBeans[this.state.list_index].id});
    }

    doSuccess(index, data) {
        switch (index) {
            case 1:
                this.setState({
                    listShowBeans:data,
                });
                break;
            case 2:
                this.setState({
                    listTypeBeans:data
                })
                break;
            case 3:
                this.showTip("删除成功");
                this.setState({
                    page:1,
                },()=>{
                    this.getListShows();
                })

                break;
        }
    }

    render() {
        return (
            <div>
                <Widget.Toolbar title={"列表展示"} history={this.props.history}/>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                              }}
                            onPress={()=>{
                                 this.setState({
                                        visible:false
                                 })
                                 this.deleteListShow();
                              }}/>
                <Widget.View>
                    <Widget.Select
                        dataSource={this.state.listTypeBeans}
                        title="位置"
                        init_value={this.state.type_value}
                        select_value="type_value"
                        show_value="type_name"
                        onChange={(rowID)=>{
                            this.setState({
                                type_value:this.state.listTypeBeans[rowID].type_value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=>{

                            this.setState({
                                page:1,
                            },()=>{
                                this.getListShows()
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/list_show_editor/"+encodeURIComponent(JSON.stringify({list_type:this.state.type_value})));
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                            {name:"ID",flex:1,key:'id'},
                            {name:"名称",flex:1,key:'name'},
                            {name:"比例",flex:1,key:"flex"},
                            {name:"键值",flex:1,key:'list_key'},
                            {name:"权重",flex:1,key:'sort'},
                            {name:"类型",flex:1,key:'type'},
                            {name:"位置",flex:1,key:'type_name'},
                            {name:"状态",flex:1,key:'state_show'},
                            {name:"操作",flex:2,key:"-1"}
                        ]}
                    dataSource={this.state.listShowBeans}
                    operationData={[{title:"编辑",type:1},{title:"删除",type:2}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/list_show_editor/"+encodeURIComponent(JSON.stringify(this.state.listShowBeans[rowID])));
                            break
                            case 1:
                                this.setState({
                                    visible:true,
                                    list_index:rowID
                                })
                            break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getListShows()
                        });
                    }}/>
            </div>
        )
    }
}

module.exports = ListShowComponent;