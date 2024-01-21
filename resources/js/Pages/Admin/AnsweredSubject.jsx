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




export default function AnsweredSubject({ auth, title, flash, participant, overviews }) {
    moment.locale('id')
    console.log("isi participant")
    console.log(participant)
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
                                {participant.name}</span> - <span className='text-primary/80'> {participant.nim}</span> </h1>

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
                                        <th>Nilai Sementara(tanpa essay)</th>
                                        <th>Nilai Akhir</th>
                                        <th class="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {overviews.map((overview, i) => {
                                        console.log('length')
                                        let manyQuestion = overview.subject.exam.length
                                        let answered = overview.answered.answer
                                        let sumAnswered = 0
                                        answered.map((answer) => {
                                            console.log(answer)
                                            if (answer != null) {
                                                sumAnswered++
                                            }
                                        })
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={subjectImage} alt="Image Subject" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{overview.subject.name}</div>
                                                            <div className="text-sm opacity-50">Kedokteran</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {manyQuestion}
                                                    <br />
                                                </td>
                                                <td>
                                                    <>{sumAnswered}</>
                                                </td>

                                                <td>

                                                    {moment(overview.updated_at).fromNow()}
                                                </td>
                                                <td>

                                                    {overview.temporary_mark}
                                                </td>

                                                <td>
                                                    {"Essay Belum Dinilai"}
                                                </td>
                                                <td className="flex justify-start">
                                                    {/* Button View */}
                                                    <Link href={route('admin.review-exam')} data={{
                                                        overview_id: overview.id, answer_id: overview.answer_id,
                                                        subject_id: overview.subject_id, name: overview.subject.name, participant_id: overview.participant_id
                                                    }} >
                                                        <PrimaryButton>
                                                            <strong className='text-white text-xs'>Lihat Jawaban</strong>

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
                                        <th>Nama Materi Ujian</th>
                                        <th>Banyak Soal</th>
                                        <th>Banyak Terjawab</th>
                                        <th>Selesai Dikerjakan</th>
                                        <th>Nilai Sementara(tanpa essay)</th>
                                        <th>Nilai Akhir</th>
                                        <th class="text-center">Aksi</th>
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