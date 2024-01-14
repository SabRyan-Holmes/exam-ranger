import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import PrimaryButton from '@/Components/PrimaryButton';
import { IoTrashSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaUserEdit } from "react-icons/fa";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import profile from '@/../assets/profile.png';
import subjectImage from '@/../assets/subject_image.jpg';
import Swal from 'sweetalert2'
import { FiEye } from "react-icons/fi";
import moment from "moment/min/moment-with-locales";




export default function AnsweredSubject({ auth, title, flash, answeredSubject }) {
    moment.locale('id')
    const student = answeredSubject[0].student
    return (

        <div className='h-full'>
            <Head title={title} />
            <div className="drawer lg:drawer-open h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 h-full'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold py-3'>Jawaban <span className='text-primary'>
                                {student.name}</span> - <span className='text-primary/80'> {student.nim}</span> </h1>

                        </div>
                        {/* content */}

                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Nama Materi Ujian</th>
                                        <th>Banyak Soal</th>
                                        <th>Banyak Terjawab</th>
                                        <th>Selesai Dikerjakan</th>
                                        <th>Point Sekarang(tanpa essay)</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {answeredSubject.map((data, i) => {
                                        console.log('length')
                                        console.log(data.answer.length)
                                        let length = Object.keys(data.answer).length
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={subjectImage} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{data.exam_subject}</div>
                                                            <div className="text-sm opacity-50">Kedokteran</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {"sds"}
                                                    <br />
                                                </td>
                                                <td>
                                                    <>{length}</>
                                                </td>

                                                <td>

                                                    {moment(data.updated_at).fromNow()}
                                                </td>
                                                <td>

                                                    _
                                                </td>
                                                <td className="flex justify-start">
                                                    {/* Button View */}
                                                    <Link  >
                                                        <PrimaryButton>
                                                            <strong className='text-white'>Lihat</strong>
                                                            <FiEye className='scale[2.4] stroke-secondary-500'
                                                            >
                                                            </FiEye>
                                                        </PrimaryButton>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    )}




                                </tbody>
                                {/* foot */}
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email/NIM</th>
                                        <th>Status Pengerjaan Tes</th>
                                        <th>Aksi</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                        {/* end of content               */}
                    </div>

                </div>
                <AdminDrawer></AdminDrawer>


            </div>
        </div>
    )
}