import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Todo.css';


function Todo(props) {
    let data = props.data;

    const navigate = useNavigate();
    

    const checkPost = async (postid) => {

        //console.log(postid);

        await axios.post('http://localhost:5000/check', { id: postid }, {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
        });
    }


    const ctrClickShare = () => {
        props.showShare();
        props.setPostId(data);
    }

    const ctrClickDelete = () => {
        props.changeState();
        props.setPostId(data);
    }

    const ctrClickEdit = () => {
        props.showEdit();
        props.setPostId(data);
    }

    return (
        <div class={'card text-center todo-item ' + data.class} id={data._id}>
            <div class="row todo-item-head">
                <div class="col-7 text-capitalize">
                    <h3 class="card-title">{data.title}</h3>
                </div>

                <div class="col-2">
                    <p>{data.name}</p>
                </div>

                <div class="col-3">
                    <p>{data.daycreate}</p>
                </div>
            </div>

            <div class="card-body todo-item-body">
                <div class="row todo-item-content">
                    <div class="col-12 text-left">
                        <p>{data.content}</p>
                    </div>
                </div>

                <div class="row todo-item-control">
                    <div class="col-7 todo-item-bton m-auto">
                        <i class="bi bi-share-fill" onClick={() => ctrClickShare()}></i>
                        <i class="bi bi-pencil-square" onClick={() => ctrClickEdit()}></i>
                        
                        <i class="bi bi-x-circle-fill" onClick={() => ctrClickDelete()}></i>
                        <i class="bi bi-check-circle-fill" onClick={() => checkPost(data._id)}></i>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Todo;