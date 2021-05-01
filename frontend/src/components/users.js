import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { useCookies } from 'react-cookie';
import Popup from 'reactjs-popup';
import moment from 'moment';

function Users() {
    const [userArr, setuserArr] = useState([]);
    let history = useHistory();
    const [user_name,setuser_name]= useState("");
    const [user_type,setuser_type]= useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const fetchUsers = () => {
        try{ 
            api.get('/users/all', { withCredentials: true }).then(res => {
                if (res.status === 200) {
                    setuserArr(res.data);
                } else {
                    history.push('/error');
                    //return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/error', { 'message': err });
                return function cleanup() { }
            });
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
    useEffect(() => {
        fetchUsers();
    },[]);
    const saveUser = (event) => {
        event.preventDefault();
        try{
            api.post('/users/add',{user_name,user_type}).then(res => {
                if(res.status === 200){
                    if(res.data.added==1){
                        setOpen(false);                        
                    }
                    alert(res.data.message);
                    fetchUsers();
                }else{
                    
                }
            })
        }
        catch(e){
            console.log(e);
        }
       // console.log(data);
    }
    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h2>Users</h2>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setOpen(o => !o)}>
                            Add User
                        </button>
                    </div>
                </div>
            </div>  
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal" style={{'display':'block','position':'inherit'}}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add User</h5>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </div>
                    <div class="modal-body">    
                        <form>
                            <div className="form-group">
                                <label for="name">User Name</label>
                                <input type="text" className="form-control" id="user_name" onChange={e => setuser_name(e.target.value)} name="user_name"  placeholder="Enter User Name" />
                            </div>
                            <div className="form-group">
                                <label for="user_type">User Type</label>
                                <select className="form-control" id="user_type" onChange={e => setuser_type(e.target.value)} name="user_type">
                                    <option value="1">Admin</option>
                                    <option value="2">User</option>
                                </select>
                            </div>
                        </form>
                    </div> 
                    <div className="modal-footer">
                        <button type="button" onClick={saveUser} className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                    </div>               
                </div>
            </Popup>
            <div className="container"> 
                <table className="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">UserType</th>
                        <th scope="col">Registration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!userArr ? null : userArr.map((user,id) => (
                        
                        <tr key={user._id}>
                            <th scope="row">{id+1}</th>
                            <td>{user.name}</td>
                            <td>{user.userType == 1 ? "Admin" : "Voter"}</td>
                            <td>{moment(user.registration_date).format('MMMM d YYYY')}</td>
                        </tr>
                    )
                    )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Users;