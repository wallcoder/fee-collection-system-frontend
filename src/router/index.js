import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

// Import views
import ContactView from '../views/ContactView.vue';
import HomeView from '../views/HomeView.vue';
import TermsView from '../views/TermsView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import FAQView from '../views/FAQView.vue';
import MainLayout from '../views/MainLayout.vue';
import StudentLoginView from '../views/StudentLoginView.vue';
import StudentPanelView from '../views/StudentPanelView.vue';
import FeePaidView from '../views/FeePaidView.vue';
import FeeUnpaidView from '../views/FeeUnpaidView.vue';
import AdminLoginView from '../views/AdminLoginView.vue';
import AdminLayout from '../views/AdminLayout.vue';
import DashboardView from '../views/DashboardView.vue';
import StudentFeesView from '../views/StudentFeesView.vue';
import AdminsView from '../views/AdminsView.vue';
import FeeStructuresView from '../views/FeeStructuresView.vue';
import CoursesView from '../views/CoursesView.vue';
import FAQsView from '../views/FAQsView.vue';
import FeeComponentsView from '../views/FeeComponentsView.vue';
import FeeStatusView from '../views/FeeStatusView.vue';
import InquiriesView from '../views/InquiriesView.vue';
import MyInstitutionView from '../views/MyInstitutionView.vue';
import PaymentsView from '../views/PaymentsView.vue';
import StudentsView from '../views/StudentsView.vue';

// Define routes
const routes = [
    // Public routes
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'home', component: HomeView },
            { path: 'contact', name: 'contact', component: ContactView },
            { path: 'terms-of-use', name: 'terms-of-use', component: TermsView },
            { path: 'frequently-asked-questions', name: 'frequently-asked-questions', component: FAQView },
            { path: ':catchall(.*)*', name: 'not-found', component: NotFoundView }
        ]
    },
    {
        path: '/student-login',
        name: 'student-login',
        component: StudentLoginView
    },
    {
        path: '/student-panel/:id',
        component: StudentPanelView,
        children: [
            { path: '', name: 'student-panel', component: FeeUnpaidView },
            { path: 'fee-paid', name: 'fee-paid', component: FeePaidView }
        ],
        props: true
    },
    {
        path: '/admin-login',
        name: 'admin-login',
        component: AdminLoginView
    },
    {
        path: '/admin-panel',
        component: AdminLayout,
        children: [
            { path: '', name: 'dashboard', component: DashboardView },
            { path: 'student-fees', name: 'student-fees', component: StudentFeesView },
            { path: 'students', name: 'students', component: StudentsView },
            { path: 'payments', name: 'payments', component: PaymentsView },
            { path: 'fee-structures', name: 'fee-structures', component: FeeStructuresView },
            { path: 'courses', name: 'courses', component: CoursesView },
            { path: 'fee-components', name: 'fee-components', component: FeeComponentsView },
            { path: 'administrators', name: 'administrators', component: AdminsView },
            { path: 'fee-status', name: 'fee-status', component: FeeStatusView },
            { path: 'my-institution', name: 'my-institution', component: MyInstitutionView, meta: { requiresAdminAuth: true } },
            { path: 'inquiries', name: 'inquiries', component: InquiriesView },
            { path: 'faqs', name: 'faqs', component: FAQsView }
        ],
        meta: { requiresAuth: true }
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const { isLoggedIn, isHead } = storeToRefs(authStore);

    if (to.meta.requiresAuth && !isLoggedIn.value) {

        next('/admin-login');
    } else if (to.meta.requiresAdminAuth) {
        if (!isLoggedIn.value) {

            next('/admin-login');
        } else if (!isHead.value) {

            next('/admin-panel');
        } else {

            next();
        }
    } else {

        next();
    }
});


export default router;
