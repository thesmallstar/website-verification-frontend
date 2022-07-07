import React, { useState, useEffect } from "react";

const Form = ({ handleSubmit, history }) => {

  const [websiteUrl, setWebsite] = useState("");
  const [gstNumber, setGst] = useState("");

  const [status, setStatus] = useState("");
  const [cat, setCat] = useState("");
  const [scat, setsCat] = useState("");
  const [rcat, setRcat] = useState("");
  const [con, setCon] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false)

  
  const updateWebsite = e => {
    setWebsite(e.target.value);
  };

  const updateGst = e => {
    setGst(e.target.value);
  };
  
  const handleSubmitForm = function() {
      setData(false)
      setLoading(true)
      fetch('https://4700-115-110-224-178.in.ngrok.io/upload', {
        method: 'POST',
        body: JSON.stringify({url: websiteUrl})
      }).then(response=>response.json())
        .then(data=>{ 
          
          setCat(data['Category'])
          setsCat(data['Sub-Category'])
          setCon(data['confidence_score'])
          setStatus(data['activation_status'])
          setData(true)
         })
        .catch((err) => {
        })
        .finally(() => {
          setLoading(false);
        });
  }

  var submitted = false
  return (

    <div id="widgetContainer" class ="field">
    <div id="formContainer">
      <form action="" className="input-field">
      <div class="col-3 input-effect">
        	<input class="effect-5 " type="text"  onChange={updateWebsite}
        value={websiteUrl} placeholder="Website URL"/>
          <span class="focus-border"></span>
        </div>
        <div class="col-3 input-effect">
        	<input class="effect-5" type="text"  onChange={updateGst}
        value={gstNumber}  placeholder="GSTIN Number"/>
          <span class="focus-border"></span>
        </div>
      </form>
      <button className="waves-effect waves-light btn" onClick={handleSubmitForm}>
        SUBMIT
      </button>
    </div>
    <div className="border" />
    {loading && 
    <div className = "center">
     <img src="https://i.pinimg.com/originals/c0/c9/c2/c0c9c2a6b0a99053b87b14114c876000.gif" />
     </div>
    } 
    {data && (<>
    <div id="outputContainer">
      <h1>Automated MCC Check Result</h1>
      <table class="styled-table">
    <thead>
        <tr>
            <th> </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    
       <tr class="active-row">
            <td>Status</td>
            <td>{status}</td>
        </tr>
        <tr>
            <td>Business Category</td>
            <td>{cat}</td>
        </tr> 
        <tr>
            <td>Business Sub Category</td>
            <td>{scat}</td>
        </tr> 
        <tr>
            <td>Razorpay Category</td>
            <td>Others</td>
        </tr> 
        <tr>
            <td>Confidence</td>
            <td>{con}</td>
        </tr> 
     
    </tbody>
</table>
  
    </div>
    </>
      )
      }
  </div>
  );
};

export default Form;
