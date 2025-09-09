import { cn } from '@/lib/utils';


const map = {
'not started': 'bg-gray-100 text-gray-800',
'in progress': 'bg-warning-100 text-warning-800',
'completed': 'bg-success-100 text-success-800',
};


export default function Badge({ status }) {
return <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', map[status] || map['not started'])}>{status}</span>;
}