import { coordinateData } from './coordinate-data';

// 获取城市名在地图中对应的经纬度，并返回
export function convertData(data: any) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
}
