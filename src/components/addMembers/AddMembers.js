import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const AddMembers = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(false);

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const fetchUpdate = async () => {
      const res = await fetch(
        `http://localhost:5000/api/table/invitation/sendInvite/${id}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            email,
            code: id,
          }),
        }
      );
      const result = await res.json();
      setResult(true);
      if (result.success) {
        alert(`Successfully sent invite to ${email}`);
        setResult(false);
        setSubmitted(false);
      } else {
        alert("Some error occured");
        setResult(false);
        setSubmitted(false);
      }
    };
    fetchUpdate();
  };

  if (submitted && !result) {
    return <div className="loader"></div>;
  }
  return (
    <div id="authentication-modal-outer">
      <div id="authentication-modal-inner">
        <h2 className="create-table-heading">Add a new member</h2>
        <div className="authentication-component-table">
          <form>
            <div className="authenticate-form-control">
              <div className="authenticate-form-control-input-label">
                Email of member
              </div>
              <input
                required
                type="email"
                className="authenticate-form-control-input"
                placeholder="Please enter the name of your table"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="authenticate-submit-button-container">
              <button
                type="submit"
                id="authenticate-submit-button"
                onClick={(e) => handleSubmit(e)}
              >
                Send Invite{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
