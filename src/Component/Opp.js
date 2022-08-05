import React from 'react';
import '../Css/Opp.css'
import { useFormik } from 'formik';
import * as yup from 'yup';

function Opp() {

    const formik = useFormik({
        initialValues: {
            verify: ""
        },
        validationSchema: yup.object({
            verify: yup.number()
                .required("required")
                .min(5, "too less")
                .max(5, "too more!")
        }),
        onSubmit: async function (values) {
            console.log(values);
        }

    })

    return (
        <div className='opps'>
            <div className='container text-center text-capitalize'>
                <i class="bi bi-exclamation-circle-fill"></i>

                <h3>opps! your account not verify man! let login your email and get code for this field</h3>

                <form id='verify' onSubmit={formik.handleSubmit} className='text-left'>
                    <div className='form-group'>
                        <label for="verify" className='form-label'>verify code</label>
                        <input type={'password'} name="verify" id='verify' className='form-control'
                            value={formik.values.verify} onChange={formik.handleChange}
                        ></input>
                        {formik.errors.verify && formik.touched.verify && (
                            <p className='error'>{formik.errors.verify}</p>
                        )}
                    </div>

                    <div className='form-group text-center'>
                        <button type='submit' className='btn btn-success text-capitalize'>verify</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Opp;