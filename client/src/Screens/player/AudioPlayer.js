import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function AudioPlayer() {
    const [open, setOpen] = useState(true)

    return (
        <>
            <div className='bottom-0 w-full h-[100px] md:h-[150px] bg-white'>
                This is Audio Player
            </div>
        </>
    )
}
