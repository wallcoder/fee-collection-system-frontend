import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admins', () => {
    const user = ref(null);
    const errorMessage = ref("");
    const loading = ref(false);
    
    // Input fields
    const email = ref('');
    const password = ref('');
    const username = ref('');

    // Validation rules
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // Real-time validation
    const usernameError = computed(() => {
        if (username.value.length < 6) {
            return "Username length is too short";
        }
        return "";
    });

    const passwordError = computed(() => {
        if (password.value.length < 6) {
            return "Password length is too short";
        }
        return "";
    });

    const emailError = computed(() => {
        if (!validateEmail(email.value)) {
            return "Email is invalid";
        }
        return "";
    });

    const hasErrors = computed(() => {
        return usernameError.value || passwordError.value || emailError.value;
    });

    const handleLogin = () => {
        // Handle login logic here
    };

    const handleSignup = () => {
        // Perform signup only if there are no validation errors
        if (!hasErrors.value) {
            // Proceed with signup logic
        } else {
            errorMessage.value = hasErrors.value;
        }
    };

    const handleLogout = () => {
        // Handle logout logic here
    };

    const getAdmin = () => {
        // Fetch admin data logic here
    };

    return {
        user,
        email,
        password,
        username,
        handleLogin,
        handleSignup,
        handleLogout,
        getAdmin,
        errorMessage,
        usernameError,
        passwordError,
        emailError,
        hasErrors
    };
});
