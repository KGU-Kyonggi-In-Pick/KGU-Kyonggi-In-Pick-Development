import { Bar } from "react-chartjs-2";
import {
Chart,
LinearScale,
CategoryScale,
BarElement,
Title,
Tooltip,
Legend,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const getChart = (labels, data) => {
  const options = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "득표 수",
          data: data,
          borderWidth: 1,
          backgroundColor: 'rgba(40, 80, 150, 0.7)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            // ticks 속성 추가
            stepSize: 1, // y 축 간격을 1로 설정하여 정수 값을 나타냄
            callback: function(value) {
              if (value % 1 === 0) { // 만약 값이 정수라면
                return value; // 그 값을 반환
              }
            },
          },
        },
      },
    },
  };

  return options;
};



const StatisticsChart = ({ partiesData }) => {
const names = partiesData.map((candidate) => candidate.name);
const votes = partiesData.map((candidate) => candidate.votes);
const data = getChart(names, votes);
return (
<div className="chart-Container">
<Bar options={data.options} data={data.data} />
</div>
);
};

export default StatisticsChart;
