import './ProfileCard.css';
// props.profile.display_name
// props.profile.product
// props.profile.images?.[0]?.url

function ProfileCard(props) {
  return (
    <>
      <img src='https://i.scdn.co/image/ab6775700000ee851250c2c9f7672384da18f4ca' alt="Profile" id='profilePic' />
      <h1 id='username'>Username</h1>
      <p className='followers'>11 Followers</p>
      <p id='product' className='premium'>Premium</p>
    </>
  )
}

export default ProfileCard;