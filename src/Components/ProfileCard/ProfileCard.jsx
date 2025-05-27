import './ProfileCard.css';
// props.profile.images?.[0]?.url
// props.profile.display_name
// props.profile.followers['total']
// props.profile.product

function ProfileCard(props) {
  return (
    <>
      <img src={props.profile.images?.[0]?.url} alt="Profile" id='profilePic' />
      <h1 id='username'>{props.profile.display_name}</h1>
      <p className='followers'>{props.profile.followers['total']} - Followers</p>
      <p id='product' className='premium'>{props.profile.product}</p>
    </>
  )
}

export default ProfileCard;