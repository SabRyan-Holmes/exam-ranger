<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Exam;
use App\Models\Overview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use Session;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::where('id', Auth::user()->id);
        
        $validatedData = $request->validate([
            'answer' => 'required|array|max:255',
            'participant_id' => 'required',
        ]);
        
        // Simpan jawaban
        $answer = Answer::updateOrCreate(
            [
                'subject_id' => $request->subject_id, 
                'participant_id' => $validatedData['participant_id'], 
            ],
            [ 'answer' => $validatedData['answer']]    
        );
        
        // Ambil jawaban yang sesuai dengan urutan
        $AllstudentAnswers = $validatedData['answer'];
        
        // Ambil semua data exam berdasarkan subject_id
        $exams = Exam::where('subject_id', $request->subject_id)->get();

        // Loop melalui setiap exam
        foreach ($exams as $key=>$exam) {
            // Tambah ke array (ambil yg pilgan saja)
            if($exam->is_essay == false) {
                $actualAnswers[] = $exam->actual_answer;
                $studentAnswers[] = $AllstudentAnswers[$key];
                $points[] = $exam->point;
            }
        }
        
        // Zip & Urutkan
        $pairedData = collect($studentAnswers)
            ->zip($actualAnswers, $points);
        
        // ddd($pairedData);
        // Hitung jawaban yang benar dan jumlahkan poinnya
        $correctAnswers = $pairedData
            ->filter(function ($pair) {
                return $pair[0] == $pair[1];
            });
        
        $totalPoints = $correctAnswers
            ->sum(function ($pair) {
                return $pair[2]; // Mengambil point dari pair
            });
            
        $correctAnswered = collect($studentAnswers)
            ->zip($actualAnswers)
            ->filter(function ($pair) {
                return ($pair[0] == $pair[1]);
            })->count();
        
        // Masukkan ke tabel Overview Sementara
        
        // Simpan informasi di tabel Overview
        Overview::create([
            'participant_id' => $validatedData['participant_id'],
            'answer_id' => $answer->id,
            'subject_id' => $request->subject_id,
            // Nanti diubah jadi banyak yang total benar be
            'multiple_choice_correct' => $correctAnswered,
            'temporary_mark' => $totalPoints,
        ]);
        
        $user->update(['is_doing_exam' => false]);
        $user->update(['exam_currently_doing' => null]);
        return Redirect::route('home');

    }

    

    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        $data = Session::get('data');
        // ddd($data);
       
        return Inertia::render('Exam/ExamDone', [
            'title' => "Exam Done",
            'answer' =>  $data["answer"],
            'exam_subject' => $data["exam_subject"],
            // 'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Answer $answer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        //
    }
}