import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const ExamDone = ({ auth, title, answer, }) => {
  return (
    <Authenticated user={auth.user}>

      ExamDone
    </Authenticated>
  )
}

export default ExamDone