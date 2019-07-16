/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class questionClassDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            questionClassBean:{},
            class_id:this.props.params.class_id,
            
        };
    }

    componentDidMount() {
        if(this.props.params.class_id!=="-1"){//添加
            this.getQuestionClassDetail();
        }
    }

    getQuestionClassDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getQuestionClassDetail",{class_id:this.state.class_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    questionClassBean:data,
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

    insertQuestionClass(){
        var params={};
        params["class_name"]=this.state.questionClassBean.class_name;
        if(this.state.class_id==="-1"){
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertQuestionClass",params);
        }else{
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateQuestionClass",params);
        }
    }


    render(){
        let baseData=[
            {name:'名字',flex:'1',key:'class_name'},
          
        ];
        return(
            <div>
                <Widget.Toolbar title={"分类名"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.questionClassBean}
                    onChange={(key,value,index)=>{
                        this.state.questionClassBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertQuestionClass();
                    }}/>
            </div>
        )
    }
}

module.exports=questionClassDetail;