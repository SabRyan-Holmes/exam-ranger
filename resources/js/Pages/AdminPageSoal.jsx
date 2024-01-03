import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';

export default function AdminPageSoal(props) {
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
                <h1 className='font-bold'>Data Soal</h1>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <PrimaryButton onClick={()=>document.getElementById('create_data').showModal()}>Tambah soal</PrimaryButton>
                {/* <button className="btn" onClick={()=>document.getElementById('create_data').showModal()}>Tambah soal</button> */}

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
{/* content */}

<div className="card w-3/4 my-3 bg-secondary text-primary-content">
  <div className="card-body">
    {/* <h2 className="card-title">Soal nomor 1</h2> */}
    <p>1. If andy has 2 apple  and bryan has a stomacache, calculate the mass of the sun and the planet he’s currently in</p>
    <ul>
      <li className='font-bold'>A. Bababoey</li>
      <li className='font-bold'>B. Bababoey</li>
      <li className='font-bold'>C. Bababoey</li>
      <li className='font-bold'>D. Bababoey</li>
    </ul>
    <div className="card-actions justify-start">
      {/* <button className="btn">Buy Now</button> */}
      <h1>Jawaban : A</h1>
    </div>

    <div className="card-actions justify-end">
      {/* <button className="btn">Buy Now</button> */}
      <PrimaryButton>Edit</PrimaryButton> <PrimaryButton>Delete</PrimaryButton>
    </div>
  </div>
</div>

<div className="card w-3/4 my-3 bg-secondary text-primary-content">
  <div className="card-body">
    {/* <h2 className="card-title">Soal nomor 1</h2> */}
    <p>2. If andy has 2 apple  and bryan has a stomacache, calculate the mass of the sun and the planet he’s currently in</p>
    <ul>
      <li className='font-bold'>A. Bababoey</li>
      <li className='font-bold'>B. Bababoey</li>
      <li className='font-bold'>C. Bababoey</li>
      <li className='font-bold'>D. Bababoey</li>
    </ul>
    <div className="card-actions justify-start">
      {/* <button className="btn">Buy Now</button> */}
      <h1>Jawaban : A</h1>
    </div>

    <div className="card-actions justify-end">
      {/* <button className="btn">Buy Now</button> */}
      <PrimaryButton>Edit</PrimaryButton> <PrimaryButton>Delete</PrimaryButton>
    </div>
  </div>
</div>

<div className="card w-3/4 my-3 bg-secondary text-primary-content">
  <div className="card-body">
    {/* <h2 className="card-title">Soal nomor 1</h2> */}
    <p>3. If andy has 2 apple  and bryan has a stomacache, calculate the mass of the sun and the planet he’s currently in</p>
    <ul>
      <li className='font-bold'>A. Bababoey</li>
      <li className='font-bold'>B. Bababoey</li>
      <li className='font-bold'>C. Bababoey</li>
      <li className='font-bold'>D. Bababoey</li>
    </ul>
    <div className="card-actions justify-start">
      {/* <button className="btn">Buy Now</button> */}
      <h1>Jawaban : A</h1>
    </div>

    <div className="card-actions justify-end">
      {/* <button className="btn">Buy Now</button> */}
      <PrimaryButton>Edit</PrimaryButton> <PrimaryButton>Delete</PrimaryButton>
    </div>
  </div>
</div>


{/* end of content               */}
            </div>

          </div> 
          <AdminDrawer></AdminDrawer>


        </div>
      </div>
    )
}