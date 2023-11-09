import dayjs from "dayjs";
import { clone } from "@pureadmin/utils";
import testData from "./testData";

const date = dayjs(new Date()).format("YYYY-MM-DD");

const cloneData = clone(testData);
const tableData = cloneData.map((item, index) => {
  Object.assign(item, {
    id: index,
    date
  });
  return item;
});
export { tableData };
