import { PrimaryButton } from "../Buttons/PrimaryButton"
import Profile from "./Profile"


const index = () => {
  return (
    <aside className="p-2 flex bg-slate-500 w-64 items-center  flex-col">
        
            <div className="pt-3">
                <Profile />

            </div>
            <div className="flex flex-col  w-full  gap-3 pt-10">
                <PrimaryButton text="Inventory" loading={status==='loading'} onClick={()=>{}}/>
                <PrimaryButton text="Materials" loading={status==='loading'} onClick={()=>{}}/>
                <PrimaryButton text="Users" loading={status==='loading'} onClick={()=>{}}/>
            </div>
        
    </aside>
  )
}

export default index