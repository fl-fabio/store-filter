import { Link } from 'react-router-dom';
import './BreadCrumb.scss';

import React from 'react';

type BreadCrumbProps = {
    title: string,
    products?: boolean
}

const BreadCrumb = ({title, products = true}: BreadCrumbProps) => {
  return (
    <div className='bread-wrapper'>
        <Link to='/'>Home /</Link>
        {products && <Link to={`/${title}`}>{title} / </Link>}
    </div>
  )
}

export default BreadCrumb
