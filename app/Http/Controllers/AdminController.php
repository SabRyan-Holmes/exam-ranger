<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\SoalUpdateRequest;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/AdminPage', [
            'title' => "Administrator",
            // 'status' => session('status'),
        ]);
    }

    public function soal(Request $request) {

        $exam = Exam::where('subject', $request->subject)->get();
        // ddd($request->subject);
        return Inertia::render('Admin/AdminPageSoal', [
            'title' => "Soal",
            'exam' => $exam,
            'subject' => $request->subject,

            // 'status' => session('status'),
        ]);
    }

    public function peserta() {
        $user = User::where('is_admin', false)->get();
        return Inertia::render('Admin/AdminPagePeserta', [
            'title' => "Daftar Peserta",
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
        $validatedData = $request->validate([
            'question' => "required",
            'is_essay' => "required",
            'actual_answer' => "required",
            'subject' => "required",
            "choice" => "required|array|min:1",
            'choice.*' => "required|string|distinct|min:1",
            "exam_started" => "required",
            "exam_ended" => "required",
            "exam_duration" => "required"
       ]);
       if($request->image != null) {
           $validatedData['image'] = $request->file('image')->store('exam-images');
       };
        Exam::create($validatedData);
        return back()->with('message', 'suksesinput'.strval(rand()));
    }

    public function store_peserta(Request $request)
    {
        $request->validate([
            'name' => "required|string|min:2|max:30",
            'nim' => "required|min:9|max:12|unique:users",
            'email' => "nullable||string|email:unique|max:40|unique:users",
            "password" => ['required', 'confirmed', Rules\Password::defaults()],
       ]);

       $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'nim' => $request->nim,
        'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        
        return back()->with('message', 'Berhasil Menambahkan Peserta');
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
       if($request->imageEdit != null){
        $data->image = $request->file('imageEdit')->store('exam-images');
        $data->update($request->except(['imageEdit']));
       } else {
        if($request->isDeleteImg) {
            $data->image = null;
        }
        $data->update($request->except(['imageEdit']));
       }
       return back()->with('message', strval($request->id).strval(rand()));
    }

    public function tipeSoal()
    {
        $exams = Exam::all()->groupBy('subject');
        return Inertia::render('Admin/AdminPageSoalTipe', [
            'title' => "Materi Soal",
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