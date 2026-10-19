import { api } from '~/shared/api';

export const deleteTesting = async (id: string) => {
	return await api.delete<null>({
		url: `/testings/${id}`,
	});
};
