/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepClassDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            sheepClassBean:{class_state:"1"},
            class_id:this.props.params.class_id,
            
        };
    }

    componentDidMount() {
        if(this.props.params.class_id!=="-1"){//添加
            this.getSheepClassDetail();
        }
    }

    getSheepClassDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getSheepClassDetail",{class_id:this.state.class_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepClassBean:data,
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

    insertSheepCLass(){
        var params={};
        params["class_sign"]=this.state.sheepClassBean.class_sign;
        params["class_name"]=this.state.sheepClassBean.class_name;
        params["class_desc"]=this.state.sheepClassBean.class_desc;

        if(this.state.class_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertSheepClass",params);
        }else{
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateSheepClass",params);
        }
    }


    render(){
        let baseData=[
            {name:'分类品种',flex:'1',key:'class_sign'},
            {name:'名字',flex:'1',key:'class_name'},
            {name:'描述',flex:'1',key:'class_desc',type:'textarea'},
        ];
        return(
            <div>
                <Widget.Toolbar title={"羊分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.sheepClassBean}
                    onChange={(key,value,index)=>{
                        this.state.sheepClassBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSheepCLass();
                    }}/>
            </div>
        )
    }
}

module.exports=SheepClassDetail;