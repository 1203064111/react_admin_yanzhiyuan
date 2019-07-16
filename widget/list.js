/**
 * Created by shenjiabo on 16/7/21.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var orientation='vertical';
var PageComponent=require("./page");
var ImgComponent=require('./image');
var TipImgComponent=require('./tip_img');
var SelectComponent=require('./select');

var RadioSelectComponent=require('./radio_select');
var TriangleComponent=require('./triangle');

class ListViewComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked:0
        }
    };
    render(){
        let headerView=[];
        let view=[];
        if(this.props.data){
            if(!this.props.hideVisible||this.props.hideVisible!=='true'){
                for(let i=0;i<this.props.data.length;i++){
                    if(this.props.data[i].key==='-2') {//选择按钮
                        let is_all_check="1";
                        for(let j=0;j<this.props.dataSource.length;j++){
                            if(!this.array_contain(this.props.checkArr,this.props.dataSource[j][this.props.checkKey])){//一个未选中 则全选就是未选中
                                is_all_check="0";
                                break;
                            }
                        }
                        headerView.push(
                            <div key={i+'++++'} style={{flex:this.props.data[i].flex,display:'flex',
                                background:'RGB(245,250,254)',
                                 flexWrap:'wrap',flexDirection: 'row',
                                 alignItems:'center',justifyContent:'center',
                                 borderBottomWidth:1,borderRightWidth:1,
                                 borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                 borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                <input type="checkbox"
                                       checked={is_all_check==='1'?true:false}
                                       onClick={()=>{
                                           for(let m=0;m<this.props.dataSource.length;m++){
                                               if(is_all_check==='1'){
                                                   this.props.onChecked(this.props.dataSource[m][this.props.checkKey],"0",m);
                                               }else{
                                                   if(!this.array_contain(this.props.checkArr,this.props.dataSource[m][this.props.checkKey])){
                                                       this.props.onChecked(this.props.dataSource[m][this.props.checkKey],"1",m);
                                                   }
                                               }

                                           }
                                       }}/>
                            </div>
                        )
                    }else {
                        headerView.push(
                            <div key={i+'++++'}  style={{flex:this.props.data[i].flex,display:'flex',
                                        background:'RGB(245,250,254)',
                                         flexWrap:'wrap',flexDirection: 'row',
                                         alignItems:'center',justifyContent:'center',
                                         borderBottomWidth:1,borderRightWidth:1,
                                         borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                         borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                <div   style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <p1 className='p' style={{color:'#000000'}}>{this.props.data[i].name}</p1>
                                </div>
                            </div>
                        )
                    }
                }
            }
            let viewTemp=[];
            if(this.props.dataSource!=null){
                for(let i=0;i<this.props.dataSource.length;i++){
                    viewTemp=[];
                    for(let j=0;j<this.props.data.length;j++){//j行号
                        if(this.props.data[j].key==='-4') {//单选
                            viewTemp.push(
                                <div  key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                    flexWrap:'wrap',flexDirection: 'row',
                                    alignItems:'center',justifyContent:'center',
                                    borderBottomWidth:1,borderRightWidth:1,
                                    borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                    borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                    <input type="checkbox"
                                            checked={this.array_contain(this.props.checkArr,this.props.dataSource[i][this.props.checkKey])}
                                            onClick={()=>{
                                                if(this.props.onChecked){
                                                    if(this.array_contain(this.props.checkArr,this.props.dataSource[i][this.props.checkKey])){
                                                        this.props.onChecked(this.props.dataSource[i][this.props.checkKey],"0",i);

                                                    }else{
                                                        this.props.onChecked(this.props.dataSource[i][this.props.checkKey],"1",i);

                                                    }
                                                   
                                               }
                                            }}/>
                                    
                                </div>
                            )
                        }


                        
                        else if(this.props.data[j].key==='-3') {//序号
                            viewTemp.push(
                                <div  key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                    flexWrap:'wrap',flexDirection: 'row',
                                    alignItems:'center',justifyContent:'center',
                                    borderBottomWidth:1,borderRightWidth:1,
                                    borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                    borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                    <p1 style={styles.tabP1}>{i+1}</p1>
                                </div>
                            )
                        }else if(this.props.data[j].key==='-2') {//选择按钮

                            viewTemp.push(
                                <div  key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                     flexWrap:'wrap',flexDirection: 'row',
                                     alignItems:'center',justifyContent:'center',
                                     borderBottomWidth:1,borderRightWidth:1,
                                     borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                     borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                    <input type="checkbox"
                                           checked={this.array_contain(this.props.checkArr,this.props.dataSource[i][this.props.checkKey])}
                                            onClick={()=>{
                                                if(this.props.onChecked){
                                                    if(this.array_contain(this.props.checkArr,this.props.dataSource[i][this.props.checkKey])){
                                                        this.props.onChecked(this.props.dataSource[i][this.props.checkKey],"0",i);
                                                    }else{
                                                        this.props.onChecked(this.props.dataSource[i][this.props.checkKey],"1",i);
                                                    }
                                               }
                                            }}/>
                                </div>
                            )
                        }else if(this.props.data[j].key==='-1'){//操作框
                            let opertionView=[];
                            if(this.props.operationDatas){
                                var operationDatas=this.props.operationDatas(i);
                                for(let h=0;h<operationDatas.length;h++){
                                    opertionView.push(
                                        <div key={i+"=="+j+'--==='+h} style={{display:'flex'
                                            ,marginLeft:10,alignItems:'center',justifyContent:'center',cursor: "pointer"}}
                                             onClick={()=>{this.props.operationClick(i,h)}}>
                                            <i className={operationDatas[h].title.indexOf("删除")>=0?"Hui-iconfont Hui-iconfont-del3":
                                                        operationDatas[h].title.indexOf("编辑")>=0?"Hui-iconfont Hui-iconfont-edit":
                                                        operationDatas[h].title.indexOf("详情")>=0?"Hui-iconfont Hui-iconfont-edit2":
                                                        operationDatas[h].title.indexOf("结算")>=0?"Hui-iconfont Hui-iconfont-order":
                                                        operationDatas[h].title.indexOf("拒绝")>=0?"Hui-iconfont Hui-iconfont-shenhe-butongguo2":
                                                        operationDatas[h].title.indexOf("不")>=0?"Hui-iconfont Hui-iconfont-shenhe-butongguo2":
                                                        operationDatas[h].title.indexOf("退款")>=0?"Hui-iconfont Hui-iconfont-xiangpicha":
                                                        operationDatas[h].title.indexOf("通过")>=0?"Hui-iconfont Hui-iconfont-shenhe-tongguo":
                                                        operationDatas[h].title.indexOf("队长")>=0?"Hui-iconfont Hui-iconfont-user-zhanzhang":
                                                        operationDatas[h].title.indexOf("用户")>=0?"Hui-iconfont Hui-iconfont-avatar":
                                                        operationDatas[h].title.indexOf("上线")>=0?"Hui-iconfont Hui-iconfont-shangjia":
                                                        operationDatas[h].title.indexOf("下线")>=0?"Hui-iconfont Hui-iconfont-xiajia":
                                                        operationDatas[h].title.indexOf("订单")>=0?"Hui-iconfont Hui-iconfont-quanbudingdan":
                                                        operationDatas[h].title.indexOf("晒单")>=0?"Hui-iconfont Hui-iconfont-feedback1":
                                                        operationDatas[h].title.indexOf("置顶")>=0?"Hui-iconfont Hui-iconfont-gotop":
                                                        operationDatas[h].title.indexOf("回复")>=0?"Hui-iconfont Hui-iconfont-comment":
                                                        operationDatas[h].title.indexOf("列表")>=0?"Hui-iconfont Hui-iconfont-yuedu":"Hui-iconfont Hui-iconfont-lunzi"} title={operationDatas[h].title}></i>

                                        </div>
                                    )
                                }
                            }
                            if(this.props.operationData){
                                for(let h=0;h<this.props.operationData.length;h++){
                                    opertionView.push(
                                        <div  key={i+"=="+j+'+++'+h} style={{display:!this.props.operationData[h].visible||this.props.operationData[h].visible==='true'?'flex':"none"
                                        ,marginLeft:10,alignItems:'center',justifyContent:'center',cursor: "pointer"}}
                                                 onClick={()=>{this.props.operationClick(i,h)}}>
                                            <i   className={this.props.operationData[h].title.indexOf("删除")>=0?"Hui-iconfont Hui-iconfont-del3":
                                                this.props.operationData[h].title.indexOf("编辑")>=0?"Hui-iconfont Hui-iconfont-edit":
                                                this.props.operationData[h].title.indexOf("详情")>=0?"Hui-iconfont Hui-iconfont-edit2":
                                                this.props.operationData[h].title.indexOf("结算")>=0?"Hui-iconfont Hui-iconfont-order":
                                                this.props.operationData[h].title.indexOf("拒绝")>=0?"Hui-iconfont Hui-iconfont-shenhe-butongguo2":
                                                this.props.operationData[h].title.indexOf("不")>=0?"Hui-iconfont Hui-iconfont-shenhe-butongguo2":
                                                this.props.operationData[h].title.indexOf("退款")>=0?"Hui-iconfont Hui-iconfont-xiangpicha":
                                                this.props.operationData[h].title.indexOf("通过")>=0?"Hui-iconfont Hui-iconfont-shenhe-tongguo":
                                                this.props.operationData[h].title.indexOf("队长")>=0?"Hui-iconfont Hui-iconfont-user-zhanzhang":
                                                this.props.operationData[h].title.indexOf("用户")>=0?"Hui-iconfont Hui-iconfont-avatar":
                                                this.props.operationData[h].title.indexOf("上线")>=0?"Hui-iconfont Hui-iconfont-shangjia":
                                                this.props.operationData[h].title.indexOf("下线")>=0?"Hui-iconfont Hui-iconfont-xiajia":
                                                this.props.operationData[h].title.indexOf("订单")>=0?"Hui-iconfont Hui-iconfont-quanbudingdan":
                                                this.props.operationData[h].title.indexOf("晒单")>=0?"Hui-iconfont Hui-iconfont-feedback1":
                                                this.props.operationData[h].title.indexOf("置顶")>=0?"Hui-iconfont Hui-iconfont-gotop":
                                                this.props.operationData[h].title.indexOf("回复")>=0?"Hui-iconfont Hui-iconfont-comment":
                                                this.props.operationData[h].title.indexOf("列表")>=0?"Hui-iconfont Hui-iconfont-yuedu":"Hui-iconfont Hui-iconfont-lunzi"} title={this.props.operationData[h].title}></i>

                                        </div>
                                    )
                                }
                            }
                            viewTemp.push(
                                <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                     flexWrap:'wrap',flexDirection: 'row',
                                     alignItems:'center',justifyContent:'center',
                                     borderBottomWidth:1,borderRightWidth:1,
                                     borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                     borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                    {this.props.renderOperation?this.props.renderOperation(i):null}
                                    {opertionView}
                                </div>
                            )
                        }else {
                            let title;
                            if(this.props.data[j].keys){
                                title=this.props.dataSource[i];
                                for(let m=0;m<this.props.data[j].keys.length;m++){
                                    title=title[this.props.data[j].keys[m]];
                                }
                            }else{
                                title=this.props.dataSource[i][this.props.data[j].key]
                            }
                            if(this.props.data[j].type==='widget'){//自定义控件
                                viewTemp.push(
                                    <div style={{flex:this.props.data[j].flex,display:'flex',
                                        flexWrap:'wrap',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                        {this.props.renderWidget(this.props.data[j].key,i)}
                                    </div>
                                )
                            }else  if(this.props.data[j].type==='sort'){
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                        flexWrap:'wrap',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                            <i className="Hui-iconfont Hui-iconfont-arrow1-top" title="上移"
                                                onClick={()=>{
                                                    if(this.props.onChange){
                                                        this.props.onChange(i,this.props.data[j].key,"desc")
                                                    }
                                                }}></i>
                                            <i className="Hui-iconfont Hui-iconfont-arrow1-bottom" title="下移"
                                               onClick={()=>{
                                                   if(this.props.onChange){
                                                       this.props.onChange(i,this.props.data[j].key,"asc")
                                                   }
                                               }}></i>
                                    </div>
                                )

                            }else  if(this.props.data[j].type==='radio_select'){
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                        flexWrap:'wrap',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>

                                        <RadioSelectComponent
                                            value={title}
                                            onClick={(value)=>{
                                                if(this.props.onChange){
                                                    this.props.onChange(i,this.props.data[j].key,value);
                                                }
                                            }}/>
                                    </div>
                                )
                            }else if(this.props.data[j].type==='select'){
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                        flexWrap:'wrap',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                        <SelectComponent
                                            show_value={this.props.data[j].show_value}
                                            select_value={this.props.data[j].select_value}
                                            init_value={title}
                                            dataSource={this.props.data[j].data}
                                            onChange={(index)=>{
                                                if(this.props.onChange){
                                                    this.props.onChange(i,this.props.data[j].key,this.props.data[j].data[index][this.props.data[j].select_value]);
                                                }
                                            }}/>
                                    </div>
                                )
                            }else if(this.props.data[j].type==='img'){//图片展示
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                         flexWrap:'wrap',flexDirection: 'row',
                                         alignItems:'center',justifyContent:'center',
                                         borderBottomWidth:1,borderRightWidth:1,
                                         borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                         borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}
                                        onClick={()=>{
                                            this.setState({
                                                visible:true,
                                                src:this.props.dataSource[i][this.props.data[j].key]?this.props.dataSource[i][this.props.data[j].key].indexOf("http")>=0?
                                                    this.props.dataSource[i][this.props.data[j].key]:imgurl+this.props.dataSource[i][this.props.data[j].key]:""
                                            })
                                        }}>
                                        <img   src={this.props.dataSource[i][this.props.data[j].key]?this.props.dataSource[i][this.props.data[j].key].indexOf("http")>=0?
                                            this.props.dataSource[i][this.props.data[j].key]:imgurl+this.props.dataSource[i][this.props.data[j].key]:""}
                                             style={{width:50,height:50}}/>
                                    </div>
                                )
                            }else if(this.props.data[j].type==='imgs'){//图片展示
                                let imgs=this.props.dataSource[i][this.props.data[j].key];
                                let img_array=[];
                                if(imgs!=null&&imgs!==""){
                                    let imgArray=imgs.split(',');
                                    for(let k=0;k<imgArray.length;k++){
                                        img_array.push(
                                            <img key={i+"=="+j+'---'+k} src={imgArray[k]?imgArray[k].indexOf("http")>=0?imgArray[k]:imgurl+imgArray[k]:""}
                                                 style={{width:50,height:50}}
                                                 onClick={()=>{
                                                     this.setState({
                                                         visible:true,
                                                         src:imgArray[k]?imgArray[k].indexOf("http")>=0?imgArray[k]:imgurl+imgArray[k]:""
                                                     })
                                                 }}/>
                                        )
                                    }
                                }
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                        flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                        {img_array}
                                    </div>
                                )
                            }else if(this.props.data[j].type==='imgButton'){//图片展示
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                        flexWrap:'wrap',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                        <ImgComponent
                                            title_style={{display:'none'}}
                                            img_style={{width:80,height:80}}
                                            src={this.props.dataSource[i][this.props.data[j].key]?this.props.dataSource[i][this.props.data[j].key].indexOf("http")>=0?this.props.dataSource[i][this.props.data[j].key]:imgurl+this.props.dataSource[i][this.props.data[j].key]:""}
                                            url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                            onSuccess={(value)=>{
                                                if(this.props.onChange){
                                                    this.props.onChange(i,this.props.data[j].key,value);
                                                }
                                            }}/>
                                    </div>
                                )
                            }else if(this.props.data[j].type==='input'){
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',padding:4,
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid'}}>
                                        <input
                                            type={"text"}
                                            style={{width:"100%",height:25,fontSize:10}}
                                            value={title?title:""}
                                            onChange={(e)=>{
                                                if(this.props.onChange){
                                                    this.props.onChange(i,this.props.data[j].key,e.target.value);
                                                }
                                            }}/>
                                    </div>
                                )
                            }else if(this.props.data[j].type==='inputDate'){
                                if(title&&title.indexOf(".0")>0){
                                    title=title.substring(0,title.length-2);
                                }
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',padding:4,
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid'}}>
                                        <p1 className="p" style={{color:'#000000'}}>{title}</p1>
                                    </div>
                                )
                            }
                            else if(this.props.data[j].type==='textarea'){
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',flexDirection: 'row',
                                        alignItems:'center',justifyContent:'center',padding:4,
                                        borderBottomWidth:1,borderRightWidth:1,
                                        borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                        borderBottomStyle:'solid',borderRightStyle:'solid'}}>
                                        <textarea
                                            placeholder={this.props.placeholder?this.props.placeholder:(this.props.tip?this.props.tip:"")}
                                            style={{width:"100%",height:100,borderLeft:0,borderTop:0,borderRight:0,borderBottom:0}}
                                            value={title}
                                            onChange={(e)=>{
                                                if(this.props.onChange){
                                                    this.props.onChange(i,e.target.value);
                                                }
                                            }}/>
                                    </div>
                                )
                            }else{
                                viewTemp.push(
                                    <div key={i+"=="+j} style={{flex:this.props.data[j].flex,display:'flex',
                                         flexWrap:'wrap',flexDirection: 'row',
                                         alignItems:'center',justifyContent:'center',
                                         borderBottomWidth:1,borderRightWidth:1,
                                         wordWrap:"break-word",wordBreak:"break-all",
                                         borderBottomColor:'#c8c8c8',borderRightColor:'#c8c8c8',
                                         borderBottomStyle:'solid',borderRightStyle:'solid',padding:4,}}>
                                        <p1 className="p" style={{color:'#000000'}}>{title}</p1>
                                    </div>
                                )
                            }
                        }
                    }
                    let childView=[];
                    if(this.props.renderChild){//子布局
                        childView.push(this.props.renderChild(i));
                    }
                    view.push(
                        <div key={i+"=++"}>
                            <div style={{flex:1,display:'flex'}} >
                                {viewTemp}
                            </div>
                            {childView}
                        </div>
                    )
                }
            }

        }
        return(
            <div style={{display:'flex',flexDirection:"column",flex:1}}>
                <TipImgComponent
                    visible={this.state.visible}
                    src={this.state.src}
                    onClose={()=>{
                        this.setState({
                            visible:false
                        })
                    }}/>
                <div  style={{flex: 1,
                        display: 'flex',
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderLeftColor: '#c8c8c8',
                        borderTopColor: '#c8c8c8',
                        borderLeftStyle: 'solid',
                        borderTopStyle: 'solid',
                        flexDirection: 'column',
                        background:this.props.background?this.props.background:"#ffffff",
                        marginLeft: this.props.marginLeft?this.props.marginLeft:10,
                        marginRight: this.props.marginRight?this.props.marginRight:10,
                        marginTop: this.props.marginTop?this.props.marginTop:10}}>
                    <div  style={{flex:1,display:this.props.is_header==="0"?'none':"flex"}}>
                        {headerView}
                    </div>
                    {view}
                </div>
                <div style={{display:this.props.page?'flex':"none"}}>
                    <PageComponent count={this.props.total}
                                   curIndex={this.props.page}
                                   onPage={(page)=>{
                                       if(this.props.onPage){
                                           this.props.onPage(page);
                                       }
                                   }}>
                    </PageComponent>
                </div>
            </div>
        );
    }

    array_contain(array, obj){
        for (var i = 0; i < array.length; i++){
            if (array[i]+"" == obj+"")//如果要求数据类型也一致，这里可使用恒等号===
                return true;
        }
        return false;
    }
}


const styles = {
    item: {
        flex: 1,
        display: 'flex',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderLeftColor: '#c8c8c8',
        borderTopColor: '#c8c8c8',
        borderLeftStyle: 'solid',
        borderTopStyle: 'solid',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    tabColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: '#c8c8c8',
        borderRightColor: '#c8c8c8',
        borderBottomStyle: 'solid',
        borderRightStyle: 'solid',
        padding: 10,
    },
    tabRow: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: '#c8c8c8',
        borderRightColor: '#c8c8c8',
        borderBottomStyle: 'solid',
        borderRightStyle: 'solid',
        padding: 10,
    },
    tabP1: {
        fontSize: 13,
        wordBreak: 'break-all'
    }
}
module.exports= ListViewComponent;