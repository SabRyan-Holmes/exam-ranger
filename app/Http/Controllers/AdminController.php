<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\User;
use App\Models\Overview;
use App\Models\Answer;
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
        if($request->isEssay) {
            $validatedData = $request->validate([
                'question' => "required",
                'is_essay' => "required",
                'actual_answer' => "required",
                'subject' => "required",
                "choice" => "required|array|min:1",
                "exam_started" => "required",
                "exam_ended" => "required",
                "exam_duration" => "required",
                "point" => "required"
           ]);
        } else {
            $validatedData = $request->validate([
                'question' => "required",
                'is_essay' => "required",
                'actual_answer' => "required",
                'subject' => "required",
                "choice" => "required|array|min:1",
                'choice.*' => "required|string|distinct|min:1",
                "exam_started" => "required",
                "exam_ended" => "required",
                "exam_duration" => "required",
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
            'pointEdit' => "required",
       ]);
       $data = Exam::find($request->id);
       $data->subject = $request->subjectEdit;
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
        
        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'nim' => $request->nim,
        //     'password' => Hash::make($request->password),
        //     ]);
    }

    public function destroy_peserta(Request $request)
    {
        User::destroy($request->id);
        return Redirect::route('admin.peserta')->with('message', 'Peserta Berhasil Dihapus');
    }

   
    //    Overview
    public function overview()
    {
        $user = User::where('is_admin', false)->with('answer')->get();
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
        $exams = Exam::all()->groupBy('subject');
        return Inertia::render('Admin/AnswerPage', [
            'title' => "Materi Soal ",
            'exams' => $exams,
            'answeredSubject' => $request->subject,
            // 'status' => session('status'),
        ]);
    }

}