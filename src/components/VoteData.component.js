// VoteData.component.js
import users from "../Data/Data";

const VoteData = () => {
    // 사용자 데이터를 기반으로 votes 배열 생성
    const votes = users.map((user) => {
        return {
            StudentId: user.name,
            Voted: Math.random() < 0.5  // 랜덤으로 투표 여부 생성
        };
    });

    return votes;
};

export default VoteData;