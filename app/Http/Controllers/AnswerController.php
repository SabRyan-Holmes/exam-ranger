<?php

namespace App\Http\Controllers;

use App\Models\Answer;
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
        // ddd($request);
        $validatedData = $request->validate([
            'answer' => 'required|array|max:255',
            'student_id' => 'required',
            'exam_subject' => 'required|max:20',
        ]);

        Answer::create($validatedData);
        return Redirect::route('home');
        // return Redirect::route('exam.done')->with(['data' => $validatedData]);
        
        // return redirect()->back()->with('message', 'Postingan Berhasil Dibuat');
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