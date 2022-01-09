const fetchUpdate = async (id, finalData) => {
  const res = await fetch(`http://localhost:5000/api/table/${id}`, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      data: finalData,
    }),
  });
  const result = await res.json();
  if (result.success) {
    return result.result;
  } else {
    return result.msg;
  }
};

export default fetchUpdate;
