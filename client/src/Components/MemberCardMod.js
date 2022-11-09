
const MemberCardMod = (props) => {
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
                {
                    (props.role === "Member") ? (
                        <>
                            <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" class="flex ml-3 justify-center items-center text-sm font-medium text-center text-gray-900  rounded-3xl hover:bg-gray-100 focus:outline-none dark:text-white  dark:hover:bg-gray-700 focus:outline-none" type="button">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                            </button>


                            <div id="dropdownDots" class="hidden z-60 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                    <li>
                                        <button class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kick</button>
                                    </li>
                                    <li>
                                        <button class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Make mod</button>
                                    </li>

                                </ul>
                                <div class="py-1">
                                    <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                                </div>
                            </div>
                        </>
                    ):null
                }

            </div>
        </>
    )
}

export default MemberCardMod