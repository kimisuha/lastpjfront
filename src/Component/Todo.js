import React, { useEffect } from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Todo.css';


function Todo(props) {

    let data = props.data;
    console.log(data)

    const navigate = useNavigate();;
    const editValid = useFormik({
        initialValues: {
            title: props.data.title,
            content: props.data.content
        },
        validationSchema: yup.object({
            title: yup.string()
                .required("required")
                .min(4, 'too short')
                .max(50, 'too long'),
            content: yup.string()
                .required("required")
                .min(2, 'too short')
                .max(5000, 'too long')
        }),
        onSubmit: async (values) => {
            values.idpost = '62f02cf93a40fea42ed37aae';
            values.id = window.localStorage.getItem("id");
            console.log(values);

            await axios.put('http://localhost:5000/post', values, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.status === 200) {
                    alert("success modify post!")
                }
                //console.log(res)
            })
                .catch((res, err) => {
                    console.log(err)
                    if (res.status === 404)
                        alert('not found post!')
                    else if (res.status === 401)
                        navigate('/')
                })
        }
    })

    /*     test = () => {
            console.log()
        } */

    const removePost = async (postid) => {
        await axios.delete('http://localhost:5000/post', {
            headers: {
                Authorization: window.localStorage.getItem("token"),
                postid: postid
            }
        }).then((res) => {
            console.log(res)
            window.location.reload();
        })
            .catch((err) => {
                console.log(err);
            })
    }
/* 
    const checkPost = async (postid) => {
        await axios.post('http://localhost:5000/check', {
            headers: {
                Authorization: window.localStorage.getItem("token"),
                postid: postid
            }
        }).then((res) => {
            console.log(res)
            window.location.reload();
        })
            .catch((err) => {
                console.log(err);
            })
    }
 */

    return (
        <div class={'card text-center todo-item ' + data.class} id={data._id}>
            <div class="row todo-item-head">
                <div class="col-7 text-capitalize">
                    <h3 class="card-title">{data.title}</h3>
                </div>

                <div class="col-2">
                    <p>{data.author}</p>
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
                    {/* <div class="col-5 text-right">
                        <p class="todo-item-open xtl1" onClick={controlText(data.idpost)}>see more</p>
                    </div> */}

                    <div class="col-7 todo-item-bton m-auto">
                        <i class="bi bi-share-fill" data-toggle="modal" data-target={"#" + data._id + "shareModal"}></i>
                        <i class="bi bi-pencil-square" data-toggle="modal" data-target="#editModal"></i>
                        <i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#deleteModal"></i>
                        {/* <i class="bi bi-check-circle-fill" data-toggle="modal" data-target="#checkModal"></i> */}
                    </div>
                </div>
            </div>

            <div class="modal" id={data._id + "shareModal"}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="text-capitalize">
                                share to
                            </h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <form id="shareForm">
                                <div class="form-group">
                                    <label for="shareAccount" class="form-label">share to</label>
                                    <input type="text" name="shareAccount" id="shareAccount" class="form-control" />
                                </div>

                                <div class="form-group text-center">
                                    <button type="button" class="btn btn-success" id="shareSubmit">share</button>
                                    <button type="button" class="btn btn-primary choose-yes">done</button>
                                </div>
                            </form>

                            <div id="listShare" class="text-center">
                                <h2 class="text-capitalize">list share</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="editModal" onSubmit={editValid.handleSubmit}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            <h3 class="text-capitalize text-white">edit</h3>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="editModalForm">
                                <div class="form-group">
                                    <label for="#title" class="form-label">title</label>
                                    <input type="text" name="title" id="title" class="form-control"
                                        value={editValid.values.title} onChange={editValid.handleChange}
                                    />
                                    {editValid.errors.title && editValid.touched.title && (
                                        <p className='error'>{editValid.errors.title}</p>
                                    )}
                                </div>

                                <div class="form-group">
                                    <label for="#content" class="form-label">content</label>
                                    <textarea name="content" id="content" cols="15" rows="10"
                                        class="form-control"
                                        value={editValid.values.content} onChange={editValid.handleChange}
                                    ></textarea>
                                    {editValid.errors.content && editValid.touched.content && (
                                        <p className='error'>{editValid.errors.content}</p>
                                    )}
                                </div>

                                <div class="form-group text-center text-capitalize">
                                    <button type="submit" class="btn btn-success choose-yes">done</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                                        aria-label="close">out</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="deleteModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-danger">
                            <h3 class="text-capitalize text-white">delete this + {data.title}</h3>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="editModalForm">
                                <div class="form-group">
                                    <label for="#title" class="form-label">title</label>
                                    <input type="text" name="title" id="title" class="form-control" disabled />
                                </div>

                                <div class="form-group">
                                    <label for="#content" class="form-label">content</label>
                                    <textarea name="content" id="content" cols="15" rows="10" class="form-control"
                                        disabled></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="submit" class="btn btn-success text-capitalize choose-yes" onClick={() => removePost(data._id)}>done</button>
                            <button type="button" class="btn btn-danger text-capitalize" data-dismiss="modal"
                                aria-label="close">out</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="modal" id="checkModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-danger">
                            <h3 class="text-capitalize text-white">are you done!?</h3>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="button" class="btn btn-success text-capitalize choose-yes" onClick={() => checkPost(data._id)}>yes</button>
                            <button type="button" class="btn btn-danger text-capitalize" data-dismiss="modal"
                                aria-label="close">no</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );

}

export default Todo;