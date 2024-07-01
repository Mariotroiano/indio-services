import _ from 'lodash';
import { ReservationPayload } from './payloads/ReservationPayload';

function addSummaryProps(response: ReservationPayload) {
  const keys = Object.keys(ReservationPayload.new()).filter(key => key.match(/\w+Summary$/));
  for (const key of keys) {
    response[key] = {};
  }
  return response;
}

function fillSummaryProps(item: ReservationPayload) {
  const keys = Object.keys(ReservationPayload.new()).filter(key => key.match(/\w+Summary$/));
  for (const key of keys) {
    const incKey = key.replace(/Summary$/, '');
    item[key] = item[key] ?? item[incKey] ?? {};
  }
  return item;
}

async function checkResponse(response: ReservationPayload[], responseCallback: () => Promise<ReservationPayload[]>) {
  try {
    const summaryResponse = await responseCallback();
    const diff = response.map((item, index) => {
      const summaryItem = summaryResponse[index];
      if (item.id.toString() === summaryItem.id.toString()) {
        const diff = getObjectDifference(item, summaryResponse[index]);
        _.noop(diff);
        return diff;
      }
      return null;
    });
    const diffKeys = Object.keys(diff[0]);
    const realDiff = diffKeys.filter(key => !key.match(/\w+Summa\w+$/));
    console.table(realDiff);
    // response.forEach(item => {
    //   const summaryItem = summaryResponse.find(x => x.id === item.id);
    //   item.numberOfNights += 1000;
    // });
  }
  catch (err: any) {
    console.log(err);
  }
}

function getObjectDifference(obj1: any, obj2: any) {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = {};

  for (const key of keys) {
    const [item1, item2] = [obj1[key], obj2[key]];
    if (!areEmpty(item1, item2) && !_.isEqual(item1,item2)) {
      diff[key] = [item1, item2];
    }
  }

  return diff;
}

function areEmpty(...objs: any[]) {
  const result = objs.every(item => _.isEmpty(item));
  return result;
}

export {
  addSummaryProps,
  fillSummaryProps,
  checkResponse,
}
