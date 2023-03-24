// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.5.0 <0.9.0;

contract organisation{

    struct Proposal{
        uint id;
        string description;
        uint amount;
        address payable recipient;
        uint votes;
        uint end;
        bool isExecuted;
    }
    
    uint public voteTime;
    uint public totalFund;
    uint public avaliableFund;
    mapping (address=> bool) public isInvestor;
    mapping (address=> uint ) public noOfShares;
    uint public participationTimeEnd;
    uint public quorum;
    uint nextpr_id=1;
    address public manager;
    mapping(uint=> Proposal) public infoProposals;
    mapping (address=> mapping (uint => bool)) public investorVoting;
    mapping (address=>bool) public withdrawStatus;

    constructor(uint _quorum, uint _participationTimeEnd, uint _voteTime){
        manager=msg.sender;
        quorum=_quorum;
        participationTimeEnd=block.timestamp+_participationTimeEnd;
        voteTime=_voteTime;
    }

    modifier onlyInvestor(){
        require(isInvestor[msg.sender]==true,"you are not an investor");
        _;
    }

    modifier onlyManager(){
        require(msg.sender==manager,"you are not a manager");
        _;
    }

    function invest() public payable {
        require(participationTimeEnd>block.timestamp,"time is over to be an investor");
        
        require(msg.value!=0, "give us amoont");
        noOfShares[msg.sender]+=msg.value;
        isInvestor[msg.sender]=true;
        totalFund+=msg.value;
        avaliableFund+=msg.value;

    }

    function createProposal(string calldata _description, uint _amount, address payable _reciepent) external onlyInvestor(){

        infoProposals[nextpr_id]=Proposal(nextpr_id,_description,_amount,_reciepent,0,block.timestamp+voteTime,false);
        
        nextpr_id++;
    }

    function redeem(uint amount) public onlyInvestor(){
        require(noOfShares[msg.sender]>=amount,"you don't have enough shares");
        require(avaliableFund>amount,"sorry we don't have enough money");
        avaliableFund-=amount;
        noOfShares[msg.sender]-=amount;
        totalFund-=amount;
        if(noOfShares[msg.sender]==0){
           isInvestor[msg.sender]=false;
       }
        send(payable(msg.sender), amount);
       

    }

   function shareTransfer(uint value,address _to) public onlyInvestor(){
       require(noOfShares[msg.sender]>=value,"you don't have enough shares");
       isInvestor[_to]=true;
       noOfShares[_to]+=value;
       noOfShares[msg.sender]-=value;
       if(noOfShares[msg.sender]==0){
           isInvestor[msg.sender]=false;
       }
    }


    function vote(uint id) public onlyInvestor(){
          require(infoProposals[id].isExecuted==false,"proposal already has been executed");
        require(infoProposals[id].end>block.timestamp,"time is over to vote this proposal");
        require(investorVoting[msg.sender][id]==false, "you have already voted");
      
        infoProposals[id].votes+=noOfShares[msg.sender];
        investorVoting[msg.sender][id]=true;


    }


    function executeProposal(uint id) public onlyManager(){
        Proposal storage p= infoProposals[id];
        require(p.votes*100/totalFund>quorum,"votes is not enough to execute this proposal");
        require(block.timestamp>p.end, "time is left for voting");
        require(avaliableFund>=p.amount, "not enough fund we have ");
        require(p.isExecuted==false,"already executed");
        avaliableFund-=p.amount;
        p.isExecuted=true;

        send(p.recipient,p.amount);

    }

    function send(address payable a, uint amount) internal{

        payable(a).transfer(amount);

    }
    function allow(address to) public onlyManager(){
        require(isInvestor[to]==true,"he is not investor");
        require(noOfShares[to]<=avaliableFund,"his share is more than availabe fund");
        withdrawStatus[to]=true;
    }

    function withdraw() public onlyInvestor(){
        require(withdrawStatus[msg.sender]==true,"you can not leave");
        require(noOfShares[msg.sender]<avaliableFund,"we don't have enough fund");
        isInvestor[msg.sender]=false;
        uint amount=noOfShares[msg.sender];
        noOfShares[msg.sender]=0;
        send(payable(msg.sender),amount);
    }

    function proposalList()public view returns(Proposal [] memory ){
        Proposal [] memory array;
        uint i;
        for(i=0; i<nextpr_id-1; i++){
            array[i]=infoProposals[i+1];
        }
        return array;
    }
   
}