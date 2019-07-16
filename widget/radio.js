/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class RadioComponent extends Component{
    render(){
        let radioView = [];

        for (let i = 0; i < this.props.dataSource.length; i++) {
            let inputText = ''
            if(this.props.dataSource[i][this.props.select_value]+"" === this.props.value+"") {
                radioView.push(<div style={{fontSize:13,marginLeft:10}}>
                        <input type="radio"
                               checked={true}
                               onClick={(e)=>{

                               }}/>
                        <p1 className="p" style={{color:'#000000',marginLeft:10}}>{this.props.dataSource[i][this.props.show_value]}</p1>
                    </div>
                )
            }else{
                radioView.push(<div style={{fontSize:13,marginLeft:10}}>
                        <input type="radio"
                               checked={false}
                               onClick={(e)=>{
                                   if(this.props.onClick){
                                       this.props.onClick(this.props.dataSource[i][this.props.select_value]);
                                   }
                               }}/>
                        <p1 className="p" style={{color:'#000000',marginLeft:10}}>{this.props.dataSource[i][this.props.show_value]}</p1>
                    </div>
                )
            }
        }

        return(
            <div className="input_div" style={this.props.style}>
                <div className="title" style={this.props.title_style}>
                    <p1 className="title_p" style={this.props.title_p_style}>*</p1>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <div style={{height:30,display:'flex',alignItems:"center"}}>
                    {radioView}
                </div>
            </div>
        )
    }
}

module.exports=RadioComponent;