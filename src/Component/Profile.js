import '../Css/Profile.css'
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* export const sercurityPass = async (pass) => {
    const salt = 10;
    const sal = await bcrypt.genSalt(salt)
    const hash = await bcrypt.hashSync(pass, sal);
    //console.log(hash);
    return hash;
} */

const Profile = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const modifiedToggle = () => {
        $(document).ready(function () {
            $("#infoChange").on("click", function () {
                $("input").removeAttr("disabled");
                $("#save").removeAttr("disabled");
            });
        });

    }

    modifiedToggle();

    const getDefault = async (id) => {
        await axios.get("http://localhost:5000/user/" + id)
            .then((res) => {
                //console.log(res);
                setData(res.data);
            }).catch((res) => {
                console.log(res.response.status)
                if (res.response.status == 403)
                    navigate('/verify')
                navigate('/');
            });
    }

    /* getDefault("62eb0104e710284d4f281cca");
    62ec46fdf85424fb79b748d1
    console.log(data); */

    useEffect(() => {
        $("#save").attr("disabled", "disabled");
        getDefault('62eb0104e710284d4f281cca');
    }, []);

    /*     const convertDate = () => {
            let dat = String(data.datebirth);
            console.log(typeof date);
        } */

    /* convertDate(); */

    const formik = useFormik({
        initialValues: {
            email: data.email,
            username: data.name,
            birth: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            email: yup.string()
                .required("required")
                .email("invalid email"),
            username: yup.string()
                .required("required")
                .min(5, "at least 5 character")
                .max(30, "maximum 30 character"),
            birth: yup.date()
                .required("required")
        }),
        onSubmit: async function (values) {
            $(document).ready(function () {
                $("input").attr("disabled", "disabled");
                $("#save").attr("disabled", "disabled");
            });


            await axios.put("http://localhost:5000/user/" + "62eb0104e710284d4f281cca", values)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    window.location.reload();
                })

        }
    });

    const checkmodal = useFormik({
        initialValues: {
            currentpass: "",
            newpass: "",
            confirmpass: ""
        },
        validationSchema: yup.object({
            currentpass: yup.string()
                .required("required!"),
            newpass: yup.string()
                .required("required!")
                .min(5, "at least 5 character!"),
            confirmpass: yup.string()
                .required("required")
                .oneOf([yup.ref('newpass')], "not match!")
        }),
        onSubmit: async function (values) {
            //console.log(values);
            /* values.password = sercurityPass(values.password);
            console.log(values); */

            await axios.post("http://localhost:5000/user/" + "62eb82940f3f6f08ac59d3f0", values)
                .then((res) => {
                    /* if (res.status == 200){
                        window.location.reload();
                    } */
                    console.log(res);


                })
                .catch((err) => {
                    console.log(err);
                    window.location.reload();
                })
        }
    });

    return (
        <div class="container">
            <div class="row profile-head">
                <div class="col-1">
                    <Link to={'/dashboard'}>
                        <i class="bi bi-arrow-left-circle"></i>
                    </Link>
                </div>
                <div class="col-11 text-center profile-avata">
                    <img src="http://creativeedtech.weebly.com/uploads/4/1/6/3/41634549/published/avatar.png?1487742111"
                        alt="test" class="img-fluid" />
                    <h1 class="mt-3">your name</h1>
                </div>
            </div>

            <div class="row profile-body d-block">
                <h1 class="ml-4">infomation</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div class="form-group">
                        <label for="email">email</label>
                        <input type="email" placeholder="youremail@gmail.com" class="form-control" name="email" id="email"
                            value={formik.values.email} onChange={formik.handleChange} disabled
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='error'>{formik.errors.email}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <label for="username">user name</label>
                        <input type="text" class="form-control" name="username" id="username"
                            value={formik.values.username} onChange={formik.handleChange} disabled
                        />
                        {formik.errors.username && formik.touched.username && (
                            <p className='error'>{formik.errors.username}</p>
                        )}

                    </div>

                    <div class="form-group">
                        <label for="birth">date birth</label>
                        <input type="date" class="form-control" name="birth" id="birth"
                            value={formik.values.birth} onChange={formik.handleChange} disabled
                        />
                        {formik.errors.birth && formik.touched.birth && (
                            <p className='error'>{formik.errors.birth}</p>
                        )}

                    </div>

                    <button class="btn btn-danger text-white text-capitalize" type="button"
                        id="change password" data-toggle="modal" data-target="#changerpass">change password</button>

                    <div class="form-group col-12 text-center">
                        <button class="btn btn-primary text-capitalize" type="submit" id="save">done</button>

                        <button class="btn btn-warning text-white text-capitalize" type="button"
                            id="infoChange">change</button>
                    </div>
                </form>

                <div className='modal' id='changerpass'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header bg-danger text-light text-capitalize'>
                                <h3>changer password</h3>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className='modal-body'>
                                <form id='changpassword' onSubmit={checkmodal.handleSubmit}>
                                    <div className='form-group'>
                                        <label for="currentpass" className='form-lable'>current password</label>
                                        <input type={'password'} name='currentpass' id='currentpass' className='form-control'
                                            value={checkmodal.values.currentpass} onChange={checkmodal.handleChange}
                                        ></input>
                                        {checkmodal.errors.currentpass && checkmodal.touched.currentpass && (
                                            <p className='error'>{checkmodal.errors.currentpass}</p>
                                        )}
                                    </div>

                                    <div className='form-group'>
                                        <label for="newpassword" className='form-lable'>new password</label>
                                        <input type={'password'} name='newpass' id='newpass' className='form-control'
                                            value={checkmodal.values.newpass} onChange={checkmodal.handleChange}
                                        ></input>
                                        {checkmodal.errors.newpass && checkmodal.touched.newpass && (
                                            <p className='error'>{checkmodal.errors.newpass}</p>
                                        )}
                                    </div>

                                    <div className='form-group'>
                                        <label for="confirmpassword" className='form-lable'>confirm new password</label>
                                        <input type={'password'} name='confirmpass' id='confirmpass' className='form-control'
                                            value={checkmodal.values.confirmpass} onChange={checkmodal.handleChange}
                                        ></input>
                                        {checkmodal.errors.confirmpass && checkmodal.touched.confirmpass && (
                                            <p className='error'>{checkmodal.errors.confirmpass}</p>
                                        )}
                                    </div>

                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-danger text-capitalize'>change</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Profile;