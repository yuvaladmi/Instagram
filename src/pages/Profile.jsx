import "../assets/style/pages/Profile.css";

export function Profile() {
	return (
		<div className="profile_container">
			<header className="profile_contant">
				<section className="profile_img">
					<div className="picture"></div>
				</section>
				<div className="profile_details">
					<div className="top">
						<span className="user_name">Bobo.ber</span>
						<div className="edit_profile">Edit Profile</div>
					</div>
					<div className="middle">
						<div className="profile_posts">Posts</div>
						<div className="profile_followers">foollowers</div>
						<div className="profile_following">following</div>
					</div>
					<div className="bottom">
						<span className="user_name">Bobo Berkovitch</span>
					</div>
				</div>
			</header>
		</div>
	);
}
