function getDataOrganized(data, category, value = 'Valor') {
  const { dataWithCategory, dataWithoutCategory, totalOfEachCategory } =
    separeteDataByCategory(data, category, value);

  return {
    dataWithCategory,
    dataWithoutCategory,
    totalOfEachCategory,
  };
}

function getAllCategoties(data) {
  return Object.keys(data[0]);
}

function separeteDataByCategory(data, category, value) {
  let dataWithCategory = [];
  let dataWithoutCategory = [];
  let totalOfEachCategory = [];

  const chartOfAccounts = getChartOfAccounts(data, category);

  chartOfAccounts.map((chartOfAccount) => {
    const filteredWithCategory = data.filter(
      (item) => item[category] === chartOfAccount
    );
    const filteredWithoutCategory = data.filter((item) => !item[category]);
    const total = getTotal(filteredWithCategory, value);

    if (filteredWithoutCategory.length > 0) {
      dataWithoutCategory = [...dataWithoutCategory, filteredWithoutCategory];
    }

    totalOfEachCategory = [
      ...totalOfEachCategory,
      { [category]: chartOfAccount, Total: total },
    ];
    dataWithCategory = [...dataWithCategory, filteredWithCategory];
  });
  return {
    dataWithCategory,
    dataWithoutCategory,
    totalOfEachCategory: totalOfEachCategory,
  };
}

function getTotal(items, value) {
  if (Number(items[0][value]) !== NaN) {
    return items.reduce((acc, obj) => acc + Number(obj[value]), 0);
  }
  return 0;
}

/* a função não deve se limitar a ser de plano contas, pode ser qualquer categoria */
function getChartOfAccounts(data, category) {
  let chartOfAccounts = [];

  data.map((item) => {
    const newChartOfAccount = item[category];
    if (newChartOfAccount && !chartOfAccounts.includes(newChartOfAccount)) {
      chartOfAccounts = [...chartOfAccounts, newChartOfAccount];
    }
  });
  return chartOfAccounts;
}

module.exports = { getDataOrganized, getAllCategoties };
