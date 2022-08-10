import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function DeleteModal(props) {
    let data = props.data;
    const removePost = async () => {
        //console.log(props.data._id);

        await axios.delete('http://localhost:5000/post', {
            headers: {
                Authorization: window.localStorage.getItem("token"),
                postid: data._id
            }
        }).then((res) => {
            console.log(res)
            window.location.reload();
        })
            .catch((err) => {
                console.log(err);
            })
    }


  //  console.log(data);
    return (
        <>
            <Modal
                show={props.deleteModalStage}
                onHide={props.onHide}
            /* backdrop="static"
            keyboard={false} */
            >
                <Modal.Header closeButton>
                    <Modal.Title>delete this {data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editModalForm">
                        <div class="form-group">
                            <label for="#title" class="form-label">title</label>
                            <input type="text" name="title" id="title" class="form-control" value={data.title} disabled />
                        </div>

                        <div class="form-group">
                            <label for="#content" class="form-label">content</label>
                            <textarea name="content" id="content" cols="15" rows="10" class="form-control"
                                value={data.content} disabled></textarea>
                        </div>

                        <div class="modal-footer d-flex justify-content-center">
                            <button type="submit" class="btn btn-success text-capitalize choose-yes" onClick={() => removePost()}>done</button>
                            <button type="button" class="btn btn-danger text-capitalize" onClick={props.onHide}>out</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteModal