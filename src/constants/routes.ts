import React from 'react';


const Dashboard = React.lazy(() => import('../pages/Dashboard/DashboardContainer'));
const Franchise = React.lazy(() => import('../pages/Franchise/FranchiseContainer'));
const Trainers = React.lazy(() => import('../pages/Trainer&User/Trainers/TrainersContainer'));
const Users = React.lazy(() => import('../pages/Trainer&User/Users/UsersContainer'));
const CreateUser = React.lazy(() => import('../pages/Trainer&User/Users/CreateUser/CreateUser'));
const UserUpdate = React.lazy(() => import('../pages/Trainer&User/Users/UpdateUser/UpdateUserContainer'));

const CreateTrainer = React.lazy(() => import("../pages/Trainer&User/Trainers/CreateTrainer/CreateTrainer"));
const UpdateTrainer = React.lazy(() => import("../pages/Trainer&User/Trainers/UpdateUser/UpdateTrainerContainer"));

const RequestsContainer = React.lazy(() => import('../pages/Requests/RequestsContainer'));
const RequestOpportunitiesContainer = React.lazy(() => import('../pages/Requests/RequestOpportunities/RequestOpportunitiesContainer'));

const CategoryPackage = React.lazy(() => import("../pages/Packages/CategoryPackage/CategoryPackageContainer"));
const PackageList = React.lazy(() => import("../pages/Packages/PackageList/PackageListContainer"));
const PackageUsual = React.lazy(() => import("../pages/Packages/CreatePackageUsual"));
const PackageCustom = React.lazy(() => import("../pages/Packages/CreatePackageCustom"));

const SessionsList = React.lazy(() => import("../pages/Sessions/SessionsContainer"));
const CreateSession = React.lazy(() => import("../pages/Sessions/CreateSession/CreateSessionContainer"));

const FranchiseAdmin = React.lazy(() => import('../pages/Trainer&User/FranchiseAdmin/FranchiseAdminContainer'));
const FranchiseAdminCreate = React.lazy(() => import('../pages/Trainer&User/FranchiseAdmin/CreateFranchiseAdmin/FranchiseAdmin'));
const UpdateFA = React.lazy(() => import('../pages/Trainer&User/FranchiseAdmin/UpdateFA/UpdateFAContainer'));

const ReviewTrainer = React.lazy(() => import('../pages/ReviewTrainer/ReviewTrainersContainer'));

const SessionEarning = React.lazy(() => import('../pages/SessionEarnings/SessionEarningsContainer'));

const CouponsCreate = React.lazy(() => import("../pages/Coupons/CouponsCreate"))
const CouponsGenerator = React.lazy(() => import('../pages/Coupons/CouponsGenegrator'));
const CouponsList = React.lazy(() => import('../pages/Coupons/CouponsList/CouponsListContainer'));
const Chat = React.lazy(() => import('../pages/Chat/ChatContainer'));



const routes = [
    {path: '/admin', exact: true, name: 'Home'},
    {path: '/admin/dashboard', name: 'Dashboard', component: Dashboard},

    {path: '/admin/trainers/list', name: 'Trainers', component: Trainers},
    {path: '/admin/trainers/create', name: 'Create Trainers', component: CreateTrainer},
    {path: '/admin/users/list', name: 'Users', component: Users},
    {path: '/admin/users/create', name: 'Create Users', component: CreateUser},
    {path: '/admin/user/edit/:id', name: 'Edit User', component: UserUpdate},


    {path: '/admin/trainer/edit/:id', name: 'Edit Trainer', component: UpdateTrainer},

    {path: '/admin/requests/list', name: 'All Request List', component: RequestsContainer},
    {path: '/admin/sessions/list/:type/:oppId', name: 'Trainer Session List', component: SessionsList},
    {path: '/admin/sessions/list/:type', name: 'All Session List', component: SessionsList},
    {path: '/admin/sessions/create', name: 'Create Session ', component: CreateSession},
    {
        path: '/admin/request/opportunities/:requestId',
        name: 'Request Opportunities',
        component: RequestOpportunitiesContainer
    },

    {path: '/admin/franchise/list', name: 'Franchise', component: Franchise},
    {path: '/admin/franchise/create', name: 'Franchise', component: Franchise},
    {path: '/admin/franchise/edit/:id', name: 'Edit Franchise', component: Franchise},
    {path: '/admin/franchise/edit', name: 'Franchise', component: Franchise},
    {path: '/admin/packages/category', name: 'Category Package', component: CategoryPackage},
    {path: '/admin/packages/list', name: 'Package List', component: PackageList},
    {path: '/admin/packages/usual', name: 'Package List usual', component: PackageUsual},
    {path: '/admin/packages/custom', name: 'Package List custom', component: PackageCustom},
    {path: '/admin/packages/custom/edit/:id', name: 'Package edit custom', component: PackageCustom},
    {path: '/admin/packages/usual/edit/:id', name: 'Package edit usual', component: PackageUsual},


    {path: '/admin/franchise-admin/list', name: 'Franchise Admins', component: FranchiseAdmin},
    {path: '/admin/franchise-admin/create', name: 'Create Franchise Admin', component: FranchiseAdminCreate},
    {path: '/admin/franchise-admin/edit/:id', name: 'Edit Franchise Admin', component: UpdateFA},

    {path: '/admin/review-trainers', name: 'Review Trainers ', component: ReviewTrainer},

    {path: '/admin/earning', name: 'Trainers Earning', component: SessionEarning},

    {path: '/admin/coupons/create', name: 'coupons', component: CouponsCreate},
    {path: '/admin/coupons/generator', name: 'coupons', component: CouponsGenerator},
    {path: '/admin/coupons/list', name: 'coupons list', component: CouponsList},
    {path: '/admin/coupons/edit/:id', name: 'coupons edit', component: CouponsCreate},

    {path: '/admin/chat/:userId', name: 'chat', component: Chat},
    {path: '/admin/chat', name: 'chat', component: Chat},
];

export {routes};
