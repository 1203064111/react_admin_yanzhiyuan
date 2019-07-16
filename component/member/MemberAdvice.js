/**
 * Created by hwq on 2018/9/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberAdvice extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            adviceBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getAdvices();
    }
    getAdvices(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getAdvices"
            ,{page:this.state.page,member_account:this.state.member_account})
    }

    deleteAdvice(){
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/deleteAdvice"
            ,{advice_id:this.state.advice_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    adviceBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getAdvices();
                break;

        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户留言"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="用户账号"
                        value={this.state.member_account}
                        onChange={(value)=>{
                            this.setState({
                                member_account:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getAdvices()
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"用户账号",flex:1,key:'member_account'},
                        {name:"留言内容",flex:1,key:'advice_desc'},
                        {name:"留言时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"},
                    ]}
                    dataSource={this.state.adviceBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        advice_id:this.state.adviceBeans[rowID].advice_id
                                    },()=>{
                                        this.deleteAdvice();
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
                            this.getAdvices()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberAdvice;

