import profilePic from '../assets/default-profile.png';
function Card (){

    return(
        <div className="card">
        <img className="card-img" src= {profilePic} alt="Profile Pic" width={200} />
        <h2 className="card-title">Jay</h2>
        <p className="card-text">FullStacked Developer</p>
        </div>
    );

}
export default Card