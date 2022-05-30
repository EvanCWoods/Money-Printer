import React, { useState } from "react";

function Success() {
  const [customer, setCustomer] = useState();

  let parameters = window.location.toString().split("/");
  parameters = parameters[parameters.length - 1].split("=");
  parameters = parameters[parameters.length - 1];
  console.log(parameters);

  // useEffect(() => {
  const url = `/success?session_id=${parameters}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setCustomer(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  fetchData();

  return <div>{customer ? <p>{customer.name}</p> : <p>No customer</p>}</div>;
}

export default Success;
