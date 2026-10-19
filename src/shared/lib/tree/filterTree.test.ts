import { describe, it, expect } from 'vitest';
import {
	filterTree,
	findNodeNameById,
	getBranchIds,
	getPathToNode,
} from './filterTree';
import type { TreeItemNode } from './type';

const tree: TreeItemNode[] = [
	{
		id: '1',
		name: 'Дихальна',
		children: [
			{ id: '1-1', name: 'Астма', children: [] },
			{ id: '1-2', name: 'Бронхіт', children: [] },
		],
	},
	{
		id: '2',
		name: 'Шкірні',
		children: [{ id: '2-1', name: 'Екзема', children: [] }],
	},
	{ id: '3', name: 'ШКТ', children: [] },
];

describe('filterTree', () => {
	it('returns full tree when searchTerm is empty', () => {
		expect(filterTree(tree, '')).toBe(tree);
	});

	it('finds nodes matching search term', () => {
		const result = filterTree(tree, 'Астма');
		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('1');
		expect(result[0].children).toHaveLength(1);
		expect(result[0].children![0].id).toBe('1-1');
	});

	it('is case-insensitive', () => {
		const result = filterTree(tree, 'астма');
		expect(result).toHaveLength(1);
		expect(result[0].children![0].name).toBe('Астма');
	});

	it('matches parent node directly and includes all its children', () => {
		const result = filterTree(tree, 'Дихальна');
		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('1');
		expect(result[0].children).toHaveLength(2);
	});

	it('returns empty array when nothing matches', () => {
		expect(filterTree(tree, 'Нічого')).toHaveLength(0);
	});

	it('finds leaf nodes and preserves path to them', () => {
		const result = filterTree(tree, 'Екзема');
		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('2');
		expect(result[0].children![0].id).toBe('2-1');
	});

	it('handles nodes without children', () => {
		const result = filterTree(tree, 'ШКТ');
		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('3');
	});
});

describe('findNodeNameById', () => {
	it('finds a top-level node name', () => {
		expect(findNodeNameById(tree, '1')).toBe('Дихальна');
	});

	it('finds a nested node name', () => {
		expect(findNodeNameById(tree, '1-2')).toBe('Бронхіт');
	});

	it('returns null for unknown id', () => {
		expect(findNodeNameById(tree, 'xxx')).toBeNull();
	});

	it('finds deeply nested nodes', () => {
		expect(findNodeNameById(tree, '2-1')).toBe('Екзема');
	});
});

describe('getBranchIds', () => {
	it('returns ids of nodes that have children', () => {
		const ids = getBranchIds(tree);
		expect(ids).toContain('1');
		expect(ids).toContain('2');
		expect(ids).not.toContain('3');
	});

	it('does not include leaf node ids', () => {
		const ids = getBranchIds(tree);
		expect(ids).not.toContain('1-1');
		expect(ids).not.toContain('1-2');
	});

	it('returns empty array for flat leaf-only nodes', () => {
		const flat: TreeItemNode[] = [
			{ id: 'a', name: 'A', children: [] },
			{ id: 'b', name: 'B', children: [] },
		];
		expect(getBranchIds(flat)).toHaveLength(0);
	});
});

describe('getPathToNode', () => {
	it('returns empty path for a top-level node', () => {
		expect(getPathToNode(tree, '1')).toEqual([]);
	});

	it('returns parent id for first-level child', () => {
		expect(getPathToNode(tree, '1-1')).toEqual(['1']);
	});

	it('returns null for unknown node', () => {
		expect(getPathToNode(tree, 'nope')).toBeNull();
	});

	it('returns full ancestor path for deeply nested node', () => {
		expect(getPathToNode(tree, '2-1')).toEqual(['2']);
	});
});
