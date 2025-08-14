import { ComplaintsDraftData } from "@/types/draftsDatas";
import { UlComplaintsPostDraftList } from "../ulComplaintsDraftList";

interface ComplaintsHeaderCardProps {
    drafts: ComplaintsDraftData[];
    handleLoadDraft: (draft: ComplaintsDraftData) => void;
    deleteDraft: (draftId: string) => void;
}

export function ComplaintsHeaderCard({ drafts, handleLoadDraft, deleteDraft }: ComplaintsHeaderCardProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-8 px-2 sm:px-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
                Fazer Denúncia
            </h2>
            <div>
                <h2 className="text-base sm:text-lg font-semibold text-black mb-2">Rascunhos</h2>
                <UlComplaintsPostDraftList
                    drafts={drafts}
                    handleLoadDraft={handleLoadDraft}
                    deleteDraft={(draftId) => () => deleteDraft(draftId)}
                />
            </div>
        </div>
    )
}