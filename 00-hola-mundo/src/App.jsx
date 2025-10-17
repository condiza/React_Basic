import "./App.css";
import TwiterFollowCard from "./TwiterFollowCard";

export function App() {
  const users = [
    {
      userName: "jeffer",
      name: "Jefferson Condiza",
      isFollowing: false,
    },
    {
      userName: "midudev",
      name: "Miguel Angel Duran",
      isFollowing: true,
    },
    {
      userName: "Juan",
      name: "Jaunito Ferrer",
      isFollowing: false,
    },
  ];

  return (
    <section className="tw-container">
      {users.map((users) => {
        const { userName, name, isFollowing } = users;
        return (
          <TwiterFollowCard
            key={userName}
            userName={userName}
            name={name}
            inicialIsFollowing={isFollowing}
          />
        );
      })}
    </section>
  );
}
