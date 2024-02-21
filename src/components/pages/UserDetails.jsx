import { useContext } from "react"
import { AppContext } from "../layout/Layout"

export default function UserDetailsPage() {
    const appContext = useContext(AppContext)
    return (
    <div className="user-details-page">
        <div class="card bg-light-subtle mt-3" style={{width: '18rem'}}>
            <div class="card-header text-center">
                User Details
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>name: </b> {appContext.appState?.user?.name}</li>
                <li class="list-group-item"><b>email: </b> {appContext.appState?.user?.email} </li>
            </ul>
        </div>
    </div>
    )
}
