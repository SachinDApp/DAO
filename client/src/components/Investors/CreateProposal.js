function CreateProposal({state,account}){

    async function root(event){
        event.preventDefault();
      
          const {contract}=state;
          const a= document.querySelector("#name").value;
          const b=document.querySelector("#amount1").value;
          const c=document.querySelector("#recipient").value;
          try{
          await contract.methods.createProposal().send({from:account,value:{a,b,c},gas:"1000000"});
          alert("invested successfuly");
          window.location.reload();
      
          }catch(error){
            alert(error);
          }
          
        }
   
    return<><form onSubmit={root}>
    <label className="label1" htmlFor="name">
        Description: 
    </label>
    <input type="text" id="name"></input>
    <label className="label1" htmlFor="amount1">
         Amount Neeed(in Wei): 
        </label>
    <input type="text" id="amount1"></input>
    <label className="label1" htmlFor="recipient">
       Recipient Address
        </label>
    <input type="text" id="recipient"></input>
    <button type="submit">Create Proposal</button>
    </form><br></br></>
    
   }
   export default CreateProposal;