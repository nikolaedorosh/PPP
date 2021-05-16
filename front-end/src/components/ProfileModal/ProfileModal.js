import { useDispatch, useSelector } from "react-redux";

const ProfileModal = () => {
const dispatch = useDispatch()

//use selectors
const name = useSelector(state => state.auth.userName)
const email = useSelector(state=> state.auth.userEmail)
const target = useSelector(state=> state.profile.targetWeight)


  return (
    <>
      <h2>Profile</h2>

      <img src={} />
      <button />

      <p>Name</p>
      <span>{name}</span>

      <p>Email</p>
      <span>{email}</span>

      <p>Target Weight</p>
      <span>{target}</span>

      <button>Change Name</button>
      <button>Change My Details</button>
    </>
  );
};

export default ProfileModal;
