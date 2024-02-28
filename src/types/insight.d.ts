interface IDateRangePicker {
  startDate?: Date;
  endDate?: Date;
}

type Insight = 'pv' | 'uv' | 'volume' | 'top';

interface PVData {
  id: string;
  date: string;
  reporterId: number;
  pv: number;
}

interface UVData {
  id: string;
  date: string;
  reporterId: number;
  uv: number;
}

interface VolumeData {
  id: string;
  date: string;
  reporterId: number;
  volume: number;
}

interface TopContentData {
  top: number;
  contentId: string;
}

interface TopData {
  id: string;
  date: string;
  reporterId: number;
  topContent: TopContentData[];
}

type InsightData = UVData & PVData & VolumeData;

type DateLabel = 'startDate' | 'endDate';
