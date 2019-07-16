/**
 * Created by Administrator on 2018/8/10.
 */
/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class TypeEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type_id:this.props.params.type_id,
            typeBean:[],
        };
    }

    componentDidMount() {

        this.getTypeDetail();

    }


    getTypeDetail(){
        this.getDataByPost(1,moudle_homeurl+"/typeController/v1.0/getTypeDetail",
            {type_id:this.state.type_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    typeBean:data,
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

    insertType(){

        var params={};
        params["type_name"]=this.state.typeBean.type_name;

        params["sort"]=this.state.typeBean.sort;



        if(this.state.type_id==="-1"){
            this.getDataByPost(2,moudle_homeurl+"/typeController/v1.0/insertType",params)
        }else{
            params["type_id"]=this.state.type_id;
            this.getDataByPost(3,moudle_homeurl+"/typeController/v1.0/updateType",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"工种详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.type_id ==="-1"){
            baseData=[{name:"工种",flex:1,key:'type_name'},
                ];
        }else{
            baseData=[{name:"ID",flex:1,key:'type_id',type:'text'},
                {name:"工种",flex:1,key:'type_name'},
                {name:"创建时间",flex:1,key:'create_time',type:'text'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.typeBean}


                    onChange={(key,value)=>{
                        this.state.typeBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertType();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=TypeEditor;