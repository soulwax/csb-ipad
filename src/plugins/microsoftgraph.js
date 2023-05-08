import axios from "axios";

export default {
    methods: {
        async msapi(resource, options) {
            if (options === undefined) options = {};
            if (options.method === undefined) options.method = 'get';
            if (options.baseurl === undefined) options.baseurl = 'https://graph.microsoft.com/v1.0';
            if (options.data === undefined) options.data = {};
            if (options.params === undefined) options.params = {};
            try {
                const res = await axios.request({
                    method: options.method,
                    url: options.baseurl + resource,
                    headers: { Authorization: `Bearer ${await this.$msal.acquireToken({scopes: options.scopes})}` },
                    params: options.params,
                    data: options.data
                });
                return {
                    status: res.status,
                    headers: res.headers,
                    body: res.data
                }

            } catch (err) {
                switch (err.response.status) {
                    case 400:
                        this.$store.commit("showsnack", "Petición incorrecta, si necesita ayuda contacte con el Administrador");
                        break;
                    case 403:
                        this.$store.commit("showsnack", "No estas autorizado para realizar esta acción");
                        break;
                    default:
                        this.$store.commit("showsnack", "Error desconocido, si necesita ayuda contacte con el Administrador");

                }
                return {
                    status: err.response.status,
                    headers: err.response.headers,
                    body: {}
                }
            }
        }
    },
}