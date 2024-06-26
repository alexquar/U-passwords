import { useState } from "react"
import { useFirestore } from "../hooks/useFirestore"
import { useAuthContext } from "../hooks/useAuthContext"
export default function AddPasswordForm({password:pass}) {
    const {user} = useAuthContext()
    const [service, setService]= useState('')
    const [password,setPassword]=useState(pass)
    const {addDocument} = useFirestore('passwords')
   const handleSubmit=(e)=>{
        e.preventDefault()
        const doc = {
            service,
            password,
            user: user.uid
        }
        addDocument(doc)
        setService('')
        setPassword('')
    }
  return (
    <div className="row justify-content-center  my-5">
        <div className="col-12 col-md-10 col-lg-8">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>Add New Password</h1>
            <p>Just add the password and what it is for then hit save!</p>
        <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Login for ..."
        onChange={(e)=>setService(e.target.value)}
        value={service}
        required
        />
         <label htmlFor="floatingInput">What service?</label>
        </div>
        <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required
        />
        <label htmlFor="floatingPassword">Password?</label>
        </div>
        <div className="d-grid">
        <button className="btn btn-secondary btn-lg my-3">Save</button>
        </div>
        </form>
        </div>
    </div>
  )
}
