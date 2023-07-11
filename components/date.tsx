import { formatDateString } from '../common';

export default function Date({ dateString, formatString = 'LLLL d, yyyy' }: { dateString: string, formatString?: string }) {
  const formattedDate = formatDateString(dateString, formatString);
  return <time dateTime={dateString}>formattedDate</time>
}
