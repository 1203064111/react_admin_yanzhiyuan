/**
 * 2018/12/05 zhuxiong
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="position";
class Position extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            positionBean:[],
            total:0,
            applyBeans:[{name:"全部",value:''},
                {name:"待审核",value:'0'},
                {name:"已通过",value:'1'},
                {name:"已拒绝",value:'2'}],
            stateBeans:[{name:"全部",value:''},
                {name:"发布中",value:'0'},
                {name:"已定人",value:'1'},
                {name:"已结束",value:'2'}],
            typeBeans:[{name:"全部",value:''},
                {name:"兼职",value:'0'},
                {name:"全职",value:'1'}],
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            position_state:this.getNull(this.getSessionStorage(type+"position_state"),""),
            position_type:this.getNull(this.getSessionStorage(type+"position_type"),""),
            position_apply:this.getNull(this.getSessionStorage(type+"position_apply"),""),
            position_title:this.getNull(this.getSessionStorage(type+"position_title"),""),

        };
    }
    componentDidMount() {
        this.getPositions();
    }
    getPositions(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"position_state",this.state.position_state);
        this.setSessionStorage(type+"position_type",this.state.position_type);
        this.setSessionStorage(type+"position_apply",this.state.position_apply);
        this.setSessionStorage(type+"position_title",this.state.position_title);

        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getPositions",
            {
                page:this.state.page,
                position_state:this.state.position_state,
                position_type:this.state.position_type,
                position_apply:this.state.position_apply,
                position_title:this.state.position_title
            });
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    positionBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("已上线");
                this.getPositions();
                break;
            case 3:
                this.showTip("已下线");
                this.getPositions();
                break;
            case 4:
                this.getPositions();
                break;
        }
    }



    render(){


        return(
            <div>
                <Widget.Toolbar title={"职位列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="职位类型"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.typeBeans}
                        onChange={(index)=>{
                            this.setState({
                                position_type:this.state.typeBeans[index].value
                            })
                        }}/>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="审核状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.applyBeans}
                        onChange={(index)=>{
                            this.setState({
                                position_apply:this.state.applyBeans[index].value
                            })
                        }}/>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="发布状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.stateBeans}
                        onChange={(index)=>{
                            this.setState({
                                position_state:this.state.stateBeans[index].value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="职位标题"
                        value={this.state.position_title}
                        onChange={(value)=>{
                            this.setState({
                                position_title:value
                            })
                        }}/>
                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getPositions()
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"职位ID",flex:1,key:'position_id'},
                        {name:"职位标题",flex:1,key:'position_title'},
                        {name:"职位类型",flex:1,key:'position_type_show'},
                        {name:"发布状态",flex:1,key:'position_state_show'},
                        {name:"是否上线",flex:1,key:'position_apply_show'},
                        {name:"修改时间",flex:1,key:'update_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.positionBean}
                    operationData={[{title:"详情"},{title:"上线"},{title:"下线"},{title:"置顶"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/position_detail/"+this.state.positionBean[rowID].position_id);
                                break;
                            case 1:
                                this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/updatePosition",
                                    {position_id:this.state.positionBean[rowID].position_id,
                                        position_apply:'0'});
                                break;
                            case 2:
                                this.getDataByPost(3,information_homeUrl+"/positionController/v1.0/updatePosition",
                                    {position_id:this.state.positionBean[rowID].position_id,
                                        position_apply:'1'});
                                break;
                            case 3:
                                this.getDataByPost(4,information_homeUrl+"/positionController/v1.0/updatePosition"
                                    ,{position_id:this.state.positionBean[rowID].position_id,
                                        create_time:'1'});
                                break;

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getPositions()
                        })
                    }}>
                </Widget.List>


            </div>
        )
    }
}

module.exports=Position;


