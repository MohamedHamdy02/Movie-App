
import React from 'react'
import { Helmet } from 'react-helmet'

export default function Profile({ userData }) {
  return <>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Profile Page</title>
    </Helmet>
    <div className="col-md-12">
      <div className='mt-5 '>
        <p className='fs-4 font-size'> <span className="text-info">
          User Name</span> : {userData.first_name} {userData.last_name}</p>
        <p className='fs-4 font-size'> <span className="text-info">
          Email</span> : {userData.email}</p>
        <p className='fs-4 font-size'> <span className="text-info">
          Age</span> : {userData.age}</p>
      </div>
    </div>
  </>
}
