import React from "react"
import UserLogin from "./UserLogin"
import PostLoginUser  from "./PostLoginUser"

const UserLoginForm = () =>{

    return(
        <div>
            <div className="row">
                <div className="col-md-12">
                    <UserLogin onSubmit={PostLoginUser} />
                </div>
            </div>
        </div>
    )
}

export default UserLoginForm