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
        image: null,
        isEssay: false,
        actualAnswer: ''
      })

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

      const [tempChoice, setTempChoice] = useState(datachoice);

      const updateStateChoice = (index) => (e) => {
        const newArray = tempChoice.map((item, i) => {
          if (index === i) {
            return { ...item, choice: e.target.value };
          } else {
            return item;
          }
        });
        const trueChoice = []
        setTempChoice(newArray)
        newArray.map((choices) => {
          trueChoice.push(choices.choice)
        })
        setData('choice', trueChoice)
        console.log(trueChoice)
        console.log(e.target.value)
      };

      function blobUrl() {
        const url = URL.createObjectURL(data.image)
        return url
      }
    
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

                <dialog id="create_data" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Masukkan data soal</h3>

                    <form onSubmit={submit}>

                      {data.image ? 
                        <div className='flex justify-center'>                       
                        <img src={blobUrl()} alt="Gambar" className='h-60'/> 
                        </div>
                        : ""}

                      <label className="label">
                          <span className="label-text font-bold">Gambar</span>
                      </label>
                      <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setData('image', e.target.files[0])} />
                      {errors.image && <div>{errors.image}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Pertanyaan</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.question} onChange={e => setData('question', e.target.value)} />
                      {errors.question && <div>{errors.question}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban A</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[0]} onChange={updateStateChoice(0)} />
                      {errors.choice && <div>{errors.choice}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban B</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[1]} onChange={updateStateChoice(1)} />
                      {errors.choice && <div>{errors.choice}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban C</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[2]} onChange={updateStateChoice(2)} />
                      {errors.choice && <div>{errors.choice}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban D</span>
                      </label>
                      <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[3]} onChange={updateStateChoice(3)} />
                      {errors.choice && <div>{errors.choice}</div>}

                      <label className="label">
                          <span className="label-text font-bold">Jawaban soal</span>
                      </label>
                      <select className="bg-white select select-primary w-full max-w-xs" onChange={e => setData('actualAnswer', e.target.value)}>
                        {data.choice.map((data, i) => 
                        <option key={i}>{data}</option>
                        )}
                      </select>

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
{props.exam.map((data, i) =>
  <div className="card w-3/4 my-3 bg-secondary text-primary-content" key={i}>
  <div className="card-body">
    {/* <h2 className="card-title">Soal nomor 1</h2> */}
    <h2 className="card-title">Soal materi {data.subject}</h2>
    <p>{i+1}. {data.question}</p>
    <ul>
      <li className='font-bold'>A. {data.choice[0]}</li>
      <li className='font-bold'>B. {data.choice[1]}</li>
      <li className='font-bold'>C. {data.choice[2]}</li>
      <li className='font-bold'>D. {data.choice[3]}</li>
    </ul>
    <div className="card-actions justify-start">
      {/* <button className="btn">Buy Now</button> */}
      <h1>Jawaban : {data.actual_answer}</h1>
    </div>

    <div className="card-actions justify-end">
      {/* <button className="btn">Buy Now</button> */}
      <PrimaryButton>Edit</PrimaryButton> <PrimaryButton>Delete</PrimaryButton>
    </div>
  </div>
</div>
)}




{/* end of content               */}
            </div>

          </div> 
          <AdminDrawer></AdminDrawer>


        </div>
      </div>
    )
}