export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const months = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
        'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ];

    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const isPM = hours >= 12;

    hours = hours % 12 || 12;

    const ampm = isPM ? 'pm' : 'am';

    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}