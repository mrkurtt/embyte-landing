interface PreviewCoverImageProps {
  url: string | null;
}

export function PreviewCoverImage({ url }: PreviewCoverImageProps) {
  return (
    <div className="px-5">
      <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300">
        <img
          src={url || '/types/wedding.jpg'}
          alt="Wedding cover"
          className="h-52 w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/types/wedding.jpg';
          }}
        />
      </div>
    </div>
  );
}
