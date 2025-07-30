import { useUsersStore } from "../stores/useUsersStore";
const UsersList = () => {
  const users = useUsersStore((state) => state.users);

  return (
    <div className="space-y-2 p-2">
      <ul className="space-y-1">
        {users.size > 0 ? (
          Array.from(users.entries()).map(([publicKey, user]) => (
            <li
              key={publicKey}
              className="flex gap-1 text-sm items-centertext-gray-800 p-2 bg-gray-50 rounded hover:bg-gray-100"
            >
              <span
                style={{ backgroundColor: user.color || "#ccc" }}
                className={`rounded-full  size-4`}
              ></span>
              <div className="font-mono text-xs truncate">
                {user.username || publicKey}
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500 italic">
            No peers has connected yet
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
