<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\SoalUpdateRequest;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function soal(Request $request) {

        $exam = Exam::where('subject', $request->subject)->get();
        // ddd($request->subject);
        return Inertia::render('Admin/AdminPageSoal', [
            'exam' => $exam,
            // 'status' => session('status'),
        ]);
    }

    public function peserta() {
        $user = User::all();
        return Inertia::render('Admin/AdminPagePeserta', [
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
    public function store(SoalUpdateRequest $request)
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
        return back()->with('message', 'suksesinput'.strval(rand()));
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
    public function edit(SoalUpdateRequest $request)
    {
        $request->validate([
            'questionEdit' => "required",
            'actualAnswerEdit' => "required",
            'subjectEdit' => "required",
            "choiceEdit" => "required|array|min:1",
            'choiceEdit.*' => "required|string|distinct|min:1",
       ]);

       $data = Exam::find($request->id);
       $data->subject = $request->subjectEdit;
       $data->question = $request->questionEdit;
       $data->choice = $request->choiceEdit;
       $data->actual_answer = $request->actualAnswerEdit;
       $data->update();
       return back()->with('message', strval($request->id));
    }

    public function tipeSoal()
    {
        $exams = Exam::all()->groupBy('subject');
        return Inertia::render('Admin/AdminPageSoalTipe', [
            'title' => "Exam",
            'exams' => $exams,
            // 'status' => session('status'),
        ]);
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
    public function destroy(SoalUpdateRequest $request)
    {
        $data = Exam::find($request->id);
        $data->delete();
        return back();
    }
}