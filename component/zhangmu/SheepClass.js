/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepComponent extends Widget.Base{
    constructor(props) {
        super(props);
       
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            sheepClassBeans:[],
            page:1,
            total:0,
        };
       
    }

    componentDidMount() {
        this.getSheepClasss();
    }
    getSheepClasss(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getSheepClasss"
            ,{page:this.state.page,},{type:2})
    }

    deleteSheepClass(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteSheepClass",{class_id:this.state.class_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepClassBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSheepClasss();
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
                                this.deleteSheepClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"分类列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/sheep_class_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"羊类型",flex:1,key:'class_sign'},
                        {name:"名称",flex:1,key:'class_name'},
                         {name:"描述",flex:1,key:'class_desc'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.sheepClassBeans}
                  
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/sheep_class_detail/"+this.state.sheepClassBeans[rowID].class_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    class_id:this.state.sheepClassBeans[rowID].class_id
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
                            this.getSheepClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=SheepComponent;