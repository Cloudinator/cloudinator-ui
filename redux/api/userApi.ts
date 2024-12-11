import { createServiceApi } from './baseApi'

interface User {
    id: string
    username: string
    email: string,
    uuid: string
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

        updateUser: builder.mutation<User, { id: string, body: Partial<User> }>({
            query: ({ id, body }) => ({
                url: `api/v1/users/${id}`,
                method: 'PATCH',
                body: { ...body },
            }),
        }),


        updateMe: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: 'api/v1/users/me',
                method: 'PATCH',
                body,
            }),
        }),
    }),
})

export const { useGetMeQuery, useUpdateMeMutation,useGetAllUsersByUuidQuery,useUpdateUserMutation } = userApi

