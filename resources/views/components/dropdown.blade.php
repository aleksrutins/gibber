@props(['align' => 'right', 'direction' => 'down', 'width' => '48', 'contentClasses' => 'py-1 bg-white'])

@php

switch ($direction) {
    case 'down':
        $origin = 'top';
        $directionClasses = 'mt-2';
        break;
    case 'up':
        $origin = 'bottom';
        $directionClasses = 'mb-2 bottom-8';
}

switch ($align) {
    case 'left':
        $alignmentClasses = "origin-{$origin}-left left-0";
        break;
    case 'top':
        $alignmentClasses = "origin-{$origin}";
        break;
    case 'right':
    default:
        $alignmentClasses = "origin-{$origin}-right right-0";
        break;
}

switch ($width) {
    case '48':
        $width = 'w-48';
        break;
}
@endphp

<div class="relative" x-data="{ open: false }" @click.outside="open = false" @close.stop="open = false">
    <div @click="open = ! open">
        {{ $trigger }}
    </div>

    <div x-show="open"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 scale-95"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-95"
            class="absolute z-50 {{ $directionClasses }} {{ $width }} rounded-md shadow-lg {{ $alignmentClasses }} bg-white/70 backdrop-blur"
            style="display: none;"
            @click="open = false">
        <div class="rounded-md ring-1 ring-black ring-opacity-5 {{ $contentClasses }}">
            {{ $content }}
        </div>
    </div>
</div>
