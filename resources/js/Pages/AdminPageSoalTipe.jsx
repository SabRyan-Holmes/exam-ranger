import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link } from "@inertiajs/react";

export default function AdminPageSoalTipe(props) {
    let arrExams = Object.keys(props.exams)
    return (
      <div className='h-full'>
        <div className="drawer lg:drawer-open h-full">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col bg-neutral h-full">
          <Navbar user={props.auth.user}/>
            <div className='mx-6 mt-6 h-full'>
          
{/* content */}
 {arrExams.map((subject, i) => {
                                console.log(props.exams[subject]);
                                console.log(props.exams[subject][0].question);
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
                                                        <p className="font-bold text-lg -mb-2">{props.exams[subject].length} Soal </p>
                                                        <p className="font-light text-slate-500">Essay & Pilihan Ganda </p>
                                                    </div>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                        stroke="currentColor" className="w-8 h-8 stroke-primary">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                    <div className="">
                                                        <p className="font-bold text-lg -mb-1">{props.exams[subject][0].exam_duration} Menit </p>
                                                        <p className="font-light text-slate-500">10:00 - & 11-00 WIB </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            })};
{/* end of content               */}
            </div>

          </div> 
          <AdminDrawer></AdminDrawer>


        </div>
      </div>
    )
}