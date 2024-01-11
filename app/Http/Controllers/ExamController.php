<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Datetime;
use DateInterval;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $exam = Exam::where('subject', $request->subject)->get();
        // dd($exam);
        return Inertia::render('Exam/ExamPage', [
            'title' => "Exam",
            'subject' =>  $request->subject,
            'exam' => $exam,
            // 'status' => session('status'),
        ]);
    }

    public function all()
    {
        $exams = Exam::all()->groupBy('subject');
        return Inertia::render('StudentHome', [
            'title' => "Exam",
            'exams' => $exams,
            // 'status' => session('status'),
        ]);
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
    public function show(Request $request)
    {
        $exam = Exam::where('subject', $request->subject)->get();

        
        function menitKeTimestamp($menit) {
            // Membuat objek DateTime untuk hari ini
            $sekarang = new DateTime();
        
            // Menghitung waktu tambahan berdasarkan menit
            $waktuTambahan = $menit * 60 * 1000;
            // $waktuTambahan = menitKeTimestamp($menit);
        
            // Menambahkan waktu tambahan ke objek DateTime
            $sekarang->add(new DateInterval('PT' . round($waktuTambahan / 1000) . 'S'));
        
            // Mendapatkan timestamp dalam milidetik
            $timestamp = $sekarang->getTimestamp() * 1000;
        
            return $timestamp;
        }
        
        // Contoh penggunaan fungsi
        $menit = $exam[0]->exam_duration;
        $timestampMs = menitKeTimestamp($menit);
        // dd($timestampMs);

        return Inertia::render('Exam/ExamPage', [
            'title' => "Exam",
            'subject' =>  $request->subject,
            'exam' => $exam,
            'timestampForTimer' => $timestampMs
            // 'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        //
    }
}