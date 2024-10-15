import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = '/api';
const httpClient = fetchUtils.fetchJson;


const mapIdField = (item: any) => {
  const newItem = { ...item };
  Object.keys(newItem).forEach(key => {
      if (key.includes('ID')) {
          newItem.id = newItem[key];
      }
  });
  return newItem;
};

const dataProvider = {
    getList: (resource : any, params : any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
              data: json.data.map(mapIdField),
              total: json.total
            };
        });
    },

    getOne: (resource :any, params : any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
            console.log(json);
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: mapIdField(json.data[resource.slice(0, -1)]),
            };
        }),

    getMany: (resource :any, params:any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data.map(mapIdField),
            };
        });
    },

    getManyReference: (resource :any, params:any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data,
                total: parseInt(headers.get('content-range')?.split('/').pop() as string, 10),
            };
        });
    },

    update: (resource :any, params:any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data,
            };
        }),

    updateMany: (resource :any, params:any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data.map(mapIdField),
            };
        });
    },

    create: (resource :any, params:any) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: { ...params.data, id: json.data.id },
            };
        }),

    delete: (resource :any, params:any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data,
            };
        }),

    deleteMany: (resource :any, params:any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => {
            if (json.statusCode !== 200) {
                throw new Error(json.message);
            }
            return {
                data: json.data.map(mapIdField),
            };
        });
    },
};

export default dataProvider;