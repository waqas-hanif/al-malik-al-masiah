import { configureStore } from "@reduxjs/toolkit";

const initialAppState = {
  language: "en",
  mobileMenuOpen: false,
  assistantOpen: false,
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case "app/setLanguage":
      return {
        ...state,
        language: action.payload,
      };

    case "app/setMobileMenu":
      return {
        ...state,
        mobileMenuOpen: action.payload,
      };

    case "app/setAssistant":
      return {
        ...state,
        assistantOpen: action.payload,
      };

    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// Language
export const setLanguage = (language) => ({
  type: "app/setLanguage",
  payload: language,
});

// Mobile menu
export const setMobileMenu = (open) => ({
  type: "app/setMobileMenu",
  payload: open,
});

// AI assistant
export const setAssistant = (open) => ({
  type: "app/setAssistant",
  payload: open,
});