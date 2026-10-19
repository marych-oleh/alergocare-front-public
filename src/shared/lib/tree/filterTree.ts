import { TreeItemNode } from './type';

/** Filters a tree while preserving the hierarchy. */
export const filterTree = <T extends TreeItemNode>(
	nodes: readonly T[],
	searchTerm: string
): readonly T[] => {
	if (!searchTerm) return nodes;

	return nodes.reduce((acc: T[], node) => {
		const isMatch = node.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		if (isMatch) {
			acc.push({ ...node });
			return acc;
		}

		const filteredChildren =
			node.children ? filterTree(node.children as T[], searchTerm) : [];

		if (filteredChildren.length > 0) {
			acc.push({ ...node, children: filteredChildren as T[] });
		}
		return acc;
	}, []);
};

/** Finds a node's label by ID within the tree */
export const findNodeNameById = <T extends TreeItemNode>(
	nodes: T[],
	id: string
): string | null => {
	for (const node of nodes) {
		if (node.id === id) return node.name;
		if (node.children) {
			const found = findNodeNameById(node.children as T[], id);
			if (found) return found;
		}
	}
	return null;
};

/** branches items (have children) to ids list */
export const getBranchIds = (nodes: readonly TreeItemNode[]): string[] => {
	let ids: string[] = [];
	for (const node of nodes) {
		if (node.children && node.children.length > 0) {
			ids.push(node.id);
			ids = [...ids, ...getBranchIds(node.children)];
		}
	}
	return ids;
};

/**  find tree node and return as list of its id and parents`s ids */
export const getPathToNode = (
	nodes: readonly TreeItemNode[],
	targetId: string,
	path: string[] = []
): string[] | null => {
	for (const node of nodes) {
		if (node.id === targetId) return path;
		if (node.children) {
			const foundPath = getPathToNode(node.children, targetId, [
				...path,
				node.id,
			]);
			if (foundPath) return foundPath;
		}
	}
	return null;
};
