<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Exam;
use App\Models\Overview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

        $validatedData = $request->validate([
            'answer' => 'required|array|max:255',
            'student_id' => 'required',
            'exam_subject' => 'required|max:20',
        ]);
        
        // Simpan jawaban
        $answer = Answer::updateOrCreate(
            ['student_id' => $validatedData['student_id'], 'exam_subject' => $validatedData['exam_subject']],
            [ 'answer' => $validatedData['answer']]    
        );
        
        // Ambil jawaban yang sesuai dengan urutan
        $studentAnswers = $validatedData['answer'];
        
        // Ambil semua data exam berdasarkan subject
        $exams = Exam::where('subject', $validatedData['exam_subject'])->get();

        // Loop melalui setiap exam
        foreach ($exams as $exam) {
            // Tambah ke array
            $actualAnswers[] = $exam->actual_answer;
            $points[] = $exam->point;
        }
        
        // Zip & Urutkan
        $pairedData = collect($studentAnswers)
            ->zip($actualAnswers, $points);
        
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
        $overview = new Overview([
            'student_id' => $validatedData['student_id'],
            'answer_id' => $answer->id,
            // Nanti diubah jadi banyak yang total benar be
            'is_correct' => $correctAnswered,
            'mark' => $totalPoints,
            'average_mark' => $totalPoints,
            'final_mark' => $totalPoints,
        ]);
        $overview->save();
        
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