
function User(props){

    return(
        <div className="user">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>User: {props.isUser ? "Yes" : "No"}</p>
        </div>

    );
}



export default User