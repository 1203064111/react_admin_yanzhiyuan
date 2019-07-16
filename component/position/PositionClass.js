/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class PositionClass extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            positionClassBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getPositionClasss();
    }
    getPositionClasss(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getPositionClasss"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    positionClassBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getPositionClasss();
                break;

        }
    }

    deletePositionClass(){
        this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/deletePositionClass"
            ,{position_class_id:this.state.position_class_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"工作类型列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/position_class_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'position_class_id'},
                        {name:"工作类型名称",flex:1,key:'position_class_name'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.positionClassBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/position_class_editor/"+this.state.positionClassBeans[rowID].position_class_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                    position_class_id:this.state.positionClassBeans[rowID].position_class_id
                                    },()=>{
                                        this.deletePositionClass();
                                    })
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
                            this.getPositionClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=PositionClass;

