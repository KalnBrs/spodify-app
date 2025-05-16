import './ProfileCard.css';
// 
// 
// 

function ProfileCard(props) {
  return (
    <>
      <img src={props.profile.images?.[0]?.url} alt="Profile" id='profilePic' />
      <h1 id='username'>{props.profile.display_name}</h1>
      <p className='followers'>{props.profile.followers}</p>
      <p id='product' className='premium'>{props.profile.product}</p>
    </>
  )
}

export default ProfileCard;