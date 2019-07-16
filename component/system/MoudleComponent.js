/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MoudleComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            moduleBeans:[],
            visible:false,
            moudle_index:1,
            baseData:[],
            parent_id: this.props.parent_id?this.props.parent_id:this.props.params.parent_id,
            level:this.props.level?this.props.level:this.props.params.level,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'moudle_id'},
                {name:"名称",flex:1,key:'moudle_name'},
                {name:"路由",flex:1,key:"moudle_url"},
                {name:"权重",flex:1,key:'sort'},
                {name:"类型",flex:1,key:'moudle_type_show'},
                {name:"备注",flex:1,key:'moudle_remark'},
                {name:"操作",flex:3,key:"-1"}
            ]
        })
        this.getMoudles();
    }

    getMoudles(){
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getMoudles",{parent_id:this.state.parent_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    moduleBeans:data
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMoudles();
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
                                  this.deleteMoudle();
                              }}></Widget.Tip>
                <Widget.Toolbar title={this.state.level+"级分类"} history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/system_moudle_editor/"+encodeURIComponent(JSON.stringify({parent_id:this.state.parent_id,moudle_type:'1'})));
                        }}/>
                </div>
                <Widget.List
                    data={this.state.baseData}
                    dataSource={this.state.moduleBeans}
                    operationData={[{title:"子分类"},{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                if(parseInt(this.state.level%2)){
                                    this.props.history.push("/system_moudle2/"+this.state.moduleBeans[rowID].moudle_id+"/"+(parseInt(this.state.level)+1));
                                }else{
                                    this.props.history.push("/system_moudle/"+this.state.moduleBeans[rowID].moudle_id+"/"+(parseInt(this.state.level)+1));
                                }
                                break
                            case 1:
                                this.props.history.push("/system_moudle_editor/"+encodeURIComponent(JSON.stringify(this.state.moduleBeans[rowID])));
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    moudle_index:rowID
                                })
                                break;
                        }
                    }}>
                </Widget.List>
            </div>
        );
    }

    deleteMoudle() {
        this.setState({
            visible: false,
        })
        this.getDataByPost(2, member_homeurl + "/systemController/v1.0/deleteMoudle",
            {moudle_id: this.state.moduleBeans[this.state.moudle_index].moudle_id});
    }
}

module.exports=MoudleComponent;