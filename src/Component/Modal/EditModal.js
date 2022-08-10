import React, { useEffect, useState } from 'react';
import { Modal, closeButton } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function EditModal(props) {
    const navigate = useNavigate();
    const data = props.Data;
/*     console.log("in props", data.title);
 */

    const editValid = useFormik({
        initialValues: {
            title: data.title,
            content: data.content
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
            values.idpost = data._id;
            values.id = window.localStorage.getItem("id");
            console.log(values);

            await axios.put('http://localhost:5000/post', values, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.status === 200) {
                    alert("success modify post!")
                    window.location.reload()
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
    useEffect(() => {
        editValid.setFieldValue('title', data.title)
        editValid.setFieldValue('content', data.content)
    }, [data]);

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.hide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id="editModalForm" onSubmit={editValid.handleSubmit}>
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
                            <button type="button" class="btn btn-danger" onClick={props.hide}>out</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditModal;