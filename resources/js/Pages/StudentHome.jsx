import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { data } from 'autoprefixer';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';


export default function StudentHome({ auth, exams }) {
    const [date, setDate] = useState(new Date());
    console.log("isi data" + exams)
    const onChange = () => {
        setDate(date);
    }
    console.log('tanggal sekarang : ' + date)

    const CalendarContainer = styled.div`
    /* ~~~ container styles ~~~ */
    @apply
    max-width: 300px;
    margin: auto;
    margin-top: 20px;
    background-color: #f97316;
    padding: 6px;
    border-radius: 15px;
    
    /* ~~~ active day styles ~~~ */
    .react-calendar__tile--range {
        background-color: #f97316;
    }
    `;

    // let dataArr = Array.from(exams)
    let arrExams = Object.keys(exams)
    console.log(arrExams)
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Home" />
            <section className='flex justify-center   '>
                <div className='w-full max-w-screen-lg ml-9   my-7'>
                    <div className="w-full  rounded-2xl mb-10 bg-card bg-contain  shadow-xl  ">
                        <div className=" card-body flex items-center justify-center ">
                            <p className="">Hi, {auth.user.name} !</p>
                            <h2 className="text-3xl font-semibold">Selamat Datang di Ujian Kompetisi Anatomi</h2>
                            <div className="card-actions">
                                <PrimaryButton>
                                    Cara Melaksanakan

                                </PrimaryButton>
                                <PrimaryButton>
                                    Mulai Mengerjakan
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start gap-8 ">
                        {/* Soal Kompetisi */}
                        <div className="flex flex-col ">
                            <div className="flex justify-between">
                                <h1 className="mb-6 font-bold">Soal Kompetisi</h1>
                                <h1 className="mb-6 font-bold text-primary">Lihat Semua</h1>
                            </div>
                            {arrExams.map((subject, i) => {
                                console.log(exams[subject]);
                                console.log(exams[subject][0].question);
                                return (
                                    <Link href={route('exam', { subject })} >
                                        <div className="mb-2  card w-fit shadow-md hover:bg-primary/30 ">
                                            <div className="m-6 rounded-md   ">
                                                <div className="card-actions  items-center ">
                                                    <strong className="mr-1">{subject}</strong>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 stroke-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                    </svg>

                                                    <div className="mr-4">
                                                        <p className="font-bold text-lg -mb-2">{exams[subject].length} Soal </p>
                                                        <p className="font-light text-slate-500">Essay & Pilihan Ganda </p>
                                                    </div>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                        stroke="currentColor" className="w-8 h-8 stroke-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                    <div className="">
                                                        <p className="font-bold text-lg -mb-1">{exams[subject][0].exam_duration} Menit </p>
                                                        <p className="font-light text-slate-500">10:00 - & 11-00 WIB </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            })};
                        </div>

                        <div className='grow'>
                            <div className="flex justify-between  ">
                                <h1 className="mb-6 font-bold">Riwayat Pengerjaan</h1>
                                <h1 className="mb-6 font-bold text-primary">Lihat Semua</h1>
                            </div>
                            {arrExams.map((subject, i) => {
                                console.log(exams[subject]);
                                console.log(exams[subject][0].question);
                                return (
                                    <Link href={route('exam', { subject })} >
                                        <div className="mb-2 card w-full shadow-md  hover:scale-110">
                                            <div className="m-6 rounded-md   ">
                                                <div className="card-actions  items-center ">
                                                    <div className="radial-progress text-primary text-sm" style={{ "--value": 70, "--size": "3rem", "--thickness": "2px" }} role="progressbar">70%</div>
                                                    <div>

                                                        <strong className="mr-1">{subject}</strong>
                                                        <p>Dikerjakan tanggal 2 Januari 2023 (10.45)</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            })};
                        </div>
                    </div>



                </div>
                <div className="border-r mx-7" />
                <div className=" my-7 mr-5">
                    <h1 className="mb-4 font-bold">Tanggal Ujian</h1>
                    <CalendarContainer>
                        <Calendar onChange={onChange} value={date} />
                    </CalendarContainer>
                </div>




            </section>
        </AuthenticatedLayout>
    );
}

