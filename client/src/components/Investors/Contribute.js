function Contribute({state,account}){

 async function helo(event){
  event.preventDefault();

    const {contract}=state;
    const a= document.querySelector("#weiValue").value;
    try{
    await contract.methods.invest().send({from:account,value:a,gas:"1000000"});
    alert("invested successfuly");
    window.location.reload();

    }catch(error){
      alert(error);
    }
    
  }
  
 return<>

 <form onSubmit={helo}>
   <label className="label1" htmlFor="weiValue">
         Contribution Amount: 
        </label>
    <input type="text" id="weiValue"></input>
    <button type="submit">Contribute</button>
    </form>
    <br></br></>
}
export default Contribute;