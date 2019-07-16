/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Information extends Widget.Base{//掌牧资讯
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            InformationBeans:[],
            page:1,
            total:0,
            pushBeans:[{name:'全部',value:''},{name:'未发布',value:'0'},{name:'已发布',value:'1'}]
            
        };
    }

    componentDidMount() {
        this.getInformations();
    }
    getInformations(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getInformations"
            ,{page:this.state.page,information_state:this.state.information_state},{type:2})
    }

    deleteInformation(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteInformation",{information_id:this.state.information_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    InformationBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getInformations();
                break;
                case 3:
                this.getInformations();
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
                                this.deleteInformation();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"资讯列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/information_detail/-1");
                        }}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}}>
                    <Widget.Select
                    dataSource={this.state.pushBeans}
                    selectWidth={80}
                    selectHeight={32}
                    select_value="value"
                    show_value="name"
                    is_must="false"
                    marginRight={20}
                    onChange={
                        (index)=>{
                            this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getInformations"
                           ,{page:this.state.page,information_state:this.state.pushBeans[index].value},{type:2})
                        }
                    }/>
                    </div>
                </Widget.View>
                
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'information_id'},
                        {name:"标题",flex:2,key:'information_title'},
                        {name:"作者",flex:1,key:'information_author'},
                        {name:'图片',flex:1,key:'information_img',type:'img'},
                        {name:'信息来源',flex:1,key:'information_resource'},
                        {name:"阅读量",flex:1,key:'read_num'},
                        
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.InformationBeans }
                    operationData={[{title:"查看"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/information_detail/"+this.state.InformationBeans[rowID].information_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    information_id:this.state.InformationBeans[rowID].information_id
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
                            this.getInformations()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=Information;