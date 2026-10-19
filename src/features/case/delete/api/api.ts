import { api } from '~/shared/api';

export const deleteCase = async (id: string) => {
	return await api.delete<null>({
		url: `/cases/${id}`,
	});
};
