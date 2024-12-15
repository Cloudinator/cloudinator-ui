import {createServiceApi} from "@/redux/api/baseApi";

type Workspace = {
    uuid: string,
    name: string,
}

type Service = {
    uuid: string,
    name: string,
    gitUrl: string,
    branch: string,
    subdomain: string,
    type: string,
}

type SubWorkspace = {
    uuid: string,
    name: string,
    workspace: string,
}

const projectApi = createServiceApi('project')

export const projectsApi = projectApi.injectEndpoints({
    endpoints: (builder) => ({
        getWorkspaces: builder.query<Workspace[], void>({
            query: () => 'api/v1/workspace',
        }),

        createWorkspace: builder.mutation<Workspace, { name: string }>({
            query: ({ name }) => ({
                url: 'api/v1/workspace/create',
                method: 'POST',
                body: { name },
            }),
        }),


        getServiceDeployment: builder.query<Service[], { workspaceName: string,size: number,page:number }>({
            query: ({ workspaceName,size,page }) => `api/v1/deploy-service/${workspaceName}?size=${size}&page=${page}`,
        }),

        getServiceByName: builder.query<Service, { name: string }>({
            query: ({ name }) => `api/v1/deploy-service/get-service/${name}`,
        }),

        getBuildInfoByName: builder.query<Service, { name: string }>({
            query: ({ name }) => `api/v1/deploy-service/get-build-numbers/${name}`,
        }),

        createServiceDeployment: builder.mutation<Service, { name: string, gitUrl: string, branch:string,subdomain:string,workspaceName:string,token:string,type:string}>({
            query: ({ name,gitUrl,branch,subdomain,workspaceName,token,type }) => ({
                url: 'api/v1/deploy-service/create-service',
                method: 'POST',
                body: { name,gitUrl,branch,subdomain,workspaceName,token,type },
            }),
        }),

        buildService: builder.mutation<Service,{name:string}>({
            query: ({name}) => ({
                url: `api/v1/deploy-service/run-service/${name}`,
                method: 'POST',
            }),
        }),

        getBuildingLogs: builder.query<Service, { jobName: string,buildNumber:number }>({
            query: ({ jobName,buildNumber }) => `api/v1/deploy-service/stream-logs/${jobName}/${buildNumber}`,
        }),

        updateWorkspace: builder.mutation<Workspace, { uuid: string, name: string }>({
            query: ({ uuid, name }) => ({
                url: `api/v1/workspaces/${uuid}`,
                method: 'PATCH',
                body: { name },
            }),
        }),

        deleteWorkspace: builder.mutation<void, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `api/v1/workspaces/${uuid}`,
                method: 'DELETE',
            }),
        }),

        createSubWorkspace: builder.mutation<SubWorkspace, { name: string, workspaceName: string }>({
            query: ({ name, workspaceName }) => ({
                url: 'api/v1/sub-workspace/create',
                method: 'POST',
                body: { name, workspaceName },
            }),
        }),


    }),
})


export const { useGetWorkspacesQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation,useCreateServiceDeploymentMutation ,useGetServiceDeploymentQuery,useGetServiceByNameQuery,useGetBuildInfoByNameQuery,useGetBuildingLogsQuery,useBuildServiceMutation,useCreateSubWorkspaceMutation} = projectsApi
