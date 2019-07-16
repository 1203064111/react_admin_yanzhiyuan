/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class HtmlQuestion extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            htmlBeans:[],
            visible:false,
            html_index:1,
            baseData:[],
            type:1,
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'html_id'},
                {name:"标题",flex:1,key:'html_name'},
                {name:"内容",flex:4,key:'html_url_desc'},
                {name:"权重",flex:1,key:'sort'},
                {name:"创建时间",flex:1,key:'create_time'},
                {name:"操作",flex:2,key:"-1"}
            ]
        })
        this.getHtmls(this.state.page);
    }

    getHtmls(page){
        this.getDataByPost(1,member_homeurl+"/settingController/v1.0/getHtmls",{page:page,type:this.state.type},{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    htmlBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getHtmls(this.state.page);
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
                <Widget.Toolbar title="其他疑问列表" history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/html_question_editor/-1");
                        }}/>
                </div>
                <Widget.List
                    data={this.state.baseData}
                    dataSource={this.state.htmlBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/html_question_editor/"+this.state.htmlBeans[rowID].html_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    html_index:rowID
                                })
                                break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        })
                        this.getHtmls(page);
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
            {html_id:this.state.htmlBeans[this.state.html_index].html_id});
    }
}

module.exports=HtmlQuestion;