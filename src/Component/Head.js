import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import '../Css/Head.css'


function Head() {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.setItem("token", null);

        navigate('/');
    }



    return (
        <header class="row ml-auto mr-auto mt-2">

            <nav class="navbar navbar-expand-lg bg-primary todo-nav">
                <div class="navbar-brand nav-title ">
                    <Link to={'/'}>
                        <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.18169-9/12342346_1489652791343164_4251727350761917354_n.png?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=M36ZDdvK9tgAX9EGkcG&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_yPOw5NGh0IZVN72TViKym7Tq9Ma4rnKGhWIVttJaL4Q&oe=63093028"
                            alt="logo" class="img img-fluid" id="logo-of-app" />
                    </Link>
                    <h2 id="nav-saying-content">hi someone</h2>
                </div>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-toggles"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                                aria-controls="collapseExample" data-parent='#collapseExample'>
                                <button class="btn">
                                    <img src="http://creativeedtech.weebly.com/uploads/4/1/6/3/41634549/published/avatar.png?1487742111"
                                        alt="avata" class="img-fluid" id="avata" />
                                </button>
                            </a>

                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <Link to={'/profile'}>profile</Link>


                                    <button type="button" class="btn btn-danger" data-toggle="modal"
                                        data-target="#logout-modal">
                                        {/* <p>logout</p> */}
                                        <i class="bi bi-box-arrow-right"></i>
                                    </button>

                                    <div id="logout-modal" class="modal fade" role="dialog">
                                        <div class="modal-dialog">

                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close"
                                                        data-dismiss="modal">&times;</button>
                                                </div>
                                                <div class="modal-body text-center">
                                                    <h1 className='text-dark'>logout?</h1>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <button type="button" class="btn btn-success" id='logout' data-dismiss="modal" onClick={() => logout()}>yes</button>
                                                        </div>
                                                        <div class="col-6">
                                                            <button type="button" class="btn btn-danger"
                                                                data-dismiss="modal">no</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Head;