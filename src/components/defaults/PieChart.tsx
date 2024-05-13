import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const data = {
  labels: [
    'Desktop',
    'Mobile',
    'Tablet'
  ],
  datasets: [{
    // Label for the dataset
    label: 'New dataset',

    // Data values for each section of the pie chart
    data: [300, 50, 100],

    // Colors for each section of the pie chart
    backgroundColor: [
      'rgb(250, 242, 150)',
      'rgb(150, 250, 153)',
      'rgb(150, 245, 250)'
    ],

    // Offset when hovering over sections of the pie chart
    hoverOffset: 4
  }]
};

// Functional component 'PieChart' to render the Pie chart
const PieChart = () => {
  return (
    <div>
      {/* Render a Pie chart using provided data and options */}
      <Pie data={data} width={75} height={25} />
    </div>
  );
};

// Export 'PieChart' component as the default export
export default PieChart;