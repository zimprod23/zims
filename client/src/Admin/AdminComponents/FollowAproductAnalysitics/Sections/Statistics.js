import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Axios from "axios";
import { AdminOps } from "../../../../components/utils/AdminOptionsProvider";
import { v4 as uuidv4 } from "uuid";

export default function Statistics(props) {
  const { incomes, netto, anydata } = useContext(AdminOps);

  const [incomesByPro, setincomesByPro] = incomes;
  const [nettoIncomes, setnettoIncomes] = netto;
  const [AnyData, setAnyData] = anydata;
  const daysInMonth = () => {
    const arr = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      arr.push(index);
    }

    return arr;
  };
  console.log(moment().daysInMonth());
  let firstStep = [];
  let days = [];
  let amount = [];
  let networth = [];
  let MonthDays = daysInMonth();
  let lastamount = [];
  // var moreDeatails = 0;
  const [chartdata, setchartdata] = useState();
  let total = 0;
  let nettoTotal = 0;

  let e = 0;

  const chart = async () => {
    await Axios.get(`/api/product/selledProducts?productId=${props.productId}`)
      .then((res) => {
        console.log(res.data);
        res.data.graph.forEach((item, current) => {
          total = 0;
          nettoTotal = 0;
          days.push(item.moment);
          item.info.product.forEach((e, i) => {
            e.id == props.productId
              ? (total += e.price * e.quantity)
              : (total += 0);
            e.id == props.productId
              ? (nettoTotal += e.originalPrice * e.quantity)
              : (nettoTotal += 0);
          });
          networth.push({ brutto: total, original: nettoTotal });
          amount.push(total);
        });
        setAnyData(res.data.product);
        setincomesByPro(amount);
        setnettoIncomes(networth);
        days.forEach((d, i) => {
          firstStep.push({ day: d, amount: amount[i], id: uuidv4() });
        });
        FixIterableData();
      })
      .catch((err) => {
        alert(err);
      });

    setchartdata({
      labels: MonthDays,
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

  const FixIterableData = () => {
    console.log(firstStep);
    const arr = [
      { day: 1, amount: 1 },
      { day: 2, amount: 1 },
      { day: 1, amount: 1 },
    ];
    // First reduce the array to an object where day is the key and sum of amounts is the value
    const byDay = firstStep.reduce((acc, cur) => {
      console.log((acc[cur.day] || 0) + cur.amount);
      return { ...acc, [cur.day]: (acc[cur.day] || 0) + cur.amount };
    }, {});

    console.log(byDay);
    // Then map the object back to an array in the same format as the original array
    var combined = Object.keys(byDay).map((key) => ({
      day: +key,
      amount: byDay[key],
    }));
    console.log(combined);
    var withEmptyDays = [
      ...combined,
      ...MonthDays.filter(
        (day) => !combined.find((obj) => obj.day === day)
      ).map((day) => ({ day, amount: 0 })),
    ].sort((a, b) => a.day - b.day);
    console.log(withEmptyDays);
    withEmptyDays.forEach((wm, i) => {
      lastamount[i] = wm.amount;
    });
  };

  useEffect(() => {
    props.productId ? chart() : console.log("Waiting");
    console.log("changed");
  }, [props.productId]);

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
