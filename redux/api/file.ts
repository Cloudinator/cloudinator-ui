import {createServiceApi} from "@/redux/api/baseApi";

const fileApi = createServiceApi("media");

export const filesApi = fileApi.injectEndpoints({
    endpoints: (builder) => ({
        // Define the /test endpoint
        testEndpoint: builder.query<string, void>({
            query: () => ({
                url: "/api/v1/medias/zip/test", // Specify the endpoint URL
                method: "GET", // HTTP method
            }),
        }),

        uploadZip : builder.mutation<void, {file:File}>({
            query: ({file})=> {
                const formData = new FormData()
                formData.append('file',file)
                return {
                    url: "/api/v1/medias/zip/upload-project",
                    method: "POST",
                    body: formData
                }
            }
        })



    }),
});

export const {
    useTestEndpointQuery,
    useUploadZipMutation,
} = filesApi;