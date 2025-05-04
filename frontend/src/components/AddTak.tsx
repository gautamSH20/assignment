import { Button } from "./Button"

export const AddTask=()=>{
    return <div className="flex justify-center items-center ">
    <div className="fixed bg-black min-h-screen opacity-40 min-w-full z-10"></div>
        <div className="z-40 bg-white  rounded-md p-4  flex flex-col gap-4">
            <section>New task to add</section>
            <div>
                <div>
                <section>Task Name</section>
                <input type="text" className="border-2 border-black rounded-md p-1" placeholder="Add task"/>
                </div>

                <div>
                    <section>Description</section>
                    <textarea className="border-2 border-black rounded-md p-1" placeholder="Add description"></textarea>
                </div>
                <div className="flex justify-between gap-4 mb-4">
                    <div>
                    <section>Date</section>
                    <input type="date" className="border-2 border-black rounded-md p-1"/>
                    </div>
                    <div>
                        <section>Recurance</section>
                        <input readOnly className="border-2 border-black rounded-md p-1" onClick={()=>{
                            console.log("Recurrence clicked") 
                        }} value={"Recurrance"}/>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-4">
                <Button title={"Add Task"} variant="primary" size="md" onclick={()=>{}}/>
                <Button title="Cancel" variant="secondary" size="md" onclick={()=>{}}/>
                </div>
            </div>
        </div>
    </div>
}