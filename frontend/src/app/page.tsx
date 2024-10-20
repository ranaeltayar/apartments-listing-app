import {redirect} from 'next/navigation';
import {ListingsEndpoints} from '@/app/constants/routes.const';

export default function Home() {
    redirect(ListingsEndpoints.UNITS_LIST);
}
