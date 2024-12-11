import { createServiceApi } from './baseApi'

export interface User {
    id: string
    username: string
    email: string
    password: string
}

const identityApi = createServiceApi('identity')

export const userApi = identityApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => 'api/v1/users/me',
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

export const { useGetMeQuery, useUpdateMeMutation } = userApi

