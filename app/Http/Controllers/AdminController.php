<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function soal() {
        $exam = Exam::all();
        return Inertia::render('AdminPageSoal', [
            'exam' => $exam,
            // 'status' => session('status'),
        ]);
    }

    public function peserta() {
        $user = User::all();
        return Inertia::render('AdminPagePeserta', [
            'user' => $user,
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
        $request->validate([
            'question' => "required",
            'isEssay' => "required",
            'actualAnswer' => "required",
            'subject' => "required",
            "choice" => "required|array|min:1",
            'choice.*' => "required|string|distinct|min:1",
       ]);
        $exam = new Exam();
        $exam->question = $request->question;
        $exam->is_essay = $request->isEssay;
        $exam->actual_answer = $request->actualAnswer;
        $exam->subject = $request->subject;
        $exam->choice = $request->choice;
        $exam->exam_started = "2024-01-03 10:42:17";
        $exam->exam_ended = "2024-01-03 11:42:17";
        $exam->exam_duration = "90";
        $exam->save();
        return to_route('AdminPageSoal');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
