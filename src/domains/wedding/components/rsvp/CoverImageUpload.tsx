'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { ImagePlus, X, FileImage, Maximize2 } from 'lucide-react';
import { useFormBuilder } from './FormBuilderContext';

export function CoverImageUpload() {
  const { state, dispatch } = useFormBuilder();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!state.coverImageUrl) {
      setDimensions(null);
      return;
    }

    const img = new Image();
    img.src = state.coverImageUrl;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [state.coverImageUrl]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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
        
        {/* Metadata overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
          <div className="flex gap-3 text-[10px] font-medium text-white/90">
            {state.coverImageFile && (
              <div className="flex items-center gap-1.5 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md border border-white/10">
                <FileImage className="h-3 w-3 text-white/60" />
                <span>{formatFileSize(state.coverImageFile.size)}</span>
              </div>
            )}
            {dimensions && (
              <div className="flex items-center gap-1.5 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md border border-white/10">
                <Maximize2 className="h-3 w-3 text-white/60" />
                <span>{dimensions.width} × {dimensions.height}</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={clearImage}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2233]/80 text-white shadow-lg transition-all duration-200 hover:bg-[#1A2233] hover:scale-110 active:scale-95"
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
        PNG, JPG up to 5MB • 1200 × 800 recommended
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
