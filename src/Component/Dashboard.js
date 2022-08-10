import '../Css/Dashboard.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Head from './Head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Todo from './Todo';
import DeleteModal from './Modal/DeleteModal'; import EditModal from './Modal/EditModal';
import ShareModal from './Modal/ShareModal';


const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [deleteModalStage, setDeleteModalStage] = useState(false);
    const changeStateTrue = () => {
        setDeleteModalStage(true);
    }
    const changeStateFalse = () => {
        setDeleteModalStage(false);
    }

    const [editModalStage, setEditModalStage] = useState(false);
    const changeEditTrue = () => {
        setEditModalStage(true);
    }
    const changeEditFalse = () => {
        setEditModalStage(false);
    }

    const [shareModalStage, setShareModalStage] = useState(false);
    const changeShareTrue = () => {
        setShareModalStage(true);
    }
    const changeShareFalse = () => {
        setShareModalStage(false);
    }

    const [postId, setPostId] = useState({});

    const getDefault = async () => {
        await axios.get(`http://localhost:5000/pagi/${window.localStorage.getItem('id')}/1/15`, {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            }
        }).then((res) => {
           // console.log(res);
            let addName = res.data.listPost.map((item, i) => {
                item.name = res.data.name[i];
                return item;
            });
            setData(addName);
            //setPername(res.data.name);
        }).catch((res, err) => {
            console.log(err);
            if (res.status === 401)
                navigate('/')
            navigate('/verify');
        });

        //console.log(data)
    }

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

    let d = new Date();
    /* d.setDate(d.getDate() + 1) */
    d.setUTCHours(0, 0, 0, 0);
   // console.log(d);


    useEffect(() => {
        getDefault()
    }, []);

    //console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (data[i].status == true)
            data[i].class = 'todo-item-success'
        else if (new Date(String(data[i].dayend)) >= d)
            data[i].class = 'todo-item-inprocess'
        else
            data[i].class = 'todo-item-outplan'
    }

    const sendData = async (config, time) => {
        config.u_id = window.localStorage.getItem('id')
        await axios.post(`http://localhost:5000/filter/${time}`, config, {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(res);
            setData(res.data);
            //window.location.reload();
        }).catch((res, err) => {
            console.log(err);
        });
    }

    const sortByDate = async () => {
        let day = new Date();
        /* d.setDate(d.getDate() + 1) */
        day.setUTCHours(0, 0, 0, 0);
        console.log(day);
        let config = {
            dayend: day
        }

        await sendData(config, 'today');
    }

    const sortByYesterday = async () => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);
        yesterday.setUTCHours(0, 0, 0, 0);
        console.log(yesterday)

        let config = { dayend: yesterday };

        await sendData(config, 'yesterday');

    }

    const sortByWeek = async () => {
        let week = new Date();
        week.setDate(week.getDate() - 7);
        week.setUTCHours(0, 0, 0, 0);
        let limit = new Date();
        limit.setUTCHours(0, 0, 0, 0);
        let config = {
            dayend: week,
            limit: limit
        }
        console.log(week);
        sendData(config, 'thisweek')
    }


    // console.log(postId);


    const sortDay = async (type) => {
        await axios.get(`http://localhost:5000/sort/${type}`, {
            headers: {
                Authorization: window.localStorage.getItem("token"),
                id: window.localStorage.getItem('id')
            }
        }).then((res) => {
            console.log(res);
            setData(res.data);
        })
    }
    return (
        <div>
            <Head></Head>

            <div class="content row">
                <div class="col-lg-2 col-md-3 content-left mb-sm-3 mb-3 mb-md-0 mb-lg-0">
                    <div class="container content-left-nav text-sm-center text-center text-md-left text-lg-left">
                        <p class="content-left-nav-item text-capitalize" data-target="#addModal" data-toggle="modal">
                            add new</p>
                        <p class="content-left-nav-item text-capitalize">
                            <p id="content-left-nav-menu">filter by</p>
                            <ul >
                                <li onClick={() => sortByDate()}>
                                    <p>today</p>
                                </li>

                                <li>
                                    <p onClick={() => sortByYesterday()}>yesterday</p>
                                </li>

                                <li>
                                    <p onClick={() => sortByWeek()}>this week</p>
                                </li>
                            </ul>

                        </p>
                        <p class="content-left-nav-item text-capitalize" onClick={() => sendData({}, 'nothing')}>
                            share to me</p>
                    </div>

                </div>

                <div class="col-lg-10 col-md-9 col-sm-12 col-12 content-mid">
                    <div className='row headofdash'>
                        <h2 class="text-white col-11">list todo</h2>
                        <div className='dropdown mt-3'>
                            <i class="bi bi-funnel-fill col-1 text-success text-center dropdown-toggle " data-toggle="dropdown" aria-expanded="false">

                            </i>
                            <div class="dropdown-menu dropdown-menu-right text-capitalize">
                                <p className='dropdown-item' onClick={() => sortDay('increase')}>by time increase</p>
                                <p className='dropdown-item' onClick={() => sortDay('decrease')}>by time decrease</p>
                                <p className='dropdown-item' onClick={() => sortDay('alphabet')}>by alphabet</p>
                            </div>
                        </div>


                    </div>
                    {

                        data.map((item, i) => {

                            return <Todo
                                key={i} data={item}
                                changeState={changeStateTrue}
                                setPostId={setPostId}
                                showEdit={changeEditTrue}
                                showShare={changeShareTrue}

                            ></Todo>
                        })
                    }



                    {/* <div class="row mt-5 mb-1">
                            <nav aria-label="Page navigation" class="m-auto">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div> */}
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
            <DeleteModal deleteModalStage={deleteModalStage} onHide={changeStateFalse} data={postId}></DeleteModal>
            <EditModal show={editModalStage} hide={changeEditFalse} data={postId} Data={postId}></EditModal>
            <ShareModal showShare={shareModalStage} shareHide={changeShareFalse} shareData={postId}></ShareModal>

            <Footer></Footer>
        </div>
    );
}

export default Dashboard;