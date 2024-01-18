import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { IoTrashSharp } from "react-icons/io5";
import { Link, Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { useEffect } from "react";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import moment from 'moment';

export default function ReviewExam({ auth, flash, title, exams, subject, answered, subject_id, overview }) {
    const [showSuccess, setShowSuccess] = useState(false)
    console.log(subject_id)
    useEffect(() => {
        if (flash.message?.substr(0, 11) != null) {
            setShowSuccess(true)
        }
    }, [flash.message]);

    const { data, setData, post, processing, errors } = useForm({
        subject_id: subject_id,

    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.create-soal', data, {
            _method: 'POST'
        }));
    }
    const datachoice = [
        {
            id: 1,
            choice: '',
        },
        {
            id: 2,
            choice: '',
        },
        {
            id: 3,
            choice: '',
        },
        {
            id: 4,
            choice: '',
        },
    ];

    const [kategori, setKategori] = useState("Semua Soal")

    useEffect(() => {
        moment.locale('id')

    }, [])
    const answer = answered.answer
    const participant = overview.participant
    return (
        <div className='h-full'>
            <Head title={`${title}  ${subject}`} />

            <div className="drawer lg:drawer-open h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-neutral h-full">
                    <Navbar user={auth.user} />
                    <div className='mx-6 mt-6 h-full'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold'>Jawaban Soal Ujian {subject} dari Peserta {participant.name}</h1>

                            {/* <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn m-1">Hover</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div> */}
                            <ul className="menu menu-horizontal   z-[999] items-center opacity-100 shrink-0 px-1  ">
                                <li tabIndex={0}>
                                    <details>
                                        <summary className='text-xl  text-primary'>{kategori}</summary>
                                        <ul className="p-2 text-sm w-36 bg-white ml-3">
                                            <li className='hover:text-primary' default onClick={() => setKategori("Semua")}><a>Semua Soal</a></li>
                                            <li className='hover:text-primary' onClick={() => setKategori("Essay")}><a>Essay</a></li>
                                            <li className='hover:text-primary' onClick={() => setKategori("Pilihan Ganda")}><a>Pilihan Ganda</a></li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>





                        </div>

                        <section className='w-1/2 '>
                            <div className='flex gap-48'>
                                <strong className="text-xl text-primary">Data Peserta :</strong>
                                <strong className="text-xl text-primary">Overview :</strong>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className='font-semibold'>Nama : <span className='font-normal'>{participant.name}</span></p>
                                    <p className='font-semibold'>NIM : <span className='font-normal'>{participant.nim}</span></p>
                                    <p className='font-semibold'>Email : <span className='font-normal'>{participant.email}</span></p>
                                    <p className='font-semibold'>No Telepon : <span className='font-normal'>{participant.phone ? participant.phone : '_'}</span></p>
                                    <p className='font-semibold'>Selesai Dikerjakan : <span className='font-normal'>{moment(answered.updated_at).fromNow()}</span></p>
                                </div>

                                <div>
                                    <p className='font-medium'>Jumlah Pilihan Ganda benar : <span className='font-normal'>{overview.is_correct}</span></p>
                                    <p className='font-medium'>Jumlah Essay benar : <span className='font-normal'>{overview.is_correct}</span></p>
                                    <p className='font-medium'>Nilai Sementara : <span className='font-normal'>{overview.mark}</span></p>
                                    <p className='font-medium'>Nilai Rata-rata dari Semua Ujian : <span className='font-normal'>{overview.average_mark}</span></p>
                                    <p className='font-medium'>Nilai Akhir : <span className='font-normal'>{overview.final_mark}</span></p>
                                </div>
                            </div>

                        </section>

                        {/* content */}
                        <section className="mt-12">

                            {exams.map((data, i) => {

                                if (!data.is_essay) {



                                    return (
                                        <div className="card w-4/4 my-3  bg-secondary text-primary-content" key={i}>
                                            <div className="card-body">
                                                {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl' />}
                                                <p>{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
                                                <ul>
                                                    <li className='font-medium'>A. {data.choice[0]}</li>
                                                    <li className='font-medium'>B. {data.choice[1]}</li>
                                                    <li className='font-medium'>C. {data.choice[2]}</li>
                                                    <li className='font-medium'>D. {data.choice[3]}</li>
                                                </ul>
                                                <div className="">
                                                    {/* <button className="btn">Buy Now</button> */}
                                                    <h1>Dijawab : <strong >
                                                        {answer[i] != null ? answer[i] : <span className="text-red-700">
                                                            Tidak Dijawab
                                                        </span>}</strong></h1>
                                                    <p>Jawaban yang benar : <strong className="text-green-800">
                                                        {data.actual_answer}</strong></p>
                                                </div>

                                                <div className="card-actions justify-end">
                                                    {
                                                        answer[i] == data.actual_answer ? <PrimaryButton className='bg-green-600'>Benar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                        </PrimaryButton>
                                                            :
                                                            <PrimaryButton className='bg-red-500'>Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
                                                                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                            </svg>


                                                            </PrimaryButton>
                                                    }

                                                </div>


                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="card w-4/4 my-3 bg-secondary text-primary-content" key={i}>
                                            <div className="card-body">
                                                {/* <h2 className="card-title">Soal nomor 1</h2> */}
                                                {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                                                <p>{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
                                                <div className="">
                                                    {/* <button className="btn">Buy Now</button> */}
                                                    <h1>Dijawab : <strong>{answer[i] != null ? answer[i] : <span className="text-red-700">
                                                        Tidak Dijawab
                                                    </span>}</strong></h1>
                                                    <h1>Jawaban yang Benar : <strong className="text-green-800">{data.actual_answer}</strong></h1>
                                                </div>

                                                <div className="card-actions justify-end">

                                                    <PrimaryButton className='bg-red-600 -mr-7'>Tandai Salah <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                                    </svg>
                                                    </PrimaryButton>

                                                    <PrimaryButton className='bg-green-600  '>Tandai Benar <svg className='w-7 h-7 stroke-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                    </PrimaryButton>
                                                </div>


                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )}

                        </section>

                        {/* end of content               */}
                    </div>

                </div>
                <AdminDrawer />


            </div>
        </div>
    )
}