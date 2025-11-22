import '/Users/tikhon/.vscode/glowbitefrontend/src/features/stack-search/StackSelect.css'

export default function StackSelect({ stacks, value, onChange }) {
  return (
    <div>
      <label className="pdd">
        Штабель
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="iputvput"
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