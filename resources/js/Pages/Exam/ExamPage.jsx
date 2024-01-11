import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useRef, useState, useEffect } from 'react'
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import CountdownTimer from '@/Components/CountdownTimer';


const ExamPage = ({ auth, exam, title, subject, timestampForTimer }) => {
    const [active, setActive] = useState(0)

    // Logic Timer



    console.log('isi timestamp' + timestampForTimer)

    // Submit Data to Answer db

    const [answer, setAnswer] = useState(Array(exam.length).fill(null))
    const [answered, setAnswered] = useState(Array(exam.length).fill(false))
    let [alreadyAnswered, setAlreadyAnswered] = useState(0)

    function setSumAnswered() {
        answer.map((answered) => {
            if (answered != null) {
                alreadyAnswered++;
            }
        })

    }
    const { data, post, processing, recentlySuccessful } = useForm({
        answer: null,
        student_id: auth.user.id,
        exam_subject: subject,
    });

    const datachoice = [
        {
            choice: '',
        },
    ];



    const [tempChoice, setTempChoice] = useState(datachoice);

    function updateStateAnswer(index, value) {
        const newArray = tempChoice.map((item, i) => {
            if (index === i) {
                return { ...item, choice: value };
            } else {
                return item;
            }
        });
        setTempChoice(newArray)
        const trueChoice = []
        newArray.map((choices) => {
            trueChoice.push(choices.choice)
        })
    };

    useEffect(() => {
        if (localStorage.getItem("answer" + subject) != null) {
            setAnswer(localStorage.getItem("answer" + subject).toString().split(","))
        }
        setTimestamp(timestampForTimer)
    }, [])

    const [timestamp, setTimestamp] = useState(timestampForTimer);

    // Fungsi untuk mengurangi timestamp setiap detik
    const decreaseTimestamp = () => {
        setTimestamp(prevTimestamp => prevTimestamp);
    };

    // Effect untuk memulai pengurangan saat komponen dimount
    useEffect(() => {

        // if
        // Fungsi untuk mengurangi timestamp setiap detik
        const intervalId = setInterval(decreaseTimestamp, 1000);

        // Simpan nilai timestamp ke dalam localStorage
        localStorage.setItem('timestamp', timestamp.toString());
        console.log('isi local storage timestamp ' + localStorage.getItem('timestamp'))
        // Membersihkan interval jika komponen di-unmount
        return () => clearInterval(intervalId);
    }, [timestamp]);

    const updateStateEditAnswer = (index) => (e) => {
        const trueAnswer = answer.toString().split(",")
        trueAnswer[index] = e.target.value
        localStorage.setItem("answer" + subject, trueAnswer)
        answered[index] = true
        localStorage.setItem("answered" + subject, answered)
        setAnswer(trueAnswer)
    };

    function handleChoices(choice) {
        console.log("choice value : " + choice)
        if (answer[active] != null) {
            updateStateAnswer(active, choice)
            answer[active] = choice
            setSumAnswered()
        } else {
            updateStateAnswer(active, choice)
            answer[active] = choice
            setSumAnswered()
        }
        answered[active] = true
        localStorage.setItem("answer" + subject, answer)
        localStorage.setItem("answered" + subject, answered)
        console.log(`isi yang banyak soal yg udah dijawab : ${alreadyAnswered}`)
    }

    console.log("All Answer : " + answer)

    function handleSubmit() {
        data.answer = answer
        post(route('exam.submit', { data }));
        console.log(`isi data ke database ${data}`)
        console.log("done ???")

    }

    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            {/* container */}
            <div className="flex mx-auto justify-center ">

                <div className="m-7 mr-4 rounded-lg max-w-5xl w-full pb-12 bg-secondary ">
                    {/* Time */}
                    <div className="flex items-center  w-1/2">
                        <svg className="m-7 mr-4 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div>
                            <p>Sisa waktu</p>
                            <CountdownTimer countdownTimestampMs={timestamp} />
                        </div>
                    </div>

                    {/* Question */}
                    <div className='m-9 mb-4 w-1/2 '>
                        <strong>Pertanyaan {active + 1} dari {exam.length}</strong>
                        <br />
                        <strong className='text-slate-600 '>{2} point</strong>

                        {/* Logika Gambar Soal jika ada */}
                        {/* {exam.image == null ? : } */}

                        <p className='mt-1'>{exam[active].question}</p>
                    </div>

                    {/* Choice & Essay*/}
                    {exam[active].is_essay == 0 || false ?
                        <div className='m-7 w-80 grid grid-cols-2 gap-2'>
                            <p className=" ml-3 font-semibibold w-full">Pilih salah satu</p>
                            <br />

                            {exam[active].choice.map((choice, i) => {
                                const letter = ['A', 'B', 'C', 'D']
                                return <button onClick={() => { handleChoices(choice) }} className={' shadow-lg ring-1 normal-case p-2 rounded-lg border ' + (answer[active] == choice ? 'bg-primary' : 'bg-white')} >
                                    <strong>
                                        {letter[i]} . {choice}
                                    </strong>
                                </button>
                            })}
                        </div>
                        :

                        <div className="ml-10 w-2/5">
                            <InputLabel className="my-2" htmlFor="body" value="Jawaban" />
                            <textarea id="essay" className="w-full border-primary rounded-lg bg-base-100/35 " name='body' placeholder="ketik jawabanmu disini" value={answer[active]}
                                onChange={updateStateEditAnswer(active)}
                            />

                        </div>
                    }



                    {/* Prev & Next */}
                    <div className="w-full mx-auto flex justify-center gap-7 font-bold ">
                        {active > 0 &&
                            <button className="bg-white shadow-lg ring-1 focus:glass focus:bg-secondary/70  p-3 rounded-lg border m-2  px-5" onClick={() => { setActive(active - 1), setPlus(active - 1) }}>
                                Prev
                            </button>

                        }

                        {active + 1 < exam.length &&
                            <button className="bg-primary/50 shadow-lg ring-1  hover:bg-primary/70 p-3 rounded-lg border m-2 border-primary px-5 " onClick={() => { setActive(active + 1); setPlus(active + 1) }}>
                                Next
                            </button>
                        }
                    </div>


                </div>

                {/* Number Navigation  & Etc*/}
                <div className="mt-7 border-2 border-primary rounded-lg m-5 ml-0 p-1 ">
                    <strong className="p-3 ">Quiz Navigation</strong>
                    <div className="grid grid-cols-10 gap-2 text-center m-1">
                        {answer.map((answered, i) => {
                            return <button onClick={() => { setActive(i) }} className={' shadow-lg ring-1 p-2 rounded-lg border ' + (active == i ? 'bg-primary' : (answered?.length == 0 || answered == null ? 'bg-secondary' : 'bg-green-400'))} >{i + 1}</button>

                        })}
                    </div>

                    <div className="justify-center items-center flex mt-10">
                        <div className=" w-28 h-28 radial-progress text-primary font-extrabold  border-4 border-orange-300 text-lg " style={{ "--value": (active + 1) / exam.length * 100, "--size": "12rem", "--thickness": "5px" }} role="progressbar">{alreadyAnswered} /{exam.length} <span className='text-sm'>
                            Terjawab</span></div>
                        {/* <label htmlFor="my_modal_7">
                                Kumpul Jawaban
                        </label> */}
                        {/* The button to open modal */}
                        <PrimaryButton className="my-10" onClick={() => document.getElementById('my_modal_1').showModal()} disabled={processing}>Kumpul Jawaban
                            {/* <label htmlFor="my_modal_7" >Kumpul Jawaban</label> */}
                        </PrimaryButton>

                        {/* Put this part before </body> tag */}
                        {/* <input type="checkbox" id="my_modal_1" className="modal-toggle" /> */}
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box bg-base-100/90">
                                <h3 className="text-lg font-bold">Yakin Ingin Mengumpulkan Sekarang ?</h3>
                                <p className="py-2">Pastikan jawaban anda sudah diisi dengan jujur & benar !</p>
                                <div className="modal-action">
                                    <form method="dialog" >
                                        {/* if there is a button in form, it will close the modal */}
                                        <PrimaryButton className="my-6" onClick={handleSubmit} disabled={processing}>
                                            Kumpul Jawaban
                                        </PrimaryButton>
                                        <PrimaryButton className="bg-red-500 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                            Cancel</PrimaryButton>
                                    </form>
                                </div>

                                <label className="modal-backdrop" htmlFor="my_modal_1" >Close</label>
                            </div>
                        </dialog>
                    </div>



                </div>

            </div>

        </Authenticated>
    )
}

export default ExamPage