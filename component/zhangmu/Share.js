/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Share extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shareBeans:[],
            visible:false,
            share_index:1,
            baseData:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'share_id'},
                {name:"标题",flex:1,key:'share_title'},
                {name:"图片",flex:4,key:'share_img'},
                {name:"内容",flex:4,key:'share_desc'},
                {name:"创建时间",flex:1,key:'create_time'},
                {name:"操作",flex:2,key:"-1"}
            ]
        })
        this.getShares(this.state.page);
    }
    deleteShare(){
        this.setState({
            visible: false,
        })
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteShare",{share_id:this.state.shareBeans[share_index].share_id})
    }

    getShares(page){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getShares",{page:page},{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    shareBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getShares(this.state.page);
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
                                this.deleteShare();
                            }}></Widget.Tip>
                <Widget.Toolbar title="图文列表" history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:20,marginRight:20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/share_detail/-1");
                        }}/>
                </div>
                <Widget.List
                    data={this.state.baseData}
                    dataSource={this.state.shareBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/share_detail/"+this.state.shareBeans[rowID].share_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    share_index:rowID
                                })
                                break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        })
                        this.getShares(page);
                    }}>
                </Widget.List>
            </div>
        );
    }

}

module.exports=Share;