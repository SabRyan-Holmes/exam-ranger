import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { IoTrashSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link, Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import moment from "moment/min/moment-with-locales";

export default function AdminPageSoal({ auth, flash, title, exam, subject }) {
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => {
    if (flash.message?.substr(0, 11) != null) {
      setShowSuccess(true)
    }
  }, [flash.message]);

  const [examState, setEditExamState] = useState(exam);
  const [isDeleteImg, setIsDeleteImg] = useState(false);
  const [pointEdit, setEditPoint] = useState(2);
  const [questionEdit, setEditQuestion] = useState(null);
  const [id, setIdEdit] = useState(null);
  const [choiceEdit, setEditChoice] = useState(['', '', '', '']);
  const [imageEdit, setEditImage] = useState(null);
  const [isEssayEdit, setEditIsEssay] = useState(false);
  const [actualAnswerEdit, setEditActualAnswer] = useState(null);
  const [indexAns, setEditIndexAns] = useState(null);
  const [subjectEdit, setEditSubject] = useState(null);

  const [question, setQuestion] = useState('');
  const [choice, setChoice] = useState(["soal essay"]);
  const [image, setImage] = useState(null);
  const [is_essay, setIsEssay] = useState(true);
  const [actual_answer, setActualAnswer] = useState("Jawaban essay");
  const [exam_started, setExamStarted] = useState("2024-01-03 10:42:17");
  const [exam_ended, setExamEnded] = useState("2024-01-03 11:42:17");
  const [exam_duration, setExamDuration] = useState("90");
  const [point, setPoint] = useState(2);
  const [subjects, setSubject] = useState(subject);

  const { data, setData, post, processing, errors } = useForm({
    question: null,
    choice: ['', '', '', ''],
    image: null,
    is_essay: false,
    actual_answer: null,
    exam_started: "2024-01-03 10:42:17",
    exam_ended: "2024-01-03 11:42:17",
    exam_duration: "90",
    point: 2,
    subject: subjects
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

  const [imgDelete, setImgDelete] = useState('');


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

    if (index == choiceEdit.indexOf(actualAnswerEdit)) {
      setEditActualAnswer(e.target.value)
    }

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

  function blobUrlEssay() {
    const url = URL.createObjectURL(image)
    return url
  }

  function blobUrlEdit() {
    if (imageEdit != null) {
      const url = URL.createObjectURL(imageEdit)
      return url
    } else {
      return ''
    }
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
      id, imageEdit, questionEdit, subjectEdit, choiceEdit, actualAnswerEdit, isDeleteImg, pointEdit
    }

    router.post('/dashboard/soal/edit-soal', edit)
  }

  function submitEssay(e) {
    e.preventDefault()

    const edit = {
      question, choice, image, is_essay, actual_answer, exam_started, exam_ended, exam_duration, point, subjects
    }

    router.post('/dashboard/soal/add-soal', edit)
  }

  const duration = exam[0].exam_duration
  const startDate = exam[0].exam_started
  const endDate = exam[0].exam_ended

  return (
    <div className='h-full'>
      <Head title={`${title}  ${subject}`} />

      <div className="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-neutral h-full">
          <Navbar user={auth.user} />
          <div className='mx-6 mt-6 h-full'>
            <div className='flex justify-between'>
              <h1 className='font-bold'>Daftar Soal Ujian {subject}</h1>



              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <div>
                <PrimaryButton onClick={() => { document.getElementById('create_data_essay').showModal() }}>Tambah soal essay</PrimaryButton>
                <PrimaryButton onClick={() => { document.getElementById('create_data').showModal() }}>Tambah soal pilihan ganda</PrimaryButton>
              </div>

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
                      <span className="label-text font-bold">Point</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={data.point} onChange={e => setData('point', e.target.value)} onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }} />
                    {errors.point && <div className='text-red-600'>{errors.point}</div>}

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
                    <select className="bg-white select select-primary w-full max-w-xs" onChange={e => setData('actual_answer', e.target.value)}>
                      <option value="" disabled selected>Pilih jawaban untuk soal</option>
                      {data.choice.map((data, i) =>
                        <option key={i}>{data}</option>
                      )}
                    </select>
                    {errors.actual_answer && <div className='text-red-600'>{errors.actual_answer}</div>}


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

              <dialog id="create_data_essay" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Masukkan data soal</h3>

                  <form onSubmit={submitEssay}>

                    {image ?
                      <div className='flex justify-center'>
                        <img src={blobUrlEssay()} alt="Gambar" className='h-60' />
                      </div>
                      : ""}

                    <label className="label">
                      <span className="label-text font-bold">Gambar</span>
                    </label>
                    <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setImage(e.target.files[0])} />
                    {errors.image && <div className='text-red-600'>{errors.image}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Pertanyaan</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={question} onChange={e => setQuestion(e.target.value)} />
                    {errors.question && <div className='text-red-600'>{errors.question}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Subject</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={subject} onChange={e => setSubject(e.target.value)} />
                    {errors.subject && <div className='text-red-600'>{errors.subject}</div>}

                    <label className="label">
                      <span className="label-text font-bold">Point</span>
                    </label>
                    <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={point} onChange={e => setPoint(e.target.value)} onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }} />
                    {errors.point && <div className='text-red-600'>{errors.point}</div>}

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
                          <button className="btn btn-primary" onClick={() => { setShowSuccess(false) }}>Cancel</button>
                        </form>
                      </div>
                    </div>

                  </form>

                </div>
              </dialog>

            </div>
            {/* Subject Name */}
            <div className="mt-4 w-1/3">
              <InputLabel htmlFor="subject" value="Nama Materi Soal" />
              <TextInput
                id="subject"
                type="text"
                name="subject"
                defaultValue={subject}
                className="mt-1 block w-full "
                onChange={(e) => setData('subject', e.target.value)}
              />

              <InputError message={errors.subject} className="mt-2" />
            </div>

            {/* Subject Duration */}
            <div className="mt-4 w-1/3">
              <InputLabel htmlFor="exam_duration" value="Durasi Ujian Soal" />
              <TextInput
                id="exam_duration"
                type="text"
                defaultValue={duration}
                name="exam_duration"
                className="mt-1 block w-full "
                onChange={(e) => setData('exam_duration', e.target.value)}
              />

              <InputError message={errors.exam_duration} className="mt-2" />
            </div>

            <div className="mt-4 w-1/3">
              <InputLabel htmlFor="tanggal_mulai" value="Tanggal Mulai Ujian" />
              <TextInput
                id="tanggal_mulai"
                name="tanggal_mulai"
                type="date"
                // ini harus diconvert dulu nanti biar tampil
                defaultValue={startDate}
                className="my-2 block w-full bg-base"
                onChange={(e) => setData('tanggal_mulai', e.target.value)}
                placeholder="Masukkan Tanggal Mulai Lomba"

              />
              <InputError className="my-2" message={errors.tanggal_mulai} />
            </div>

            <div className="mt-4 w-1/3">
              <InputLabel htmlFor="tanggal_berakhir" value="Tanggal Mulai Ujian" />
              <TextInput
                id="tanggal_berakhir"
                name="tanggal_berakhir"
                type="date"
                // ini harus diconvert dulu nanti biar tampil
                defaultValue={endDate}
                className="my-2 block w-full bg-base"
                onChange={(e) => setData('tanggal_berakhir', e.target.value)}
                placeholder="Masukkan Tanggal Mulai Lomba"

              />
              <InputError className="my-2" message={errors.tanggal_berakhir} />
            </div>

            <button type='submit' disabled={processing}
              // href="#my_modal_8"
              className="my-13 btn-glass">Simpan
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg> */}
            </button>
            {/* content */}
            <section className="mt-20">

              {exam.map((data, i) => {
                if (!data.is_essay) {
                  return (
                    <div className="card w-4/4 my-3  bg-secondary text-primary-content" key={i}>
                      <div className="card-body">
                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                        <p>{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
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
                            setEditPoint(data.point)
                            setImgDelete('');
                            setEditIsEssay(false);
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

                              {imageEdit ?
                                <div className='flex justify-center'>
                                  <img src={blobUrlEdit()} alt="Gambar" className='max-h-60' />
                                </div>
                                :
                                <div className='flex justify-center'>
                                  <img src={'/storage/' + data.image + imgDelete} className='max-h-60' />
                                </div>
                              }
                              {/* {data.image && <img src={'/storage/'+data.image} className='max-h-32'></img>} */}
                              <label className="label">
                                <span className="label-text font-bold">Gambar</span>
                              </label>
                              <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setEditImage(e.target.files[0])} />
                              <a className='mx-3 btn btn-primary' onClick={() => {
                                setEditImage(null)
                                setImgDelete('a')
                                setIsDeleteImg(true)
                              }}><IoTrashSharp></IoTrashSharp></a>

                              <label className="label">
                                <span className="label-text font-bold">Pertanyaan</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={questionEdit} onChange={(question) => setEditQuestion(question.target.value)} />

                              <label className="label">
                                <span className="label-text font-bold">Subject</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={subjectEdit} onChange={(subject) => setEditSubject(subject.target.value)} />

                              <label className="label">
                                <span className="label-text font-bold">Point</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={pointEdit} onChange={(point) => setEditPoint(point.target.value)} onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }} />

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
                                {choiceEdit.map((choice, i) => {
                                  if (i == data.choice.indexOf(data.actual_answer)) {
                                    return (<option key={i} selected>{choice}</option>)
                                  } else {
                                    return (<option key={i}>{choice}</option>)
                                  }
                                }
                                )}
                              </select>

                              <div className='flex justify-between'>
                                <button type="submit" className="btn btn-secondary mt-6">Save</button>

                                {flash.message?.substr(0, data.id.toString().length) == data.id.toString() && showSuccess ?
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
                                      setEditPoint(data.point);
                                      setIsDeleteImg(false)
                                      setImgDelete('');
                                      setEditImage(null);
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
                  )
                } else {
                  return (
                    <div className="card w-4/4 my-3 bg-secondary text-primary-content" key={i}>
                      <div className="card-body">
                        {/* <h2 className="card-title">Soal nomor 1</h2> */}
                        {data.image && <img src={'/storage/' + data.image} className='justify-start max-w-2xl'></img>}
                        <p>{i + 1}. {data.question} {'(' + data.point + ' points)'}</p>
                        <div className="card-actions justify-start">
                          {/* <button className="btn">Buy Now</button> */}
                          <h1>Jawaban : Essay</h1>
                        </div>

                        <div className="card-actions justify-end">
                          {/* <button className="btn">Buy Now</button> */}
                          <PrimaryButton onClick={() => {
                            setEditPoint(data.point);
                            setEditActualAnswer("Jawaban essay");
                            setEditIsEssay(true);
                            setIdEdit(data.id);
                            setEditQuestion(data.question);
                            setEditChoice(["soal essay"]);
                            setEditSubject(data.subject);
                            document.getElementById('edit_data' + data.id.toString()).showModal()
                          }
                          }>Edit</PrimaryButton> <PrimaryButton onClick={() => { confirmDelete(data.id) }} >Delete</PrimaryButton>
                        </div>

                        <dialog id={"edit_data" + data.id} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit data soal</h3>

                            <form onSubmit={editSoal}>
                              {imageEdit ?
                                <div className='flex justify-center'>
                                  <img src={blobUrlEdit()} alt="Gambar" className='max-h-60' />
                                </div>
                                :
                                <div className='flex justify-center'>
                                  <img src={'/storage/' + data.image + imgDelete} className='max-h-60' />
                                </div>
                              }
                              <label className="label">
                                <span className="label-text font-bold">Gambar</span>
                              </label>
                              <input type="file" className="bg-white file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e => setEditImage(e.target.files[0])} />
                              <a className='btn btn-primary mx-3' onClick={() => {
                                setEditImage(null)
                                setImgDelete('a')
                                setIsDeleteImg(true)
                              }}><IoTrashSharp></IoTrashSharp></a>

                              <label className="label">
                                <span className="label-text font-bold">Pertanyaan</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={questionEdit} onChange={(question) => setEditQuestion(question.target.value)} />

                              <label className="label">
                                <span className="label-text font-bold">Subject</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={subjectEdit} onChange={(subject) => setEditSubject(subject.target.value)} />

                              <label className="label">
                                <span className="label-text font-bold">Point</span>
                              </label>
                              <input type="text" className="bg-white mb-2 input input-bordered input-primary w-full" value={pointEdit} onChange={(point) => setEditPoint(point.target.value)} onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }} />

                              <div className='flex justify-between'>
                                <button type="submit" className="btn btn-secondary mt-6">Save</button>

                                {flash.message?.substr(0, data.id.toString().length) == data.id.toString() && showSuccess ?
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
                                      setEditPoint(data.point);
                                      setIsDeleteImg(false)
                                      setEditImage(null);
                                      setShowSuccess(false);
                                      setImgDelete('');
                                    }}>Cancel</button>
                                  </form>
                                </div>
                              </div>

                            </form>

                          </div>
                        </dialog>
                      </div>
                    </div>
                  )
                }
              }
              )}

            </section>




            {/* end of content               */}
          </div>

        </div>
        <AdminDrawer></AdminDrawer>


      </div>
    </div>
  )
}