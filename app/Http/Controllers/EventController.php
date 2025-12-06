<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        $events = Auth::user()->events()->latest()->get()->toResourceCollection();

        return inertia('event/index', compact('events'));
    }

    public function create()
    {
        return inertia('event/create');
    }

    public function store()
    {
        $validated = request()->validate([
            'name' => [
                'bail',
                'required',
                'string',
                'min:1',
                'max:50',
                'regex:/^[a-zA-Z0-9\s\-._&()\'\"]+$/',
            ],
            'description' => ['bail', 'nullable', 'string', 'max:150'],
            'durationInMinutes' => [
                'bail',
                'required',
                'integer',
                'min:1',
                'max:'.(60 * 12),
            ],
            'isActive' => ['bail', 'required', 'boolean'],
        ]);

        $validated = collect($validated)
            ->mapWithKeys(fn ($value, $key) => [
                match ($key) {
                    'durationInMinutes' => 'duration_in_minutes',
                    'isActive' => 'is_active',
                    default => $key,
                } => $value,
            ])
            ->toArray();

        Auth::user()->events()->create($validated);

        return redirect()->route('event.index')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Event "'.str($validated['name'])
                    ->limit(preserveWords: true).'" has been created.',
            ]);
    }

    public function show(Event $event) {}
}
