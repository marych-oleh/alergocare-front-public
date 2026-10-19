import { Link } from 'react-router';
import { PATHS } from '~/shared/routes';

export function ForbiddenPage() {
	return (
		<div>
			<h1>403 - Заборонено</h1>
			<p>У вас немає права на цю дію або сторінку.</p>
			<Link to={PATHS.dashboard.root}>Back to dashboard</Link>
		</div>
	);
}
