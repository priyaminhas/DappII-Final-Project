import React,{ useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Candidate from './candidate';
import CandidateVotes from './candidateVotes';
import Users from './users';
import Maindashboard from './mainDashboard';
import '../Dashboard.css';

function Dashboard(){
    const history = useHistory();
    const [ cookies, setCookie, removeCookie ] = useCookies();
    useEffect(() => {
        if(!cookies.userJWT || !cookies.address){
            history.push('/login');
        }
    })

    const handleLogout = () => {
        removeCookie('userJWT');
        removeCookie('address');
        removeCookie('userType');
        history.push('/login');
    } 

    return(
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">True-Vote</a>
               
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" onClick={handleLogout} href="#">Sign out</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/dashboard">
                                    <span data-feather="home"></span>
                                    Dashboard <span className="sr-only">(current)</span>
                                    </a>
                                </li>

                                <li className= 'nav-item' >
                                    <a className="nav-link" href="/dashboard/candidates">All Candidates</a>
                                </li>
                                <li className={cookies.userType==1 ? 'nav-item' : 'd-none'}>
                                    <a className="nav-link" href="/dashboard/candidatesVote">All Candidates Votes</a>
                                </li>
                                <li className={cookies.userType==1 ? 'nav-item' : 'd-none'}>
                                    <a className="nav-link" href="/dashboard/users">All Users</a>
                                </li>
                            </ul> 
                        </div>
                    </nav>
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            {history.location.pathname == '/dashboard' ? <Maindashboard /> : ''}
                            {history.location.pathname == '/dashboard/candidates' ? <Candidate /> : ''}
                            {history.location.pathname == '/dashboard/candidatesVote' ? <CandidateVotes /> : ''}
                            {history.location.pathname == '/dashboard/users' ? <Users /> : ''}
                        </div> 
                    </main>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;