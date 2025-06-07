import React from 'react';

// Dummy data for reports
const dummyReports = [
  {
    id: 1,
    name: 'Accessibility & UX Report - ACME Association',
    date: '2025-06-07',
    status: 'Ready',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Accessibility & UX Report - Beta Org',
    date: '2025-06-01',
    status: 'Ready',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Accessibility & UX Report - Gamma Society',
    date: '2025-05-28',
    status: 'Ready',
    downloadUrl: '#',
  },
];

const ReportListView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Accessibility & UX Reports</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-light transition">Generate New Report</button>
      </div>
      <table className="min-w-full divide-y divide-neutral-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-dark">Report Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-dark">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-dark">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-dark">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-100">
          {dummyReports.map((report) => (
            <tr key={report.id}>
              <td className="px-4 py-3 text-neutral-dark">{report.name}</td>
              <td className="px-4 py-3 text-neutral-DEFAULT">{report.date}</td>
              <td className="px-4 py-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {report.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <a href={report.downloadUrl} className="bg-accent text-neutral-dark px-3 py-1.5 rounded-lg font-medium shadow hover:bg-amber-400 transition mr-2">Download PDF</a>
                <button className="bg-secondary text-white px-3 py-1.5 rounded-lg font-medium shadow hover:bg-green-600 transition">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportListView;
