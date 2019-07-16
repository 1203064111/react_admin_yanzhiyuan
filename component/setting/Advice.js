/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class HtmlComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            adviceBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getAdvices();
    }

    getAdvices(){
        this.getDataByPost(1,member_homeurl+"/settingController/v1.0/getAdvices",{page:this.state.page},{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    adviceBeans:data.data,
                    total:data.total
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
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteHtml();
                            }}></Widget.Tip>
                <Widget.Toolbar title="意见反馈" history={this.props.history}></Widget.Toolbar>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'advice_id'},
                        {name:"手机号",flex:4,key:'member_account'},
                        {name:"描述",flex:1,key:'advice_desc'},
                        {name:"反馈时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}
                    ]}
                    dataSource={this.state.adviceBeans}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getAdvices(page);
                        })

                    }}>
                </Widget.List>
            </div>
        );
    }

    deleteHtml() {
        this.setState({
            visible: false,
        })
        this.getDataByPost(2, member_homeurl + "/settingController/v1.0/deleteHtml",
            {html_id:this.state.adviceBeans[this.state.html_index].html_id});
    }
}

module.exports=HtmlComponent;