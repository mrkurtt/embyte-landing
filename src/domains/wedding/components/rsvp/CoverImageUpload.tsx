'use client';

import { useCallback, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { useFormBuilder } from './FormBuilderContext';

export function CoverImageUpload() {
  const { state, dispatch } = useFormBuilder();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const url = URL.createObjectURL(file);
      dispatch({ type: 'SET_FIELD', field: 'coverImageFile', value: file });
      dispatch({ type: 'SET_FIELD', field: 'coverImageUrl', value: url });
      setIsDragOver(false);
    },
    [dispatch],
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const clearImage = useCallback(() => {
    if (state.coverImageUrl) {
      URL.revokeObjectURL(state.coverImageUrl);
    }
    dispatch({ type: 'SET_FIELD', field: 'coverImageFile', value: null });
    dispatch({ type: 'SET_FIELD', field: 'coverImageUrl', value: null });
  }, [dispatch, state.coverImageUrl]);

  if (state.coverImageUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border animate-fade-in-up">
        <img
          src={state.coverImageUrl}
          alt="Cover preview"
          className="h-48 w-full object-cover"
        />
        <button
          type="button"
          onClick={clearImage}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2233]/80 text-white transition-colors duration-200 hover:bg-[#1A2233]"
          aria-label="Remove cover image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={[
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200',
        isDragOver
          ? 'border-[#ff7e5f] bg-[#ff7e5f]/5 scale-[1.02]'
          : 'border-border bg-white/[0.03] hover:border-[#ff7e5f]/30 hover:bg-white/[0.05]',
      ].join(' ')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-label="Upload cover image"
    >
      <ImagePlus className="h-8 w-8 text-muted" />
      <p className="text-sm font-medium text-foreground">
        {isDragOver ? 'Drop image here' : '+ Upload Wedding Cover'}
      </p>
      <p className="text-xs text-muted">
        PNG, JPG up to 5MB
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
