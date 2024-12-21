import { combineReducers } from '@reduxjs/toolkit'
import { userApi } from './api/userApi'
import {projectsApi} from "@/redux/api/projectApi";
import {filesApi} from "@/redux/api/file";

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [filesApi.reducerPath]:filesApi.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

