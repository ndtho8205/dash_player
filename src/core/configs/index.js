import devConfigs from '@/core/configs/config.dev';
import prodConfigs from '@/core/configs/config.prod';

const configs = process.env.NODE_ENV === 'production' ? prodConfigs : devConfigs;

export default configs;
