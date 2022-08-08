import '../Css/Dashboard.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import $ from 'jquery';
import Head from './Head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Todo from './Todo';


const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    /* const getDefaultPost = async () => {
        await axios.get("http://localhost:5000/post", {
            headers: {
                Authorization: window.localStorage.getItem("token"),
                postid: '62f02cf93a40fea42ed37aae'
            },
        }).then((res) => {
            console.log(res);
        })
            .catch((res, err) => {
                console.log(err);
                if (res.response.status === 401)
                    navigate('/');
            })
    } */

    /* useEffect(() => {
        getDefaultPost();
    }) */


    const getDefault = async () => {
        await axios.get(`http://localhost:5000/pagi/${window.localStorage.getItem('id')}/1/15`, {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            }
        })
            .then((res) => {
                //console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        //console.log(data)
    }

    /* useEffect(() => {
        getDefault();
    }, []); */
    //getDefaultPost();

    const addValid = useFormik({
        initialValues: {
            title: "",
            content: "",
            dayend: ""
        },
        validationSchema: yup.object({
            title: yup.string()
                .required("required!")
                .min(4, "too short!")
                .max(50, "too long!"),
            content: yup.string()
                .required("required!")
                .min(2, "at least 2 character!")
                .max(5000, 'too long man!'),
            dayend: yup.string()
                .required("required")
        }),
        onSubmit: async (values) => {
            console.log(values);
            values.id = window.localStorage.getItem('id');

            await axios.post('http://localhost:5000/post', values, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res);
                window.location.reload();
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

    let day = new Date();
    useEffect(() => {
        getDefault()
    }, []);

    console.log(data);


    for (let i = 0; i < data.length; i++) {
        if (new Date(String(data[i].dayend)) >= new Date())
            data[i].class = 'todo-item-inprocess'
        else
            data[i].class = 'todo-item-outplan'
    }

    /* console.log(new Date(String(data[0].dayend)))
    console.log(new Date()) */

    return (
        <div>
            <Head></Head>

            <div class="content row">
                <div class="col-lg-2 col-md-3 content-left">
                    <button class="btn d-lg-none d-md-none d-sm-block d-block text-capitalize text-white" id="tooggleNavlef">
                        <i class="bi bi-arrow-down-circle-fill"></i>
                    </button>
                    <div class="container content-left-nav d-none d-md-block">
                        <p class="content-left-nav-item text-capitalize" data-target="#addModal" data-toggle="modal">
                            add new</p>
                        <p href="#" class="content-left-nav-item text-capitalize">
                            <p id="content-left-nav-menu">sort by</p>
                            <ul >
                                <li>
                                    <p>today</p>
                                </li>

                                <li>
                                    <p>yesterday</p>
                                </li>

                                <li>
                                    <p>this week</p>
                                </li>
                            </ul>

                        </p>
                        <p class="content-left-nav-item text-capitalize">
                            share to me</p>
                    </div>

                </div>

                <div class="col-lg-10 col-md-9 col-sm-12 col-12 content-mid">
                    <h2 class="text-white">list todo</h2>
                    {
                        /*  test.map((item, i) => {
                             return <p key={i}>{item.name}</p>
                         }) */

                        data.map((item, i) => {
                            if (item.dayend >= Date.now())
                                data.class = 'todo-item-inprocess'
                            else if (item.status == true)
                                data.class = 'todo-item-success'
                            return <Todo key={i} data={item}></Todo>
                        })
                    }
                    <div class="row mt-5 mb-1">
                        <nav aria-label="Page navigation" class="m-auto">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div class="modal text-capitalize" id="addModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-success text-light">
                                <h3>add new</h3>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="addNewJob" onSubmit={addValid.handleSubmit}>
                                    <div class="form-group">
                                        <label for="title" class="form-label">title</label>
                                        <input type="text" class="form-control" name="title" id="title"
                                            value={addValid.values.title} onChange={addValid.handleChange}
                                        />
                                        {addValid.errors.title && addValid.touched.title && (
                                            <p className='error'>{addValid.errors.title}</p>
                                        )}
                                    </div>
                                    <div class="form-group">
                                        <label for="content" class="form-label">content</label>
                                        <textarea name="content" id="content" cols="15" rows="7"
                                            class="form-control"
                                            value={addValid.values.content} onChange={addValid.handleChange}
                                        ></textarea>
                                        {addValid.errors.content && addValid.touched.content && (
                                            <p className='error'>{addValid.errors.content}</p>
                                        )}
                                    </div>
                                    <div class="form-group">
                                        <label for="dayend" class="form-label">day end</label>
                                        <input type="date" name="dayend" id="dayend" class="form-control"
                                            value={addValid.values.dayend} onChange={addValid.handleChange}
                                        />
                                        {addValid.errors.dayend && addValid.touched.dayend && (
                                            <p className='error'>{addValid.errors.dayend}</p>
                                        )}
                                    </div>
                                    <div class="form-group text-center text-capitalize">
                                        <button type="submit" class="btn btn-primary">add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default Dashboard;