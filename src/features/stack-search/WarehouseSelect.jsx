import './WarehouseSelect.css';

export default function WarehouseSelect({ warehouses, value, onChange }) {
  return (
    <div className="warehouse-select">
      <label className="warehouse-select__label">
        Склад
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="warehouse-select__input"
      >
        <option value=""><p className='txtrr'>— Выберите склад —</p></option>
        {warehouses.map(wh => (
          <option key={wh.id} value={wh.id}>
            Склад {wh.id} ({wh.stackCount || 0} штабелей)
          </option>
        ))}
      </select>
    </div>
  ); 
}