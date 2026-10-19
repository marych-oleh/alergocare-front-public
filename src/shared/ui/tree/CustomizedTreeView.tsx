import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { SlotComponentProps } from '@mui/material/utils';
import { RichTreeView, RichTreeViewProps } from '@mui/x-tree-view/RichTreeView';
import {
	TreeItemCheckbox,
	TreeItemContent,
	TreeItemIconContainer,
	TreeItemLabel,
	TreeItemRoot,
} from '@mui/x-tree-view/TreeItem';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import {
	useTreeItem,
	UseTreeItemParameters,
} from '@mui/x-tree-view/useTreeItem';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { filterTree, getBranchIds, TreeItemNode } from '~/shared/lib/tree';

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
	const style = useSpring({
		to: {
			opacity: props.in ? 1 : 0,
			transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
		},
	});

	return <AnimatedCollapse style={style} {...props} />;
}

interface CustomLabelProps {
	children: React.ReactNode;
	expandable?: boolean;
}

function CustomLabel({ expandable, children, ...other }: CustomLabelProps) {
	return (
		<TreeItemLabel {...other} sx={{ display: 'flex', alignItems: 'center' }}>
			<Typography
				className="labelText"
				variant="body2"
				sx={{ color: 'text.primary' }}
			>
				{children}
			</Typography>
		</TreeItemLabel>
	);
}

export interface CustomTreeItemProps
	extends
		Omit<UseTreeItemParameters, 'rootRef'>,
		Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
	onItemContextMenu?: (e: React.MouseEvent<HTMLLIElement>, item: any) => void;
	onItemTouchStart?: (e: React.TouchEvent<HTMLLIElement>, item: any) => void;
	onItemTouchEnd?: () => void;
	onItemTouchMove?: () => void;
	isSelectable?: (item: TreeItemNode) => boolean;
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
	props: CustomTreeItemProps,
	ref: React.Ref<HTMLLIElement>
) {
	const {
		id,
		itemId,
		label,
		disabled,
		children,
		onItemContextMenu,
		onItemTouchStart,
		onItemTouchEnd,
		onItemTouchMove,
		isSelectable,
		...other
	} = props;

	const {
		getRootProps,
		getContentProps,
		getIconContainerProps,
		getLabelProps,
		getGroupTransitionProps,
		getContextProviderProps,
		getCheckboxProps,
		status,
		publicAPI,
	} = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

	const item = publicAPI.getItem(itemId);

	return (
		<TreeItemProvider {...getContextProviderProps()} id={id} itemId={itemId}>
			<TreeItemRoot
				sx={{
					paddingRight: 0,
					paddingLeft: { xs: 0.5, sm: 1 },
				}}
				onContextMenu={(e) => onItemContextMenu?.(e, item)}
				onTouchStart={(e) => onItemTouchStart?.(e, item)}
				onTouchEnd={onItemTouchEnd}
				onTouchMove={onItemTouchMove}
				{...getRootProps(other)}
			>
				<TreeItemContent
					{...getContentProps({
						className: clsx('content', {
							expanded: status.expanded,
							selected: status.selected,
							focused: status.focused,
							disabled: status.disabled,
						}),
					})}
					sx={{
						paddingLeft: { xs: 0.5, sm: 1 },
					}}
				>
					{status.expandable && (
						<TreeItemIconContainer {...getIconContainerProps()}>
							<TreeItemIcon status={status} />
						</TreeItemIconContainer>
					)}

					<CustomLabel {...getLabelProps()} />
					<TreeItemCheckbox
						sx={{ margin: 0.5, padding: 1 }}
						{...getCheckboxProps()}
					/>
				</TreeItemContent>
				{children && (
					<TransitionComponent
						{...getGroupTransitionProps({ className: 'groupTransition' })}
					/>
				)}
			</TreeItemRoot>
		</TreeItemProvider>
	);
});

export const MemoizedCustomTreeItem = React.memo(CustomTreeItem);

interface CustomizedTreeViewProps<
	T extends TreeItemNode,
	Multiple extends boolean | undefined = undefined,
> extends Omit<RichTreeViewProps<T, Multiple>, 'slots' | 'slotProps'> {
	slotProps?: Omit<RichTreeViewProps<T, Multiple>['slotProps'], 'item'> & {
		item?: SlotComponentProps<typeof CustomTreeItem, {}, any>;
	};
	searchTerm?: string;
}

const MIN_SEARCH_TERM_LENGTH = 2;
const MAX_CATEGORIES_AMOUNT_TO_EXPAND = 3;

export const CustomizedTreeView = <
	T extends TreeItemNode,
	Multiple extends boolean | undefined = undefined,
>({
	items,
	sx,
	searchTerm,
	multiSelect,
	...props
}: CustomizedTreeViewProps<T, Multiple>) => {
	// EXPAND CONTROL
	const [expandedItems, setExpandedItems] = React.useState<string[]>();
	const handleExpansionChange = (itemIds: string[]) => {
		setExpandedItems(itemIds);
	};

	// filter tree by searchTerm
	const filteredData = useMemo(() => {
		if (searchTerm && searchTerm.trim().length > MIN_SEARCH_TERM_LENGTH) {
			return filterTree(items, searchTerm);
		}
		return items;
	}, [items, searchTerm]);
	// and then auto-expand all elements if there is less then
	useEffect(() => {
		const isSearching =
			searchTerm && searchTerm.trim().length > MIN_SEARCH_TERM_LENGTH;

		if (isSearching) {
			const branchIds = getBranchIds(filteredData);

			if (
				branchIds.length > 0 &&
				branchIds.length < MAX_CATEGORIES_AMOUNT_TO_EXPAND
			) {
				handleExpansionChange(branchIds);
			}
		}
	}, [filteredData, searchTerm]);

	return (
		<RichTreeView<T, Multiple>
			items={filteredData}
			selectionPropagation={{
				descendants: true,
				parents: true,
			}}
			expandedItems={expandedItems}
			onExpandedItemsChange={(_, ids) => handleExpansionChange(ids)}
			getItemLabel={(item) => item.name}
			getItemId={(item) => item.id}
			sx={{
				m: '0 -8px',
				pb: '8px',
				height: 'fit-content',
				flexGrow: 1,
				overflowY: 'auto',
				...sx,
			}}
			slots={{ item: MemoizedCustomTreeItem }}
			{...props}
		/>
	);
};
