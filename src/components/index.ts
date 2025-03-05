/**
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
/**
 * 布局组件
 */
import Footer from './Footer';
import { Question, SelectLang } from './RightContent';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';

import SysDescribe from './Describe';
import LoadCartPie, { LoadChartGauge } from './LoadChart';
import { LineChart } from './LoadChart/LineChart';

import ContainerCard from './Container/ContainerCard';

import {
  fetchServerInfo,
  fetchServerLoad,
  transformBytes,
  transformServerLoad,
} from '@/components/API/apiService';
import { trans2Map, useFetchData } from '@/components/API/useFetchData';

export {
  AvatarDropdown,
  AvatarName,
  ContainerCard,
  fetchServerInfo,
  fetchServerLoad,
  Footer,
  LineChart,
  LoadCartPie,
  LoadChartGauge,
  Question,
  SelectLang,
  SysDescribe,
  trans2Map,
  transformBytes,
  transformServerLoad,
  useFetchData,
};
