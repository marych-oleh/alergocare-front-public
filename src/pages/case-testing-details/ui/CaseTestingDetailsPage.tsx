import { useNavigate } from 'react-router';
import { TestingDeleteAction } from '~/features/testing-actions/delete';
import { TestingEditForm } from '~/features/testing-actions/edit';
import { Route } from '../+types';

export const CaseTestingDetailsPage = ({ params }: Route.ComponentProps) => {
	const navigate = useNavigate();
	const handleClose = () => {
		navigate('../', { relative: 'path' });
	};

	return (
		<TestingEditForm
			caseId={params.caseID}
			testingId={params.testingID}
			additionalElements={
				<TestingDeleteAction
					testingId={params.testingID}
					onSuccess={handleClose}
				/>
			}
		/>
	);
};
