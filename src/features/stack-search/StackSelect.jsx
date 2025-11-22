export default function StackSelect({ stacks, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Штабель
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={!stacks || stacks.length === 0}
      >
        <option value="">— Выберите штабель —</option>
        {stacks?.map(s => (
          <option key={s} value={s}>Штабель {s}</option>
        ))}
      </select>
    </div>
  );
}