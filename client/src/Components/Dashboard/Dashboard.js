// import React, { useEffect, useState } from 'react';
// import './App.css';
// import List from './components/List';
// import withListLoading from './components/withListLoading';

// function App() {
//   const ListLoading = withListLoading(List);
//   const [appState, setAppState] = useState({
//     loading: false,
//     repos: null,
//   });

//   useEffect(() => {
//     setAppState({ loading: true });
//     const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((repos) => {
//         setAppState({ loading: false, repos: repos });
//       });
//   }, [setAppState]);
//   return (
//     <div className='App'>
//       <div className='container'>
//         <h1>My Repositories</h1>
//       </div>
//       <div className='repo-container'>
//         <ListLoading isLoading={appState.loading} repos={appState.repos} />
//       </div>
//       <footer>
//         <div className='footer'>
//           Built{' '}
//           <span role='img' aria-label='love'>
//             💚
//           </span>{' '}
//           with by Shedrack Akintayo
//         </div>
//       </footer>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import Card from "./Card/Card.js";
import "../../Assets/Styles/Dashboard/dashboard.css";

function Dashboard() {

    const [data, setData] = useState({});

    useEffect(() => {
        const url = "/api/data/";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="dashboard-container">
            <Card color={data.Signal} ticker={data.Ticker} price={`$${data.LastClose}`} marketSide={data.Signal} currentPercentage={`${data.Performance}%`}/>
        </div>
    );
}

export default Dashboard;