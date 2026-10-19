import { describe, it, expect } from 'vitest';
import { render } from '../../../test-utils';
import { Layout } from './Layout';

describe('CaseTabsLayout', () => {
	it('renders without crashing', () => {
		render(<Layout params={{ caseID: '123e4567-e89b-42d3-a456-426614174002' } as any} />);
		expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
	});
});
