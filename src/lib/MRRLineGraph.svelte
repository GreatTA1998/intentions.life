
<Line 
  {data} 
  width={800}
  height={360}
  options={{ maintainAspectRatio: false, responsive: false }}
/>

<script>
  import { Line } from 'svelte-chartjs';
  import { data } from './data.js';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
</script>
