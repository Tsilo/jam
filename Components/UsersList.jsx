import usePeers from "../hooks/usePeers.jsx";

const UsersList = () => {
  const { peers } = usePeers();
  console.log("Peers list:", peers);
  return (
    <ul>
      {peers.length > 0 &&
        peers.map((peer, index) => (
          <li key={index}>{peer.remotePublicKey.toString("hex")}</li>
        ))}
    </ul>
  );
};

export default UsersList;
