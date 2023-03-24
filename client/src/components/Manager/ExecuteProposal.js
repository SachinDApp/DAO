function ExecuteProposal({state,account}){

  async function exe(event){
    event.preventDefault();
  
      const {contract}=state;
      const a= document.querySelector("#id").value;
      try{
      await contract.methods.executeProposal().send({from:account,value:a,gas:"1000000"});
      alert("invested successfuly");
      window.location.reload();
  
      }catch(error){
        alert(error);
      }
      
    }
    return<><form onSubmit={exe}>
    <label className="label1" htmlFor="amount">
      Proposal Id:
        </label>
    <input type="text" id="id"></input>
    <button type="submit">Execute</button>
    </form><br></br></>
    
   }
   export default ExecuteProposal;