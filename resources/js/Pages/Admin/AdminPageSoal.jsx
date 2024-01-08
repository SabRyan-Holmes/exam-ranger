import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link, Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react";

export default function AdminPageSoal(props) {
  const { flash } = usePage().props
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => {
    if (flash.message?.substr(0, 11) != null) {
      setShowSuccess(true)
    }
  }, [flash.message]);

  const [examState, setEditExamState] = useState(props.exam);
  const [questionEdit, setEditQuestion] = useState(null);
  const [id, setIdEdit] = useState(null);
  const [choiceEdit, setEditChoice] = useState(['', '', '', '']);
  const [imageEdit, setEditImage] = useState(null);
  const [isEssayEdit, setEditIsEssay] = useState(false);
  const [actualAnswerEdit, setEditActualAnswer] = useState(null);
  const [subjectEdit, setEditSubject] = useState(null);

  const { data, setData, post, processing, errors } = useForm({
    question: null,
    choice: ['', '', '', ''],
    image: null,
    isEssay: false,
    actualAnswer: null,
    subject: null
  })

  const confirmDelete = (i) => {
    const id = i
    const data = {
      id
    }
    Swal.fire({
      title: 'Anda yakin?',
      text: "Soal yang sudah dihapus tidak bisa dikembalikan lagi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.post('/dashboard/soal/delete-soal', data)
      }
    })
  }

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

  const datachoiceedit = [
    {
      choice: '',
    },
    {
      choice: '',
    },
    {
      choice: '',
    },
    {
      choice: '',
    },
  ];

  const [tempChoice, setTempChoice] = useState(datachoice);

  const [tempEditChoice, setTempEditChoice] = useState(datachoiceedit);


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
  };

  const updateStateEditChoice = (index) => (e) => {
    const newArrayEdit = tempEditChoice.map((item, i) => {
      if (index === i) {
        return { choice: e.target.value };
      } else {
        return item;
      }
    });
    const trueChoiceEdit = []
    setTempEditChoice(newArrayEdit)
    console.log(newArrayEdit)
    newArrayEdit.map((choices) => {
      trueChoiceEdit.push(choices.choice)
    })
    setEditChoice(trueChoiceEdit)
    console.log(choiceEdit)
  };

  function blobUrl() {
    const url = URL.createObjectURL(data.image)
    return url
  }

  function submit(e) {
    e.preventDefault()
    post(route('admin.create-soal', data, {
      _method: 'POST'
    }));
  }

  function editSoal(e) {
    e.preventDefault()

    const edit = {
      id, questionEdit, subjectEdit, choiceEdit, actualAnswerEdit
    }

    router.post('/dashboard/soal/edit-soal', edit)
  }

  function setEditFunction(target, value) {
    setEdit(target, value)
  }

  return (
    <div className='h-full'>
      <Head title={`${props.title}  ${props.subject}`} />

      <div className="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-neutral h-full">
          <Navbar user={props.auth.user} />
          <div className='mx-6 mt-6 h-full'>
            <div className='flex justify-between'>
              <h1 className='font-bold'>Daftar Soal Ujian {props.subject}</h1>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <PrimaryButton onClick={() => { document.getElementById('create_data').showModal() }}>Tambah soal</PrimaryButton>

              <dialog id="create_data" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Masukkan data soal</h3>

                  <form onSubmit={submit}>

                    {data.image ?
                      <div className='flex justify-center'>
                        <img src={blobUrl()} alt="Gambar" className='h-60' />
                      </div>
                      : ""}

                    <label className="label">
                      <span className="label-text font-bold">Gambar</span>
                    </label>
                    <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setData('image', e.target.files[0])} />
                    {errors.image && <div className='text-red-600'>{errors.image}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pertanyaan</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.question} onChange={e => setData('question', e.target.value)} />
                    {errors.question && <div className='text-red-600'>{errors.question}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Subject</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.subject} onChange={e => setData('subject', e.target.value)} />
                    {errors.subject && <div className='text-red-600'>{errors.subject}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pilihan jawaban A</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[0]} onChange={updateStateChoice(0)} />
                    {errors["choice.0"] && <div className='text-red-600'>{errors["choice.0"].slice(-6) == "value." ? "Jawaban A mempunyai duplikat yang sama" : "Pilihan jawaban A harus diisi"}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pilihan jawaban B</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[1]} onChange={updateStateChoice(1)} />
                    {errors["choice.1"] && <div className='text-red-600'>{errors["choice.1"].slice(-6) == "value." ? "Jawaban B mempunyai duplikat yang sama" : "Pilihan jawaban B harus diisi"}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pilihan jawaban C</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[2]} onChange={updateStateChoice(2)} />
                    {errors["choice.2"] && <div className='text-red-600'>{errors["choice.2"].slice(-6) == "value." ? "Jawaban C mempunyai duplikat yang sama" : "Pilihan jawaban C harus diisi"}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pilihan jawaban D</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.choice[3]} onChange={updateStateChoice(3)} />
                    {errors["choice.3"] && <div className='text-red-600'>{errors["choice.3"].slice(-6) == "value." ? "Jawaban D mempunyai duplikat yang sama" : "Pilihan jawaban D harus diisi"}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Jawaban soal</span>
                    </label>
                    <select className="bg-white select select-primary w-full max-w-xs" onChange={e => setData('actualAnswer', e.target.value)}>
                      <option value="" disabled selected>Pilih jawaban untuk soal</option>
                      {data.choice.map((data, i) =>
                        <option key={i}>{data}</option>
                      )}
                    </select>
                    {errors.actualAnswer && <div className='text-red-600'>{errors.actualAnswer}</div>}


                    <div className='flex justify-between'>
                      <button type="submit" className="btn btn-secondary mt-6" disabled={processing}>Submit</button>

                      {flash.message?.substr(0, 11) == 'suksesinput' && showSuccess ?
                        <div className="alert alert-success mx-4 mt-5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Soal berhasil ditambah</span>
                        </div> :
                        ""
                      }
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>Cancel</button>
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
                  <p>{i + 1}. {data.question}</p>
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
                    <PrimaryButton onClick={() => {
                      setTempEditChoice([
                        {
                          choice: data.choice[0],
                        },
                        {
                          choice: data.choice[1],
                        },
                        {
                          choice: data.choice[2],
                        },
                        {
                          choice: data.choice[3],
                        },
                      ])
                      const choicess = data.choice;
                      setIdEdit(data.id);
                      setEditQuestion(data.question);
                      setEditChoice(choicess);
                      setEditActualAnswer(data.actual_answer);
                      setEditSubject(data.subject);
                      document.getElementById('edit_data' + data.id.toString()).showModal()
                    }
                    }>Edit</PrimaryButton> <PrimaryButton onClick={() => confirmDelete(data.id)} >Delete</PrimaryButton>
                  </div>

                  <dialog id={"edit_data" + data.id} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit data soal</h3>

                      <form onSubmit={editSoal}>

                        <label className="label">
                          <span className="label-text font-bold">Gambar</span>
                        </label>
                        <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setEditImage('image', e.target.files[0])} />

                        <label className="label">
                          <span className="label-text font-bold">Pertanyaan</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={questionEdit} onChange={(question) => setEditQuestion(question.target.value)} />

                        <label className="label">
                          <span className="label-text font-bold">Subject</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={subjectEdit} onChange={(subject) => setEditSubject(subject.target.value)} />


                        <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban A</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[0]} onChange={updateStateEditChoice(0)} />

                        <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban B</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[1]} onChange={updateStateEditChoice(1)} />

                        <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban C</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[2]} onChange={updateStateEditChoice(2)} />


                        <label className="label">
                          <span className="label-text font-bold">Pilihan jawaban D</span>
                        </label>
                        <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={choiceEdit[3]} onChange={updateStateEditChoice(3)} />

                        <label className="label">
                          <span className="label-text font-bold">Jawaban soal</span>
                        </label>
                        <select className="bg-white select select-primary w-full max-w-xs" onChange={(answer) => setEditActualAnswer(answer.target.value)}>
                          {data.choice.map((choice, i) => {
                            if (choice == data.actual_answer) {
                              return (<option key={i} selected>{choice}</option>)
                            } else {
                              return (<option key={i}>{choice}</option>)
                            }
                          }
                          )}
                        </select>

                        <div className='flex justify-between'>
                          <button type="submit" className="btn btn-secondary mt-6">Save</button>

                          {flash.message == data.id.toString() && showSuccess ?
                            <div className="alert alert-success mx-4 mt-5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              <span>Soal berhasil diedit</span>
                            </div> :
                            ""
                          }
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-primary" onClick={() => {
                                setShowSuccess(false);
                                setEditQuestion(data.question);
                                setEditChoice(data.choice);
                                setEditActualAnswer(data.actual_answer);
                                setEditSubject(data.subject);
                                console.log(examState);
                                console.log(flash.message)
                              }}>Cancel</button>
                            </form>
                          </div>
                        </div>

                      </form>

                    </div>
                  </dialog>
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