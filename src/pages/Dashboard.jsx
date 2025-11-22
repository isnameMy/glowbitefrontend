import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehouseSelect from '../features/stack-search/WarehouseSelect';
import StackSelect from '../features/stack-search/StackSelect';
import Card from '../shared/ui/Card';
import './Dashboard.css'

// 📥 МОК ДАННЫХ от других участников — заменяется на реальный источник
const MOCK_WAREHOUSES = [
  { id: "3", name: "Склад 3", stackCount: 20 },
  { id: "4", name: "Склад 4", stackCount: 50 },
  { id: "6", name: "Склад 6", stackCount: 15 },
];

const MOCK_STACKS_BY_WAREHOUSE = {
  "3": ["1", "2", "3", "4", "5", "7", "9", "10", "12", "13", "17", "20", "21", "26", "27", "29", "31", "33", "34", "36", "38", "41", "43", "48", "50", "55", "56"],
  "4": ["1", "3", "4", "5", "6", "7", "8", "9", "10", "12", "14", "16", "19", "23", "24", "30", "32", "35", "39", "40", "44", "46", "47", "48", "49"],
  "6": ["1", "4", "5", "10", "26", "45", "60"],
};

export default function Dashboard() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const navigate = useNavigate();

  const stacks = selectedWarehouse 
    ? MOCK_STACKS_BY_WAREHOUSE[selectedWarehouse] || [] 
    : [];

  const handleGoToStack = () => {
    if (selectedWarehouse && selectedStack) {
      navigate(`/stack/${selectedWarehouse}/${selectedStack}`);
    }
  };

  return (
    <div className="dashbor">
      <h1 className="font-bold">🔍 Выберите штабель для анализа</h1>
      <div className='meshdy'>

      <Card>
        <WarehouseSelect
          warehouses={MOCK_WAREHOUSES}
          value={selectedWarehouse}
          onChange={setSelectedWarehouse}
        />
      </Card>

      {selectedWarehouse && (
        <Card >
          <StackSelect
            stacks={stacks}
            value={selectedStack}
            onChange={setSelectedStack}
          />

          <div className='kanaly'>
            <button
              onClick={handleGoToStack}
              disabled={!selectedStack}
              className="card"
            >
              Перейти к анализу штабеля {selectedStack}
            </button>
          </div>
        </Card>
      )}

      {/* Подсказка */}
      <div className="primer">
        <p className='ttxtprim'>📌 Примеры данных:</p>
        <ul className="list-disc pl-5 mt-1">
          <li className='txtprim'><strong>Склад 4, штабель 39</strong> — 286°C (2020-07-02)</li>
          <li className='txtprim'><strong>Склад 6, штабель 1</strong> — 294°C (2020-07-20)</li>
          <li className='txtprim'><strong>Склад 4, штабель 4</strong> — 243°C (2020-08-05)</li>
        </ul>
      </div>
      </div>
    </div>
  );
}