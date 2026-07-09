import React from 'react';

const PlayerStatistics = () => {
  // Mock data for the tables
  const goalScorers = [
    { id: 1, name: "David Miller", team: "Engineering FC", count: 12 },
    { id: 2, name: "Tunde Bakare", team: "Science Utd", count: 9 },
    { id: 3, name: "Chris Evans", team: "Strikers United", count: 7 },
  ];

  const cleanSheets = [
    { id: 1, name: "Samuel Okon", team: "Engineering FC", count: 6 },
    { id: 2, name: "Victor Moses", team: "Agric Stars", count: 4 },
    { id: 3, name: "Isaac Newton", team: "Tech Titans", count: 3 },
  ];

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="matches-section mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-blue-600 inline-block">
          Statistics
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Goal Scorers Table */}
        <section className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-4 text-lg font-semibold">Goal Scorers</th>
                <th className="p-4 text-right">Goals</th>
              </tr>
            </thead>
            <tbody>
              {goalScorers.map((player) => (
                <tr key={player.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{player.name}</div>
                    <div className="text-xs text-gray-500">{player.team}</div>
                  </td>
                  <td className="p-4 text-right font-black text-blue-700 text-xl">
                    {player.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Clean Sheets Table */}
        <section className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-4 text-lg font-semibold">Clean Sheets</th>
                <th className="p-4 text-right">CS</th>
              </tr>
            </thead>
            <tbody>
              {cleanSheets.map((keeper) => (
                <tr key={keeper.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{keeper.name}</div>
                    <div className="text-xs text-gray-500">{keeper.team}</div>
                  </td>
                  <td className="p-4 text-right font-black text-green-700 text-xl">
                    {keeper.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};

export default PlayerStatistics;