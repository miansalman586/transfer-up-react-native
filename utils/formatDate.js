export default function formatDate(dateInput) {
  const date = new Date(dateInput);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const options = { month: 'short', day: 'numeric' };
  const yearOptions = { month: 'short', year: 'numeric' };

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString('en-US', options);
  } else {
    return date.toLocaleDateString('en-US', yearOptions);
  }
}
