/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Salary extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            salaryBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getSalarys();
    }
    getSalarys(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getSalarys"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    salaryBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSalarys();
                break;

        }
    }

    deleteSalary(){
        this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/deleteSalary"
            ,{salary_id:this.state.salary_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"薪资列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/salary_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'salary_id'},
                        {name:"薪资名称",flex:1,key:'salary_range'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.salaryBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/salary_editor/"+this.state.salaryBeans[rowID].salary_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        salary_id:this.state.salaryBeans[rowID].salary_id
                                    },()=>{
                                        this.deleteSalary();
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
                            this.getSalarys()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=Salary;

