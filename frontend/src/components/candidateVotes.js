import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import api from '../services/api';

function CandidateVotes(){
    const [candidateArr, setcandidateArr] = useState([]);
    let history = useHistory();
    let dataChart=[];
    let activities = [
        ['Candidate','votes'],
        ['candidate1', 15],
        ['candidate2', 6],
        ['candidate3', 7],
    ];
    useEffect(() => {
        api.get('/candidates/all', { withCredentials: true }).then(res => {
                if (res.status === 200) {
                    setcandidateArr(res.data);
                   // var obj =  new Array("Candidates",'Votes'); // {} will create an object
                   dataChart[0] =new Array("Candidates",'Votes'); 
                   // console.log(data+"dats");
                    var i=1;
                    candidateArr.forEach(function(element){
                       
                        var name = element.name;
                        var votes = element.votes? element.votes :0 ;
                        var obj = new Array(name,votes); // {} will create an object
                    // data.push(['Candidates', 'Votes']);
                    dataChart[i]= obj;
                        i++;  
                    });
                        console.log(dataChart+"dats");
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
  data={activities}
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