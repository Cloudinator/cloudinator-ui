import {createServiceApi} from "@/redux/api/baseApi";

type Workspace = {
    uuid: string,
    name: string,
}

export type Service = {
    uuid: string,
    name: string,
    gitUrl: string,
    branch: string,
    subdomain: string,
    type: string,
    status: boolean
}

type SubWorkspace = {
    uuid: string,
    name: string,
    workspace: string,
}

export type SpringProject = {
    name: string
    namespace: string
    git: string
    branch: string
    folder: string
    group: string
    dependencies: string[]
}

export type BuildNumber = {
    buildNumber: number
    status: string
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

        getBuildInfoByName: builder.query<BuildNumber, { name: string }>({
            query: ({ name }) => `api/v1/deploy-service/get-build-numbers/${name}`,
        }),

        createServiceDeployment: builder.mutation<Service, { name: string, gitUrl: string, branch:string,subdomain:string,workspaceName:string,token:string,type:string}>({
            query: ({ name,gitUrl,branch,subdomain,workspaceName,token,type }) => ({
                url: 'api/v1/deploy-service/create-service',
                method: 'POST',
                body: { name,gitUrl,branch,subdomain,workspaceName,token,type },
            }),
        }),

        deployZipService: builder.mutation<void, { file: File, name: string, workspaceName: string, token: string, type: string }>({
            query: ({ file, name, workspaceName, token, type }) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('request', JSON.stringify({ name, workspaceName, token, type }));

                return {
                    url: 'api/v1/deploy-service/deploy-zip-service',
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        stopServiceDeployment: builder.mutation<Service, { name: string }>({
            query: ({ name }) => ({
                url: `api/v1/deploy-service/stop-service/${name}`,
                method: 'POST',
            }),
        }),

        deleteServiceDeployment: builder.mutation<void, {name:string}>({
            query: ({name}) => ({
                url: `api/v1/deploy-service/delete-service/${name}`,
                method: 'DELETE',
            }),
        }),

        startServiceDeployment: builder.mutation<Service, { name: string }>({
            query: ({ name }) => ({
                url: `api/v1/deploy-service/restart-service/${name}`,
                method: 'POST',
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

        getSubWorkspaces: builder.query<Service[], { workspaceName: string,size: number,page:number }>({
            query: ({ workspaceName,size,page }) => `api/v1/sub-workspace/${workspaceName}?size=${size}&page=${page}`,
        }),

        deleteSubWorkSpace:builder.mutation<void, {name:string}>({
            query: ({name}) => ({
                url: `api/v1/sub-workspace/delete/${name}`,
                method: 'DELETE',
            }),
        }),

        createProject: builder.mutation<SpringProject, { name: string, group: string, folder: string, dependencies: string[],servicesNames:string[] }>({
            query: ({ name, group, folder, dependencies,servicesNames }) => ({
                url: '/api/v1/spring/create-service',
                method: 'POST',
                body: { name, group, folder,servicesNames, dependencies },
            }),
        }),

        getProjectByName: builder.query<SpringProject, { name: string }>({
            query: ({ name }) => `api/v1/spring/project/${name}`,
        }),

        getProjects: builder.query<Service[], { subWorkspace: string,size: number,page:number }>({
            query: ({ subWorkspace,size,page }) => `api/v1/spring/${subWorkspace}?size=${size}&page=${page}`,
        }),

        getBuildNumberInFolder : builder.query<BuildNumber, { folder: string,name:string }>({
            query: ({ folder,name }) => `api/v1/spring/get-build-numbers/${folder}/${name}`,
        }),

        buildSpringService: builder.mutation<void, { folder: string, name: string, serviceName: string[] }>({
            query: ({ folder, name, serviceName }) => ({
                url: `api/v1/spring/start-build/${folder}/${name}`,
                method: 'POST',
                params: { serviceName },
            }),
        }),


    }),
})


export const { useGetWorkspacesQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation,useCreateServiceDeploymentMutation ,useGetServiceDeploymentQuery,useGetServiceByNameQuery,useGetBuildInfoByNameQuery,useGetBuildingLogsQuery,useBuildServiceMutation,useCreateSubWorkspaceMutation,useGetSubWorkspacesQuery,useCreateProjectMutation,useGetProjectsQuery,useGetBuildNumberInFolderQuery,useBuildSpringServiceMutation,useGetProjectByNameQuery,useStopServiceDeploymentMutation,useStartServiceDeploymentMutation,useDeployZipServiceMutation,useDeleteServiceDeploymentMutation,useDeleteSubWorkSpaceMutation} = projectsApi
