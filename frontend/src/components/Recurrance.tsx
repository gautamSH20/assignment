import { Button } from "./Button"

export const Recurrance = () => {
    return <div className="flex justify-center items-center ">
        <div className="bg-white rounded-md p-4 ">

            <div className="text-lg font-bold mb-2">
                Set Recurrence
            </div>
        <div className=" flex justify-between gap-10">
            <div>
            <section className="border-b-1 mb-5">Reapeat</section>
            <select className="border-2 border-black rounded-md p-1 px-10">
                <option value="none" selected>None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            </div>
            <div>
                <section className="border-b-1  blaack">Preview</section>
                <div className="w-50">No occurense set</div>
            </div>
        </div>
        
             <div className="flex flex-row-reverse gap-4">
                <Button title={"Add Task"} variant="primary" size="md" onclick={()=>{}}/>
                 <Button title="Cancel" variant="secondary" size="md" onclick={()=>{}}/>
             </div>
        
    </div>
        </div>
}