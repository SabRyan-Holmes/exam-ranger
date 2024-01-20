<?php

namespace App\Http\Controllers;

use App\Models\Overview;
use App\Models\Exam;
use App\Models\User;
use Illuminate\Http\Request;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function auto_correct()
    {
        //ambil data dari submit
        $data = Session::get('data');

        // Data peserta
        $user = User::where('id', $data->participant_id);
        // Ambil jawaban yang sesuai dengan urutan
        $AllstudentAnswers = $data->answer;
        
        // Ambil semua data exam berdasarkan subject_id
        $exams = Exam::where('subject_id', $data->subject_id)->get();

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
    }

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Overview $overview)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Overview $overview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Overview $overview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Overview $overview)
    {
        //
    }
}