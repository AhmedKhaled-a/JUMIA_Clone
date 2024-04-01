import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faAppleWhole,faWandMagicSparkles,faBabyCarriage,faMobile, faHouse, faBlender, faTv, faDumbbell, faGamepad, faEllipsis, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function CategoryList() {
  return (
    <>
        <ul className='home-category-list rounded-1'>
            <a href=""><li><FontAwesomeIcon icon={faAppleWhole} className='me-2'/>Supermarket</li></a>
            <a href=""><li><FontAwesomeIcon icon={faShirt} className='me-2'/>Fasion</li></a>
            <a href=""><li><FontAwesomeIcon icon={faWandMagicSparkles} className='me-2'/>Health & Beauty</li></a>
            <a href=""><li><FontAwesomeIcon icon={faBabyCarriage} className='me-2'/>Baby Products</li></a>
            <Link to={"store"}> <li><FontAwesomeIcon icon={faMobile} className='me-2'/>Phones & Tablets</li></Link>
            <a href=""><li><FontAwesomeIcon icon={faBlender} className='me-2'/>Home & Furniture</li></a>
            <a href=""><li><FontAwesomeIcon icon={faTv} className='me-2'/>Appliances</li></a>
            <a href=""><li><FontAwesomeIcon icon={faDumbbell} className='me-2'/>Televisions & Audio</li></a>
            <a href=""><li><FontAwesomeIcon icon={faDesktop} className='me-2'/>Computing</li></a>
            <a href=""><li><FontAwesomeIcon icon={faGamepad} className='me-2'/>Gaming</li></a>
            <a href=""><li><FontAwesomeIcon icon={faEllipsis} className='me-2'/>Other Categories</li></a>
        </ul>
    </>
  )
}
