import React from "react";

function ProfileTarget(props) {
  function cancelHandler() {
    props.onCancel();
  }
  function confirmHandler() {
    props.onConfirm();
  }
  return (
    <div className='modal'>
      <p>Set Your Weight Target</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button className='btn btn--alt' onClick={cancelHandler}>
        Cancel
      </button>
      <button className='btn' onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
}

export default ProfileTarget;
