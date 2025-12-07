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

    private function validate()
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

        return $validated;
    }

    public function store()
    {
        $validated = $this->validate();

        Auth::user()->events()->create($validated);

        return redirect()->route('event.index')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Event "'.str($validated['name'])
                    ->limit(preserveWords: true).'" has been created.',
            ]);
    }

    private function findEvent(string $eventId)
    {
        $event = Event::where('id', $eventId)
            ->where('user_id', Auth::id())
            ->firstOrFail()
            ->toResource();

        return $event;
    }

    public function edit(string $eventId)
    {
        $event = $this->findEvent($eventId);

        return inertia('event/edit', compact('event'));
    }

    public function update(string $eventId)
    {
        $event = $this->findEvent($eventId);

        $validated = $this->validate();

        $event->update($validated);

        return redirect()->route('event.index')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Event "'.str($validated['name'])
                    ->limit(preserveWords: true).'" has been updated.',
            ]);
    }

    public function delete(string $eventId)
    {
        $event = Event::where([
            ['id', $eventId],
            ['user_id', Auth::id()],
        ])->first();

        if ($event) {
            $event->delete();

            return redirect()->route('event.index')
                ->with('flashMessage', [
                    'type' => 'success',
                    'text' => 'Event "'.str($event['name'])
                        ->limit(preserveWords: true).'" has been deleted.',
                ]);
        }

        return redirect()->route('event.index');
    }
}
