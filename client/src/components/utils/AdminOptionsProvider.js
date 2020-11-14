import React, { useState, createContext } from "react";

export const AdminOps = createContext();

export const AdminOpsProvider = (props) => {
  const [Amount, setAmount] = useState(0);
  const [Images, setImages] = useState([]);
  const [productId, setproductId] = useState(null);
  const [incomesByPro, setincomesByPro] = useState();
  const [nettoIncomes, setnettoIncomes] = useState();
  const [isRecommanded, setisRecommanded] = useState();
  const [AnyData, setAnyData] = useState();
  const [ToogleTab, setToogleTab] = useState({
    home: true,
    upload: false,
    finish: false,
    report: false,
    email: false,
    follow: false,
  });
  return (
    <AdminOps.Provider
      value={{
        amountSum: [Amount, setAmount],
        image: [Images, setImages],
        id: [productId, setproductId],
        incomes: [incomesByPro, setincomesByPro],
        recommand: [isRecommanded, setisRecommanded],
        tab: [ToogleTab, setToogleTab],
        netto: [nettoIncomes, setnettoIncomes],
        anydata: [AnyData, setAnyData],
      }}
    >
      {props.children}
    </AdminOps.Provider>
  );
};
