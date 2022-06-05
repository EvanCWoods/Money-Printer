async function getUserData(email) {
  const bodyObj = {
    email: email,
  };
  const response = await fetch("/api/users/getUser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  });
  const json = await response.json();
  const data = await json;
  console.log(data);
  if (!localStorage.getItem("userDetails")) {
    localStorage.setItem("userDetails", JSON.stringify({
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      subscription: data.user.customer.subscription,
      stripeId: data.user.customer.id,
      apiKey: data.user.apiKey,
    }));
  }
}

export default getUserData;
