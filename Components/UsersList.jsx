import { useUsersStore } from "../stores/useUsersStore";
const UsersList = () => {
  const users = useUsersStore((state) => state.users);

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-semibold text-sm text-gray-600">
        Connected Peers ({users.size})
      </h3>
      <ul className="space-y-1">
        {users.size > 0 ? (
          Array.from(users.entries()).map(([publicKey, user]) => (
            <li
              key={publicKey}
              className="text-sm text-gray-800 p-2 bg-gray-50 rounded hover:bg-gray-100"
            >
              <div className="font-mono text-xs truncate">{publicKey}</div>
              <div className="text-xs text-gray-500">
                Connected at: {new Date(user.connectedAt).toLocaleTimeString()}
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500 italic">
            No peers connected yet
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
