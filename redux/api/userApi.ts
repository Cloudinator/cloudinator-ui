import { createServiceApi } from './baseApi'
import { UserUpdateRequest } from '@/types/user'

interface User {
    id: string,
    username: string,
    email: string,
    uuid: string,
}

const identityApi = createServiceApi('identity')

export const userApi = identityApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => 'api/v1/users/me',
        }),

        getAllUsersByUuid: builder.query<User[], { uuid: string }>({
            query: ({ uuid }) => `api/v1/users/${uuid}`,
        }),

        updateUserByUuid: builder.mutation<User, { id: string, userUpdateRequest: UserUpdateRequest }>({
            query: ({ id, userUpdateRequest }) => ({
                url: `api/v1/users/${id}`,
                method: 'PUT',
                body: userUpdateRequest,
            }),
        }),

        updateUserByUsername: builder.mutation<void, { username: any , userUpdateRequest: UserUpdateRequest }>({
            query: ({ username, userUpdateRequest }) => ({
                url: `api/v1/users/${username}`,
                method: 'PATCH',
                body: {username, userUpdateRequest},
            }),
        }),
    }),
})

export const { useGetMeQuery, useUpdateUserByUuidMutation, useUpdateUserByUsernameMutation, useGetAllUsersByUuidQuery } = userApi

