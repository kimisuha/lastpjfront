import '../Css/Login.css';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();

    const formilk = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().min(5, "at least 5 character").max(30, "maximum 30 character").required("required!"),
            email: yup.string().email("invalid email!").required("required"),
            password: yup.string().required("required")
        }),
        onSubmit: async function (values) {
            await axios.post("http://localhost:5000/", values)
                .then(async (res) => {
                    //console.log(res);
                    if (res.status == 200) {
                        console.log(res.data)
                        window.localStorage.setItem("token", res.data.token);
                        console.log(window.localStorage.getItem("token"));

                        window.localStorage.setItem("id", res.data._id);
                        await axios.get("http://localhost:5000/user/" + res.data._id, {
                            headers: {
                                Authorization: res.data.token
                            }
                        })
                            .then((res) => {
                                navigate('/dashboard');
                            }).catch((res) => {
                                console.log(res.response.status)


                                if (res.response.status == 200) {
                                    navigate('/dashboard');
                                } else if (res.response.status == 403) {
                                    navigate('/verify');
                                }
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    window.location.reload();
                })
        }
    }, []);

    /*     const checklogin = async () => {
            
        } */

    async function checklogin() {
        if (window.localStorage.getItem("token")) {
            let check = await axios.get("http://localhost:5000/", {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            })
                .then((res) => {
                    if (res.status === 200)
                        navigate('/dashboard')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        checklogin();
    })


    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="card-title text-capitalize text-center">sign in</h2>
                </div>
            </div>
            <div class="row sign-in">
                <form id="sign-in-form" onSubmit={formilk.handleSubmit}>
                    <div class="form-group sign-in-item">
                        <label for="username">user name</label>
                        <input type="text" placeholder="user name" class="form-control" id="username" name="username"
                            value={formilk.values.username} onChange={formilk.handleChange}
                        />
                        {formilk.errors.username && formilk.touched.username && (
                            <p className='error'>{formilk.errors.username}</p>
                        )}


                    </div>

                    <div class="form-group sign-in-item">
                        <label for="email">email</label>
                        <input type="email" placeholder="youremail@gmail.com" class="form-control" id="email" name="email"
                            value={formilk.values.email} onChange={formilk.handleChange}
                        />
                        {formilk.errors.email && formilk.touched.email && (
                            <p className='error'>{formilk.errors.email}</p>
                        )}


                    </div>

                    <div class="form-group sign-in-item">
                        <label for="password">password</label>
                        <input type="password" placeholder="password" class="form-control" id="password" name="password"
                            value={formilk.values.password} onChange={formilk.handleChange}
                        />
                        {formilk.errors.password && formilk.touched.password && (
                            <p className='error'>{formilk.errors.password}</p>
                        )}


                    </div>

                    <div class="form-group d-lg-flex d-md-flex justify-content-lg-between justify-content-md-between">
                        <Link to={'/signup'}>
                            <p class="text-left">sign up</p>
                        </Link>

                        <Link to={'/forgot'}>
                            <p class="text-right">forgot password</p>
                        </Link>
                    </div>

                    <div class="form-group">
                        <a href="Dashboard.html">
                            <button class="btn btn-success form-control text-capitalize" type="submit"
                                id="signin-form-submit">login</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default Login;