export function MultipleChoiceQuestions() {
  return (
    <div className="flex flex-col gap-4 py-6">
      <textarea
        placeholder="Enunciado da Questão..."
        maxLength={100}
        rows={3}
        className="border-b focus:outline-none focus:ring-0 rounded-t-xl flex-1 pb-2"
      ></textarea>

      {Array.from({ length: 5 }).map((_, index) => (
        <label key={index} className="flex items-center gap-2">
          <input type="checkbox" className="cursor-pointer" />
          <input
            type="text"
            placeholder={`Opção ${index + 1}`}
            className="border-b focus:outline-none focus:ring-0"
          />
        </label>
      ))}
    </div>
  );
}
