/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Programme extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            customizedBean:[],
            huxing_id:this.props.params.huxing_id,
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getPratsClass();
    }
    getPratsClass(){
        this.getDataByPost(1,maintail_homeurl+"/customizedController/v1.0/getCustomizedHuxingProgrammes"
            ,{page:this.state.page,huxing_id:this.state.huxing_id},{type:2})
    }

    deletePratsClass(){
        this.getDataByPost(2,maintail_homeurl+"/customizedController/v1.0/deleteCustomizedHuxingProgramme",{programme_id:this.state.programme_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    customizedBean:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getPratsClass();
                break;
            case 3:
                this.getPratsClass();
                break;
            case 4:
                this.getPratsClass();
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
                                this.deletePratsClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"三级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/programme_editor/-1"+"/"+this.state.huxing_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"方案ID",flex:1,key:'programme_id'},
                        {name:"方案名称",flex:1,key:'programme_name'},
                        {name:"方案图标",flex:1,key:'programme_img',type:'img'},
                        {name:"方案报价",flex:1,key:'programme_price'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.customizedBean}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/programme_editor/"+this.state.customizedBean[rowID].programme_id+"/"+this.state.huxing_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    programme_id:this.state.customizedBean[rowID].programme_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=> {
                        if(key==="sort"){
                            this.getDataByPost(4,maintail_homeurl+"/customizedController/v1.0/moveCustomizedHuxingProgramme"
                                ,{huxing_id:this.state.huxing_id,
                                programme_id:this.state.customizedBean[rowID].programme_id
                                    ,sort:this.state.customizedBean[rowID].sort,
                                    sort_type:value})

                        }
                        this.state.customizedBean[rowID][key]=value;
                        this.refresh();

                    }

                    }

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getPratsClass()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Programme;