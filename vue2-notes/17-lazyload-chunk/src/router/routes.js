import App from "../App";
const Services = r => require.ensure([], () => r(require("components/Services")), "Services");
const ServiceList = r => require.ensure([], () => r(require("components/Services/ServiceList")), "ServiceList");
const ServiceEdit = r => require.ensure([], () => r(require("components/Services/ServiceEdit")), "ServiceEdit");
const Products = r => require.ensure([], () => r(require("components/Products")), "Products");
const ProductList = r => require.ensure([], () => r(require("components/Products/ProductList")), "ProductList");
const Logs = r => require.ensure([], () => r(require("components/Logs")), "Logs");
const NoAuth = r => require.ensure([], () => r(require("components/NoAuth")), "NoAuth");
const NotFound = r => require.ensure([], () => r(require("components/NotFound")), "NotFound");
import Login from "../Login";

export default [
  { path: "/login", component: Login, name: "Login" },
  {
    path: "/app",
    component: App,
    name: "App",
    redirect: "/app/services",
    // 设置子路由
    children: [
      {
        // 服务列表
        path: "services",
        component: Services,
        name: "Services",
        meta: {
          title: "服务管理",
          icon: 'fa-home'
        },
        redirect: "/services/list",
        children: [
          {
            // 服务列表
            path: "list",
            component: ServiceList,
            name: "ServiceList",
            meta: {
              title: "服务信息"
            }
          },
          {
            // 添加服务
            path: "add",
            component: ServiceEdit,
            name: "ServiceAdd",
            meta: {
              title: "新建",
              forbidRole: "visitor",
              accessRole: "owner"
            }
          },
          {
            // 修改服务
            path: "edit/:id",
            component: ServiceEdit,
            name: "ServiceEdit",
            hideNav: true,
            meta: {
              title: "修改",
              forbidRole: "visitor",
              accessRole: ["owner", "maintainer"]
            }
          }
        ]
      },
      {
        // 产品列表
        path: "products",
        component: Products,
        name: "Products",
        meta: {
          title: "产品管理",
          icon: 'fa-cubes',
        },
        redirect: "/products/list",
        children: [{
          // 修改服务
          path: "list",
          component: ProductList,
          name: "ProductList",
          meta: {
            title: "产品信息"
          }
        }]
      },
      {
        // 日志管理
        path: "logs",
        component: Logs,
        name: "Logs",
        meta: {
          title: "日志管理",
          icon: 'fa-file-o',
          forbitRole: "visitor"
        }
      },
      {
        // 无权限
        path: "noauth",
        component: NoAuth,
        name: "NoAuth",
        hideNav: true,
        meta: {
          title: "无权限"
        }
      },
      {
        // 404
        path: "404",
        component: NotFound,
        name: "NotFound",
        hideNav: true,
        meta: {
          title: "404"
        }
      }
    ]
  },
  { path: "*", redirect: { name: "NotFound" } }
];