/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class QuestionDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            questionBean:{},
            question_id:this.props.params.question_id,
            class_id:this.props.params.class_id,
            
            
        };
    }

    componentDidMount() {
        if(this.props.params.question_id!=="-1"){//添加
            this.getQuestionDetail();
        }
    }

    getQuestionDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getQuestionDetail",{question_id:this.state.question_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    questionBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
                
        }
    }

    insertQuestion(){
        var params={};

        params["class_id"]=this.state.class_id;
        params["question_title"]=this.state.questionBean.question_title;
        params["question_desc"]=this.state.questionBean.question_desc;

        if(this.state.question_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertQuestion",params);
        }else{
            params["question_id"]=this.state.question_id;
            
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateQuestion",params);
        }
    }
  


    render(){
        let baseData=[];
        baseData=[
            {name:'问题',flex:1,key:'question_title'},
            {name:'回答',flex:1,key:'question_desc',type:'textarea'},
        ]
         
        return(
            <div>
                <Widget.Toolbar title={"问题编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.questionBean}
                    onChange={(key,value,index)=>{
                        this.state.questionBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:"flex",alignItems:'center',justifyContent:'flex-end',flex:2}} >
                               
                                 <Widget.Button
                                 style={{marginRight:20}}
                                  value="保存"
                                  onClick={()=>{
                                    this.insertQuestion();
                                  }}/>
                               
                                </div>
                            )

                        }
                    }
                   />
                   
            </div>
        )
    }
}

module.exports=QuestionDetail;