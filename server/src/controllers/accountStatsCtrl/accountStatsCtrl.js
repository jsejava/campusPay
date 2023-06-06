const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense/Expense");
const Income = require("../../model/income/Income");
const Fees = require("../../model/fees/Fees");

//-------------------------------------
//Fetch all Stats
//-------------------------------------
const accountsStatsCtrl = expressAsyncHandler(async (req, res) => {
  const expensesStats = await Expense.aggregate([
    //filter
    { $match: { amount: { $gte: 20 } } },
    {
      $group: {
        _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
        averageExp: { $avg: "$amount" },
        totalExp: { $sum: "$amount" },
        minExp: { $min: "$amount" },
        maxExp: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const incomeStats = await Income.aggregate([
    //filter
    { $match: { amount: { $gte: 20 } } },
    {
      $group: {
        _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
        averageInc: { $avg: "$amount" },
        totalInc: { $sum: "$amount" },
        minInc: { $min: "$amount" },
        maxInc: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const feesStats = await Fees.aggregate([
    //filter
    { $match: { amount: { $gte: 20 } } },
    {
      $group: {
        _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
        averageFees: { $avg: "$amount" },
        totalFees: { $sum: "$amount" },
        minFees: { $min: "$amount" },
        maxFees: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const profit =
    incomeStats[0]?.totalInc -
    (expensesStats[0]?.totalExp + feesStats[0]?.totalFees);
  res.json({ expensesStats, incomeStats, feesStats, profit });
});

module.exports = {
  accountsStatsCtrl,
  // accountStatsCtrl,
};
