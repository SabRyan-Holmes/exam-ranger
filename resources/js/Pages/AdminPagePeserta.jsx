import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import PrimaryButton from '@/Components/PrimaryButton';
import { IoTrashSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaUserEdit } from "react-icons/fa";

export default function AdminPagePeserta(props) {
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
                <h1 className='font-bold py-3'>Data Peserta</h1>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <PrimaryButton onClick={()=>document.getElementById('create_data').showModal()}>Tambah Peserta</PrimaryButton>

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

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email/NIM</th>
        <th>Status Pengerjaan Tes</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/img/personexample.jpeg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          09021282126114
          <br/>
          <span className="badge badge-ghost badge-sm">fiqrijambi@gmail.com</span>
        </td>
        <td>Sudah selesai</td>
        <td><PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <FaUserEdit className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          <PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <IoTrashSharp className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          </td>
      </tr>

      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/img/personexample.jpeg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          09021282126114
          <br/>
          <span className="badge badge-ghost badge-sm">fiqrijambi@gmail.com</span>
        </td>
        <td>Sudah selesai</td>
        <td><PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <FaUserEdit className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          <PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <IoTrashSharp className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          </td>
      </tr>

      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/img/personexample.jpeg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          09021282126114
          <br/>
          <span className="badge badge-ghost badge-sm">fiqrijambi@gmail.com</span>
        </td>
        <td>Sudah selesai</td>
        <td><PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <FaUserEdit className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          <PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <IoTrashSharp className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          </td>
      </tr>

      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/img/personexample.jpeg" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          09021282126114
          <br/>
          <span className="badge badge-ghost badge-sm">fiqrijambi@gmail.com</span>
        </td>
        <td>Sudah selesai</td>
        <td><PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <FaUserEdit className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          <PrimaryButton>
                  <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
      <IoTrashSharp className='max-h-7'/>
    </IconContext.Provider>
          </PrimaryButton>
          </td>
      </tr>
      
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th>Name</th>
        <th>Email/NIM</th>
        <th>Status Pengerjaan Tes</th>
        <th>Aksi</th>
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