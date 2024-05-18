// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Voting {
    //후보자에 대한 추가정보 넣을 가능성이 있어서 구조체 사용
    struct candidator{ //후보자
        string name ;
        uint upVote;
    }
    struct Voter { //투표 참여자
        uint weight; // 투표 권한
        bool voted; // 이미 투표했는지 여부
        bytes32 studentId; // 학번
        bytes32 name; // 이름
    }
    candidator[] public candidateList; // 후보자 리스트
    //mapping (string => uint8) public votesReceived; //구조체 대신 mapping써도 됨, 나중에 사용할 수도 있어서 주석처리
    bool live; // 기간이 지난 투표는 false
    address public owner; // 관리자 주소
    mapping (address => bool) public Voted; //투표 여부
    mapping(address => Voter) public Voters; //투표 참여자


    // 관리자만 실행할 수 있는 modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // event
    event AddCandi(string name);
    event UpVote (string candiator , uint upVote);
    event FinshVote(bool live);
    event VotingStarted(address indexed _owner);
    event VoterRegistered(address indexed voter, bytes32 studentId, bytes32 name);

    constructor(){
        // 컨트랙트 배포자를 관리자로 설정
        owner = msg.sender;
        // 투표 기간 유효
        live = true;
        // 이벤트 발생
        emit VotingStarted(owner);
    }

    //후보군에 없는 사람일 경우 실행 종료(이름 입력), 인덱스 입력 필요한지?
    function voteForCandidate(string memory candidate) public {
        require(validCandidate(candidate), "The candidate does not exist.");
        require(live, "The vote has ended.");
         require(!Voted[msg.sender], "You have already voted."); // 이미 투표했는지 확인
        uint index = findCandidateIndex(candidate); // 후보자 인덱스 찾기

        candidateList[index].upVote += 1; // 후보자의 upVote 증가
        Voted[msg.sender] == true;
        emit UpVote(candidate, candidateList[index].upVote); // 이벤트 발생
    }

    //특정 후보자의 전체 득표수
    function totalVotesFor(string memory candidate) public  onlyOwner view  returns(uint) {
        require(validCandidate(candidate), "The candidate does not exist.");
        require(live, "The vote has ended.");
        uint index = findCandidateIndex(candidate);
        return candidateList[index].upVote;
    }

    //입력한 후보자가 등록되어있는지 검증
    function validCandidate(string memory candidate) private view  returns (bool) {
        for(uint i=0; i < candidateList.length; i++) {
            //컨트랙트에서 string을 비교할 수 없기 때문에, string을 해시하여 비교
            if (keccak256(abi.encodePacked(candidateList[i].name)) ==
                keccak256(abi.encodePacked(candidate))) {
                return true;
            }
        }
    return false;
    }

    //후보자의 index 확인
    function findCandidateIndex(string memory candidate) private view returns (uint) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (keccak256(abi.encodePacked(candidateList[i].name)) == keccak256(abi.encodePacked(candidate))) {
                return i;
            }
        }
    return type(uint).max; // 후보자를 찾지 못한 경우
    }

    // 후보자 추가
    function addCandi(string memory _name) public onlyOwner {
        require(live, "The vote has ended.");
        require(candidateList.length < 5, "The number of candidates exceeded the maximum.");
        candidateList.push(candidator(_name, 0)); // 후보자 이름과, 투표수 (후보자등록할대는 0표)를 리스트에 푸쉬

        // emit event 이벤트를 발생시킬땐 emit
        emit AddCandi(_name); // 후보가 추가됨을 이벤트에 알림
    }
    // 투표 참여자 정보를 등록하는 함수
    function registerVoter(bytes32 _studentId, bytes32 _name) public {
        require(!Voters[msg.sender].voted, "You have already voted.");
        Voters[msg.sender].studentId = _studentId;
        Voters[msg.sender].name = _name;
        Voters[msg.sender].voted = false; // 초기값으로 false 설정

        // 이벤트 발생
        emit VoterRegistered(msg.sender, _studentId, _name);
    }

    /*
    // 인덱스로 투표하는 함수, 필요하면 사용하면 됨
    function upVote(uint memory _indexOfCandi) public { // 몇번째 후보에게 투표할건지
        require(live, "The vote has ended.");
        require(_indexOfCandi < candinatorList.length); // 후보번호는 전체 후보수보다 작아야한다. 
        require(Voted[msg.sender] == false);
        candinatorList[_indexOfCandi].upVote++; 

        // 투표는 한명만 할 수 있게 
        Voted[msg.sender] == true; // 투표한 사람의 주소 값을 true로 변경 
        emit UpVote(candinatorList[_indexOfCandi].name, candinatorList[_indexOfCandi].upVote);
    }*/
}