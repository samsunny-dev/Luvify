import axios from 'axios';
import API_ENDPOINTS from '../config/api';

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials) => {
        const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    signup: (userData) => api.post(API_ENDPOINTS.SIGNUP, userData),
    logout: () => api.post(API_ENDPOINTS.LOGOUT),
    verify: (verificationData) => api.post(API_ENDPOINTS.VERIFY, verificationData),
};

export const profileService = {
    getProfile: () => api.get(API_ENDPOINTS.GET_PROFILE),
    updateProfile: (profileData) => api.put(API_ENDPOINTS.UPDATE_PROFILE, profileData),
    uploadPhoto: (formData) => api.post(API_ENDPOINTS.UPLOAD_PHOTO, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getImages: () => api.get(API_ENDPOINTS.GET_IMAGES),
    removeImage: (key) => api.delete(API_ENDPOINTS.REMOVE_IMAGE(key)),
    replaceImage: (key, formData) => api.put(API_ENDPOINTS.REPLACE_IMAGE(key), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const swipeService = {
    swipeLeft: (userId) => api.post(API_ENDPOINTS.SWIPE_LEFT, { userId }),
    swipeRight: (userId) => api.post(API_ENDPOINTS.SWIPE_RIGHT, { userId }),
};

export const chatService = {
    sendMessage: (messageData) => api.post(API_ENDPOINTS.SEND_MESSAGE, messageData),
    getChatHistory: (receiverId) => api.get(API_ENDPOINTS.GET_CHAT_HISTORY(receiverId)),
    deleteMessage: (messageId) => api.delete(API_ENDPOINTS.DELETE_MESSAGE, { data: { messageId } }),
    vanishMessage: (messageId) => api.delete(API_ENDPOINTS.VANISH_MESSAGE, { data: { messageId } }),
};

export const communityService = {
    getCommunities: () => api.get(API_ENDPOINTS.GET_COMMUNITIES),
    joinCommunity: (communityId) => api.post(API_ENDPOINTS.JOIN_COMMUNITY, { communityId }),
    leaveCommunity: (communityId) => api.post(API_ENDPOINTS.LEAVE_COMMUNITY, { communityId }),
    getCommunityChat: (communityId) => api.get(API_ENDPOINTS.GET_COMMUNITY_CHAT(communityId)),
    sendCommunityMessage: (messageData) => api.post(API_ENDPOINTS.SEND_COMMUNITY_MESSAGE, messageData),
};

export const eventService = {
    getEvents: () => api.get(API_ENDPOINTS.GET_EVENTS),
    createEvent: (eventData) => api.post(API_ENDPOINTS.CREATE_EVENT, eventData),
    joinEvent: (eventId) => api.post(API_ENDPOINTS.JOIN_EVENT, { eventId }),
    leaveEvent: (eventId) => api.post(API_ENDPOINTS.LEAVE_EVENT, { eventId }),
};

export default api;
