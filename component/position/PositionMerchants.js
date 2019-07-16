/**
 * 2018/12/05 zhuxiong
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="material";
class PositionMerchants extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            materialBean:[],
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"待审核",value:'0'},
                {name:"已通过",value:'1'},
                {name:"已拒绝",value:'2'}],
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            material_state:this.getNull(this.getSessionStorage(type+"material_state"),'1'),
            material_name:this.getNull(this.getSessionStorage(type+"material_name"),""),

        };
    }
    componentDidMount() {
        this.getMaterials();
    }
    getMaterials(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"material_state",this.state.material_state);
        this.setSessionStorage(type+"material_name",this.state.material_name);

        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getMaterials",
            {
                page:this.state.page,
                material_state:this.state.material_state,
                material_name:this.state.material_name
            });
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    materialBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("已同意");
                this.getMaterials();
                break;
            case 3:
                this.showTip("已拒绝");
                this.getMaterials();
                break;
        }
    }

    renderRefuseDesc() {
        return (
            <div id="reasons" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="拒绝理由"
                        value={this.state.refuse_desc}
                        onChange={(value)=> {
                            this.setState({
                                refuse_desc: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="提交"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getMaterials();
                            })
                        }}/>
                </Widget.View>


            </div>
        )
    }

    render(){


        return(
            <div>
                <Widget.Toolbar title={"认证列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="认证名称"
                        value={this.state.material_name}
                        onChange={(value)=>{
                            this.setState({
                                material_name:value
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
                                this.getMaterials()
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"认证ID",flex:1,key:'material_id'},
                        {name:"认证名称",flex:1,key:'material_name'},
                        {name:"认证类型",flex:1,key:'material_type_show'},
                        {name:"审核状态",flex:1,key:'material_state_show'},
                        {name:"申请时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.materialBean}
                    operationDatas={(index)=>{
                        return this.state.materialBean[index].material_state!=="0"?[{title:"详情"}]:
                            this.state.materialBean[index].material_state==="0"?[{title:"详情"},{title:"通过"},{title:"拒绝"}]:[];
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/material_detail/"+this.state.materialBean[rowID].material_id);
                                break;
                            case 1:
                                this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/updateMaterial",
                                    {material_id:this.state.materialBean[rowID].material_id,
                                        material_state:'1'});
                                break;
                            case 2:
                                this.openPrompt("填写拒绝理由","",(value)=>{
                                    this.getDataByPost(3,information_homeUrl+"/positionController/v1.0/updateMaterial",
                                        {material_id:this.state.materialBean[rowID].material_id,material_state:'2',refuse_desc:value})
                                },3)
                                break;
                        }
                    }}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMaterials()
                        })
                    }}>
                </Widget.List>
                {this.renderRefuseDesc()}

            </div>
        )
    }
}

module.exports=PositionMerchants;


