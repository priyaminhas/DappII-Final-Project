import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { useCookies } from 'react-cookie';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Candidate() {
    const [candidateArr, setcandidateArr] = useState([]);
    const [candidate_name,setcandidate_name]= useState("");
    const [party_name,setparty_name]= useState("");
    const [ cookies] = useCookies();
    let history = useHistory();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    useEffect(() => {
        try{ 
            api.get('/candidates/all', { withCredentials: true }).then(res => {
                if (res.status === 200) {
                    setcandidateArr(res.data);
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
    },[]);
   
    const handleVote = (name,id) => {
        try{
            api.post('/candidates/vote',{name,id}).then(res => {
                if(res.status === 200){
                    //console.log(res);
                    if(res.data.vote==1){
                        //disable vote buttons 
                        
                    }
                    alert(res.data.message);
                }else{
                    
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const saveCandidate = (event) => {
        event.preventDefault();
        console.log(candidate_name);
        console.log(party_name);
        try{
            api.post('/candidates/add',{candidate_name,party_name}).then(res => {
                if(res.status === 200){
                    if(res.data.added==1){
                        setOpen(false);                        
                    }
                    alert(res.data.message);
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
                <h2>Candidates</h2>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button type="button" className={cookies.userType==1 ? "btn btn-sm btn-outline-secondary":"d-none"} onClick={() => setOpen(o => !o)}>
                            Add Candidate
                        </button>
                    </div>
                </div>
            </div> 
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal" style={{'display':'block','position':'inherit'}}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add Candidate</h5>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </div>
                    <div class="modal-body">    
                        <form>
                            <div className="form-group">
                                <label for="name">Candidate Name</label>
                                <input type="text" className="form-control" id="candidate_name" onChange={e => setcandidate_name(e.target.value)} name="candidate_name"  placeholder="Enter Candidate Name" />
                            </div>
                            <div className="form-group">
                                <label for="party_name">Party Name</label>
                                <input type="text" className="form-control" id="party_name" onChange={e => setparty_name(e.target.value)} placeholder="Party Name" name="party_name" />
                            </div>
                        </form>
                    </div> 
                    <div className="modal-footer">
                        <button type="button" onClick={saveCandidate} className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                    </div>               
                </div>
            </Popup>
            <div className="container">   
                <div className="row">
                    {!candidateArr ? null : candidateArr.map(candidate => (
                            <div className="card col-sm-3 mb-3 mr-3 box-shadow" style={{padding:"0px"}}  key={candidate._id}>
                                <div className="card-header">
                                    <h4 className="font-weight-normal">{candidate.name}</h4>
                                </div>
                                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                <div className="card-body">
                                <h5 className="card-title">{candidate.name}</h5>
                                <p className="card-text">{candidate.partyName} </p>
                             
                                <a href="#"   onClick={() => handleVote(candidate.name,candidate._id)} className="btn btn-primary" id={candidate._id}>Vote</a>
                                    
                                </div>
                            </div>
                    ))}
                </div>
            </div>                
        </div>
        
    );
}

export default Candidate;