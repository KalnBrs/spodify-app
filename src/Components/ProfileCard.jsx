import './ProfileCard.css';

function ProfileCard(props) {
  return (
    <>
        <h1>Hello</h1>
        <h1 id='username'>{props.profile.display_name}</h1>
        <p id='email'>{props.profile.email}</p>
        <img src={props.profile.images?.[0]?.url} alt="Profile" id='profilePic' />
        <p id='product'>{props.profile.product}</p>
    </>
  )
}

export default ProfileCard;