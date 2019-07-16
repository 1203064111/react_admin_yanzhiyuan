/**
 * Created by shenjiabo on 16/7/21.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var orientation='vertical';
var PageComponent=require("./page");

class ListView extends Component{
    constructor(props) {
        super(props);
        this.state={
            state:0,//0从未加载过  1:加载更多 2:正在加载中  3:已全部加载
            count:this.props.count?this.props.count:10
        }
    };
    componentDidMount() {

    };

    componentWillUnmount() {

    }

    loadEnd(state){
        this.setState({
            state:state,
        });
    }
    render(){
        let view=[];
        if(this.props.style&&(!this.props.style.flexDirection||this.props.style.flexDirection==="row")){
            let view1=[];
            if(this.props.dataSource!=null&&this.props.dataSource.length>0) {
                view1=[];
                for (let j = 0; j < Math.ceil(this.props.dataSource.length / this.state.count); j++) {
                    let viewTemp=[];
                    for (let i = j*this.state.count; i<((j+1)*this.state.count>this.props.dataSource.length?this.props.dataSource.length:(j+1)*this.state.count); i++) {
                        viewTemp.push(this.props.renderRow(i));
                    }
                    view1.push(
                        <div style={{display:'flex'}}>
                            {viewTemp}
                        </div>
                    )
                }
            }
            view.push(
                <div>
                    {view1}
                </div>
            )
        }else{
            if(this.props.dataSource!=null&&this.props.dataSource.length>0) {
                for (let i = 0; i < this.props.dataSource.length; i++) {
                    view.push(this.props.renderRow(i));
                }
            }
        }


        return(
            <div className={this.props.className?this.props.className:""}
                 style={this.props.style?this.props.style:{}}>
                {view}
                {this.props.children}
            </div>
        );
    }

    onScroll(e){

    }
    onMouseOut(){

    }
}
module.exports= ListView;