import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Head, useForm } from '@inertiajs/react';
import AdminDrawer from '@/Components/AdminDrawer';
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react";
import { router } from '@inertiajs/react';
import subjectImage from '@/../assets/subject_image.jpg';
import { FiEye } from "react-icons/fi";
import moment from "moment/min/moment-with-locales";
import { FaUserEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";


export default function AdminPageSoalTipe({ auth, flash, title, exams, subject }) {
  let arrExams = Object.keys(exams)

  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (flash.message?.substr(0, 11) != null) {
      setShowSuccess(true)
    }
  }, [flash.message]);

  function submit(e) {
    e.preventDefault()
    post(route('admin.create-soal', data, {
      _method: 'POST'
    }));
  }

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
    subject: subject
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
  };

  function blobUrl() {
    const url = URL.createObjectURL(data.image)
    return url
  }

  function blobUrlEssay() {
    const url = URL.createObjectURL(image)
    return url
  }

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

  function submitEssay(e) {
    e.preventDefault()

    const essay = {
      question, choice, image, is_essay, actual_answer, exam_started, exam_ended, exam_duration, point, subjects
    }

    router.post('/dashboard/soal/add-soal', essay)
  }
  moment.locale('id')
  return (
    <div className='h-full'>
      <Head title={title} />

      <div className="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-neutral h-full">
          <Navbar user={auth.user} />
          <div className='mx-6 mt-6 h-full'>

            {/* content */}
            <div className='flex justify-between'>
              <h1 className='font-bold'>Daftar Subject Ujian</h1>
              <div>
                <PrimaryButton onClick={() => { document.getElementById('create_data_essay').showModal() }}>Tambah soal essay</PrimaryButton>
                <PrimaryButton onClick={() => { document.getElementById('create_data').showModal() }}>Tambah soal pilihan ganda</PrimaryButton>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Nama Materi Ujian</th>
                    <th>Banyak Soal</th>
                    <th>Durasi</th>
                    <th>Tanggal Dibuat</th>
                    <th>Terakhir Diupdate</th>
                    <th className='pl-28'>Aksi</th>
                  </tr>
                </thead>
                <tbody>

                  {arrExams.map((subject, i) => {
                    console.log(exams[subject]);
                    console.log(exams[subject][0].question);
                    // console.log('length')
                    // console.log(subject.answer.length)
                    // let length = Object.keys(subject.answer).length
                    var data = exams[subject]
                    console.log("isi data ke" + (i + 1))
                    console.log(data)
                    return (
                      <tr key={i}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={subjectImage} alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{subject}</div>
                              <div className="text-sm opacity-50">Kedokteran</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {data.length}
                          <br />
                        </td>
                        <td>
                          <>{data[0].exam_duration} Menit</>
                        </td>

                        <td>
                          {moment(data[0].created_at).fromNow()}
                        </td>
                        <td>
                          {moment(data[0].updated_at).fromNow()}
                        </td>

                        <td className="flex justify-start">
                          {/* Button View */}
                          <Link href={route('admin.soal', { subject })}>
                            <button className='bg-slate-500/80 px-8 scale-75 btn glass'>
                              <FiEye className='scale-[2.4] stroke-yellow-500'
                              >
                              </FiEye>
                            </button>
                          </Link>

                          {/* Button Edit */}
                          <Link href={route('admin.soal', { subject })}>

                            <button className='bg-slate-500/80  scale-75 btn glass'>
                              <IconContext.Provider
                                value={{ color: '#16a34a', size: '50px' }}
                              >
                                <FaUserEdit className='max-h-7' />
                              </IconContext.Provider>
                            </button>
                          </Link>

                          {/* Button Delete */}
                          <button className='transition-all bg-slate-500/80 text- scale-75 btn glass '>
                            <IconContext.Provider className=""
                              value={{ color: '#ef4444', size: '50px' }}
                            >
                              <IoTrashSharp className='max-h-7' />
                            </IconContext.Provider>

                          </button>
                        </td>
                      </tr>
                    )
                  }

                  )}




                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Nama Materi Ujian</th>
                    <th>Banyak Soal</th>
                    <th>Durasi</th>
                    <th>Tanggal Dibuat</th>
                    <th>Terakhir Diupdate</th>
                    <th className='pl-28'>Aksi</th>
                  </tr>
                </tfoot>

              </table>
            </div>
            {/* {arrExams.map((subject, i) => {
                            console.log(exams[subject]);
                            console.log(exams[subject][0].question);
                            return (
                                <Link href={route('admin.soal', { subject })} >
                                    <div className="mb-2  card w-fit shadow-md hover:bg-primary/30 ">
                                        <div className="m-6 rounded-md   ">
                                            <div className="card-actions  items-center ">
                                                <strong className="mr-1">{subject}</strong>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 stroke-primary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                </svg>

                                                <div className="mr-4">
                                                    <p className="font-bold text-lg -mb-2">{exams[subject].length} Soal </p>
                                                    <p className="font-light text-slate-500">Essay & Pilihan Ganda </p>
                                                </div>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                    stroke="currentColor" className="w-8 h-8 stroke-primary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                                <div className="">
                                                    <p className="font-bold text-lg -mb-1">{exams[subject][0].exam_duration} Menit </p>
                                                    <p className="font-light text-slate-500">10:00 - & 11-00 WIB </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            )
                        })} */}

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

            {/* end of content               */}
          </div>

        </div>
        <AdminDrawer></AdminDrawer>


      </div>
    </div>
  )
}