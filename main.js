import Chart from 'chart.js/auto';

function readings(sheet, metric) {
    const points = sheet[metric] ?? [];
    return points
    .filter(point => point.date)
    .map(({ date, value }) => ({ 
        date, 
        value: Number.isFinite(value) ? value : null 
    }));
}

function draw(id, type, unit, datasets) {
    new Chart(document.getElementById(id), {
        type,
        data: {datasets},
        options: {
            parsing: { xAxisKey: 'date', yAxisKey: 'value' },
            scales: { y: { beginAtZero: true, title: { display: true, text: unit } } }
        }
    });
}

function participantDatasets(sheets, metric) {
  const dates = new Set();
  const participants = sheets.map(sheet => {
    const byDate = new Map();
    for (const { date, value } of readings(sheet, metric)) {
      dates.add(date);
      byDate.set(date, value);
    }
    return { name: sheet.name, byDate };
  });

  const calendar = [...dates].sort();
  return participants.map(({ name, byDate }) => ({
    label: name,
    data: calendar.map(date => ({ date, value: byDate.get(date) ?? null })),
  }));
}

function normalize(value, max, multiplier = 100) {
    if (!Number.isFinite(value)) return null
    return value / max * multiplier
}

function normalizeArray(arr, max, multiplier = 100) {
    return arr.map(item => ({
        ...item,
        value: normalize(item.value, max, multiplier)
    }))
}

async function drawCharts() {
    const response = await fetch('/api/data')
    const sheets = await response.json()
    if (!response.ok) throw new Error(sheets.error);
    const first = sheets[0];
    const steps = readings(first, 'steps_count');
    draw('steps', 'bar', 'sammu', [{ label: first.name, data: steps }]);
    console.log("check", steps);
    const minutes = readings(first, 'screen_total_min');
    draw('screen', 'line', 'minutit', [{ label: first.name, data: minutes }]);

    const maxSteps = Math.max(...steps.map(item => item.value));
    const maxMins = Math.max(...minutes.map(item => item.value));
    const normalizedSteps = normalizeArray(steps, maxSteps);
    const normalizedMins = normalizeArray(minutes, maxMins);

    draw('normalized_steps', 'bar', 'sammu protsendina', [
        { label: "sammud", data: normalizedSteps },
        { label: "minutid", data: normalizedMins, type: "line" }
    ]);
    

    draw('all_steps', 'bar', 'sammu', participantDatasets(sheets, 'steps_count'));
    draw('all_minutes', 'line', 'minutit', participantDatasets(sheets, 'screen_total_min'));
    const stepsByDate = new Map();
    for (const sheet of sheets) {
        for (const { date, value } of readings(sheet, 'steps_count')) {
            if (!stepsByDate.has(date)) stepsByDate.set(date, []);
            if (value !== null) stepsByDate.get(date).push(value);
        }
    }
    const dates = [...stepsByDate.keys()].sort();
    const totals = [];
    const means = [];
    for (const date of dates) {
    const values = stepsByDate.get(date);
    const sum = values.reduce((total, value) => total + value, 0);
    totals.push({ date, value: values.length ? sum : null });
    means.push({ date, value: values.length ? sum / values.length : null });
    }

    draw('total_steps', 'bar', 'sammu', [{ label: 'Kõigi sammud kokku', data: totals }]);
    draw('mean_steps', 'line', 'sammu', [{ label: 'Samme keskmiselt', data: means }]);



}

drawCharts().catch(error => {
  document.querySelector('#error').textContent = error.message;
});


