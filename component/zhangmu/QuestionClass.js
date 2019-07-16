/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class QuestionClass extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            questionClassBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getQuestionClass();
    }
    getQuestionClass(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getQuestionClass"
            ,{page:this.state.page,},{type:2})
    }
    deleteQuestionClass(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteQuestionClass",{class_id:this.state.class_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    questionClassBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getQuestionClass();
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
                                this.deleteQuestionClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"问题分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/questtion_class_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'class_id'},
                        {name:"名称",flex:1,key:'class_name'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.questionClassBeans}
                  
                    operationData={[{title:"编辑"},{title:'查看'},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/questtion_class_detail/"+this.state.questionClassBeans[rowID].class_id);
                                break;
                            case 1:
                                this.props.history.push("/questions/"+this.state.questionClassBeans[rowID].class_id)
                               break;

                            case 2:
                                this.setState({
                                    visible:true,
                                    class_id:this.state.questionClassBeans[rowID].class_id
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
                            this.getQuestionClass();
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=QuestionClass;