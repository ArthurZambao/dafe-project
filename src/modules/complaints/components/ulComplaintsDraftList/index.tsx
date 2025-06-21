import { Trash } from 'lucide-react';

import { ComplaintsDraftData } from '@/types/draftsDatas';

interface UlDraftListProps {
  drafts: ComplaintsDraftData[];
  handleLoadDraft: (draft: ComplaintsDraftData) => void;
  deleteDraft: (draftId: string) => () => void;
}

export function UlComplaintsPostDraftList({
  drafts,
  handleLoadDraft,
  deleteDraft,
}: UlDraftListProps) {
  return (
    <ul className="flex flex-col gap-1 text-sm text-gray-600 max-h-40 overflow-y-auto">
      {drafts.map((draft) => (
        <li
          key={draft.id}
          className="text-md text-white btn-dafe btn-dafe-hover flex gap-2 items-center justify-center px-4 py-2"
        >
          <span onClick={() => handleLoadDraft(draft)}>
            Rascunho -{' '}
            {new Date(Number(draft.id)).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <Trash
            size={20}
            className="hover:text-black duration-200"
            onClick={deleteDraft(draft.id)}
          />
        </li>
      ))}
    </ul>
  );
}
