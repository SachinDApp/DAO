function VoteProposal({state,account}){

  async function vop(event){
    event.preventDefault();
  
      const {contract}=state;
      const a= document.querySelector("#voteId").value;
      try{
      await contract.methods.vote().send({from:account,value:a,gas:"1000000"});
      alert("invested successfuly");
      window.location.reload();
  
      }catch(error){
        alert(error);
      }
      
    }
   
    return<><form onSubmit={vop}>
     <label className="label1" htmlFor="voteId">
      Proposal Id:
        </label>
    <input type="text" id="voteId"></input>
    <button type="submit">Vote</button>
    </form><br></br></>
   }
   export default VoteProposal;