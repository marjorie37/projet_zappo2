import ContHomePage from "./components/ContHomePage";
import ContUserLogin from "./components/ContUserLogin";
import ContUserAccount from "./components/ContUserAccount";
import ContBasket from "./components/ContBasket";
import OrderCard from "./components/ZappoOrdersTablette/OrderCard";
import OrdersMain from "./components/ZappoOrdersTablette/OrdersMain";
import ContOrderResume from "./components/ContOrderResume";
import ContOrderNotification from "./components/ContOrderNotification";
import ContUserAccountModify from "./components/ContUserAccountModify";
import ContRefusedPayment from "./components/ContRefusedPayment";
import ContOfferedPizza from "./components/ContOfferedPizza";
import ContZappoInfos from "./components/ContZappoInfos";
import ContPayStripe from "./components/ContPayStripe";
import ContMentionsLegales from "./components/ContMentionsLegales";
import NotFound from "./components/NotFound";
import {
  UserLogin,
  UserSignUp,
  UserPassRecover
} from "./components/UserComponents/Index";
import UserModifyPassRecover from "./components/UserComponents/UserModifyPassRecover";
import ContStaffLogin from "./components/ZappoOrdersTablette/ContStaffLogin";
import ContMaintenance from "./components/ContMaintenance";
import withUser from "./components/Hoc/withUser";
import withStaff from "./components/Hoc/withStaff";

export const mainRoad = online => [
  {
    path: "/nous-trouver",
    component: online ? ContZappoInfos : ContMaintenance
  },
  {
    path: "/mentions-legales",
    component: online ? ContMentionsLegales : ContMaintenance
  },
  {
    path: "/buon-appetito",
    component: online ? withUser(ContOrderNotification) : ContMaintenance
  },
  {
    path: "/zappo/orders",
    component: withStaff(OrdersMain)
  },
  {
    path: "/zappo/connexion",
    component: withStaff(ContStaffLogin)
  },
  {
    path: "/",
    component: online ? withUser(ContHomePage) : ContMaintenance,
    exact: true
  },
  {
    path: "/identification",
    component: online ? ContUserLogin : ContMaintenance
  },
  {
    path: "/commande/:id",
    component: online ? withUser(ContOrderResume) : ContMaintenance
  },
  {
    path: "/mon-panier",
    component: online ? withUser(ContBasket) : ContMaintenance
  },
  {
    path: "/moncompte/modifier",
    component: online ? withUser(ContUserAccountModify) : ContMaintenance
  },
  {
    path: "/paiement-refuse",
    component: online ? ContRefusedPayment : ContMaintenance
  },
  {
    path: "/pizza-offerte",
    component: online ? withUser(ContOfferedPizza) : ContMaintenance
  },
  {
    path: "/compte",
    component: online ? withUser(ContUserAccount) : ContMaintenance
  },
  {
    path: "/paiement",
    component: online ? withUser(ContPayStripe) : ContMaintenance
  }
];

export const userLoginRoad = [
  {
    path: `/identification/rappel-de-mot-de-passe`,
    component: UserPassRecover
  },
  {
    path: `/identification/modification-de-mot-de-passe/:token`,
    component: UserModifyPassRecover
  },
  {
    path: "/identification/creation",
    component: UserSignUp
  },
  {
    path: "/identification/connexion",
    component: UserLogin
  }
];

export const ordersRoad = [
  {
    path: `/zappo/orders/:id`,
    component: OrderCard
  }
];
