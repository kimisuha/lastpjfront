import '../Css/Dashboard.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import $ from 'jquery';
import Head from './Head';

const Dashboard = () => {

    /* const jFunc = () => {

        let check = true;

        $(document).ready(function () {
            $("#content-left-nav-menu").on("click", function () {
                $(".content-left ul li").toggle(function () {

                    $(".content-left ul li").css("display", "block");
                });
            });

            $(".todo-item-bton").hide();
            $(".todo-item").on("click", function () {
                $(".todo-item-bton").toggle(function () {
                    $(".todo-item-bton").show();
                });
            });

            $("#xtl1").on("click", function () {
                let text = $("#xtl1").text();

                if (text == "see more") {
                    $("#xtl1").text("see less");
                    $("#xtl1").css("height", "auto");
                } else {
                    $("#xtl1").text("see more");
                    $("#xtl1").css("height", "9rem");
                }
            });

            $("#tooggleNavlef").on("click", function () {
                if (check) {

                    $(".content-left-nav").removeClass("d-none");
                    $("#tooggleNavlef>i").addClass("bi-arrow-up-circle-fill").removeClass("bi-arrow-down-circle-fill");
                    check = false;
                }
                else {
                    $(".content-left-nav").addClass("d-none");
                    $("#tooggleNavlef>i").addClass("bi-arrow-down-circle-fill").removeClass("bi-arrow-up-circle-fill");
                    check = true;
                }
            });

            $("#shareForm button#shareSubmit").on("click", function () {
                let shareName = $("#shareForm input").val();
                if (shareName != "") {
                    let content = `<span class="span-share">${shareName}</span>`
                    $("#listShare").append(content);
                    $("#shareForm input").val("");
                }
            });


        });
    }

    jFunc(); */


    return (
        <div>
            <Head></Head>

            {/* <div class="alert" role="alert" id="attention">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>success delete + title</p>
            </div> */}

            <div class="content row">
                <div class="col-lg-2 col-md-3 content-left">
                    <button class="btn d-lg-none d-md-none d-sm-block d-block text-capitalize text-white" id="tooggleNavlef">
                        <i class="bi bi-arrow-down-circle-fill"></i>
                    </button>
                    <div class="container content-left-nav d-none d-md-block">
                        <p class="content-left-nav-item text-capitalize" data-target="#addModal" data-toggle="modal">
                            add new</p>

                        <div class="modal" id="addModal">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3>add new</h3>

                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <form id="addNewJob">
                                            <div class="form-group">
                                                <label for="title" class="form-label">title</label>
                                                <input type="text" class="form-control" name="title" id="title" />
                                            </div>
                                            <div class="form-group">
                                                <label for="content" class="form-label">content</label>
                                                <textarea name="content" id="content" cols="15" rows="7"
                                                    class="form-control"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label for="dateEnd" class="form-label">date end</label>
                                                <input type="date" name="dateEnd" id="dateEnd" class="form-control" />
                                            </div>
                                            <div class="form-group text-center text-capitalize">
                                                <button type="submit" class="btn btn-primary">add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p href="#" class="content-left-nav-item text-capitalize">
                            <p id="content-left-nav-menu">sort by</p>
                            <ul>
                                <li>
                                    <a href="#">
                                        <p>today</p>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>yesterday</p>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>this week</p>
                                    </a>
                                </li>
                            </ul>

                        </p>
                        <p class="content-left-nav-item text-capitalize">
                            share to me</p>
                    </div>

                </div>

                <div class="col-lg-10 col-md-9 col-sm-12 col-12 content-mid">
                    <h2 class="text-white">list todo</h2>

                    <div class="card text-center todo-item todo-item-inprocess">
                        <div class="row todo-item-head">
                            <div class="col-7 text-capitalize">
                                <h3 class="card-title">title</h3>
                            </div>

                            <div class="col-2">
                                createtor
                            </div>

                            <div class="col-3">
                                <p>date create</p>
                            </div>
                        </div>

                        <div class="card-body todo-item-body">
                            <div class="row todo-item-content">
                                <div class="col-12 text-left">
                                    content
                                </div>
                            </div>

                            <div class="row todo-item-control">
                                <div class="col-5 text-right">
                                    <p class="todo-item-open" id="xtl1">see more</p>
                                </div>

                                <div class="col-7 todo-item-bton">
                                    <i class="bi bi-share-fill" data-toggle="modal" data-target="#shareModal"></i>
                                    <i class="bi bi-pencil-square" data-toggle="modal" data-target="#editModal"></i>
                                    <i class="bi bi-x-circle-fill" data-toggle="modal" data-target="#deleteModal"></i>
                                    <i class="bi bi-check-circle-fill" data-toggle="modal" data-target="#checkModal"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card text-center todo-item todo-item-success">
                        <div class="row todo-item-head">
                            <div class="col-7 text-capitalize">
                                <h3 class="card-title">title</h3>
                            </div>

                            <div class="col-2">
                                createtor
                            </div>

                            <div class="col-3">
                                <p>date create</p>
                            </div>
                        </div>

                        <div class="card-body todo-item-body">
                            <div class="row todo-item-content">
                                <div class="col-12 text-left">
                                    content
                                </div>
                            </div>

                            <div class="row todo-item-control">
                                <div class="col-5 text-right">
                                    <p class="todo-item-open">see more</p>
                                </div>

                                <div class="col-7 todo-item-bton">
                                    <i class="bi bi-share-fill"></i>
                                    <i class="bi bi-pencil-square"></i>
                                    <i class="bi bi-x-circle-fill"></i>
                                    <i class="bi bi-check-circle-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>

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



                <div class="modal" id="shareModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="text-capitalize">
                                    share to
                                </h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <form id="shareForm">
                                    <div class="form-group">
                                        <label for="shareAccount" class="form-label">share to</label>
                                        <input type="text" name="shareAccount" id="shareAccount" class="form-control" />
                                    </div>

                                    <div class="form-group text-center">
                                        <button type="button" class="btn btn-success" id="shareSubmit">share</button>
                                        <button type="button" class="btn btn-primary choose-yes">done</button>
                                    </div>
                                </form>

                                <div id="listShare" class="text-center">
                                    <h2 class="text-capitalize">list share</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="editModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-warning">
                                <h3 class="text-capitalize text-white">edit</h3>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="editModalForm">
                                    <div class="form-group">
                                        <label for="#title" class="form-label">title</label>
                                        <input type="text" name="title" id="title" class="form-control" />
                                    </div>

                                    <div class="form-group">
                                        <label for="#content" class="form-label">content</label>
                                        <textarea name="content" id="content" cols="15" rows="10"
                                            class="form-control"></textarea>
                                    </div>

                                    <div class="form-group text-center text-capitalize">
                                        <button type="submit" class="btn btn-success choose-yes">done</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal"
                                            aria-label="close">out</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-danger">
                                <h3 class="text-capitalize text-white">delete this + title</h3>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="editModalForm">
                                    <div class="form-group">
                                        <label for="#title" class="form-label">title</label>
                                        <input type="text" name="title" id="title" class="form-control" disabled />
                                    </div>

                                    <div class="form-group">
                                        <label for="#content" class="form-label">content</label>
                                        <textarea name="content" id="content" cols="15" rows="10" class="form-control"
                                            disabled></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button type="submit" class="btn btn-success text-capitalize choose-yes">done</button>
                                <button type="button" class="btn btn-danger text-capitalize" data-dismiss="modal"
                                    aria-label="close">out</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="checkModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-danger">
                                <h3 class="text-capitalize text-white">are you done!?</h3>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button type="button" class="btn btn-success text-capitalize choose-yes">yes</button>
                                <button type="button" class="btn btn-danger text-capitalize" data-dismiss="modal"
                                    aria-label="close">no</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;