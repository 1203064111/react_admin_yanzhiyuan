/**
 * Created by hwq on 2018/9/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberLevelEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            level_id:this.props.params.level_id,
            memberLevelBean:[],
        };
    }

    componentDidMount() {

        this.getMemberLevelDetail();

    }


    getMemberLevelDetail(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberLevelDetail"
            ,{level_id:this.state.level_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    memberLevelBean:data,
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

    insertMemberLevel(){

        var params={};
        params["level_name"]=this.state.memberLevelBean.level_name;

        params["level_min_price"]=this.state.memberLevelBean.level_min_price;



        if(this.state.level_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/insertMemberLevel"
                ,params)
        }else{
            params["level_id"]=this.state.level_id;
            this.getDataByPost(3,shop_homeurl+"/creditGradesController/v1.0/updateMemberLevel"
                ,params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.level_id==="-1"){
            baseData=[{name:"等级名称",flex:1,key:'level_name'},
                {name:"满足金额",flex:1,key:'level_min_price'},];
        }else{
            baseData=[{name:"等级ID",flex:1,key:'level_id',type:'text'},
                {name:"等级名称",flex:1,key:'level_name'},
                {name:"满足金额",flex:1,key:'level_min_price'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.memberLevelBean}


                    onChange={(key,value)=>{
                        this.state.memberLevelBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertMemberLevel();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=MemberLevelEditor;