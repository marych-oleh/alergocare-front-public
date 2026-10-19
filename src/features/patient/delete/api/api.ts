import { api } from '~/shared/api';

export const deletePatient = async (id: string) => {
	return await api.delete<null>({
		url: `/patients/${id}`,
	});
};
