import PrimaryButton from '@/Components/PrimaryButton';
import PopUpRule from '@/Components/PopUpRule';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { data } from 'autoprefixer';
import { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from "moment/min/moment-with-locales";
import no_data from "@/../assets/no_data.svg";


export default function Home({ auth, subjectExam, submitted, flash }) {
    console.log(subjectExam)
    const anchor = useRef('subject')
    const [date, setDate] = useState(new Date());
    console.log(subjectExam)
    const onChange = () => {
        setDate(date);
    }
    console.log('tanggal sekarang : ' + date)

    useEffect(() => {
        if (flash.message?.substr(0, 12) == 'sudahselesai') {
            document.getElementById('modal_sudah_selesai').showModal()
        }
    }, [flash.message]);

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

    moment.locale('id')

    const [openModal, setOpenModal] = useState(false);
    return (
        <AuthenticatedLayout
            user={auth.user} data={subjectExam}
        >
            <Head title="Home" />
            <section className='flex justify-center   '>
                <div className='w-full max-w-screen-lg ml-9   my-7'>
                    <div className="w-full  rounded-2xl mb-10 bg-card bg-contain  shadow-xl  ">
                        <div className=" card-body flex items-center justify-center ">
                            <p className="">Hi, {auth.user.name} !</p>
                            <h2 className="text-3xl font-semibold">Selamat Datang di Ujian Kompetisi Anatomi</h2>
                            <div className="card-actions">
                                <PrimaryButton onClick={() => {
                                    setOpenModal(true);
                                }}>
                                    Cara Melaksanakan

                                </PrimaryButton>
                                <PrimaryButton>
                                    Mulai Mengerjakan
                                </PrimaryButton>
                                {openModal && <PopUpRule openModal={openModal} setOpenModal={setOpenModal} anchor={anchor} />}
                            </div>
                        </div>
                    </div>

                    <div id={anchor} className="flex justify-start gap-8 ">
                        {/* Soal Kompetisi */}
                        <div className="flex flex-col ">
                            <div className="flex justify-between">
                                <h1 className="mb-6 font-bold">Soal Kompetisi</h1>
                                <h1 className="mb-6 font-bold text-primary">{subjectExam.length ? 'Lihat Semua' : ''}</h1>
                            </div>
                            {subjectExam.map((subject, i) => {
                                let banyakSoal = subject.exam.length
                                return (
                                    <Link href={route('exam.show')} data={{ id: subject.id, name: subject.name, exam_duration: subject.exam_duration }}>
                                        <div className="mb-2 border-card  card w-fit shadow-md hover:bg-primary/30 ">
                                            <div className="m-6 rounded-md   ">
                                                <div className="card-actions  items-center ">
                                                    <div>
                                                        {subject.image ?
                                                            <img src={"/storage/" + subject.image} alt="" className='max-h-10 mx-auto' />
                                                            :
                                                            ""
                                                        }
                                                        <strong className="mr-1">{subject.name}</strong>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 stroke-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                    </svg>

                                                    <div className="mr-4">
                                                        <p className="font-bold text-lg -mb-2">{banyakSoal} Soal </p>
                                                        <p className="font-light text-slate-500">Essay & Pilihan Ganda </p>
                                                    </div>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                        stroke="currentColor" className="w-8 h-8 stroke-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                    <div className="">
                                                        <p className="font-bold text-lg -mb-1">{subject.exam_duration} Menit </p>
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
                                <h1 className="mb-6 font-bold text-primary">{submitted.length ? 'Lihat Semua' : ''}</h1>
                            </div>
                            {submitted.length ? submitted.map((data, i) => {
                                let answered = 0
                                data.answer.map((answer) => {
                                    if (answer != null && answer != '') {
                                        answered++;
                                    }
                                })
                                let jumlah_soal = data.answer.length;

                                let value = (answered / jumlah_soal) * 100

                                console.log('value soal terjawab : ')
                                console.log(value)
                                return (
                                    <div className="mb-2 card w-full shadow-md  hover:scale-110 border-card">
                                        <div className="m-6 my-4 rounded-md   ">
                                            <div className="card-actions justify-between items-center ">
                                                <div className="radial-progress text-primary text-sm" style={{ "--value": value, "--size": "3rem", "--thickness": "2px" }} role="progressbar">{Math.round(value)} %</div>
                                                <div className="mr-16 ">
                                                    <strong >{data.subject.name}  </strong>
                                                    <p className="text-sm">{answered} dari {jumlah_soal} Terjawab</p>
                                                    <small className="block"> {moment(data.updated_at).fromNow()}</small>
                                                </div>
                                                <p>{moment(data.updated_at).format('L')}</p>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                                :
                                <div className="my-auto">
                                    <img className='w-40 h-32 mx-auto pt-7 mt-3' src={no_data} alt="no data" srcset="" />
                                    <p className='text-center mt-3 text-sm text-slate-600'>Belum ada Riwayat Selesai Ujian</p>
                                </div>
                            }
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

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={()=>document.getElementById('modal_sudah_selesai').showModal()}>open modal</button> */}
                <dialog id="modal_sudah_selesai" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Akses ditolak!</h3>
                        <p className="py-4">Materi yang sudah dikumpul tidak bisa dikerjakan ulang</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>



            </section>
        </AuthenticatedLayout>
    );
}