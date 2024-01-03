import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const ExamPage = ({ auth, exam, title, subject }) => {
    const [active, setActive] = useState(0)
    function handleNext() {
        if (active + 1 < exam.length) {
            setActive(active + 1);
        }
    }

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
                            <strong>Pertanyaan 1 dari {exam.length}</strong>
                            <p>{exam[active].question}</p>
                        </div>

                        {/* Choice */}
                        <div className='m-7 w-fit grid grid-cols-2'>
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

                        <div className="mx-10 scale-150 radial-progress text-primary font-extrabold  border-4 border-orange-300 " style={{ "--value": active / exam.length }} role="progressbar">{active + 1} /{exam.length}</div>
                    </div>
                </div>

                {/* Number */}
                <div className="mx-72 scale-75 pt-4 justify-center  grid grid-flow-col  text-center font-bold text-xl gap-0">
                    {active == 0 &&
                        <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5" onClick={() => { setActive(active - 1) }}>
                            Prev
                        </button>
                    }


                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        1
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        2
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        3
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        4
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        5
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        6
                    </button>
                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        7
                    </button>

                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        8
                    </button>

                    <button className="bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4">
                        9
                    </button>

                    <div className="p-3  m-3 px-7 mx-4">
                        ...
                    </div>

                    <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-3 px-7 mx-4">
                        {exam.length}
                    </button>

                    {active + 1 < exam.length &&
                        <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5 " onClick={() => { setActive(active + 1) }}>
                            Next
                        </button>
                    }

                </div>

            </div>
        </Authenticated>
    )
}

export default ExamPage