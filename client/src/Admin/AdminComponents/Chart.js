import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import { AdminOps } from "../../components/utils/AdminOptionsProvider";
import { v4 as uuidv4 } from "uuid";

function Chart() {
  const { amountSum } = useContext(AdminOps);
  const [Amount, setAmount] = amountSum;
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [uniqueData, setuniqueData] = useState([]);
  let firstStep = [];
  let days = [];
  let amount = [];

  let data = {
    days: [0, 1, 2, 3, 4, 5, 6],
    amount: [],
  };
  let lasdays = [];
  let lastamount = [];

  const [chartdata, setchartdata] = useState();
  let total = 0;
  // const pushExisting = (index, data, current = 0) => {
  //   if (!index) {
  //     total = 0;
  //     days.push(dayNames[data.moment]);
  //     data.info.product.forEach((e, i) => {
  //       total += e.price * e.quantity;
  //     });
  //     //setuniqueData([...uniqueData, "{ day: data.moment, amount: total }"]);
  //     console.log("current is : " + current);
  //     amount.push(total);
  //   } else {
  //     total = 0;
  //     console.log("current is : " + current);
  //     data.info.product.forEach((e, i) => {
  //       total += e.price * e.quantity;
  //     });

  //     //setuniqueData([...uniqueData, "{ day: data.moment, amount: total }"]);
  //     amount[amount.length - 1] += total;
  //     console.log(amount.length + " " + total);
  //   }
  // };

  const chart = async () => {
    await Axios.get("/api/product/weeklySalles")
      .then((res) => {
        console.log(res.data);
        res.data.graph.forEach((item, current) => {
          total = 0;
          // days.includes(dayNames[item.moment])
          //   ? pushExisting(true, item, current)
          //   : pushExisting(false, item, current);

          days.push(item.moment);
          item.info.product.forEach((e, i) => {
            total += e.price * e.quantity;
          });
          amount.push(total);
        });
        setAmount(amount);

        days.forEach((d, i) => {
          firstStep.push({ day: d, amount: amount[i], id: uuidv4() });
        });
        //setuniqueData(firstStep);
        FixIterableDataTest();
      })
      .catch((err) => {
        alert(err);
      });

    setchartdata({
      labels: dayNames,
      datasets: [
        {
          label: "Sales $$",
          data: lastamount,
          backgroundColor: ["rgba(75,192,1920.6)"],
          borderWidth: 4,
        },
      ],
    });
  };

  const FixIterableDataTest = () => {
    // First reduce the array to an object where day is the key and sum of amounts is the value
    const byDay = firstStep.reduce((acc, cur) => {
      console.log((acc[cur.day] || 0) + cur.amount);
      return { ...acc, [cur.day]: (acc[cur.day] || 0) + cur.amount };
    }, {});
    console.log("data test :: ");
    const dataTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, curr) => {
      console.log(acc);
    });
    console.log(byDay);
    // Then map the object back to an array in the same format as the original array
    var combined = Object.keys(byDay).map((key) => ({
      day: +key,
      amount: byDay[key],
    }));
    console.log(combined);
    var withEmptyDays = [
      ...combined,
      ...[0, 1, 2, 3, 4, 5, 6]
        .filter((day) => !combined.find((obj) => obj.day === day))
        .map((day) => ({ day, amount: 0 })),
    ].sort((a, b) => a.day - b.day);
    console.log(withEmptyDays);
    withEmptyDays.forEach((wm, i) => {
      lastamount[i] = wm.amount;
    });
  };
  // const FixIterableData = () => {
  //   data.days.forEach((element, index) => {
  //     firstStep.forEach((el, i) => {
  //       if (element == el.day) {
  //         if (!lasdays.includes(el.day)) {
  //           lasdays.push(element);
  //           lastamount.push(el.amount);
  //         } else {
  //           //alert("Rejected");
  //           for (let index1 = i + 1; index1 < lasdays.length; index1++) {
  //             if (lasdays.includes(el.day)) {
  //               console.log("Entered loop");
  //               lastamount[index] += el.amount;
  //             }
  //           }
  //         }
  //       }
  //     });
  //   });
  //   console.log("lastAmount");
  //   console.log(lasdays);
  //   console.log(lastamount);
  //   //lastamount = lastamount.reverse();
  //   data.days.forEach((element, index) => {
  //     if (element != lasdays[index]) {
  //       lasdays.splice(index, 0, element);
  //       lastamount.splice(index, 0, 0);
  //     }
  //   });
  //   console.log(data.days);
  //   console.log(lasdays);
  //   console.log(lastamount);
  // };

  useEffect(() => {
    chart();
  }, []);
  // useEffect(() => {
  //   console.log(lasdays + lastamount);
  // }, [lasdays]);
  return (
    <React.Fragment>
      <div style={{ height: "500px" }}>
        <Line
          data={chartdata}
          options={{
            responsive: true,
            title: { text: "Study sales", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: { display: false },
                },
              ],
              xAxes: [
                {
                  gridLines: { display: false },
                },
              ],
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Chart;
// const sum = (ele) => {
//   let day = ele.moment;
//   days.includes(dayNames[day])
//     ? uniqueData.forEach((element, index) => {
//         if (element.day === day) {
//           element.money +=
//             ele.info.product[0].price * ele.info.product[0].quantity;
//         }
//       })
//     : setuniqueData([
//         ...uniqueData,
//         {
//           day: dayNames[ele.moment],
//           money: ele.info.product[0].price * ele.info.product[0].quantity,
//         },
//       ]);
// };

// const weekDays = (n) => {
//   switch(n){

//   }
// }

/**
 * You owe me 5 dollars for doing your work for you 😉 😃 xxx
This is very simple with Array and Object prototype methods:
const arr = [{day: 1, amount: 1}, {day: 1, amount: 1}, {day: 2, amount: 1}];
// First reduce the array to an object where day is the key and sum of amounts is the value
const byDay = arr.reduce((acc,cur) => ({...acc, [cur.day]: (acc[cur.day] || 0) + cur.amount }), {});
// Then map the object back to an array in the same format as the original array
var combined = Object.keys(byDay).map(key => ({day: +key, amount: byDay[key]}));
console.log(combined);
var withEmptyDays = [...combined, ...[0,1,2,3,4,5,6].filter(day => !combined.find(obj => obj.day === day)).map(day => ({day, amount:0}))].sort((a,b) => a.day-b.day);
console.log(withEmptyDays);
 */
// const FixIterableDataTest = () => {
//   // let arr = [0, 1, 2, 2, 3, 3, 5, 1, 9];
//   // const dtt = eliminateDuplicates(arr);
//   // console.log(dtt);
//   var names = [0, 1, 2, 2, 3, 6, 2, 3, 12, 3, 5, 1, 9];

//   var uniq = names
//     .map((name) => {
//       return {
//         count: 1,
//         name: name,
//       };
//     })
//     .reduce((a, b) => {
//       console.log(a[b.name] || 0);
//       a[b.name] = (a[b.name] || 0) + b.count;
//       return a;
//     }, {});
//   var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

//   console.log(duplicates);
// };
/**
   * //console.log("The uniwue data is     ");
  // console.log(uniqueData);
  function eliminateDuplicates(arr) {
    var i,
      len = arr.length,
      out = [],
      obj = {};

    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return obj;
  }
   */
