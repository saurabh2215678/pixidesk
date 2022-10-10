import {configureStore} from "@reduxjs/toolkit";
import reducres from "./reducers/index";

export const store = configureStore({
        reducer: reducres,
        state: {},
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});