<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use App\Models\Overview;
use App\Models\Answer;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\SoalUpdateRequest;
use App\Http\Requests\PesertaUpdateRequest;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('is_admin', false)->count();
        $subject = Subject::all()->count();
        $done = Overview::all()->groupBy('student_id')->count();
        return Inertia::render('Admin/Dashboard', [
            'title' => "Administrator",
            'user' => $user,
            'subject' => $subject,
            'doneSubmitted' => $done,
            'notYet' => $user - $done,

            // 'status' => session('status'),
        ]);
    }

    public function soal(Request $request) {
        $exams = Exam::where('subject_id', $request->get('id'))->get();
        return Inertia::render('Admin/CreateEditExam', [
            'title' => "Soal",
            'exam' => $exams,
            'subject' => $request->get('name'),
            'subject_id' => $request->get('id'),

            // 'status' => session('status'),
        ]);
    }

    public function peserta() {
        $user = User::where('is_admin', false)->get();
        return Inertia::render('Admin/ParticipantPage', [
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
    public function store_soal(SoalUpdateRequest $request)
    {
        if($request->isEssay) {
            $validaata = $request->validate([
                'subject_id' => "required|integer",
                'question' => "required|max:170",
                'is_essay' => "required|boolean",
                'actual_answer' => "required|max:70",
                "choice" => "required|array|min:1",
                "point" => "required|integer"
           ]);
        } else {
            $validatedData = $request->validate([
                'subject_id' => "required|integer",
                'question' => "required",
                'is_essay' => "required",
                'actual_answer' => "required",
                "choice" => "required|array|min:1",
                'choice.*' => "required|string|distinct|min:1",
                "point" => "required"
           ]);
        }
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

    public function editSubject(SoalUpdateRequest $request) {
        dd($request);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SoalUpdateRequest $request)
    {
        $request->validate([
            'questionEdit' => "required",
            'actualAnswerEdit' => "required",
            'subjectEdit' => "required|integer",
            "choiceEdit" => "required|array|min:1",
            'choiceEdit.*' => "required|string|distinct|min:1",
            'pointEdit' => "required",
       ]);
       $data = Exam::find($request->id);
       $data->subject_id = $request->subjectEdit;
       $data->question = $request->questionEdit;
       $data->choice = $request->choiceEdit;
       $data->actual_answer = $request->actualAnswerEdit;
       $data->point = $request->pointEdit;
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

    
    public function all_subject()
    {
        $subject = Subject::all();
        return Inertia::render('Admin/SubjectPage', [
            'title' => "Materi Soal",
            'subjects' => $subject,
            // 'status' => session('status'),
        ]);
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


    // public function edit()
    // {   
    //     return Inertia::render()
    // }

    public function update_peserta(Request $request): RedirectResponse
    {
        // ddd($request->query->get('name'));
        $query = $request->query->all();
        $validatedData = validator($query, [
            'name' => "required|string|min:2|max:30",
            'nim' => [
                'required',
                'min:9',
                'max:12',
                'unique:users,nim,' .$request->query->get('id')
            ],
            'email' => "nullable|string|email:unique|max:40|",
            "password" => ['required', 'confirmed', Rules\Password::defaults()],
       ])->validate();

        $validatedData['password'] = Hash::make($request->query->get('password'));
        User::where('id', $request->query->get('id'))
            ->update($validatedData);

        return Redirect::route('admin.peserta')->with('message', 'Peserta  Berhasil Diupdate');
        
     
    }

    public function destroy_peserta(Request $request)
    {
        User::destroy($request->id);
        return Redirect::route('admin.peserta')->with('message', 'Peserta Berhasil Dihapus');
    }

   
    //    Overview
    public function overview()
    {
        $user = User::where('is_admin', false)->with('subject_with_answered')->get();
        // $answer = Answer::get();
        return Inertia::render('Admin/OverviewPage', [
            'title' => "Daftar Peserta",
            'user' => $user,
            // 'answer' => $answer,
            // 'status' => session('status'),
        ]);
    }

    // Show Answer
    public function show_subject(Request $request)
    {
        // dd($request->subject);
        $exams = Exam::all()->groupBy('subject_id');
        return Inertia::render('Admin/AnsweredSubject', [
            'title' => "Materi Soal ",
            'answeredSubject' => $request->subject,
            
            // 'status' => session('status'),
        ]);
    }

    // Update or Insert
    public function update_subject(Request $request) {
        // dd($request->id);
        // Rules
        $validated = $request->validate([
            'name' => 'required|string|max:20|unique:subjects,name,' .$request->id,
            'exam_duration' => 'required|integer|max:1000',
            'exam_started' => 'required|date',
            'exam_ended' => 'required|date',
            'image' => 'nullable|image|file|max:8000',
            'is_available' => 'nullable',
        ]);
        
        // Logic Image Nanti
        if ($request->file('image')) {
            $imageName = $request->name . '.' . $request->file('image')->getClientOriginalExtension();
            $validated['image'] = $request->file('image')->storeAs('subject-img', $imageName);
        }
        
        // Simpan Update
        Subject::where('id', $request->id)
        ->update($validated);
        return back()->with('message', 'Berhasil Mengedit Materi Ujian');
        
    }

    // Create
    public function store_subject(Request $request) {
        // dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:20|unique:subjects,name,' .$request->id,
            'exam_duration' => 'required|integer|max:1000',
            'exam_started' => 'required|date',
            'exam_ended' => 'required|date',
            'image' => 'nullable|image|file|max:8000',
        ]);
        
        // Logic Image Nanti
        if ($request->file('image')) {
            $imageName = $request->name . '.' . $request->file('image')->getClientOriginalExtension();
            $validated['image'] = $request->file('image')->storeAs('subject-img', $imageName);
        }
        
        // Simpan jawaban
        $subject = Subject::create($validated);
        return back()->with('message', 'Berhasil Menambahkan Materi Ujian Baru');
        
    }



}