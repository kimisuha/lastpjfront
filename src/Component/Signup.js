import '../Css/Login.css'
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirm: ""
        },
        validationSchema: yup.object({
            username: yup.string()
                .required("required")
                .min(5, "at least 5 character")
                .max(30, "not more than!"),
            email: yup.string()
                .required("required")
                .email("invalid email"),
            password: yup.string()
                .required("required"),
            confirm: yup.string()
                .oneOf([yup.ref("password")], "not match with password")
                .required("required")

        }),
        onSubmit: async function (values) {
            console.log(values);
            await axios.post("http://localhost:5000/user", values)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        // window.localStorage.setItem("token", res.data.token);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    window.location.reload();
                })
        }
    })

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="card-title text-capitalize text-center">sign up</h2>
                </div>
            </div>
            <div class="row">
                <form id="signup-form" onSubmit={formik.handleSubmit}>
                    <div class="form-group">
                        <label for="username">user name</label>
                        <input type="text" placeholder="user name" class="form-control" name="username" id="username"
                            autocomplete="nickname"
                            value={formik.values.username} onChange={formik.handleChange}
                        />
                        {formik.errors.username && formik.touched.username && (
                            <p className='error'>{formik.errors.username}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <label for="email">email</label>
                        <input type="email" placeholder="youremail@gmail.com" class="form-control" name="email" id="email"
                            autocomplete="email"
                            value={formik.values.email} onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='error'>{formik.errors.email}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <label for="password">password</label>
                        <input type="password" placeholder="password" class="form-control" name="password" id="password"
                            autocomplete="new-password"
                            value={formik.values.password} onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className='error'>{formik.errors.password}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <label for="confirm-password">confirm-password</label>
                        <input type="password" placeholder="confirm-password" class="form-control" name="confirm"
                            id="confirm" autocomplete="new-password"
                            value={formik.values.confirm} onChange={formik.handleChange}
                        />
                        {formik.errors.confirm && formik.touched.confirm && (
                            <p className='error'>{formik.errors.confirm}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <Link to={'/'}>
                            <p class="text-right">sign in</p>
                        </Link>

                    </div>

                    <div class="form-group">
                        <button class="btn btn-success form-control text-capitalize" type="submit">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;