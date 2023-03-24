import { useEffect,useState } from "react";
function ProposalList({state}){
   const {array, setArray}=useState([]);

   useEffect(()=>{
      const {contract}=state;
      async function array(){
      const arr= await contract.methods.proposalList().call();
      setArray(arr);
      }
      contract && array();
   },[state])
   

   return<>
      <table>
         <tr>
            <th>proposal id</th>
            <th>amount</th>
            <th>discription</th>
         </tr>
         <tr>
            {array.map((value)=>{
               return<>
               <td>value.id</td>
               <td>value.amount</td>
               <td>value.description</td>
               
               </>
            })}
         </tr>
      </table>
   </>
  }
  export default ProposalList;