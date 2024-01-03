import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react'
import { Link } from "@inertiajs/react";

export default function AdminPage(props) {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        choice: [],
        image: '',
        isEssay: ''
      })
    
      function submit(e) {
        e.preventDefault()
        post(route('create.soal', data, {
            _method: 'post'
        }));
      }

    return (
      <div className='h-full'>
        <div className="drawer lg:drawer-open h-full">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col bg-neutral h-full">
          <Navbar user={props.auth.user}/>
            <div className='mx-6 mt-6 h-full'>
              <div className='flex justify-between'>
                <h1 className='font-bold py-3'>Data Soal</h1>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={()=>document.getElementById('create_data').showModal()}>Tambah soal</button>

                <dialog id="create_data" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan data soal</h3>

                    <form onSubmit={submit}>

                      <label className="label">
                          <span className="label-text font-bold">Pertanyaan</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.question} onChange={e => setData('question', e.target.value)} />
                      {errors.question && <div>{errors.question}</div>}

                      <div className='flex justify-between'>
                        <button type="submit" className="btn btn-secondary mt-6" disabled={processing}>Submit</button>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-primary">Cancel</button>
                          </form>
                        </div>                     
                      </div>

                    </form>

                  </div>
                </dialog>
              </div>


              <p>content</p>
            </div>
          
          </div> 
          {/* <Drawer></Drawer> */}

          <div className="drawer-side shadow-2xl">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-64 min-h-full bg-neutral text-base-content">
              {/* Sidebar content here */}
              <li><a href="">Tambah Pertanyaan</a></li>
              <li><a href="">Tambah Peserta</a></li>

            </ul>
          
          </div>

        </div>
      </div>
    )
}