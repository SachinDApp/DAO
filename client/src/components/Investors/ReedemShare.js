function ReedemShare({state,account}){

    async function reed(event){
        event.preventDefault();
      
          const {contract}=state;
          const a= document.querySelector("#amount").value;
          try{
          await contract.methods.Redeem().send({from:account,value:a,gas:"1000000"});
          alert("invested successfuly");
          window.location.reload();
      
          }catch(error){
            alert(error);
          }
          
        }
    

    return<><form onSubmit={reed}>
         <label className="label1" htmlFor="amount">
      Number of Shares:
        </label>
    <input type="text" id="amount"></input>

    <button type="submit">Reedem Share</button>
    </form><br></br></>
}
export default ReedemShare;