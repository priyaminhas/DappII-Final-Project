import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
function Candidate() {
    const [candidateArr, setcandidateArr] = useState([]);
    let history = useHistory();
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
   
    const handleVote = (name) => {
        console.log(name);
        try{
            api.post('/candidates/vote',{name}).then(res => {
                if(res.status === 200){
                    console.log(res);
                }else{
                    
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="container-fluid">
            <h2>Candidates</h2>
            <div className="container">
                <div className="card-deck mb-3 text-center">
                    {!candidateArr ? null : candidateArr.map(candidate => (
                            <div className="card mb-4 box-shadow"  key={candidate._id}>
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{candidate.name}</h4>
                                </div>
                                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                <div className="card-body">
                                <h5 className="card-title">{candidate.name}</h5>
                                <p className="card-text">{candidate.partyName} </p>
                                <a href="#" onClick={() => handleVote(candidate.name)} className="btn btn-primary" id={candidate._id}>Vote</a>
                                </div>
                            </div>
                    ))}
                </div>
            </div>                
        </div>
        
    );
}

export default Candidate;