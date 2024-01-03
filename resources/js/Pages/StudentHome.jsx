import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student</h2>}
        >
            <Head title="Home" />


            <div className="mx-16 my-10 bg-card bg-cover overflow-hidden card shadow-xl pb-12">
                <div className="card-body flex items-center justify-center ">
                    <p className="">Hi, {auth.user.name} !</p>
                    <h2 className="text-3xl font-semibold">Selamat Datang di Ujian Kompetisi Anatomi</h2>
                    <div className="card-actions">
                        <PrimaryButton>
                            Cara Melaksanakan

                        </PrimaryButton>
                        <PrimaryButton>
                            <Link href={route('exam')}>
                                Mulai Mengerjakan
                            </Link>
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            <div className="flex pb-56">

                <div className="mx-16">
                    <h1 className="mb-6 font-bold">Konten Soal Kompetisi</h1>


                    {exams.map((exam) => {
                        return <div className="card w-fit gradient-base shadow-xl">
                            <div className="card-body">
                                <div className="card-actions items-center">
                                    <strong className="mr-24">Soal Materi 1</strong>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>

                                    <div className="mr-16">
                                        <p className="font-bold text-lg -mb-2">{exam.question.length} Soal </p>
                                        <p className="font-light text-slate-500">Essay & Pilihan Ganda </p>
                                    </div>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                        stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <div className="">
                                        <p className="font-bold text-lg -mb-2">{exam.exam_duration} Menit </p>
                                        <p className="font-light text-slate-500">10:00 - & 11-00 WIB </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })};

                    {/* exams.map((exam, i) => {
                       
                    })} */}


                </div>

                <div className="mx-16">
                    <h1 className="mb-6 font-bold">Konten Soal Kompetisi</h1>
                    <CalendarContainer>
                        <Calendar onChange={onChange} value={date} />
                    </CalendarContainer>
                </div>
            </div>





        </AuthenticatedLayout>
    );
}

