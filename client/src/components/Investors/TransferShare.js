function TransferShare({state,account}){

    async function trans(event){
        event.preventDefault();
      
          const {contract}=state;
          const a= document.querySelector("#to").value;
          const b=document.querySelector("#amount").value
          try{
          await contract.methods.shareTransfer().send({from:account,value:{a,b},gas:"1000000"});
          alert("invested successfuly");
          window.location.reload();
      
          }catch(error){
            alert(error);
          }
          
     }
   
    return<><form onSubmit={trans}>
    <label className="label1" htmlFor="to">
         Amount: 
        </label>
    <input type="text" id="to"></input>
    <label className="label1" htmlFor="amount">
       Address:
        </label>
    <input type="text" id="amount"></input>
    
    <button type="submit">Transfer Share</button>
    </form><br></br></>
   }
   export default TransferShare;