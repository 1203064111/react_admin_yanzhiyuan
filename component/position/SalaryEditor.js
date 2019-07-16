/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class SalaryEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            salary_id:this.props.params.salary_id,
            salaryBeans:[],
        };
    }

    componentDidMount() {

        this.getSalaryDetail();

    }


    getSalaryDetail(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getSalary",{salary_id:this.state.salary_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    salaryBeans:data,
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

    insertSalary(){

        var params={};
        params["salary_range"]=this.state.salaryBeans.salary_range;




        if(this.state.salary_id==="-1"){
            this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/insertSalary",params)
        }else{
            params["salary_id"]=this.state.salary_id;
            this.getDataByPost(3,information_homeUrl+"/positionController/v1.0/updateSalary",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"薪资详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.salary_id==="-1"){
            baseData=[{name:"薪资名称",flex:1,key:'salary_range'}];
        }else{
            baseData=[{name:"ID",flex:1,key:'salary_id',type:'text'},
                {name:"薪资名称",flex:1,key:'salary_range'},
                {name:"创建时间",flex:1,key:'create_time',type:'textDate'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.salaryBeans}
                    onChange={(key,value)=>{
                        this.state.salaryBeans[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertSalary();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=SalaryEditor;
