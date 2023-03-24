function WithdrawAmount({state,account}){


   async function withdraw(event){
      event.preventDefault();
    
        const {contract}=state;
        const a= document.querySelector("#amount").value;
        try{
        await contract.methods.withdraw().send({from:account,value:a,gas:"1000000"});
        alert("invested successfuly");
        window.location.reload();
    
        }catch(error){
          alert(error);
        }
        
   }
   
    return<><form onSubmit={withdraw}>
    <label className="label1" htmlFor="amount">
     Amount to withdraw:
        </label>
     <input type="text" id="amount"></input>
    <button type="submit">Withdraw</button>
    </form><br></br></>
    
   }
   export default WithdrawAmount;