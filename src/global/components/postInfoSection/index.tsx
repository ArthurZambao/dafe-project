import { PostInfoSectionProps } from '@/types/postInfoSection';
import { MessageSquareText, ThumbsUp } from 'lucide-react';

export function PostInfoSection({
  interacao,
  commentsCount,
  addInterationFunc,
}: PostInfoSectionProps) {
  return (
    <div className="flex gap-4 sm:justify-start justify-center font-semibold">
      <button
        onClick={addInterationFunc}
        className={`flex gap-2 items-center border border-[#0B4079] rounded-xl text-base text-azure-primary  px-4 sm:px-6 py-2 ${addInterationFunc ? 'cursor-pointer hover:text-gray-400 transition-colors duration-200' : ''}`}
      >
        <span>{interacao}</span>
        <ThumbsUp className="w-5 h-5" />
      </button>

      <button className="flex gap-2 items-center border border-[#0B4079] rounded-xl text-base text-[#0B4079] px-4 sm:px-6 py-2">
        <span>{commentsCount}</span>
        <MessageSquareText className="w-5 h-5" />
      </button>
    </div>
  );
}
