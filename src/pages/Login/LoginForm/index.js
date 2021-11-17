import React from "react"
import UserLogin from "./UserLogin"

const UserLoginForm = () =>{

    return(
        <div>
            <div className="row">
                <div className="col-md-12">
                    <UserLogin onSubmit={values => alert('Enter values: ' + JSON.stringify(values, null, 2))} />
                </div>
            </div>
        </div>
    )
}

export default UserLoginForm