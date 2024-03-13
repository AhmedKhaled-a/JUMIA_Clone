import { faChevronUp,} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

export default function BackToTopButton() {
    const [BackToTopButton,setBackToTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 200){
                setBackToTopButton(true)
            }else{
                setBackToTopButton(false)
            }
        })
    },[])

    const scrollUp = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }

    return (
        <>
        {BackToTopButton && (
            <button className='backToTOPButton' onClick={scrollUp}>
                <FontAwesomeIcon icon={faChevronUp} className='fs-5'/>
            </button>
        ) }
        </>
    )
}
