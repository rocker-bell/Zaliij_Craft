import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import "../Styles/StatistiquesChart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const StatistiquesChart = ({ pieData, barData }) => {
  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h3>Overview Distribution</h3>

        <div className="chart-wrapper">
          {pieData ? (
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

      <div className="chart-card">
        <h3>System Activity</h3>

        <div className="chart-wrapper">
          {barData ? (
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default StatistiquesChart;