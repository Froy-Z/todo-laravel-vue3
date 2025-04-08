<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private Object $user;
    private Request $request;
    private taskService $taskService;
    public function __construct(Request $request)
    {
        $this->user = $request->user();
        $this->request = $request;
        $this->taskService = new TaskService();
    }

    public function index(): JsonResponse
    {
        $tasks = Task::query()->where('user_id', $this->user->id)->get();

        return response()->json($tasks);
    }

    public function store(): JsonResponse
    {
        $this->request->validate(['title' => 'required']);

        $task = Task::query()->create([
            'user_id' => $this->request->user()->id,
            'order' => $this->request->order,
            'title' => $this->request->title,
        ]);

        $this->taskService->resequenceUserTasks(auth()->id());

        return response()->json([
            'message' => 'Задача создана',
            'task' => $task
        ]);
    }

    public function update(int $id): JsonResponse
    {
        $this->request->validate(['title' => 'required']);

        $task = Task::query()->findOrFail($id);
        $task->update([
            'user_id' => $this->request->user()->id,
            'order' => $this->request->order,
            'title' => $this->request->title,
        ]);

        return response()->json([
            'message' => 'Задача обновлена',
            'task' => $task
        ]);
    }

    public function destroy($id) {
        Task::query()->where(['id' => $id, 'user_id' => $this->user->id])->delete();
        $this->taskService->resequenceUserTasks(auth()->id());

        return response()->json(['message' => 'Задача удалена']);
    }
}
