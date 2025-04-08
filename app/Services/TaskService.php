<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function resequenceUserTasks(int $userId): void
    {
        $tasks = Task::query()
            ->where('user_id', $userId)
            ->orderBy('order')
            ->get();

        foreach ($tasks as $index => $task) {
            $task->update(['order' => $index + 1]);
        }
    }
}
