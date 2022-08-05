import '../Css/Login.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm: ""
        },
        validationSchema: yup.object({
            email: yup.string()
                .required("required")
                .email("invalid email"),
            password: yup.string()
                .required("required")
                .min(5, "at least 5 character"),
            confirm: yup.string()
                .required("required")
                .oneOf([yup.ref("password")], "not match!")
        }),
        onSubmit: async function (values) {
            delete values.confirm;
            values.id = "62ec46fdf85424fb79b748d1"
            await axios.post("http://localhost:5000/forgotpass", values).then((res) => {
                if (res.status == 200) {
                    navigate('/');
                } else {
                    window.location.reload();
                }
            }).catch((err) => {
                console.log(err)
            })


            //console.log(values);
        }
    })

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="card-title text-capitalize text-center">forgotent password</h2>
                </div>
            </div>
            <div class="row">
                <form id="forgot-form" onSubmit={formik.handleSubmit}>

                    <div class="form-group">
                        <label for="email">new password</label>
                        <input type="email" placeholder="email@gmail.com" class="form-control" id="email" name="email"
                            autocomplete="new-password"
                            value={formik.values.email} onChange={formik.handleChange}

                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='error'>{formik.errors.email}</p>
                        )}
                    </div>

                    <div class="form-group">
                        <label for="password">new password</label>
                        <input type="password" placeholder="password" class="form-control" id="password" name="password"
                            autocomplete="new-password"
                            value={formik.values.password} onChange={formik.handleChange}

                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className='error'>{formik.errors.password}</p>
                        )}
                    </div>

                    <div class="form-group">
                        <label for="confirm">confirm password</label>
                        <input type="password" placeholder="confirm-password" class="form-control" id="confirm"
                            name="confirm" autocomplete="new-password"
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
                        <a href="Login.html">
                            <button class="btn btn-success form-control text-capitalize" type="submit">change</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPass;