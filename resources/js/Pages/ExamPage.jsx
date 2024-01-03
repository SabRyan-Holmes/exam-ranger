import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const ExamPage = ({ auth, exam, title, subject, }) => {
    const [active, setActive] = useState(0)
    const [plus, setPlus] = useState(0)
    const [minus, setMinus] = useState(1)
    const [showAllNumber, setShowshowAllNumber] = useState(false)




    // Get 9-10 First Exam
    let slicedExam = exam.slice(active, 9)
    console.log("isi 9 exam" + slicedExam)
    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            {/* container */}
            <div className="my-7 rounded-lg mx-20 pb-12 bg-secondary ">
                <div className="flex  ">
                    <div>
                        {/* Time */}
                        <div className="flex items-center  w-1/2">
                            <svg className="m-7 mr-4 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                <p>Sisa waktu</p>
                                <p className='font-semibold'>01:00:00</p>
                            </div>
                        </div>

                        {/* Question */}
                        <div className='m-7 w-1/2 '>
                            <strong>Pertanyaan {active + 1} dari {exam.length}</strong>
                            <p>{exam[active].question}</p>
                        </div>

                        {/* Choice */}
                        <div className='m-7 w-80 grid grid-cols-2'>
                            {exam[active].choice.map((choice, i) => {
                                const letter = ['A', 'B', 'C', 'D']
                                return <div className='bg-white shadow-lg ring-1 normal-case p-2 rounded-lg border m-2'>
                                    <strong>
                                        {letter[i]} . {choice}
                                    </strong>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className="w-96 scale-110 mt-10">
                        <PrimaryButton className="mr-10 my-10 ">
                            Kumpul Jawaban
                        </PrimaryButton>

                        <div className="mx-10 scale-150 radial-progress text-primary font-extrabold  border-4 border-orange-300 " style={{ "--value": (active + 1) / exam.length * 100 }} role="progressbar">{active + 1} /{exam.length}</div>
                    </div>
                </div>

                {/* Number */}
                <div className="mx-72 scale-75 pt-4 justify-center  grid grid-flow-col  text-center font-bold text-xl gap-0">
                    {active > 0 &&
                        <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5" onClick={() => { setActive(active - 1), setPlus(active - 1) }}>
                            Prev
                        </button>

                    }

                    {exam.slice(active, 9 + plus).map((exam, i) => {

                        return <button className={' shadow-lg ring-1 p-3 rounded-lg border m-3 px-7' + (active ? 'bg-slate-600' : 'bg-primary')} >{i + 1}</button>

                    })}

                    {/* <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx- ${active && 'bg-primary'}`} >
                        1
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        2
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        3
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        4
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        5
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        6
                    </button>
                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        7
                    </button>

                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        8
                    </button>

                    <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
                        9
                    </button> */}

                    <div className="p-3  m-3 px-7 mx-4" onMouseEnter={() => { setShowshowAllNumber(true) }} onMouseLeave={() => { setShowshowAllNumber(false) }}>
                        ...
                    </div>


                    <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-3 px-7 mx-4">
                        {exam.length}
                    </button>

                    {active + 1 < exam.length &&
                        <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5 " onClick={() => { setActive(active + 1); setPlus(active + 1) }}>
                            Next
                        </button>
                    }

                </div>

                {showAllNumber &&
                    <div className="absolute bg-secondary border border-primary w-72 h-40 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <div className="justify-center  grid grid-cols-10 rounded-lg text-center font-bold text-xl gap-1">
                            {exam.map((exam, i) => {

                                return <button className={' shadow-lg ring-1 p-3 rounded-lg border  ' + (active ? 'bg-slate-600' : 'bg-primary')} >{i + 1}</button>

                            })}
                        </div>
                    </div>}
            </div>
        </Authenticated>
    )
}

export default ExamPage