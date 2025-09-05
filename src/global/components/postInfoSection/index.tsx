import { PostInfoSectionProps } from '@/types/postInfoSection';
import { MessageSquareText, ThumbsUp } from 'lucide-react';

interface Props extends PostInfoSectionProps {
  isInteracted: boolean;
}

export function PostInfoSection({
  interacao,
  commentsCount,
  addInterationFunc,
  isInteracted,
}: Props) {
  return (
    <div className="flex gap-4 sm:justify-start justify-center font-semibold">
      <button
        onClick={!isInteracted ? addInterationFunc : undefined}
        disabled={isInteracted}
        className={`flex gap-2 items-center border text-azure-primary border-[#0B4079] rounded-xl text-base px-4 sm:px-6 py-2 transition-colors duration-200 ${
          isInteracted ? '' : ' hover:text-gray-400 cursor-pointer'
        }`}
      >
        <span>{interacao}</span>
        <ThumbsUp className={`w-5 h-5 ${isInteracted ? 'stroke-[#0B4079] fill-[#0B4079]' : ''}`} />
      </button>

      <button className="flex gap-2 items-center border border-[#0B4079] rounded-xl text-base text-[#0B4079] px-4 sm:px-6 py-2">
        <span>{commentsCount}</span>
        <MessageSquareText className="w-5 h-5" />
      </button>
    </div>
  );
}
