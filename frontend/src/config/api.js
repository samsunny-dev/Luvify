const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    // Auth endpoints
    SIGNUP: `${API_BASE_URL}/user/signup`,
    LOGIN: `${API_BASE_URL}/user/signin`,
    LOGOUT: `${API_BASE_URL}/user/logout`,
    VERIFY: `${API_BASE_URL}/user/verify`,

    // Profile endpoints
    GET_PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
    UPLOAD_PHOTO: `${API_BASE_URL}/user/uploadPhoto`,
    GET_IMAGES: `${API_BASE_URL}/user/getImages`,
    REMOVE_IMAGE: (key) => `${API_BASE_URL}/user/remove/${key}`,
    REPLACE_IMAGE: (key) => `${API_BASE_URL}/user/replace/${key}`,

    // Swipe endpoints
    SWIPE_LEFT: `${API_BASE_URL}/user/swipeLeft`,
    SWIPE_RIGHT: `${API_BASE_URL}/user/swipeRight`,

    // Chat endpoints
    SEND_MESSAGE: `${API_BASE_URL}/user/send-message`,
    GET_CHAT_HISTORY: (receiverId) => `${API_BASE_URL}/user/chat-history/${receiverId}`,
    DELETE_MESSAGE: `${API_BASE_URL}/user/deletedMessage`,
    VANISH_MESSAGE: `${API_BASE_URL}/user/vanish-message`,

    // Community endpoints
    GET_COMMUNITIES: `${API_BASE_URL}/user/communities`,
    JOIN_COMMUNITY: `${API_BASE_URL}/user/join-community`,
    LEAVE_COMMUNITY: `${API_BASE_URL}/user/leave-community`,
    GET_COMMUNITY_CHAT: (communityId) => `${API_BASE_URL}/user/community-chat/${communityId}`,
    SEND_COMMUNITY_MESSAGE: `${API_BASE_URL}/user/send-community-message`,

    // Event endpoints
    GET_EVENTS: `${API_BASE_URL}/user/events`,
    CREATE_EVENT: `${API_BASE_URL}/user/create-event`,
    JOIN_EVENT: `${API_BASE_URL}/user/join-event`,
    LEAVE_EVENT: `${API_BASE_URL}/user/leave-event`,
};

export const SOCKET_URL = 'http://localhost:3000';

export default API_ENDPOINTS;
