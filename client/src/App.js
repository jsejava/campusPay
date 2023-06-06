import { BrowserRouter, Route, Switch } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import NewRecord from "./components/Add/NewRecordForm";
import Home from "./Pages/Home";

import IncomeList from "./Pages/Income/IncomeList";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./Pages/Users/Profile/Profile";
import Register from "./Pages/Users/Register/Register";
import Login from "./Pages/Users/Login/Login";
import ExpensesList from "./Pages/Expenses/ExpensesList";
import Dashboard from "./Pages/Dashboard/Dashboard";

import EditContent from "./components/EditContent/EditContent";
import EditWallet from "./components/EditWallet/EditWallet";
import UserProfileExpList from "./Pages/Users/Profile/UserProfileExpList";
import UserProfileIncList from "./Pages/Users/Profile/UserProfileIncList";
import UpdateProfile from "./Pages/Users/Profile/UpdateProfile";
import AddIncome from "./Pages/Income/AddIncome";
import AddExpense from "./Pages/Expenses/AddExpense";
import PrivateProtectRoute from "./components/Navigation/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/AdminRoute";
import NotAdmin from "./components/NotAdmin/NotAdmin";
import AdNavbar from "./components/Navigation/AdNavbar";
import AddFees from "./Pages/fees/AddFees";
import UserProfileFeesList from "./Pages/Users/Profile/UserProfileFeesList";
import FeesList from "./Pages/fees/FeesList";
import Balance from "./Pages/Expenses/Balance";
import Paysuccess from "./components/Alert/Paysuccess";
import AddReqExp from "./Pages/Expenses/AddReqExp";

const options = {
  timeout: 50000,
  position: positions.BOTTOM_CENTER,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        {/* <Balance /> */}
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={AdminNavbar} /> */}
          <AdminRoute exact path="/dashboard" component={Dashboard} />
          <PrivateProtectRoute
            exact
            path="/user-profile-expenses"
            component={UserProfileExpList}
          />
          <PrivateProtectRoute
            exact
            path="/user-profile-fees"
            component={UserProfileFeesList}
          />
          {/* UserProfileFeesList */}
          <PrivateProtectRoute
            exact
            path="/user-profile-income"
            component={UserProfileIncList}
          />
          <Route exact path="/not-admin" component={NotAdmin} />
          <PrivateProtectRoute
            exact
            path="/update-profile"
            component={UpdateProfile}
          />
          <PrivateProtectRoute exact path="/edit" component={EditContent} />
          <AdminRoute exact path="/edit-wallet" component={EditWallet} />
          {/* <PrivateProtectRoute
            exact
            path="/user-expenses"
            component={UserExpenses}
          /> */}
          <PrivateProtectRoute
            exact
            path="/add-expense"
            component={AddExpense}
          />
          <PrivateProtectRoute exact path="/add-reqexp" component={AddReqExp} />
          <PrivateProtectRoute exact path="/add-fees" component={AddFees} />
          <PrivateProtectRoute exact path="/add-income" component={AddIncome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateProtectRoute exact path="/profile" component={Profile} />
          <AdminRoute exact path="/incomes" component={IncomeList} />
          <AdminRoute exact path="/expenses" component={ExpensesList} />
          <AdminRoute exact path="/fees" component={FeesList} />
          <PrivateProtectRoute
            exact
            path="/success-payement"
            component={Paysuccess}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
