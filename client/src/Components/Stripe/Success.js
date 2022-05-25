import React, { useState, useEffect} from "react";

function Success() {

    const [customer, setCustomer] = useState();

    let parameters = window.location.toString().split("/");
    parameters = parameters[parameters.length - 1].split("=");
    parameters = parameters[parameters.length - 1];
    console.log(parameters);

    useEffect(() => {
        const url = `/api/users/success?session_id=${parameters}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    // headers: {
                    //     "content-type": "application/json"
                    // },
                    // body: {
                    //     session_id: parameters
                    // }
                });
                const json = await response.json();
                console.log(json);
                const data = await json;
                console.log(data);
                console.log(data);
                setCustomer(data);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    });

    return(
        <div>
            {customer ? <p>{customer.name}</p> : <p>No customer</p> }
        </div>
    )
};

export default Success;