import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import api from '../services/api';

function CandidateVotes(){
    const [candidateArr, setcandidateArr] = useState([]);
    let history = useHistory();
    let data=[];
    var finalObj;
    useEffect(() => {
        api.get('/candidates/all', { withCredentials: true }).then(res => {
                if (res.status === 200) {
                    setcandidateArr(res.data);
                    data.push(['Candidates', 'Votes']);
                  //  data['Candidates'] = 'Votes'
                    candidateArr.forEach(element => 
                                data.push([element.name,element.votes] )                          
                        );
                   //  finalObj = JSON.stringify(data);
                        console.log(data);
                } else {
                   // history.push('/error');
                    //return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/error', { 'message': err });
                return function cleanup() { }
            });
        
    },[]);
    return(
        <div className="container-fluid">
            <h2>Candidates</h2>
            <div className="container">
                <div style={{width: '400px', height: '300px'}}>
                <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[['Candidates', 'Votes'], ["candidate1", 14], ["candidate2", 6],["candidate3", 6]]}
  options={{
    title: 'Voting Data',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
                </div>
            </div>
        </div>
    );
}
export default CandidateVotes;