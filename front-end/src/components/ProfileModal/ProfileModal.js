import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const ProfileModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //use selectors
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userTarget = useSelector((state) => state.info.targetWeight);

  const goToEdit = () => {
    history.push("/edit");
    setOpen((prev) => !prev);
    console.log('dsffsdf')
  };
  return (
    <>
      <h2>Profile</h2>

      <img
        src={`https://res.cloudinary.com/demo/image/facebook/w_100,h_100,c_fill,d_avatar2.png/non_existing_id.jpg`}
      />
      <button>change pic</button>

      <h4>Name</h4>
      <span>{userName}</span>

      <h4>Email</h4>
      <span>{userEmail}</span>

      <h4>Target Weight</h4>
      <span>{userTarget}</span>

      {/* <button>Change Name</button> */}
      <button onClick={goToEdit}>Change My Details</button>
    </>
  );
};

export default ProfileModal;
