import { SideBarComponent } from "./SideBarComponets"

export const SideBar=()=>{
    return <div className="min-h-screen w-50 px-2 py-4 bg-white">
        <div className="text-2xl font-bold ">
            Views
        </div>
        <div className="flex flex-col mt-4 border-b-1 p-1 ">
            <SideBarComponent text="All Tasks"/>
            <SideBarComponent text="Today"/>
            <SideBarComponent text="upcoming"/>
            <SideBarComponent text="compeleted"/>
        </div>
    </div>
}