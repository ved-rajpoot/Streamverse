
const MemberCardRegular = (props) => {
    return (
        <>

            <div className="p-1 flex w-full">
                <p>{props.name}</p>
                <div className="flex ml-auto">
                    {
                        (props.role === "Admin") ? (
                            <>
                                 <p className="text-xs bg-[#e7fce3] dark:bg-[#2a3942] dark:text-[#3b6284] text-[#569248] p-1 rounded-md">Admin</p>
                            </>
                        ) :
                            (props.role === "Mod") ? (
                                <>
                                    <p className="text-xs bg-[#e7fce3] dark:bg-[#2a3942] dark:text-[#3b6284] text-[#569248] p-1 rounded-md">mod</p>
                                </>
                            ) :
                                (props.role === "controller") ? (
                                    <>
                                        <p className="text-xs bg-[#e7fce3] dark:bg-[#2a3942] dark:text-[#3b6284] p-1 text-[#569248] rounded-md">controller</p>
                                    </>
                                ) : null

                    }
                </div>
            </div>
        </>
    )
}

export default MemberCardRegular