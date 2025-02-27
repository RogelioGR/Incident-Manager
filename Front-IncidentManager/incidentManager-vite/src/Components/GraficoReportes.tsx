import React from "react";
import { Bar } from "react-chartjs-2"; 
import { ChartData } from "chart.js";

interface GraficoReportesProps {
    title: string;
  data: ChartData<"bar",  number[], string>; 
}

const GraficoReportes: React.FC<GraficoReportesProps> = ({ data }) => {
  return (
    <div style={{ height: "200px" }}>
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default GraficoReportes;
