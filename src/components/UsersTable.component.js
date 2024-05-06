import { useMemo } from "react";

const getEvenClass = (number) => number % 2 === 0 ? "row-even" : '';

const UsersTable = ({ users, candidatesList }) => {
    const usersVotes = useMemo(() => {
        return candidatesList.reduce((acc, { voters }) => {
            voters.forEach(userId => {
                acc[userId] = true;
            });
            return acc;
        }, {});
    }, [candidatesList]);

    const isVoted = (user) => {
        return !!usersVotes[user.id];
    };

    return (
        <div className="table-container">
            {users.map((user, index) => {
                const voted = isVoted(user);
                const voteClass = voted ? "voted-row" : "";
                return (
                    <div key={user.id} className={`user-row ${voteClass} ${getEvenClass(index)}`}>
                        <p>{user.name}</p>
                        <p>{user.StudentID}</p> {/* 학번을 표시 */}
                        <p>{voted ? "Voted" : "Not Voted"}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default UsersTable;