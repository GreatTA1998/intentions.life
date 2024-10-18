import { updateTemplate } from '/src/store.js'

export const getDisplayLength = ({ template, templateWidthInPx }) => {
  const hours = template.TotalMinutesSpent / 60
  const maxTimeBarWidth = window.innerWidth / 3 - templateWidthInPx
  const pixelsPerHour = maxTimeBarWidth / hours
  const accurateLength =
    (hours / template.totalTasksCompleted) * pixelsPerHour
  return accurateLength
}

export const updateCrontab = ({ selectedDays, template, crontabIndex }) => {
  let updatedCrontab = template.crontab.split(" ");
  if (crontabIndex == 'yearly') {
    updatedCrontab = selectedDays;
  } else {
    const selectedDaysFiltered = selectedDays.filter(day => day !== '0');
    updatedCrontab[crontabIndex] = selectedDaysFiltered.length ? selectedDaysFiltered.sort().join(',') : '*';
    updatedCrontab = updatedCrontab.join(' ');
  }
  updateTemplate({ templateID: template.id, keyValueChanges: { crontab: updatedCrontab } })
}