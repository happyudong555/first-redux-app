import React from 'react'
import 'antd/dist/antd.css';
import { Col, Row, Card, Modal, Button } from 'antd'
import { connect } from 'react-redux'
const list_State = (state) => {
    return {
        list: state
    }
}
class List extends React.Component {
    state = {
        visible: false,
        id: []
    }
    openModal = (id) => {
        this.setState({
            visible: true,
            id
        })
    }
    close = () => {
        this.setState({
            visible: false
        })
    }
    delete = (id) => {
        this.props.dispatch({
            type: 'DELETE_COMMENT',
            id
        })
    }
    editSave =(e)=> {
        e.preventDefault();
        const name = this.editName.value;
        const detail = this.editDetail.value;
        const data = {
            date: new Date(),
            name,
            detail
        }
        this.props.dispatch({
            type: 'EDIT_COMMENT',
            date: new Date(),
            id: this.state.id,
            data
        });
        this.editName.value="";
        this.editDetail.value="";
    }
    itemList = () => {
        if (this.props.list === [] || this.props.list === null) {
            return (
                <div>

                </div>
            )
        }
        else {
            return (
                <div>
                    <strong>
                        <h2>List items</h2>
                    </strong>
                    <Row gutter={16}>
                        {
                            this.props.list.map((item, i) => (
                                <Col key={i} span={8}>
                                    <Card title={item.name}>
                                        <span style={{ fontSize: 15 }}>{item.detail}</span>
                                    </Card>
                                    <br />
                                    <button style={{marginRight:23}} onClick={this.delete.bind(this, item.id)}>delete</button>
                                    <button onClick={this.openModal.bind(this, item.id)}>edit</button>
                                </Col>
                            ))
                        }
                        <Modal title="Modal"
                            visible={this.state.visible} footer={null} onCancel={this.close}>
                            <div className="editFormContainer">
                                <form onSubmit={this.editSave}>
                                    <input placeholder="name : " style={{ width: '100%', marginBottom: 20 }} className="CommentForm" ref={(edit_input) => this.editName = edit_input} />
                                    <textarea placeholder="detail : " style={{ width: '100%', marginBottom: 20 }} className="CommentForm" ref={(edit_input) => this.editDetail = edit_input} />
                                    <button onClick={this.close} style={{ marginBottom: 20, cursor: 'pointer' }} className="CommentForm">save</button>
                                </form>
                            </div>
                        </Modal>
                    </Row>
                </div>
            )
        }
    }
    render() {
        return (
            <div >
                <div className="clearfix">
                    <br />
                    {this.itemList()}
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .CommentForm {
                        clear:both;
                        float:left;
                        padding: 5px;
                        border: 1px solid rgb(217, 217, 217);
                    }
                    .editFormContainer {
                        width: 70%;
                        height: 300px;
                        margin:auto;
                        display:block;
                    }
                 `}</style>
            </div>
        );
    }
}
export default connect(list_State)(List);