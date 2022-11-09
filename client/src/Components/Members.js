import MemberCardAdmin from "./MemberCardAdmin"
import MemberCardMod from "./MemberCardMod"
import React from "react"


const Members = (props) => {
    
    const members = [{id:1, name: "Aditya", role: "Admin" }, {id:2, name: "Saral", role: "Member" }, {id:3, name: "Saral", role: "Member" }, {id:4, name: "Saral", role: "Member" }, {id:5, name: "Saral", role: "Member" }, {id:6, name:"Ved",role:"Mod"},{id:7, name:"Aqib",role:"controller"}]

    return (
        <>
            
            <div
                className="justify-center items-center flex fixed z-50 w-screen max-h-[40%] outline-none focus:outline-none"
            >
                <div className="relative w-[70%] h-[500px] my-6 mx-auto max-w-sm overflow-y-scroll scrollbar-default">
                    {/*content*/}
                    <div className="border-0 dark:bg-[#0e0e0e] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="sticky z-50 flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl text-black dark:text-white font-semibold">
                                Members
                            </h3>
                            <button className="ml-auto text-black dark:text-white" onClick={()=>props.setShowMembers(false)}>X</button>
                        </div>
                        {/*body*/}
                        <div id = "members" className="relative p-4 flex-auto ">
                                {
                                    members.map((val) => {
                                        return(
                                            <div className="flex w-full dark:bg-[#111b21] p-2 my-1 rounded-lg dark:text-white text-left ">
                                                 <MemberCardAdmin id = {val.id} name={val.name} role={val.role} />
                                             </div>      
                                        )
                                    })
                                }
                                             

                        </div>                      
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
         
    )
}
export default Members