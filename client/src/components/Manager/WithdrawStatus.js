function WithdrawSatus({state,account}){

  async function allow(event){
    event.preventDefault();
  
      const {contract}=state;
      const a= document.querySelector("#hi").value;
      try{
      await contract.methods.allow().send({from:account,value:a,gas:"1000000"});
      alert("invested successfuly");
      window.location.reload();
  
      }catch(error){
        alert(error);
      }
      
    }


    return<><form onSubmit={allow}>
    <label className="label1" htmlFor="address">
      Address:
        </label>
    <input type="text" className="address" id="hi"></input>
    <button type="submit">Allow</button>
    </form><br></br>
    
    <form >
    <label className="label1" htmlFor="address">
     Address:
        </label>
    <input type="text" className="address" id="bye"></input>
    <button type="submit">Disallow</button>
    </form><br></br></>
   }
   export default WithdrawSatus;