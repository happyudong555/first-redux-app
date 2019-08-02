import React from 'react';
import 'antd/dist/antd.css';
import List from './list';
import {connect} from 'react-redux'
import jwt from 'jsonwebtoken'
class AddForm extends React.Component {
    submit =(e)=> {
        e.preventDefault();
        const id = jwt.sign(JSON.stringify(this.getName.value), JSON.stringify(this.getName.value));
        const name = this.getName.value;
        const detail = this.getDetail.value;
        const data = {
            date: new Date(),
            id,
            name,
            detail
        }
        this.props.dispatch({
            type: 'ADD_COMMENT',
            data
        });
        this.getName.value="";
        this.getDetail.value="";
    }
    render() {
        return (
             <div>
                 <div style={{padding: 30}}>
                     <h1>Add Form</h1>
                     <br/>
                     <form onSubmit={this.submit}>
                         <div style={{margin: 'auto', display:'block'}}>
                            <input className="CommentForm" style={{width: 300, marginBottom: 20,padding: 8,borderRadius:3,border:'1px solid #ddd'}} 
                            placeholder={"name : "} ref={(input)=> this.getName = input}/>
                            <textarea placeholder="detail here" className="CommentForm" style={{width: 300, height: 'auto', marginBottom: 20, overflowY:'auto',border:'1px solid #d9d9d9',padding:14}} ref={(input)=> this.getDetail = input}/>
                            <button className="CommentForm">comment</button>
                         </div>
                     </form>
                     <br/>
                     <List/>
                 </div>
                 <style>{`
                    .CommentForm {
                        clear:both;
                        float:left;
                    }
                 `}</style>
             </div>
        );
    }
}
export default connect()(AddForm);