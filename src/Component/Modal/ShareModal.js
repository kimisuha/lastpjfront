import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

function ShareModal(props) {
    const data = props.shareData;
    const [listShare, setListShare] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [testing, setTesting] = useState([]);

    const shareValid = useFormik({
        initialValues: {
            shareAccount: ""
        },
        validationSchema: yup.object({
            shareAccount: yup.string()
                .email("invalid type")
                .required("required")
        }),
        onSubmit: async (values) => {
            await axios.post(`http://localhost:5000/share/user/${data._id}`, values, {
                headers: {
                    Authorization: window.localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert("success addnew member");
                    window.location.reload();
                }
            }).catch((err, res) => {
                if (err.response.status == 404) {
                    //alert("this email not exited")
                    setErrorMessage("this email not exited, please input exited email!")

                }
                console.log(err);
            })
        }
    })

    const removeShareMember = async (id) => {
        await axios.put(`http://localhost:5000/share/user/${data._id}`, { id }, {
            headers: {
                Authorization: window.localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res);

            if (res.status === 200) {
                alert("success delete member");
                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);

        })
    }

    const nameOfUser = async () => {
        if (listShare != null)
            if (listShare != []) {
                for (let i = 0; i < listShare.length; i++){
                    console.log(listShare[i]);
                    let person = await axios.get('http://localhost:5000/', {
                        headers: {
                            Authorization: window.localStorage.getItem("token"),
                            id: listShare[i]
                        }
                    }).then((res) => {
                        return res.data;
                    });
                    console.log('person', person);

                    let term = testing;
                    term.push(person);
                    setTesting([...testing, term]);
                }
                    
            }

        console.log(testing);

    }

    const test = () => {
        let list;
        if (listShare !== undefined)
            if (listShare.length !== 0) {
                list = listShare.map((item, i) => {
                    //console.log(item);
                    return (
                        <div className='bg-primary text-light d-flex justify-content-center w-50 m-1 rounded' key={i}>
                            <p>{testing[i]}</p>
                            <i class="bi bi-trash-fill text-danger ml-1" onClick={() => removeShareMember(item)}></i>
                        </div>
                    );
                })
            }


        return list;
    }

    useEffect(() => {
        setListShare(data.sharelist);
       // nameOfUser();
    }, [data]);

    console.log(testing);
    useEffect(() => {
        nameOfUser();
    }, [listShare])

    let te = test();


    return (
        <>

            <Modal
                show={props.showShare}
                onHide={props.shareHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>share to</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <form id="shareForm" onSubmit={shareValid.handleSubmit}>
                        <div class="form-group">
                            <label for="shareAccount" class="form-label">share to</label>
                            <input type="text" name="shareAccount" id="shareAccount" class="form-control"
                                value={shareValid.values.shareAccount} onChange={shareValid.handleChange}
                            />
                            {shareValid.errors.shareAccount && shareValid.touched.shareAccount && (
                                <p className='error'>{shareValid.errors.shareAccount}</p>
                            )}
                            {<p className='error'>{errorMessage}</p>}
                        </div>

                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-success" id="shareSubmit">share</button>
                        </div>
                    </form>

                    <div id="listShare" class="text-center">
                        <h2 class="text-capitalize">list share</h2>
                    </div>
                </Modal.Body>
                {
                    <div className='d-flex justify-content-around sharelist'>
                        {te}
                    </div>
                }
            </Modal>
        </>
    );
}

export default ShareModal;