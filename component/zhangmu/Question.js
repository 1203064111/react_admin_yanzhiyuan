/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Question extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            questions:[],
            class_id:this.props.params.class_id,
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        
        this.getQuestions();
    }
    getQuestions(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getQuestions"
            ,{page:this.state.page,
                class_id:this.state.class_id},{type:2})
    }

    deleteQuestion(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteQuestion",{question_id:this.state.question_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    questions:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getQuestions();
                break;
            case 3:
            this.showTip("移动成功")
            this.getQuestions();
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
                                this.deleteQuestion();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"常见问题"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/question_detail/-1/"+this.state.class_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'question_id'},
                        {name:'问题描述',flex:1,key:'question_title'},
                        {name:"排序",flex:1,key:'sort',type:'sort'},
                        {name:'创建时间',flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/moveQuestion",
                                    {question_id:this.state.questions[rowID].question_id,
                                        sort:this.state.questions[rowID].sort,
                                        sort_type:value});
                                }
                                this.refresh();
                            }
                        }
                    dataSource={this.state.questions}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/question_Detail/"
                                +this.state.questions[rowID].question_id+"/"+this.state.class_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    question_id:this.state.questions[rowID].question_id
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
                            this.getQuestions()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Question;