/**
 * Created by Administrator on 2018/8/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class CreditGrades extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            creditGradesBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getCreditGradess();
    }
    getCreditGradess(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getCreditGradess"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    creditGradesBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getCreditGradess();
                break;
            case 3:
                this.getCreditGradess();
                break;

        }
    }

    deleteCreditGrades(){
        this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/deleteCreditGrades"
            ,{credit_id:this.state.credit_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/credit_grades_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"授信ID",flex:1,key:'credit_id'},
                        {name:"授信等级",flex:1,key:'credit_grades'},
                        {name:"授信等级额度",flex:1,key:'credit_balance'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.creditGradesBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/credit_grades_editor/"+this.state.creditGradesBeans[rowID].credit_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        credit_id:this.state.creditGradesBeans[rowID].credit_id
                                    },()=>{
                                        this.deleteCreditGrades();
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
                            this.getCreditGradess()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=CreditGrades;

